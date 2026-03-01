// proxy.mjs — run with: ANTHROPIC_API_KEY=sk-ant-... node proxy.mjs
// No npm installs needed. Requires Node 18+.

import http from "http";
// Polyfill fetch for Node.js if needed
import('node:node-fetch').then(mod => { if (!globalThis.fetch) globalThis.fetch = mod.default; }).catch(() => {});

const API_KEY = process.env.ANTHROPIC_API_KEY;
const PORT    = 5000;

if (!API_KEY) {
  console.error("❌  Missing ANTHROPIC_API_KEY. Run as:\n   ANTHROPIC_API_KEY=sk-ant-... node proxy.mjs");
  process.exit(1);
}

const server = http.createServer(async (req, res) => {
  // CORS headers — allow Vite dev server
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") { res.writeHead(204); res.end(); return; }

  if (req.method !== "POST" || req.url !== "/api/ai-assist") {
    res.writeHead(404); res.end("Not found"); return;
  }

  // Read request body
  let body = "";
  for await (const chunk of req) body += chunk;

  let question;
  try {
    question = JSON.parse(body).question;
    if (!question || question.trim().length < 5) throw new Error();
  } catch {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Invalid question." }));
    return;
  }

  // Forward to Anthropic
  try {
    const upstream = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-opus-4-6",
        max_tokens: 1000,
        system: `You are an expert automotive mechanic with 20+ years of hands-on shop experience.
You give clear, practical, shop-floor advice — no fluff, no disclaimers, no corporate speak.
Format your response as structured diagnostic steps. Use plain text only (no markdown).
Start with a 1-sentence assessment, then give numbered diagnostic steps (3-5 max), then a closing note on what to watch for.
Keep the total response under 200 words. Talk like a knowledgeable colleague, not a manual.`,
        messages: [{ role: "user", content: `A mechanic posted this question: "${question}"\n\nGive your best diagnostic advice.` }],
      }),
    });

    const data = await upstream.json();

    if (!upstream.ok) {
      res.writeHead(upstream.status, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: data?.error?.message || "Anthropic error" }));
      return;
    }

    const answer = data.content
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("")
      .trim();

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ answer }));

  } catch (err) {
    console.error("Proxy error:", err);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Proxy server error." }));
  }
});

server.listen(PORT, () => {
  console.log(`✅  MechRelay AI proxy running on http://localhost:${PORT}`);
  console.log(`   Forwarding /api/ai-assist → api.anthropic.com`);
});
