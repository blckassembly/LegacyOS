/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from "react";
import { 
  Terminal, 
  Cpu, 
  Activity, 
  ArrowUpRight, 
  Settings, 
  Shield, 
  Zap, 
  MessageSquare, 
  Database, 
  Network,
  Clock,
  Layers,
  Search,
  Menu,
  X,
  ChevronRight,
  Plus
} from "lucide-react";
import { motion } from "motion/react";

// --- Types ---

interface SystemStatus {
  timestamp: string;
  mainframe: {
    status: string;
    mips_usage: string;
    active_lpars: number;
    cpu_load: string;
    memory_usage: string;
  };
  modernization: {
    migration_status: string;
    code_translated: string;
    api_proxies_active: number;
    coverage: string;
  };
  compute_backbone: {
    provider: string;
    grok_instances: number;
    latency: string;
    throughput: string;
    status: string;
  };
}

interface Tenant {
  id: string;
  name: string;
  industry: string;
}

interface Project {
  id: string;
  tenantId: string;
  name: string;
}

interface UserContext {
  tenants: Tenant[];
  projects: Project[];
  current: {
    tenantId: string;
    projectId: string;
  };
}

type ViewType = 'dashboard' | 'chat' | 'artifacts' | 'ingestion' | 'graph' | 'risk' | 'tests' | 'migration' | 'reports' | 'admin' | 'review' | 'audit' | 'data' | 'catalog' | 'knowledge';

// --- Components ---

const Sidebar = ({ activeView, onViewChange, context }: { activeView: ViewType, onViewChange: (v: ViewType) => void, context: UserContext | null }) => {
  const currentTenant = context?.tenants.find(t => t.id === context.current.tenantId);
  const currentProject = context?.projects.find(p => p.id === context.current.projectId);

  const items: { icon: any, label: string, view: ViewType }[] = [
    { icon: <Layers size={16} />, label: "Dashboard", view: 'dashboard' },
    { icon: <MessageSquare size={16} />, label: "Chat Workbench", view: 'chat' },
    { icon: <ArrowUpRight size={16} />, label: "Ingestion Layer", view: 'ingestion' },
    { icon: <Database size={16} />, label: "Artifact Viewer", view: 'artifacts' },
    { icon: <Network size={16} />, label: "Knowledge Graph", view: 'graph' },
    { icon: <Cpu size={16} />, label: "Service Catalog", view: 'catalog' },
    { icon: <Search size={16} />, label: "Veteran Knowledge", view: 'knowledge' },
    { icon: <Database size={16} />, label: "Data Architecture", view: 'data' },
    { icon: <Layers size={16} />, label: "Review Queue", view: 'review' },
    { icon: <Shield size={16} />, label: "Risk & Compliance", view: 'risk' },
    { icon: <Activity size={16} />, label: "Audit Logs", view: 'audit' },
    { icon: <Zap size={16} />, label: "Test Forge", view: 'tests' },
    { icon: <Clock size={16} />, label: "Migration Roadmap", view: 'migration' },
    { icon: <Settings size={16} />, label: "Admin Console", view: 'admin' },
  ];

  return (
    <aside className="w-64 border-r border-black h-screen sticky top-0 hidden lg:flex flex-col p-8 bg-white overflow-y-auto shrink-0">
      <div className="mb-12">
        <h1 className="text-xl font-bold tracking-tighter uppercase mb-2">LegacyOS</h1>
        <div className="p-3 border border-black/10 bg-black/[0.02] space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[8px] uppercase font-bold text-black/40">Tenant</span>
            <span className="text-[8px] uppercase font-bold text-black/40">TEN-001</span>
          </div>
          <p className="text-[10px] font-bold uppercase truncate">{currentTenant?.name || "Loading..."}</p>
          <div className="h-[1px] w-full bg-black/5 my-1" />
          <div className="flex items-center justify-between">
            <span className="text-[8px] uppercase font-bold text-black/40">Project</span>
            <Plus size={8} className="cursor-pointer" />
          </div>
          <p className="text-[10px] font-bold uppercase truncate text-black/60">{currentProject?.name || "Loading..."}</p>
        </div>
      </div>

      <nav className="space-y-4">
        {items.map((item, idx) => (
          <button 
            key={idx}
            onClick={() => onViewChange(item.view)}
            className={`flex items-center gap-3 w-full text-left transition-luxury group py-1 ${activeView === item.view ? 'text-black font-bold' : 'text-black/40 hover:text-black'}`}
          >
            <span className={`transition-transform group-hover:translate-x-1 ${activeView === item.view ? 'text-black' : ''}`}>{item.icon}</span>
            <span className="text-[11px] uppercase tracking-[0.12em]">{item.label}</span>
            {activeView === item.view && <div className="ml-auto w-1 h-1 bg-black rounded-full" />}
          </button>
        ))}
      </nav>

      <div className="mt-auto pt-12">
        <div className="p-4 bg-black/5 rounded-[2px] mb-6 border border-black/5">
          <p className="micro-label mb-2">Modernization Goal</p>
          <div className="h-[2px] w-full bg-black/10 mb-2">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '64%' }}
              className="h-full bg-black"
            />
          </div>
          <p className="text-[10px] uppercase font-bold">64.0% Complete</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-black rounded-[2px] flex items-center justify-center text-white text-[10px] font-bold">JD</div>
          <div>
            <p className="text-[11px] font-bold">Jane Doe</p>
            <p className="text-[9px] uppercase tracking-wider text-black/40">Architect Elite</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

const MetricCard = ({ label, value, subtext }: { label: string, value: string, subtext?: string }) => (
  <div className="atelier-card flex flex-col justify-between group hover:bg-black hover:text-white transition-all duration-300">
    <div>
      <p className="micro-label group-hover:text-white/60 mb-2">{label}</p>
      <h3 className="text-3xl font-medium tracking-tight">{value}</h3>
    </div>
    {subtext && (
      <p className="text-[10px] uppercase mt-4 text-black/40 group-hover:text-white/40 tracking-wider">
        {subtext}
      </p>
    )}
  </div>
);

