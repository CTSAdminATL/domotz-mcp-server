import express from "express";
import dotenv from "dotenv";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { server } from "./mcp-server-singleton.js";

dotenv.config();

const app = express();

// Parse JSON bodies for POST /messages
app.use(express.json({ limit: "2mb" }));

// Health check
app.get("/health", (_req, res) => res.status(200).send("ok"));

// Optional: friendly root
app.get("/", (_req, res) => {
  res.status(200).send("Domotz MCP Server is running. Use /sse (SSE) or /health.");
});

// IMPORTANT: SSE endpoint (ChatGPT expects text/event-stream here)
let transport; // single transport instance per server process
app.get("/sse", async (req, res) => {
  // Create transport the first time; reuse it
  transport ??= new SSEServerTransport("/messages", res);
  await server.connect(transport);
});

// IMPORTANT: messages endpoint (client posts JSON-RPC messages here)
app.post("/messages", async (req, res) => {
  if (!transport) {
    return res.status(400).send("SSE transport not initialized. Call GET /sse first.");
  }
  // With Express, pass req.body (workaround documented by SDK users)
  await transport.handlePostMessage(req, res, req.body);
});

// Optional compatibility: if you used /mcp before, redirect to /sse
app.get("/mcp", (_req, res) => res.redirect(302, "/sse"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Domotz MCP (SSE) listening on ${port}`));
