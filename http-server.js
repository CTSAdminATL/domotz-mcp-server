import express from "express";
import dotenv from "dotenv";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { server } from "./mcp-server-singleton.js";

dotenv.config();

const app = express();
app.use(express.json({ limit: "2mb" }));

// Simple health check
app.get("/health", (_req, res) => res.status(200).send("ok"));

// Optional friendly root
app.get("/", (_req, res) => {
  res.status(200).send("Domotz MCP Server running. Use GET /sse (SSE) and POST /messages.");
});

// Store active sessions: sessionId -> transport
const sessions = new Map();

// IMPORTANT: SSE endpoint (ChatGPT expects an SSE stream here)
app.get("/sse", async (req, res) => {
  try {
    const transport = new SSEServerTransport("/messages", res);

    // Track by sessionId (the SDK sets this)
    sessions.set(transport.sessionId, transport);

    // Clean up when the client disconnects
    res.on("close", () => {
      sessions.delete(transport.sessionId);
      try { transport.close(); } catch {}
    });

    await server.connect(transport);
  } catch (err) {
    console.error("Error in GET /sse:", err);
    // If headers aren’t sent yet, return 500; otherwise just close
    if (!res.headersSent) res.status(500).send("Failed to establish SSE session");
    res.end();
  }
});

// IMPORTANT: Messages endpoint (client POSTs here with ?sessionId=...)
app.post("/messages", async (req, res) => {
  try {
    const sessionId = req.query.sessionId;
    if (!sessionId || typeof sessionId !== "string") {
      return res.status(400).send("Missing sessionId");
    }

    const transport = sessions.get(sessionId);
    if (!transport) {
      return res.status(400).send("Invalid sessionId");
    }

    // With Express JSON parsing, pass req.body explicitly (known SDK usage pattern)
    await transport.handlePostMessage(req, res, req.body);
  } catch (err) {
    console.error("Error in POST /messages:", err);
    if (!res.headersSent) res.status(500).send("Failed to handle message");
    res.end();
  }
});

// If you previously used /mcp in the connector UI, redirect it to /sse
app.get("/mcp", (_req, res) => res.redirect(302, "/sse"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Domotz MCP (SSE) listening on ${port}`));
