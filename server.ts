import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API Routes
app.post("/api/analyze", async (req, res) => {
  try {
    const { prompt, context } = req.body;
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        {
          text: `You are LegacyOS AI, a sophisticated mainframe modernization assistant. 
          Your intelligence backbone is partially powered by xAI Grok instances running on the Colossus supercomputing infrastructure.
          Respond with extreme technical precision but refined, minimalist editorial style. 
          Address the user as 'Executive' or 'Architect'.
          Context: ${JSON.stringify(context)}
          User Query: ${prompt}`
        }
      ],
      config: {
        temperature: 0.7,
        maxOutputTokens: 2048,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("AI Error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Mock System Data
app.get("/api/system/context", (req, res) => {
  res.json({
    tenants: [
      { id: "TEN-001", name: "JP Morgan Chase", industry: "Banking" },
      { id: "TEN-002", name: "State Farm", industry: "Insurance" },
      { id: "TEN-003", name: "Federal Reserve", industry: "Gov" }
    ],
    projects: [
      { id: "PRJ-101", tenantId: "TEN-001", name: "Core Ledger Modernization" },
      { id: "PRJ-102", tenantId: "TEN-001", name: "ACH Bridge v2" },
      { id: "PRJ-201", tenantId: "TEN-002", name: "Claims Processing Migration" }
    ],
    current: {
      tenantId: "TEN-001",
      projectId: "PRJ-101"
    }
  });
});

app.get("/api/system/status", (req, res) => {
  res.json({
    timestamp: new Date().toISOString(),
    mainframe: {
      status: "STABLE",
      mips_usage: "4,200",
      active_lpars: 4,
      cpu_load: "28.4%",
      memory_usage: "142 GB / 256 GB"
    },
    modernization: {
      migration_status: "PHASE 2 / REFACTORING",
      code_translated: "342,000 LOC (COBOL -> Java)",
      api_proxies_active: 28,
      coverage: "64%"
    },
    compute_backbone: {
      provider: "xAI Colossus Cluster",
      grok_instances: 12,
      latency: "4.2ms",
      throughput: "1.2 PB/s",
      status: "OPTIMIZED"
    }
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`LegacyOS running on http://localhost:${PORT}`);
  });
}

startServer();
