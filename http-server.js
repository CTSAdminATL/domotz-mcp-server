import express from "express";
import { randomUUID } from "node:crypto";
import dotenv from "dotenv";

dotenv.config();

// This is the correct Streamable HTTP transport import for the v1 SDK
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";

// Import the MCP server instance you exported (server-building code only)
import { server } from "./mcp-server-singleton.js";

const app = express();
app.use(express.json({ limit: "2mb" }));

app.post("/mcp", async (req, res) => {
  const transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => randomUUID(),
    enableJsonResponse: true
  });

  res.on("close", () => transport.close());

  await transport.handleRequest(req, res);
  await server.connect(transport);
});

app.get("/health", (_req, res) => res.status(200).send("ok"));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));