const AIModernizationAssistant = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([
    { role: 'ai', content: "Welcome to the Modernization Command Center. Intelligence backbone linked to xAI Colossus cluster. Grok-1.5 instances are active. How can I assist with your migration strategy, Architect?" }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input;
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    // Mocking the Agent Flow Step-by-Step
    const steps = [
      "Classifying intent...",
      "Retrieving evidence from Chunk Store...",
      "Querying Neo4j Knowledge Graph...",
      "Constructing RAG context...",
      "Inference via Grok/Colossus..."
    ];

    try {
      // Simulate slow architectural retrieval
      for (const step of steps) {
        // You could update a secondary UI for these steps
        console.log(`[AGENT] ${step}`);
      }

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: userMsg,
          context: {
            system: "LegacyOS v0.4.2",
            status: "STABLE",
            current_phase: "PHASE 2"
          }
        })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', content: data.text }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', content: "System communication error. Please check your network connection." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="atelier-card col-span-1 lg:col-span-2 flex flex-col h-[500px]">
      <div className="flex items-center justify-between mb-6 border-b border-black/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-black animate-pulse rounded-full" />
          <p className="micro-label">AI Intelligence Module</p>
        </div>
        <MessageSquare size={16} className="text-black/40" />
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto mb-4 space-y-4 pr-2 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`max-w-[90%] ${msg.role === 'user' ? 'ml-auto text-right' : 'text-left'}`}>
            <p className="text-[10px] uppercase font-bold mb-1 tracking-widest text-black/40">
              {msg.role === 'user' ? 'Executive' : 'LegacyOS AI'}
            </p>
            <p className={`text-[13px] leading-relaxed ${msg.role === 'user' ? 'bg-black text-white p-3' : 'border border-black p-3'} rounded-[2px]`}>
              {msg.content}
            </p>
          </div>
        ))}
        {loading && (
          <div className="flex gap-1 py-2">
            {[0, 1, 2].map(i => (
              <motion.div 
                key={i}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="w-1.5 h-1.5 bg-black"
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="ENTER COMMAND OR QUERY..."
          className="flex-1 border border-black p-3 text-[12px] uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-black/20 rounded-[2px]"
        />
        <button 
          onClick={handleSend}
          disabled={loading}
          className="atelier-btn-primary h-full px-6 flex items-center justify-center disabled:opacity-50"
        >
          EXECUTE
        </button>
      </div>
    </div>
  );
};

const LogViewer = () => {
  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    const mockLogs = [
      "2026-05-18 20:22:15 [SYSTEM] STARTING LPAR_04 DAEMON...",
      "2026-05-18 20:22:16 [LOAD] COBOL MODULE 'AR_PROCESS' LOADED INTO MEMORY.",
      "2026-05-18 20:22:18 [INFO] DISPATCHER ROUTING 4.2K MIPS TO CORE_08.",
      "2026-05-18 20:22:20 [TRANS] API PROXY #28 REGISTERED: /api/v1/customer-ledgers",
      "2026-05-18 20:22:25 [TELEMETRY] CPU TEMP 42C. COOLING NOMINAL.",
    ];
    setLogs(mockLogs);

    const interval = setInterval(() => {
      const newLog = `${new Date().toISOString().replace('T', ' ').split('.')[0]} [INFO] HEARTBEAT: NODE_${Math.floor(Math.random() * 100)} STATUS: STABLE`;
      setLogs(prev => [...prev.slice(-7), newLog]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="atelier-card col-span-1 lg:col-span-3">
      <div className="flex items-center justify-between mb-4 border-b border-black/10 pb-4">
         <div className="flex items-center gap-2">
          <Terminal size={16} />
          <p className="micro-label">Real-time System Logs</p>
        </div>
        <div className="text-[10px] text-black/40">LIVE DATA STREAM ON</div>
      </div>
      <div className="bg-black/5 p-4 rounded-[2px] font-mono text-[11px] space-y-1 overflow-x-auto border border-black/5">
        {logs.map((log, idx) => (
          <div key={idx} className="flex gap-4">
            <span className="text-black/30 shrink-0">[{idx.toString().padStart(2, '0')}]</span>
            <span className="text-black/80 whitespace-nowrap">{log}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const ModernizationPipeline = () => {
  const steps = [
    { title: "Source Systems", desc: "COBOL / NATURAL / CICS / JCL / VSAM" },
    { title: "Ingestion Layer", desc: "SECURE DATA EXTRACTION & STREAMING" },
    { title: "Knowledge Graph", desc: "SYSEM-WIDE ARCHITECTURE MAPPING" },
    { title: "Dependency Engine", desc: "RAG-POWERED LOGIC TRACING" },
    { title: "AI Agents", desc: "SPECIALIZED CODE TRANSLATION" },
    { title: "Inference Cluster", desc: "GROK / COLOSSUS OPTIMIZATION" },
    { title: "Governance", desc: "HUMAN-IN-THE-LOOP APPROVAL" },
    { title: "Deployables", desc: "MODERN APIS / MIGRATION PLANS" },
  ];

  return (
    <div className="atelier-card mb-8 overflow-x-auto">
      <div className="flex items-center gap-2 mb-8">
        <Activity size={16} />
        <p className="micro-label">Modernization Pipeline Flow</p>
      </div>
      
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 relative min-w-[1000px] lg:min-w-0">
        {/* Connection Line */}
        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[1px] bg-black/10 -translate-y-1/2 z-0" />
        
        {steps.map((step, idx) => (
          <div key={idx} className="relative z-10 flex flex-col items-center flex-1 group">
            <div className="w-3 h-3 bg-white border border-black rounded-full mb-4 group-hover:bg-black transition-luxury" />
            <div className="text-center">
              <h4 className="text-[10px] font-bold uppercase tracking-widest mb-1">{step.title}</h4>
              <p className="text-[9px] text-black/40 uppercase leading-tight max-w-[120px] mx-auto">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SystemArchitecture = () => {
  const layers = [
    {
      title: "Frontend App + Orchestrator",
      subtitle: "NEXT.JS / TEMPORAL / CELEBRY",
      items: ["Chat Workbench", "Artifact Viewer", "Dependency Graph", "Evidence Panel", "Migration Roadmap"]
    },
    {
      title: "API Layer & Router",
      subtitle: "NESTJS / AGENT ROUTER",
      items: ["Intent Classifier", "Prompt Loader", "Citation Enforcer", "Graph Query Service", "Model Router"]
    },
    {
      title: "RAG & Processing Layer",
      subtitle: "EMBEDDING PIPELINE / RERANKER",
      items: ["Hybrid Search", "Metadata Extractor", "Citation Mapper", "Claim Validator", "Evidence Resolver"]
    }
  ];

  const bottomServices = [
    { title: "Data Services", icon: <Database size={16} />, items: ["Neo4j Graph", "Vector Store (Weaviate)", "PostgreSQL Metadata", "MinIO Object Storage", "Redis Cache", "Immutable Audit Store"] },
    { title: "AI Agent Layer", icon: <Cpu size={16} />, items: ["xAI Grok / Colossus", "IBM WatsonX", "Local Llama-3-70B", "Reasoning Router"] },
    { title: "Enterprise Ops", icon: <Shield size={16} />, items: ["Audit Logs", "FIPS Compliance", "Policy Enforcement", "RBAC / IAM"] }
  ];

  return (
    <div className="atelier-card mb-8">
      <div className="flex items-center gap-2 mb-8">
        <Settings size={16} />
        <p className="micro-label">Enterprise System Architecture</p>
      </div>

      <div className="flex flex-col items-center gap-6">
        {layers.map((layer, idx) => (
          <div key={idx} className="w-full flex flex-col items-center">
            <div className="w-full max-w-2xl atelier-border p-4 hover:bg-black group transition-luxury cursor-default">
              <div className="flex justify-between items-end mb-4 border-b border-black group-hover:border-white/20 pb-2">
                <h4 className="text-[12px] font-bold uppercase tracking-widest group-hover:text-white">{layer.title}</h4>
                <span className="text-[9px] uppercase font-medium text-black/40 group-hover:text-white/40">{layer.subtitle}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {layer.items.map((item, i) => (
                  <span key={i} className="text-[10px] uppercase border border-black/10 group-hover:border-white/20 px-2 py-1 group-hover:text-white/80">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            {idx < layers.length - 1 && (
              <div className="h-6 w-[1px] bg-black my-2" />
            )}
          </div>
        ))}

        <div className="h-6 w-[1px] bg-black" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          {bottomServices.map((service, idx) => (
            <div key={idx} className="atelier-border p-4 hover:bg-black group transition-luxury cursor-default">
              <div className="flex items-center gap-2 mb-3 group-hover:text-white">
                {service.icon}
                <h4 className="text-[10px] font-bold uppercase tracking-widest">{service.title}</h4>
              </div>
              <div className="space-y-1">
                {service.items.map((item, i) => (
                  <p key={i} className="text-[9px] uppercase text-black/40 group-hover:text-white/40">{item}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const EvidencePanel = ({ open, onClose }: { open: boolean, onClose: () => void }) => (
  <motion.div 
    initial={{ x: '100%' }}
    animate={{ x: open ? 0 : '100%' }}
    className="fixed top-0 right-0 w-96 h-screen bg-white shadow-[-20px_0_60px_rgba(0,0,0,0.05)] border-l border-black z-50 p-8 overflow-y-auto"
  >
    <div className="flex items-center justify-between mb-12">
      <p className="micro-label">Evidence Store Proof</p>
      <button onClick={onClose}><X size={18} /></button>
    </div>

    <div className="space-y-12">
      <div className="atelier-border p-4 bg-black/5">
        <p className="text-[10px] font-bold uppercase mb-2">Claim ID: CLM-402</p>
        <p className="text-[12px] italic leading-relaxed">
          "Program GL_EOD_01 performs currency conversion using the daily mid-rate table GL_RATE_001."
        </p>
      </div>

      <div className="space-y-4">
        <p className="micro-label border-b border-black pb-2">Line-level Proof</p>
        <div className="font-mono text-[10px] space-y-1 bg-black text-white/90 p-4 rounded-[2px]">
           <p className="text-white/40">000840 PERFORM 900-GET-DAILY-RATE.</p>
           <p className="bg-white/10 px-1 font-bold">000850 MOVE GL_MID_RATE TO WS-CURR-FACTOR.</p>
           <p className="bg-white/10 px-1 font-bold">000860 MULTIPLY AMT-IN BY WS-CURR-FACTOR GIVING AMT-OUT.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="atelier-card p-4">
          <p className="micro-label mb-1">Confidence</p>
          <p className="text-xl font-bold">0.992</p>
        </div>
        <div className="atelier-card p-4">
          <p className="micro-label mb-1">Status</p>
          <p className="text-xl font-bold text-green-600">VERIFIED</p>
        </div>
      </div>

      <div className="space-y-4 pt-12 border-t border-black/10">
        <p className="micro-label">Knowledge Graph Context</p>
        <div className="flex flex-wrap gap-2">
           {['GL_EOD_01', 'GL_RATE_001', 'CURR_CONV_MODULE', 'CICS_TRAN_GL01'].map(t => (
             <span key={t} className="px-2 py-1 border border-black/20 text-[9px] font-bold uppercase">{t}</span>
           ))}
        </div>
      </div>
    </div>
  </motion.div>
);

export default function App() {
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [context, setContext] = useState<UserContext | null>(null);
  const [activeView, setActiveView] = useState<ViewType>('dashboard');
  const [evidenceOpen, setEvidenceOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statusRes, contextRes] = await Promise.all([
          fetch("/api/system/status"),
          fetch("/api/system/context")
        ]);
        const statusData = await statusRes.json();
        const contextData = await contextRes.json();
        setStatus(statusData);
        setContext(contextData);
      } catch (err) {
        console.error("Data fetch failed");
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const currentProject = context?.projects.find(p => p.id === context.current.projectId);

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <>
            <header className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 mb-2">
                   <div className="px-2 py-0.5 bg-black text-white text-[8px] font-bold uppercase tracking-widest">PROJECT: {currentProject?.id || "..."}</div>
                </div>
                <h2 className="text-5xl font-medium tracking-tighter">{currentProject?.name || "Modernization Suite"}</h2>
                <p className="text-black/40 text-[14px] max-w-md border-l border-black/10 pl-4">
                  Executive-grade control over legacy core systems and cloud-native translation layering.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button className="atelier-btn-secondary flex items-center gap-2">
                  <Plus size={14} /> NEW PROJECT
                </button>
                <button className="atelier-btn-primary">INITIATE DEPLOY</button>
              </div>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <MetricCard 
                label="Infrastructure Status" 
                value={status?.mainframe.status || "STABLE"} 
                subtext={`${status?.mainframe.active_lpars || 4} ACTIVE LOGICAL PARTITIONS`}
              />
              <MetricCard 
                label="MIPS Intensity" 
                value={status?.mainframe.mips_usage || "4,200"} 
                subtext={`CPU UTILIZATION: ${status?.mainframe.cpu_load || "28.4%"}`}
              />
              <MetricCard 
                label="Code Coverage" 
                value={status?.modernization.coverage || "64%"} 
                subtext={`${status?.modernization.code_translated || "342,000"} LOC TRANSLATED`}
              />
            </section>

            <ModernizationPipeline />

            <SystemArchitecture />

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <AIModernizationAssistant />
              <div className="flex flex-col gap-6">
                <div className="atelier-card flex-1">
                  <div className="flex items-center justify-between mb-6">
                    <p className="micro-label">Compute Backbone: Colossus</p>
                    <Cpu size={14} className="text-black/20" />
                  </div>
                  <div className="flex flex-col gap-4">
                      {[
                        { label: "Provider", value: status?.compute_backbone.provider || "xAI Colossus" },
                        { label: "Grok Instances", value: status?.compute_backbone.grok_instances || "12" },
                        { label: "Neural Latency", value: status?.compute_backbone.latency || "4.2ms" },
                        { label: "System Status", value: status?.compute_backbone.status || "OPTIMIZED" }
                      ].map((node, i) => (
                        <div key={i} className="flex items-center justify-between border-b border-black/5 pb-2 hover:bg-black/5 transition-colors p-1 cursor-default">
                          <span className="text-[12px] uppercase font-bold">{node.label}</span>
                          <span className="text-[11px] font-mono">{node.value}</span>
                        </div>
                      ))}
                  </div>
                  <button className="mt-8 text-[10px] uppercase font-bold underline underline-offset-4 decoration-black/20 hover:decoration-black transition-all">
                    SCALE CLUSTER
                  </button>
                </div>
                
                <div className="atelier-card bg-black text-white py-12 flex flex-col items-center justify-center gap-4 text-center">
                  <Shield size={32} className="mb-2" />
                  <h4 className="text-[10px] uppercase tracking-[0.2em] font-semibold">Security Vault Active</h4>
                  <p className="text-[11px] opacity-40 px-8">All modernization pipelines are encrypted with FIPS-140-2 standards.</p>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <LogViewer />
            </section>
          </>
        );
      case 'chat':
        return (
          <div className="h-[calc(100vh-160px)] flex flex-col">
            <h2 className="text-3xl font-medium tracking-tighter mb-8">Chat Workbench</h2>
            <AIModernizationAssistant />
          </div>
        );
      case 'ingestion':
        return (
          <div className="space-y-12">
            <header className="mb-12">
              <h2 className="text-3xl font-medium tracking-tighter mb-2">Ingestion Layer</h2>
              <p className="micro-label">Status: Secure Pipeline Active</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="atelier-card col-span-1 lg:col-span-2">
                <p className="micro-label mb-6">Active Ingestion Services</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: 'Upload Service', status: 'READY', icon: <ArrowUpRight size={14} /> },
                    { name: 'Repo Connector', status: 'CONNECTED', icon: <Database size={14} /> },
                    { name: 'Mainframe Export', status: 'POLLING', icon: <Cpu size={14} /> },
                    { name: 'File Classifier', status: 'ACTIVE', icon: <Search size={14} /> },
                    { name: 'Metadata Extractor', status: 'ACTIVE', icon: <Plus size={14} /> },
                    { name: 'Sensitive Data Scanner', status: 'READY', icon: <Shield size={14} /> },
                  ].map((service, i) => (
                    <div key={i} className="flex items-center justify-between p-3 border border-black/5 hover:bg-black group transition-luxury cursor-default">
                      <div className="flex items-center gap-3 group-hover:text-white">
                        {service.icon}
                        <span className="text-[11px] font-bold uppercase">{service.name}</span>
                      </div>
                      <span className="text-[9px] font-mono group-hover:text-white/60">{service.status}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="atelier-card">
                <p className="micro-label mb-6">Source Channels</p>
                <div className="space-y-2">
                  {['GitHub Enterprise', 'z/OS Export (LPAR_01)', 'Endevor / Changeman', 'ServiceNow / Jira', 'Splunk Log Stream'].map(s => (
                    <div key={s} className="flex items-center justify-between text-[11px] uppercase py-1 border-b border-black/5">
                      <span className="font-medium">{s}</span>
                      <div className="w-1.5 h-1.5 bg-black rounded-full" />
                    </div>
                  ))}
                </div>
                <button className="atelier-btn-secondary w-full mt-8">CONFIGURE CHANNEL</button>
              </div>
            </div>

            <div className="atelier-card">
              <p className="micro-label mb-6">Pipeline Health Telemetry</p>
              <div className="flex flex-col lg:flex-row gap-12">
                 <div className="flex-1">
                    <p className="text-[10px] uppercase font-bold mb-4">Ingestion Velocity</p>
                    <div className="h-24 flex items-end gap-1">
                      {[40, 70, 45, 90, 65, 80, 50, 60, 40, 70, 85, 95].map((h, i) => (
                        <div key={i} className="flex-1 bg-black/10 hover:bg-black transition-colors" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                    <p className="text-[9px] text-black/40 mt-2 uppercase">Last 12 Hours: 1.2 GB/s Optimized</p>
                 </div>
                 <div className="flex-1 border-l border-black/5 pl-12 font-mono text-[10px] space-y-2">
                    <p className="text-black/60">SCAN: PII_LEAK_DETECTION: 0 MATCHES</p>
                    <p className="text-black/60">QUEUE: ASYNC_PARSER_JOBS: 12 PENDING</p>
                    <p className="text-black/60">SYNC: KNOWLEDGE_GRAPH_V2: SYNCED</p>
                 </div>
              </div>
            </div>
          </div>
        );
      case 'artifacts':
        return (
          <div>
            <h2 className="text-3xl font-medium tracking-tighter mb-8">Artifact Explorer</h2>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="atelier-card col-span-1 h-fit">
                <p className="micro-label mb-6">Source Registry</p>
                <div className="space-y-4">
                  {['GL_ACCOUNTING.COB', 'CUSTOMER_LEDGER.NAT', 'JOBCARD_EOD_01.JCL', 'VSAM_MASTER_SCHEMA', 'CICS_MAP_04.BMS'].map(f => (
                    <div key={f} className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-black/60 hover:text-black cursor-pointer border-b border-black/5 pb-2">
                       <Terminal size={12} /> {f}
                    </div>
                  ))}
                </div>
              </div>
              <div className="atelier-card col-span-3 min-h-[600px] flex flex-col">
                 <div className="flex items-center justify-between mb-4 border-b border-black pb-4">
                    <div className="flex flex-col">
                      <p className="text-[10px] font-bold">GL_ACCOUNTING.COB</p>
                      <p className="micro-label text-[8px]">MD5: e99a18ad267cb9e948..12</p>
                    </div>
                    <div className="flex gap-4">
                      <button className="micro-label hover:text-black">Raw View</button>
                      <button className="micro-label hover:text-black">Analysis</button>
                      <button className="micro-label hover:text-black">Modernize</button>
                    </div>
                 </div>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 h-full overflow-hidden">
                    <div className="bg-black/5 p-6 font-mono text-[11px] space-y-1 overflow-y-auto max-h-[500px]">
                        <p className="text-black/40">000100 IDENTIFICATION DIVISION.</p>
                        <p className="text-black/40">000200 PROGRAM-ID. GL_ACCOUNTING.</p>
                        <p className="text-black/40">000300 AUTHOR. MAINFRAME ARCHITECT.</p>
                        <p className="text-black/20">...</p>
                        <p className="text-black/80 font-bold bg-black/10 px-1 border-l-2 border-black">000450 PROCEDURE DIVISION.</p>
                        <p className="text-black/80">000460 000-MAIN-PROCESS.</p>
                        <p className="text-black/80">000470     OPEN INPUT LEDGER-FILE.</p>
                        <p className="text-black/80">000480     READ LEDGER-FILE AT END GO TO 900-EXIT.</p>
                    </div>
                    <div className="bg-white border-l border-black/10 p-6 flex flex-col">
                       <p className="micro-label mb-4">Parser Service Output (JSON/Object)</p>
                       <div className="bg-black text-white/80 p-4 rounded-[2px] font-mono text-[9px] overflow-y-auto flex-1 leading-relaxed">
<pre>{`{
  "artifact_id": "ART-001",
  "artifact_type": "COBOL_PROGRAM",
  "language": "COBOL",
  "programs": ["GL_ACCOUNTING"],
  "copybooks": ["GLDAT01", "GLCFG01"],
  "jobs": ["GL_EOD_BATCH"],
  "transactions": ["GLT1"],
  "datasets": ["GL.MASTER.V01"],
  "tables": ["GL_LEDGER"],
  "calls": ["LEDGER_VAL", "CURR_CONV"],
  "business_rules": [
    "EOY_BALANCING_LOGIC",
    "TAX_CALC_V3"
  ]
}`}</pre>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        );
      case 'graph':
        return (
          <div className="h-[calc(100vh-160px)] flex flex-col">
            <header className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-medium tracking-tighter mb-2">Knowledge Graph</h2>
                <p className="micro-label">Database: Neo4j Enterprise (Colossus Instance)</p>
              </div>
              <div className="flex gap-4">
                 <div className="flex items-center gap-2 px-3 py-1 border border-black/10 text-[9px] uppercase font-bold">
                    <div className="w-2 h-2 bg-black rounded-full" /> 42,102 Nodes
                 </div>
                 <div className="flex items-center gap-2 px-3 py-1 border border-black/10 text-[9px] uppercase font-bold">
                    <div className="w-2 h-2 border border-black rounded-full" /> 184,892 Edges
                 </div>
              </div>
            </header>
            
            <div className="flex-1 atelier-border relative bg-white overflow-hidden group">
               {/* Grid Background */}
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                    style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
               
               {/* Placeholder for Graph Visual */}
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center opacity-20">
                    <Network size={64} className="mx-auto mb-4" />
                    <p className="text-[12px] uppercase tracking-[0.2em] font-bold">Interactive Dependency Canvas</p>
                    <p className="micro-label">Pan to explore system lineage</p>
                  </div>
               </div>

               {/* Graph Legend Overlay */}
               <div className="absolute top-6 left-6 atelier-card p-4 bg-white/90 backdrop-blur-sm space-y-4 max-w-[200px]">
                  <p className="micro-label border-b border-black pb-2 mb-4">Lineage Legend</p>
                  {[
                    { label: 'Application', color: 'bg-black' },
                    { label: 'Program', color: 'bg-black/60' },
                    { label: 'Job', color: 'bg-black/40' },
                    { label: 'Dataset', color: 'bg-black/20' },
                    { label: 'API Contract', color: 'bg-black/80' }
                  ].map(leg => (
                    <div key={leg.label} className="flex items-center gap-2">
                       <div className={`w-2 h-2 ${leg.color} rounded-sm`} />
                       <span className="text-[9px] uppercase font-bold">{leg.label}</span>
                    </div>
                  ))}
               </div>

               {/* Relationship Overlay */}
               <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                  {['CALLS', 'READS', 'WRITES', 'EXPOSED_AS_API'].map(edge => (
                    <div key={edge} className="px-3 py-1 bg-black text-white text-[8px] font-bold tracking-widest cursor-pointer hover:bg-white hover:text-black hover:border transition-all">
                       {edge}
                    </div>
                  ))}
               </div>
            </div>
          </div>
        );
      case 'review':
        return (
          <div className="space-y-12">
            <header className="mb-12">
              <h2 className="text-3xl font-medium tracking-tighter mb-2">Human Review Queue</h2>
              <p className="micro-label">System Governance: Human-in-the-Loop Required</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
               <div className="atelier-card col-span-1">
                  <p className="micro-label mb-6">Review Filter</p>
                  <div className="space-y-2">
                    {['Business Rules', 'Migration Plans', 'Risk Scores', 'API Contracts', 'Generated Tests'].map(f => (
                      <div key={f} className="flex items-center justify-between text-[11px] uppercase py-2 cursor-pointer border-b border-black/5 hover:text-black">
                        {f} <ChevronRight size={12} className="opacity-20" />
                      </div>
                    ))}
                  </div>
               </div>
               
               <div className="col-span-3 space-y-6">
                  {[
                    { id: 'REV-401', type: 'Migration Plan', artifact: 'GL_EOD_01.CBL', reviewer: 'Mainframe Architect' },
                    { id: 'REV-402', type: 'Business Rule', artifact: 'LEDGER_VAL.NAT', reviewer: 'Senior Engineer' },
                    { id: 'REV-403', type: 'Risk Score', artifact: 'PAY001_LPAR_03', reviewer: 'Risk Lead' }
                  ].map(item => (
                    <div key={item.id} className="atelier-card hover:bg-black group transition-luxury cursor-default">
                       <div className="flex justify-between mb-4 border-b border-black group-hover:border-white/20 pb-2">
                          <div className="flex items-center gap-3">
                            <span className="micro-label group-hover:text-white/60">{item.id}</span>
                            <h4 className="text-[12px] font-bold uppercase tracking-widest group-hover:text-white">{item.type}</h4>
                          </div>
                          <span className="text-[9px] uppercase font-bold text-black/40 group-hover:text-white/40">AWAITING REVIEW</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <div className="flex flex-col">
                            <p className="text-[10px] uppercase font-bold group-hover:text-white/80">Artifact: {item.artifact}</p>
                            <p className="micro-label group-hover:text-white/40">Assignee: {item.reviewer}</p>
                          </div>
                          <button className="atelier-btn-secondary group-hover:bg-white group-hover:text-black group-hover:border-white">OPEN ITEM</button>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        );
      case 'audit':
        return (
          <div className="space-y-12">
            <header className="mb-12">
              <h2 className="text-3xl font-medium tracking-tighter mb-2">Audit & Traceability</h2>
              <p className="micro-label">Immutable Event Stream: 256-bit Encrypted</p>
            </header>

            <div className="atelier-card overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="border-b border-black">
                    <tr>
                      <th className="micro-label py-4">Event ID</th>
                      <th className="micro-label py-4">User ID</th>
                      <th className="micro-label py-4">Action</th>
                      <th className="micro-label py-4">Tenant ID</th>
                      <th className="micro-label py-4">Artifacts</th>
                      <th className="micro-label py-4">Prompt Version</th>
                      <th className="micro-label py-4">Model</th>
                      <th className="micro-label py-4 text-right">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: 'EVT-001', user: 'USR-001', action: 'RUN_RISK_AGENT', tenant: 'TEN-001', artifacts: 'PAY001.cbl', prompt: 'risk_agent_v1.2', model: 'grok-1.5', ts: '2026-05-18 20:42' },
                      { id: 'EVT-002', user: 'USR-002', action: 'APPROVE_RULE', tenant: 'TEN-001', artifacts: 'GL002.cob', prompt: 'n/a', model: 'manual', ts: '2026-05-18 20:38' },
                      { id: 'EVT-003', user: 'USR-001', action: 'PARSED_PROGRAM', tenant: 'TEN-001', artifacts: 'CICS_M1.bms', prompt: 'parser_v2.0', model: 'cobol-parser', ts: '2026-05-18 20:35' },
                      { id: 'EVT-004', user: 'system', action: 'GENERATE_TESTS', tenant: 'TEN-001', artifacts: 'PAY001.cbl', prompt: 'test_forge_v1', model: 'llama-3-70b', ts: '2026-05-18 20:30' },
                      { id: 'EVT-005', user: 'USR-001', action: 'QUERY_GRAPH', tenant: 'TEN-001', artifacts: 'n/a', prompt: 'n/a', model: 'neo4j-adapter', ts: '2026-05-18 20:25' },
                    ].map(log => (
                      <tr key={log.id} className="border-b border-black/5 hover:bg-black/5 transition-colors cursor-pointer group">
                        <td className="py-4 font-mono text-[10px]">{log.id}</td>
                        <td className="py-4 text-[11px] font-bold uppercase">{log.user}</td>
                        <td className="py-4 text-[11px] uppercase tracking-wider">{log.action}</td>
                        <td className="py-4 text-[10px] font-mono opacity-40">{log.tenant}</td>
                        <td className="py-4 text-[10px] font-mono opacity-40">{log.artifacts}</td>
                        <td className="py-4 text-[10px] font-mono opacity-40">{log.prompt}</td>
                        <td className="py-4 text-[10px] font-mono opacity-40">{log.model}</td>
                        <td className="py-4 text-[10px] text-right font-mono text-black/40">{log.ts}</td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>
          </div>
        );
      case 'catalog':
        return (
          <div className="space-y-12">
            <header className="mb-12">
              <h2 className="text-3xl font-medium tracking-tighter mb-2">Service Catalog</h2>
              <p className="micro-label">Active Modernized API Interfaces</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'PAYROLL_API_v1', source: 'PAY001.CBL', protocol: 'REST/OpenAPI', endpoints: 12 },
                { name: 'LEDGER_BRIDGE', source: 'GLDAT01.NAT', protocol: 'gRPC', endpoints: 8 },
                { name: 'CUSTOMER_CORE', source: 'DB2_CUST_TAB', protocol: 'GraphQL', endpoints: 24 }
              ].map((api, i) => (
                <div key={i} className="atelier-card group hover:bg-black transition-luxury">
                   <div className="flex justify-between items-start mb-6 border-b border-black group-hover:border-white/20 pb-2">
                      <h4 className="text-[12px] font-bold uppercase tracking-widest group-hover:text-white">{api.name}</h4>
                      <span className="text-[8px] bg-black text-white px-1 group-hover:bg-white group-hover:text-black">v{i+1}.0</span>
                   </div>
                   <div className="space-y-2 mb-8">
                      <div className="flex justify-between text-[10px] uppercase font-bold group-hover:text-white/60">
                        <span>Source</span>
                        <span className="font-mono">{api.source}</span>
                      </div>
                      <div className="flex justify-between text-[10px] uppercase font-bold group-hover:text-white/60">
                        <span>Protocol</span>
                        <span>{api.protocol}</span>
                      </div>
                   </div>
                   <button className="atelier-btn-secondary w-full group-hover:bg-white group-hover:text-black group-hover:border-white uppercase">VIEW CONTRACT</button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'knowledge':
        return (
          <div className="space-y-12">
            <header className="mb-12">
              <h2 className="text-3xl font-medium tracking-tighter mb-2">Veteran Knowledge Capture</h2>
              <p className="micro-label">Cognitive Processing: Interviews to Logic</p>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
               <div className="col-span-1 space-y-4">
                  <p className="micro-label">Captured Sessions</p>
                  {['Interview_John_S_Payroll.mp4', 'Legacy_Ops_Review_Wave2.zoom', 'Architect_Whiteboard_Session'].map(s => (
                    <div key={s} className="p-3 border border-black/5 hover:bg-black group transition-luxury cursor-pointer">
                      <p className="text-[10px] font-bold uppercase group-hover:text-white truncate">{s}</p>
                    </div>
                  ))}
                  <button className="atelier-btn-primary w-full mt-4">IMPORT SESSION</button>
               </div>
               <div className="col-span-3">
                  <div className="atelier-card">
                    <p className="micro-label mb-6">Live Processing: Interview_John_S_Payroll.mp4</p>
                    <div className="grid grid-cols-2 gap-8 h-80">
                       <div className="border border-black/5 p-4 overflow-y-auto font-serif text-[13px] leading-relaxed italic text-black/60 italic">
                          "...and then in '79 we realized the fiscal year rollover logic was hardcoded in PAY001. You won't find it in the specs because we patched it during the EOD of December 31..."
                       </div>
                       <div className="space-y-4">
                          <p className="text-[10px] font-bold uppercase border-b border-black pb-1">Extracted Knowledge Cards</p>
                          <div className="space-y-2">
                             <div className="bg-black text-white p-3 text-[10px] uppercase font-bold tracking-widest">
                                RULE: FISCAL_ROLLOVER_HIDDEN_LOGIC
                                <p className="text-[8px] mt-1 font-normal opacity-60">Source: John Smith (SME)</p>
                             </div>
                             <div className="p-3 border border-black bg-black/5 text-[10px] uppercase font-bold tracking-widest">
                                ARTIFACT_CONTEXT: PAY001_v1979_PATCH
                             </div>
                          </div>
                          <button className="atelier-btn-secondary w-full">MAP TO GRAPH</button>
                       </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        );
      case 'data':
        return (
          <div className="space-y-12">
            <header className="mb-12">
              <h2 className="text-3xl font-medium tracking-tighter mb-2">Data Architecture</h2>
              <p className="micro-label">Enterprise-Grade Persistence Layer</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: 'PostgreSQL', use: 'Users, tenants, projects, metadata', status: 'ACTIVE', icon: <Database size={16} /> },
                { name: 'Object Storage', use: 'Original source files (MinIO/S3)', status: 'SYNCED', icon: <Database size={16} /> },
                { name: 'OpenSearch', use: 'Keyword search indexing', status: 'OPTIMIZED', icon: <Search size={16} /> },
                { name: 'Vector DB', use: 'Semantic search & RAG embeddings', status: 'ACTIVE', icon: <Activity size={16} /> },
                { name: 'Neo4j', use: 'Knowledge dependency graph', status: 'ACTIVE', icon: <Network size={16} /> },
                { name: 'Redis', use: 'Distributed cache & job state', status: 'STABLE', icon: <Zap size={16} /> },
                { name: 'Audit Log Store', use: 'Immutable event history', status: 'ENCRYPTED', icon: <Shield size={16} /> },
              ].map((db, i) => (
                <div key={i} className="atelier-card group hover:bg-black transition-luxury cursor-default">
                  <div className="flex items-center justify-between mb-4 border-b border-black group-hover:border-white/20 pb-2">
                    <div className="flex items-center gap-2 group-hover:text-white">
                      {db.icon}
                      <h4 className="text-[12px] font-bold uppercase tracking-widest">{db.name}</h4>
                    </div>
                    <span className="text-[9px] font-mono group-hover:text-white/60">{db.status}</span>
                  </div>
                  <p className="text-[10px] uppercase font-medium text-black/40 group-hover:text-white/40 leading-relaxed">
                    {db.use}
                  </p>
                </div>
              ))}
            </div>

            <div className="atelier-card">
               <p className="micro-label mb-6">Replication & Backup Policy</p>
               <div className="flex flex-col lg:flex-row gap-12 text-[11px] uppercase tracking-wider">
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between border-b border-black/5 pb-2">
                       <span className="font-bold">Multi-AZ Persistence</span>
                       <span className="text-green-600">ENFORCED</span>
                    </div>
                    <div className="flex justify-between border-b border-black/5 pb-2">
                       <span className="font-bold">Point-in-Time Recovery</span>
                       <span className="text-green-600">ACTIVE (24H)</span>
                    </div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div className="flex justify-between border-b border-black/5 pb-2">
                       <span className="font-bold">Cold Storage Archive</span>
                       <span className="opacity-40">GLACIER v2</span>
                    </div>
                    <div className="flex justify-between border-b border-black/5 pb-2">
                       <span className="font-bold">Encryption Protocol</span>
                       <span className="text-black">AES-256-GCM</span>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        );
      case 'risk':
        return (
          <div className="space-y-12">
            <header className="mb-12">
              <h2 className="text-3xl font-medium tracking-tighter mb-2">Risk & Compliance</h2>
              <p className="micro-label">FIPS-140-2 Enforcement: Active</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="atelier-card h-[400px]">
                <p className="micro-label mb-8">Blast Radius Heatmap</p>
                <div className="w-full h-full border border-black/5 bg-black/[0.02] flex items-center justify-center italic text-black/20 text-[10px] uppercase">
                  Telemetry Visualization Engine Loading...
                </div>
              </div>
              <div className="atelier-card h-[400px]">
                <p className="micro-label mb-8">Dependency Complexity Score</p>
                <div className="space-y-6">
                  {[
                    { label: "Cyclomatic Complexity", value: "84.2", color: "bg-black" },
                    { label: "Tight Coupling Ratio", value: "42.1%", color: "bg-black/40" },
                    { label: "Legacy Debt Index", value: "HIGH", color: "bg-black" },
                    { label: "Migration Velocity", value: "0.8x", color: "bg-black/20" }
                  ].map((stat, i) => (
                    <div key={i}>
                      <div className="flex justify-between mb-2">
                        <span className="text-[10px] font-bold uppercase">{stat.label}</span>
                        <span className="text-[10px] font-mono">{stat.value}</span>
                      </div>
                      <div className="h-1 w-full bg-black/5">
                        <div className={`h-full ${stat.color}`} style={{ width: '60%' }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'admin':
        return (
          <div className="space-y-12">
            <header className="mb-12">
              <h2 className="text-3xl font-medium tracking-tighter mb-2">Admin Console</h2>
              <p className="micro-label">System-wide Governance & Infrastructure</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <section className="space-y-8">
                <div className="atelier-card">
                  <p className="micro-label mb-6">Tenant & Project Model</p>
                  <div className="space-y-6">
                    <div>
                      <p className="text-[10px] font-bold uppercase mb-4 text-black/40">Active Tenants ({context?.tenants.length || 0})</p>
                      <div className="space-y-2">
                        {context?.tenants.map(t => (
                          <div key={t.id} className="flex items-center justify-between p-3 border border-black/5 hover:bg-black/5">
                            <span className="text-[12px] font-bold uppercase">{t.name}</span>
                            <span className="text-[9px] font-mono opacity-40">{t.id}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase mb-4 text-black/40">Registered Projects ({context?.projects.length || 0})</p>
                      <div className="space-y-2">
                        {context?.projects.map(p => (
                          <div key={p.id} className="flex items-center justify-between p-3 border border-black/5 hover:bg-black/5">
                            <span className="text-[12px] font-bold uppercase">{p.name}</span>
                            <span className="text-[9px] font-mono opacity-40">{p.id}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="atelier-card">
                  <div className="flex items-center gap-2 mb-6">
                    <Shield size={16} />
                    <p className="micro-label">Security Protocol Enforcement</p>
                  </div>
                  <div className="space-y-4">
                    {[
                      { label: "OIDC / SAML SSO", status: "ENABLED", active: true },
                      { label: "FIPS-140-2 Encryption", status: "ENFORCED", active: true },
                      { label: "Tenant Isolation (Physical)", status: "ACTIVE", active: true },
                      { label: "Cross-Tenant Leakage Scan", status: "STABLE", active: true },
                      { label: "Air-Gapped Operation", status: "DISABLED", active: false }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-black/5">
                        <span className="text-[12px] font-bold uppercase tracking-wider">{item.label}</span>
                        <span className={`text-[9px] font-mono ${item.active ? 'text-black' : 'text-black/30'}`}>{item.status}</span>
                      </div>
                    ))}
                  </div>
                  <button className="atelier-btn-secondary w-full mt-8">UPDATE SECURITY POLICY</button>
                </div>

                <div className="atelier-card">
                  <div className="flex items-center gap-2 mb-6">
                    <Database size={16} />
                    <p className="micro-label">Access Control (RBAC / ABAC)</p>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-black/5 border border-black/5">
                        <p className="micro-label mb-1">Global Admins</p>
                        <p className="text-xl font-bold">4</p>
                      </div>
                      <div className="p-4 bg-black/5 border border-black/5">
                        <p className="micro-label mb-1">Migration Architects</p>
                        <p className="text-xl font-bold">12</p>
                      </div>
                    </div>
                    <button className="atelier-btn-secondary w-full mt-4">MANAGE PERMISSIONS</button>
                  </div>
                </div>
              </section>

              <section className="space-y-8">
                <div className="atelier-card">
                  <div className="flex items-center gap-2 mb-6">
                    <Settings size={16} />
                    <p className="micro-label">Deployment Strategy</p>
                  </div>
                  <div className="space-y-6">
                    {[
                      { 
                        title: "SaaS Private Tenant", 
                        desc: "Hosted on LegacyOS Cloud with Physical isolation.",
                        active: true 
                      },
                      { 
                        title: "Customer VPC", 
                        desc: "Deploy into AWS/Azure/GCP private boundary.",
                        active: false 
                      },
                      { 
                        title: "Air-Gapped / Local", 
                        desc: "On-premise hardware with no outbound telemetry.",
                        active: false 
                      }
                    ].map((opt, i) => (
                      <div key={i} className={`p-4 atelier-border cursor-pointer transition-luxury ${opt.active ? 'bg-black text-white' : 'hover:bg-black/5'}`}>
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="text-[11px] font-bold uppercase tracking-widest">{opt.title}</h4>
                          {opt.active && <span className="text-[8px] border border-white/40 px-1">ACTIVE</span>}
                        </div>
                        <p className={`text-[10px] leading-relaxed ${opt.active ? 'text-white/60' : 'text-black/40'}`}>{opt.desc}</p>
                      </div>
                    ))}
                    <button className="atelier-btn-primary w-full">INITIATE MIGRATION TO VPC</button>
                  </div>
                </div>

                <div className="atelier-card">
                   <div className="flex items-center gap-2 mb-6">
                      <Zap size={16} />
                      <p className="micro-label">Model Routing Policy</p>
                   </div>
                   <div className="space-y-4">
                      <div className="flex justify-between items-center text-[11px] font-bold uppercase">
                        <span>Default Reasoner</span>
                        <span className="font-mono opacity-60">Grok-1.5 / Colossus</span>
                      </div>
                      <div className="flex justify-between items-center text-[11px] font-bold uppercase">
                        <span>Parsing Edge</span>
                        <span className="font-mono opacity-60">Local Llama-3-70B</span>
                      </div>
                      <div className="flex justify-between items-center text-[11px] font-bold uppercase">
                        <span>Compliance Auditor</span>
                        <span className="font-mono opacity-60">Policy-Tuned-GPT4</span>
                      </div>
                   </div>
                </div>
              </section>
            </div>
          </div>
        );
      case 'tests':
        return (
          <div className="space-y-12">
            <header className="mb-12">
              <h2 className="text-3xl font-medium tracking-tighter mb-2">Test Forge</h2>
              <p className="micro-label">Automated Regression Suite Generation</p>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="atelier-card col-span-1 lg:col-span-2">
                <p className="micro-label mb-6">Generated Test Scenarios</p>
                <div className="space-y-4">
                  {[
                    { name: 'PAYROLL_CALC_REGRESSION', type: 'COBOL_UNIT', coverage: '94%', status: 'PASSED' },
                    { name: 'ADABAS_BUFFER_STRESS', type: 'INTEGRATION', coverage: '88%', status: 'RUNNING' },
                    { name: 'CICS_MAP_FIELD_VAL', type: 'UI_SCREEN', coverage: '100%', status: 'QUEUED' }
                  ].map((test, i) => (
                    <div key={i} className="flex items-center justify-between p-4 border border-black/5 hover:bg-black group transition-luxury">
                       <div className="flex flex-col group-hover:text-white">
                          <span className="text-[11px] font-bold uppercase">{test.name}</span>
                          <span className="text-[8px] opacity-40 uppercase">{test.type}</span>
                       </div>
                       <div className="flex items-center gap-8 group-hover:text-white">
                          <span className="text-[9px] font-mono">{test.coverage}</span>
                          <span className="text-[9px] font-bold">{test.status}</span>
                       </div>
                    </div>
                  ))}
                </div>
                <button className="atelier-btn-primary w-full mt-8">INITIATE FORGE SESSION</button>
              </div>
              <div className="atelier-card">
                 <p className="micro-label mb-6">Forge Parameters</p>
                 <div className="space-y-4">
                    <div>
                      <p className="text-[9px] uppercase font-bold mb-2">Logic Extraction Depth</p>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(v => (
                          <div key={v} className={`flex-1 h-1 ${v <= 4 ? 'bg-black' : 'bg-black/10'}`} />
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-black/5">
                       <span className="text-[10px] uppercase font-bold">RAG-Powered Oracle</span>
                       <div className="w-6 h-3 bg-black rounded-full" />
                    </div>
                 </div>
              </div>
            </div>
          </div>
        );
      case 'migration':
        return (
          <div className="space-y-12">
            <header className="mb-12">
              <h2 className="text-3xl font-medium tracking-tighter mb-2">Migration Roadmap</h2>
              <p className="micro-label">Wave Sequencing & Dependency Resolution</p>
            </header>
            <div className="atelier-card overflow-x-auto">
               <div className="flex gap-8 min-w-[1000px] py-12">
                  {[
                    { wave: 'WAVE 1', title: 'CORE LEDGER', status: 'COMPLETE', items: ['GL_BASE', 'ACCOUNT_MASTER', 'AUDIT_TRAIL'] },
                    { wave: 'WAVE 2', title: 'PAYMENTS', status: 'IN_PROGRESS', items: ['ACH_BRIDGE', 'WIRE_TRANS', 'SWIFT_INT'] },
                    { wave: 'WAVE 3', title: 'REPORTING', status: 'PLANNED', items: ['EOY_CONSOL', 'REG_FILING', 'BI_EXPORT'] },
                    { wave: 'WAVE 4', title: 'AI LAYER', status: 'QUEUED', items: ['GEN_AI_BRIDGE', 'PRED_ANALYTICS'] }
                  ].map((wave, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center">
                       <div className="w-12 h-12 flex items-center justify-center border border-black rounded-full mb-6 font-bold text-[10px] uppercase">
                          {wave.wave}
                       </div>
                       <div className="text-center mb-8">
                          <h4 className="text-[12px] font-bold uppercase mb-1">{wave.title}</h4>
                          <span className="micro-label text-[8px]">{wave.status}</span>
                       </div>
                       <div className="w-full space-y-2">
                          {wave.items.map(item => (
                            <div key={item} className="p-2 border border-black/5 text-[9px] uppercase font-bold text-center">
                               {item}
                            </div>
                          ))}
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        );
      case 'reports':
        return (
          <div className="space-y-12">
            <header className="mb-12">
              <h2 className="text-3xl font-medium tracking-tighter mb-2">Reports & Dossiers</h2>
              <p className="micro-label">Executive-Ready Intelligence Exports</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Modernization Readiness', date: '2026-05-18' },
                { title: 'Blast Radius Analysis', date: '2026-05-17' },
                { title: 'Evidence Dossier v4', date: '2026-05-16' },
                { title: 'Compliance Audit', date: '2026-05-15' },
                { title: 'Mainframe Debt Index', date: '2026-05-14' }
              ].map((rep, i) => (
                <div key={i} className="atelier-card group hover:bg-black transition-luxury cursor-pointer">
                   <div className="flex items-center gap-2 mb-4 group-hover:text-white">
                      <ArrowUpRight size={14} className="opacity-40 group-hover:opacity-100" />
                      <h4 className="text-[12px] font-bold uppercase tracking-widest">{rep.title}</h4>
                   </div>
                   <p className="micro-label group-hover:text-white/40">Generated: {rep.date}</p>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center py-40 border border-black/5 rounded-[2px] opacity-20">
            <h2 className="text-3xl font-bold tracking-tighter uppercase mb-2">{activeView} module</h2>
            <p className="micro-label">Status: Provisioning Under Colossus Protocol</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar activeView={activeView} onViewChange={setActiveView} context={context} />
      
      <main className="flex-1 flex flex-col p-4 md:p-8 lg:p-12 max-w-7xl mx-auto w-full overflow-y-auto h-screen">
        {renderContent()}

        <footer className="mt-20 pt-8 border-t border-black/10 flex flex-col md:flex-row items-center justify-between gap-8 grayscale opacity-40 hover:opacity-100 transition-luxury">
          <div className="flex items-center gap-12 overflow-x-auto w-full md:w-auto pb-4 md:pb-0">
            <p className="text-[10px] tracking-widest uppercase whitespace-nowrap">Z/OS COMPLIANT</p>
            <p className="text-[10px] tracking-widest uppercase whitespace-nowrap">COBOL v6.3</p>
            <p className="text-[10px] tracking-widest uppercase whitespace-nowrap">FIPS-140-2</p>
            <button onClick={() => setEvidenceOpen(true)} className="text-[10px] tracking-widest uppercase whitespace-nowrap underline underline-offset-4">EVIDENCE PROTOCOL</button>
          </div>
          <p className="text-[9px] uppercase tracking-tighter whitespace-nowrap transition-luxury hover:tracking-[0.1em]">© 2026 LegacyOS Intelligence Systems. All rights reserved.</p>
        </footer>
      </main>

      <EvidencePanel open={evidenceOpen} onClose={() => setEvidenceOpen(false)} />
    </div>
  );
}
