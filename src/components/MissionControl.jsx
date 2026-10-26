'use client';

import React, { useState } from 'react';
import { Activity, Cpu, Terminal as TerminalIcon, FileCode, AlertTriangle, Copy } from 'lucide-react';
import { sound } from '@/lib/sound';
import { useToast } from '@/context/ToastContext';

export function MissionControl() {
  const [activeTab, setActiveTab] = useState('telemetry');
  const [simTraffic, setSimTraffic] = useState(1450);
  const [isSpike, setIsSpike] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState([
    'hadi@distributed-core:~$ whoami',
    '-> Abdul Hadi Awais | Principal Full-Stack Engineer & AI Systems Architect',
    '-> 6+ years shipping distributed microservices, LLM agent runtimes, and low-latency financial gateways.',
    'hadi@distributed-core:~$ cluster --health',
    '-> [OK] 42/42 Services Healthy. P99 Latency: 28ms. Zero Packet Loss.',
  ]);
  const [cliInput, setCliInput] = useState('');
  const { showToast } = useToast();

  const handleTabChange = (tab) => {
    sound.playTabSwitch();
    setActiveTab(tab);
  };

  const triggerSpike = () => {
    sound.playBeep();
    setIsSpike(true);
    showToast('Simulating network congestion spike! Automated circuit breakers engaged.', 'info');
    setTimeout(() => {
      setIsSpike(false);
      sound.playChime();
      showToast('Cluster auto-healed. Normal latency restored (28ms).', 'success');
    }, 2000);
  };

  const handleCliSubmit = (e) => {
    e.preventDefault();
    if (!cliInput.trim()) return;
    sound.playClick();
    const cmd = cliInput.trim().toLowerCase();
    const newLogs = [...terminalOutput, `hadi@distributed-core:~$ ${cliInput}`];

    if (cmd === 'help') {
      newLogs.push('-> Available: skills, projects, contact, stats, hire, clear');
    } else if (cmd === 'skills') {
      newLogs.push('-> Core: Node.js, Go, Python FastAPI, Next.js, LangChain, Kubernetes, Redis, PostgreSQL');
    } else if (cmd === 'projects') {
      newLogs.push('-> Orion AI (1,450 req/s), Synaptic Trade ($2.5M vol), Synergy Cloud (412 pods), ArxDesign 3D');
    } else if (cmd === 'contact') {
      newLogs.push('-> Email: mianhhadi11@gamil.com | Phone: 12345678910');
    } else if (cmd === 'stats') {
      newLogs.push('-> Production: 140k+ peak sessions, 28ms p99 latency, 99.99% SLA uptime');
    } else if (cmd === 'clear') {
      setTerminalOutput([]);
      setCliInput('');
      return;
    } else {
      newLogs.push(`-> Command not recognized: "${cmd}". Type "help" for options.`);
    }

    setTerminalOutput(newLogs);
    setCliInput('');
  };

  const currentLatency = isSpike ? 142 : Math.round(24 + (simTraffic / 1000) * 3);

  return (
    <div className="w-full rounded-2xl bg-gradient-to-b from-wine/90 to-burgundy-deep/95 border border-wine-border shadow-2xl shadow-burgundy-deep overflow-hidden">
      {/* Console Top Bar */}
      <div className="flex flex-wrap items-center justify-between px-5 py-3.5 bg-burgundy-deep/90 border-b border-wine-border gap-3">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-500/80"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-warmwhite-muted">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>SYSTEM CONSOLE: 42 MICROSERVICES HEALTHY</span>
          </div>
        </div>

        {/* Console Tab Selectors */}
        <div className="flex items-center gap-1 bg-burgundy/80 p-1 rounded-xl border border-wine-border/60">
          <button
            onClick={() => handleTabChange('telemetry')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'telemetry'
                ? 'bg-rosegold text-burgundy shadow-sm'
                : 'text-warmwhite-muted hover:text-warmwhite'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Telemetry</span>
          </button>
          <button
            onClick={() => handleTabChange('agent')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'agent'
                ? 'bg-rosegold text-burgundy shadow-sm'
                : 'text-warmwhite-muted hover:text-warmwhite'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">AI Agent Graph</span>
          </button>
          <button
            onClick={() => handleTabChange('cli')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'cli'
                ? 'bg-rosegold text-burgundy shadow-sm'
                : 'text-warmwhite-muted hover:text-warmwhite'
            }`}
          >
            <TerminalIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">CLI Shell</span>
          </button>
          <button
            onClick={() => handleTabChange('contract')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'contract'
                ? 'bg-rosegold text-burgundy shadow-sm'
                : 'text-warmwhite-muted hover:text-warmwhite'
            }`}
          >
            <FileCode className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Contract</span>
          </button>
        </div>
      </div>

      {/* Main Console Body */}
      <div className="p-6 md:p-8 min-h-[400px]">
        {/* TAB 1: DISTRIBUTED TELEMETRY */}
        {activeTab === 'telemetry' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-burgundy/60 border border-wine-border">
                <span className="text-xs font-mono text-warmwhite-dim block uppercase">P99 Latency</span>
                <div className={`text-2xl font-heading font-bold mt-1 ${isSpike ? 'text-amber-400' : 'text-rosegold'}`}>
                  {currentLatency}ms
                </div>
                <span className="text-xs text-emerald-400 font-mono mt-0.5 block">Sub-35ms Target Met</span>
              </div>
              <div className="p-4 rounded-xl bg-burgundy/60 border border-wine-border">
                <span className="text-xs font-mono text-warmwhite-dim block uppercase">Throughput</span>
                <div className="text-2xl font-heading font-bold text-softpink mt-1">
                  {simTraffic.toLocaleString()} req/s
                </div>
                <span className="text-xs text-warmwhite-dim font-mono mt-0.5 block">Zero Drop Parity</span>
              </div>
              <div className="p-4 rounded-xl bg-burgundy/60 border border-wine-border">
                <span className="text-xs font-mono text-warmwhite-dim block uppercase">Cluster Resilience</span>
                <div className="text-2xl font-heading font-bold text-emerald-400 mt-1">
                  99.99%
                </div>
                <span className="text-xs text-warmwhite-dim font-mono mt-0.5 block">Zero Downtime</span>
              </div>
              <div className="p-4 rounded-xl bg-burgundy/60 border border-wine-border">
                <span className="text-xs font-mono text-warmwhite-dim block uppercase">Active Pods</span>
                <div className="text-2xl font-heading font-bold text-warmwhite mt-1">
                  42 / 42
                </div>
                <span className="text-xs text-emerald-400 font-mono mt-0.5 block">All Nodes Healthy</span>
              </div>
            </div>

            {/* Interactive Traffic Slider */}
            <div className="p-5 rounded-xl bg-burgundy/40 border border-wine-border space-y-3">
              <div className="flex justify-between items-center text-xs font-mono">
                <span className="text-warmwhite-muted">Simulate Synthetic Load:</span>
                <span className="text-rosegold font-bold">{simTraffic} Requests / Second</span>
              </div>
              <input
                type="range"
                min="200"
                max="5000"
                step="100"
                value={simTraffic}
                onChange={(e) => setSimTraffic(Number(e.target.value))}
                className="w-full accent-rosegold cursor-pointer"
              />
            </div>

            {/* Simulated Node Grid & Chaos Trigger */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-warmwhite-dim">K8s Mesh Nodes:</span>
                <div className="flex gap-1.5 flex-wrap">
                  {[...Array(16)].map((_, i) => (
                    <span
                      key={i}
                      className={`w-3.5 h-3.5 rounded-md border ${
                        isSpike && i % 3 === 0
                          ? 'bg-amber-400 border-amber-300 animate-ping'
                          : 'bg-wine/90 border-rosegold/40'
                      }`}
                      title={`Node Cluster 0x0${i}`}
                    ></span>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={triggerSpike}
                  className="px-4 py-2 rounded-xl bg-wine border border-rosegold/40 text-xs font-semibold text-warmwhite hover:bg-wine-hover hover:border-rosegold transition-all flex items-center gap-2"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Simulate Chaos Injection</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: AI AGENT GRAPH */}
        {activeTab === 'agent' && (
          <div className="space-y-6 animate-fade-in font-mono text-xs">
            <div className="p-4 rounded-xl bg-burgundy/60 border border-wine-border text-warmwhite-muted">
              Visual architectural topology of the <strong>Orion Multi-Agent Runtime</strong>. Each agent operates asynchronously through decoupled Redis vector event queues.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div className="p-5 rounded-xl bg-wine/80 border border-rosegold/40">
                <div className="text-rosegold font-bold mb-1">01. Ingress Intent</div>
                <div className="text-warmwhite text-xs">User Prompt & Context</div>
                <div className="text-warmwhite-dim mt-2 text-[11px]">Token Latency: 4ms</div>
              </div>

              <div className="p-5 rounded-xl bg-wine/80 border border-softpink/40">
                <div className="text-softpink font-bold mb-1">02. Semantic Router</div>
                <div className="text-warmwhite text-xs">Qdrant Vector Cache</div>
                <div className="text-emerald-400 mt-2 text-[11px]">42% Cache Hit Rate</div>
              </div>

              <div className="p-5 rounded-xl bg-wine/80 border border-rosegold/40">
                <div className="text-rosegold font-bold mb-1">03. Autonomous Pool</div>
                <div className="text-warmwhite text-xs">38 Worker Agents</div>
                <div className="text-warmwhite-dim mt-2 text-[11px]">Parallel Execution</div>
              </div>

              <div className="p-5 rounded-xl bg-wine/80 border border-softpink/40">
                <div className="text-softpink font-bold mb-1">04. Circuit Evaluator</div>
                <div className="text-warmwhite text-xs">Zero-Hallucination Guard</div>
                <div className="text-emerald-400 mt-2 text-[11px]">99.98% Confidence</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-burgundy/50 border border-wine-border flex justify-between items-center">
              <span className="text-warmwhite-muted">Dynamic Memory Routing Algorithm:</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText('MemoryVectorRouter.resolve(contextEmbedding)');
                  showToast('Agent router snippet copied!', 'success');
                }}
                className="px-3 py-1.5 rounded-lg bg-wine border border-rosegold/30 text-xs text-rosegold hover:bg-wine-hover"
              >
                Copy Agent Router Spec
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: CLI SHELL */}
        {activeTab === 'cli' && (
          <div className="space-y-4 animate-fade-in font-mono text-xs">
            <div className="flex gap-2 flex-wrap mb-2">
              {['skills', 'projects', 'stats', 'contact', 'clear'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => {
                    setCliInput(cmd);
                    sound.playClick();
                  }}
                  className="px-2.5 py-1 rounded-md bg-wine border border-wine-border text-[11px] text-rosegold hover:border-rosegold transition-all"
                >
                  ${cmd}
                </button>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-burgundy-deep/95 border border-wine-border min-h-[220px] max-h-[280px] overflow-y-auto space-y-1.5 text-warmwhite-muted">
              {terminalOutput.map((line, idx) => (
                <div key={idx} className={line.startsWith('hadi') ? 'text-rosegold font-bold' : ''}>
                  {line}
                </div>
              ))}
            </div>

            <form onSubmit={handleCliSubmit} className="flex gap-2">
              <span className="text-rosegold py-2 font-bold font-mono">hadi@architect:~$</span>
              <input
                type="text"
                value={cliInput}
                onChange={(e) => setCliInput(e.target.value)}
                placeholder="Type command (e.g. skills, stats, contact)..."
                className="flex-1 bg-burgundy/80 border border-wine-border rounded-xl px-4 py-2 text-warmwhite text-xs outline-none focus:border-rosegold"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-rosegold text-burgundy font-bold hover:brightness-105 text-xs"
              >
                Execute
              </button>
            </form>
          </div>
        )}

        {/* TAB 4: PRODUCTION CONTRACT */}
        {activeTab === 'contract' && (
          <div className="space-y-4 animate-fade-in font-mono text-xs">
            <div className="flex justify-between items-center text-xs">
              <span className="text-warmwhite-dim">distributed-orchestrator.js</span>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`export class DistributedOrchestrator {
  constructor(config) {
    this.clusterId = config.clusterId;
    this.maxLatencyP99Ms = 35;
    this.targetConcurrency = 140000;
  }
}`);
                  showToast('Contract code copied to clipboard!', 'success');
                }}
                className="flex items-center gap-1.5 text-rosegold hover:text-softpink transition-colors"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Interface</span>
              </button>
            </div>

            <pre className="p-5 rounded-xl bg-burgundy-deep/95 border border-wine-border text-softpink overflow-x-auto leading-relaxed">
              <code>{`export class DistributedOrchestrator {
  constructor(config) {
    this.clusterId = config.clusterId;
    this.maxLatencyP99Ms = 35;
    this.targetConcurrency = 140_000;
  }

  async executeMissionCriticalLoop(event) {
    const node = await ConsensusRing.acquireOptimalWorker();
    return node.dispatchWithZeroAllocationBuffer(event);
  }
}`}</code>
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
