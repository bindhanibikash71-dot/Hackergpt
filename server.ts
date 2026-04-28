import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route
  app.post("/api/chat", async (req, res) => {
    const { prompt, history } = req.body;
    
    // Refusal logic
    const forbiddenPatterns = [/how to hack/, /hack password/, /steal data/, /ddos attack/, /infiltrate network/i];
    if (forbiddenPatterns.some(pattern => pattern.test(prompt.toLowerCase()))) {
      return res.json({ response: "ACCESS DENIED. HackerGPT is restricted to educational cybersecurity learning. I cannot assist with illegal or malicious activities." });
    }

    // Access environment variable from server
    const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
    if (!OPENROUTER_API_KEY) {
      return res.status(500).json({ error: "Server configuration error: Missing OpenRouter API Key" });
    }

    try {
      const { OpenAI } = await import("openai");
      const client = new OpenAI({
        baseURL: "https://openrouter.ai/api/v1",
        apiKey: OPENROUTER_API_KEY,
      });

      const messages = [
        ...history.map((h: any) => ({ role: h.role, content: h.content })),
        { role: "user", content: prompt }
      ];

      const chatCompletion = await client.chat.completions.create({
        model: "z-ai/glm-4.5-air:free", // Using a free model from OpenRouter
        messages: messages as any,
      });

      res.json({ response: chatCompletion.choices[0].message?.content || "No response received." });
    } catch (err: any) {
      console.error("AI Service Error:", err.message, err.response?.data);
      res.status(500).json({ error: "Internal Server Error", details: err.message });
    }
  });

  // Vite middleware
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
