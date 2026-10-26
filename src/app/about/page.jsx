'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FileText, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { sound } from '@/lib/sound';

export default function AboutPage() {
  const { showToast } = useToast();
  const [activeStackTab, setActiveStackTab] = useState('backend');

  const copyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText('mianhhadi11@gamil.com');
    showToast('Copied email: mianhhadi11@gamil.com', 'success');
  };

  const copyPhone = () => {
    sound.playClick();
    navigator.clipboard.writeText('12345678910');
    showToast('Copied phone: 12345678910', 'success');
  };

  const downloadCv = () => {
    sound.playChime();
    const cvText = `# ABDUL HADI AWAIS
Principal Full-Stack Engineer & Generative AI Systems Architect
Email: mianhhadi11@gamil.com | Phone: 12345678910

## EXECUTIVE SUMMARY
6+ years engineering distributed microservices, multi-agent AI runtimes, low-latency financial gateways, and high-concurrency cloud infrastructures.

## COMPETENCIES
- Distributed Systems & Backend: Node.js, Go, Python FastAPI, WebSockets, gRPC, Redis, Kafka, PostgreSQL
- Generative AI & Agents: LangChain, LlamaIndex, OpenAI/Gemini API, Qdrant/Pinecone Vector DBs
- Cloud & DevOps: Kubernetes, Docker, Multi-Region AWS, Prometheus, Terraform, eBPF
- Frontend: Next.js, React, Three.js WebGL, Tailwind CSS

## PRODUCTION SHIPMENTS
- Orion AI Agent Orchestrator: 1,450 req/s, 28ms P99 latency, 38 autonomous agents.
- Synaptic Trade: High-frequency crypto gateway processing $2.5M daily volume.
- Synergy Cloud: 412 monitored Kubernetes pods with automated anomaly remediation.
`;
    const blob = new Blob([cvText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Abdul_Hadi_Awais_Resume.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Abdul Hadi Awais Resume Downloaded (.md)!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-20">
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-rosegold bg-rosegold/10 px-4 py-1.5 rounded-full border border-rosegold/30">
          Biography & Systems Philosophy
        </span>
        <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-warmwhite leading-tight">
          Architecting Systems That <span className="gradient-rosegold">Survive Reality</span>
        </h1>
        <p className="text-lg text-warmwhite-muted leading-relaxed">
          I am Abdul Hadi Awais — a Principal Full-Stack Engineer and Generative AI Architect with over 6 years of hands-on production experience engineering distributed backends and mission-critical applications.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={downloadCv}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rosegold to-softpink text-burgundy font-bold text-sm shadow-md hover:brightness-105 transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>Download Curriculum Vitae (.md)</span>
          </button>
          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-wine border border-wine-border text-sm font-semibold text-warmwhite hover:border-rosegold transition-all"
          >
            <span>Copy Email: mianhhadi11@gamil.com</span>
          </button>
          <button
            onClick={copyPhone}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-wine border border-wine-border text-sm font-semibold text-warmwhite hover:border-rosegold transition-all"
          >
            <span>Copy Phone: 12345678910</span>
          </button>
        </div>
      </div>

      {/* ARCHITECTURE BLUEPRINT GRAPHIC & CORE PRINCIPLES */}
      <div className="rounded-3xl bg-gradient-to-b from-wine/90 to-burgundy-deep/95 border border-wine-border overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl">
        <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rosegold/10 border border-rosegold/30 text-xs font-mono text-rosegold">
            Core Engineering Invariants
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-warmwhite">
            Pragmatic Engineering Over Technical Fashion
          </h2>
          <p className="text-sm sm:text-base text-warmwhite-muted leading-relaxed">
            In enterprise production, systems face network partitions, slow database queries, and sudden 10x traffic surges. I engineer every application with the baseline belief that <strong>anything that can fail will fail</strong> — meaning circuit-breakers, idempotency, and semantic caching are not afterthoughts, but foundational primitives.
          </p>

          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-rosegold shrink-0 mt-0.5" />
              <div>
                <strong className="text-warmwhite text-sm block">Sub-30ms Latency Budgets:</strong>
                <span className="text-xs text-warmwhite-muted">Eliminating micro-allocations, compressing payloads with binary serialization, and offloading heavy tasks to asynchronous workers.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-rosegold shrink-0 mt-0.5" />
              <div>
                <strong className="text-warmwhite text-sm block">Semantic AI Caching:</strong>
                <span className="text-xs text-warmwhite-muted">Reducing expensive LLM token costs by up to 45% using high-precision vector cosine similarity indexes in Qdrant.</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-rosegold shrink-0 mt-0.5" />
              <div>
                <strong className="text-warmwhite text-sm block">Zero-Downtime Releases:</strong>
                <span className="text-xs text-warmwhite-muted">Blue-green deployments, canary rollouts, and multi-region Kubernetes topologies with automated health recovery.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Downloaded System Architecture Image */}
        <div className="lg:col-span-5 relative min-h-[340px] bg-burgundy-deep border-t lg:border-t-0 lg:border-l border-wine-border flex items-center justify-center p-4">
          <Image
            src="/assets/images/about-architecture.jpg"
            alt="Systems Architecture Blueprint"
            fill
            className="object-cover"
          />
          <div className="absolute bottom-4 right-4 bg-burgundy-deep/90 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-wine-border text-[11px] font-mono text-softpink">
            Active Microservices Topology
          </div>
        </div>
      </div>

      {/* TECHNICAL COMPETENCIES MATRIX */}
      <div className="space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-wine-border pb-4">
          <div>
            <h2 className="text-2xl font-heading font-bold text-warmwhite">Technical Competencies Matrix</h2>
            <p className="text-xs text-warmwhite-muted">Production-proven stacks evaluated across enterprise shipments.</p>
          </div>

          <div className="flex gap-2">
            {['backend', 'ai', 'cloud', 'frontend'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  sound.playTabSwitch();
                  setActiveStackTab(tab);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                  activeStackTab === tab
                    ? 'bg-rosegold text-burgundy'
                    : 'bg-wine text-warmwhite-muted hover:text-warmwhite'
                }`}
              >
                {tab === 'backend' && 'Backend & APIs'}
                {tab === 'ai' && 'Generative AI'}
                {tab === 'cloud' && 'Cloud & K8s'}
                {tab === 'frontend' && 'Frontend & WebGL'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeStackTab === 'backend' && (
            <>
              <div className="p-6 rounded-2xl bg-wine/70 border border-wine-border space-y-2">
                <h4 className="text-base font-bold text-rosegold font-heading">Go & Low-Latency Event Loops</h4>
                <p className="text-xs text-warmwhite-muted leading-relaxed">
                  High-frequency socket brokers, microsecond order matching, and zero-allocation Protobuf packet serialization.
                </p>
                <div className="text-[11px] font-mono text-softpink pt-2">8.4ms Order Execution</div>
              </div>
              <div className="p-6 rounded-2xl bg-wine/70 border border-wine-border space-y-2">
                <h4 className="text-base font-bold text-rosegold font-heading">Node.js Services</h4>
                <p className="text-xs text-warmwhite-muted leading-relaxed">
                  Fastify and Express microservice gateways, distributed Redis pub/sub streams, and enterprise REST/GraphQL APIs.
                </p>
                <div className="text-[11px] font-mono text-softpink pt-2">1,450 req/s Sustained</div>
              </div>
              <div className="p-6 rounded-2xl bg-wine/70 border border-wine-border space-y-2">
                <h4 className="text-base font-bold text-rosegold font-heading">Relational & TimeSeries DBs</h4>
                <p className="text-xs text-warmwhite-muted leading-relaxed">
                  PostgreSQL with serializable transaction isolation, TimescaleDB financial tick ledgers, and Redis in-memory caches.
                </p>
                <div className="text-[11px] font-mono text-softpink pt-2">Zero Ledger Drift</div>
              </div>
            </>
          )}

          {activeStackTab === 'ai' && (
            <>
              <div className="p-6 rounded-2xl bg-wine/70 border border-wine-border space-y-2">
                <h4 className="text-base font-bold text-rosegold font-heading">Autonomous Agent Coordination</h4>
                <p className="text-xs text-warmwhite-muted leading-relaxed">
                  LangChain and LlamaIndex state graphs executing distributed tasks with automated self-healing retry policies.
                </p>
                <div className="text-[11px] font-mono text-softpink pt-2">38 Coordinated Agents</div>
              </div>
              <div className="p-6 rounded-2xl bg-wine/70 border border-wine-border space-y-2">
                <h4 className="text-base font-bold text-rosegold font-heading">Semantic Vector Caching</h4>
                <p className="text-xs text-warmwhite-muted leading-relaxed">
                  Qdrant and Pinecone cosine similarity pipelines intercepting duplicate queries before hitting paid LLM endpoints.
                </p>
                <div className="text-[11px] font-mono text-softpink pt-2">-42% OpenAI API Costs</div>
              </div>
              <div className="p-6 rounded-2xl bg-wine/70 border border-wine-border space-y-2">
                <h4 className="text-base font-bold text-rosegold font-heading">HIPAA & Clinical AI Redaction</h4>
                <p className="text-xs text-warmwhite-muted leading-relaxed">
                  Local on-premise regex and NER models scrubbing sensitive PHI credentials before vector embedding synthesis.
                </p>
                <div className="text-[11px] font-mono text-softpink pt-2">Zero-Leakage Guarantee</div>
              </div>
            </>
          )}

          {activeStackTab === 'cloud' && (
            <>
              <div className="p-6 rounded-2xl bg-wine/70 border border-wine-border space-y-2">
                <h4 className="text-base font-bold text-rosegold font-heading">Kubernetes Cluster Architecture</h4>
                <p className="text-xs text-warmwhite-muted leading-relaxed">
                  Automated pod scheduling, horizontal pod autoscaling (HPA), and topology spread constraints across multi-region AWS.
                </p>
                <div className="text-[11px] font-mono text-softpink pt-2">412 Monitored Pods</div>
              </div>
              <div className="p-6 rounded-2xl bg-wine/70 border border-wine-border space-y-2">
                <h4 className="text-base font-bold text-rosegold font-heading">eBPF Telemetry & Observability</h4>
                <p className="text-xs text-warmwhite-muted leading-relaxed">
                  Kernel-level network packet inspection, Prometheus/Grafana real-time metrics, and automated pod memory leak predictors.
                </p>
                <div className="text-[11px] font-mono text-softpink pt-2">Sub-1% Kernel Overhead</div>
              </div>
              <div className="p-6 rounded-2xl bg-wine/70 border border-wine-border space-y-2">
                <h4 className="text-base font-bold text-rosegold font-heading">Infrastructure as Code (Terraform)</h4>
                <p className="text-xs text-warmwhite-muted leading-relaxed">
                  Reproducible declarative cloud environments with automated CI/CD GitHub Actions runners and KMS secrets vaulting.
                </p>
                <div className="text-[11px] font-mono text-softpink pt-2">SOC2 Type II Aligned</div>
              </div>
            </>
          )}

          {activeStackTab === 'frontend' && (
            <>
              <div className="p-6 rounded-2xl bg-wine/70 border border-wine-border space-y-2">
                <h4 className="text-base font-bold text-rosegold font-heading">Next.js & App Router</h4>
                <p className="text-xs text-warmwhite-muted leading-relaxed">
                  Server Components, streaming SSR, edge caching, and accessible glassmorphism interfaces built with Tailwind CSS.
                </p>
                <div className="text-[11px] font-mono text-softpink pt-2">100 / 100 Performance</div>
              </div>
              <div className="p-6 rounded-2xl bg-wine/70 border border-wine-border space-y-2">
                <h4 className="text-base font-bold text-rosegold font-heading">Three.js & WebGL 3D Spatial</h4>
                <p className="text-xs text-warmwhite-muted leading-relaxed">
                  Draco mesh compression, physically-based shaders, and interactive 60 FPS spatial configurators.
                </p>
                <div className="text-[11px] font-mono text-softpink pt-2">1.8s First Contentful Paint</div>
              </div>
              <div className="p-6 rounded-2xl bg-wine/70 border border-wine-border space-y-2">
                <h4 className="text-base font-bold text-rosegold font-heading">Procedural Web Audio API</h4>
                <p className="text-xs text-warmwhite-muted leading-relaxed">
                  Zero external sound asset overhead. Procedural oscillator synthesis for tactile interactive feedback.
                </p>
                <div className="text-[11px] font-mono text-softpink pt-2">0KB Asset Overhead</div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* CAREER TIMELINE */}
      <div className="space-y-8">
        <h2 className="text-2xl font-heading font-bold text-warmwhite">Career Trajectory (2019 — Present)</h2>

        <div className="relative border-l-2 border-wine-border pl-6 space-y-8 ml-3">
          <div className="relative space-y-2">
            <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-rosegold shadow-md shadow-rosegold/50"></div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-warmwhite">Principal Full-Stack & AI Systems Architect</h3>
              <span className="text-xs font-mono text-rosegold">2024 — Present &bull; Strategic Advisory</span>
            </div>
            <p className="text-sm text-warmwhite-muted leading-relaxed">
              Leading enterprise architectural modernization, orchestrating autonomous LLM multi-agent runtimes, and engineering low-latency trading and cloud visualization tools for global clients.
            </p>
          </div>

          <div className="relative space-y-2">
            <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-softpink"></div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-warmwhite">Staff Distributed Backend Engineer</h3>
              <span className="text-xs font-mono text-softpink">2022 — 2024 &bull; FinTech Platform</span>
            </div>
            <p className="text-sm text-warmwhite-muted leading-relaxed">
              Designed real-time order routing mechanisms and market data streaming engines in Go and Node.js. Maintained 8.4ms order execution latency during volatility surges exceeding $2.5M daily flow.
            </p>
          </div>

          <div className="relative space-y-2">
            <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-wine-border"></div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-lg font-bold text-warmwhite">Senior Software Engineer</h3>
              <span className="text-xs font-mono text-warmwhite-dim">2019 — 2022 &bull; Cloud SaaS</span>
            </div>
            <p className="text-sm text-warmwhite-muted leading-relaxed">
              Developed scalable customer-facing SaaS applications and REST/GraphQL APIs. Migrated legacy monolithic services into containerized Kubernetes microservices on AWS with automated CI/CD.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
