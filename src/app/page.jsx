'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Copy, Check, Zap, Sparkles, Layers } from 'lucide-react';
import { MissionControl } from '@/components/MissionControl';
import { useToast } from '@/context/ToastContext';
import { sound } from '@/lib/sound';

export default function HomePage() {
  const { showToast } = useToast();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [activePersona, setActivePersona] = useState('recruiter');

  const copyEmail = () => {
    sound.playClick();
    navigator.clipboard.writeText('mianhhadi11@gamil.com');
    setCopiedEmail(true);
    showToast('Copied email: mianhhadi11@gamil.com', 'success');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    sound.playClick();
    navigator.clipboard.writeText('12345678910');
    setCopiedPhone(true);
    showToast('Copied phone: 12345678910', 'success');
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const PERSONAS = {
    recruiter: {
      tag: 'Principal Full-Stack Lead & Systems Architect',
      headline: 'Architecting Distributed Scalability & High-Velocity Web Platforms',
      bio: '6+ years leading engineering squads, shipping high-concurrency microservices, and implementing production generative AI solutions. Adept at scaling systems from 0 to 140k+ active users with proven ROI.',
    },
    cto: {
      tag: 'High-Concurrency & Cloud Resilience Strategist',
      headline: 'Sub-30ms P99 Latency & Zero-Downtime Distributed Engineering',
      bio: 'Deep specialization in Go & Node.js event loops, zero-copy binary serialization, multi-region Kubernetes clusters, and zero-trust cryptographic security architectures with 99.99% SLA guarantees.',
    },
    founder: {
      tag: 'Product-Focused Technical Partner',
      headline: 'Turning Ambiguous Requirements into Revenue-Generating Software',
      bio: 'I partner with founders to build resilient digital architectures that launch on-schedule, exceed user conversion targets, and eliminate architectural debt before it starts.',
    },
    researcher: {
      tag: 'Autonomous AI Agent & Neural Pipeline Architect',
      headline: 'Multi-Agent Execution Graphs & Low-Latency Semantic Caching',
      bio: 'Engineering stateful autonomous multi-agent task loops, low-latency semantic vector retrieval pipelines (Qdrant/Pinecone), and domain-specific LLM evaluation harnesses.',
    },
  };

  return (
    <div className="space-y-24 py-12 md:py-16">
      {/* UNIQUE HERO SECTION (STRICTLY NO PICTURES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 max-w-4xl">
          {/* Availability Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-wine/80 border border-wine-border text-xs font-mono text-rosegold shadow-lg shadow-burgundy-deep/60">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>AVAILABLE FOR Q4 & 2027 STRATEGIC CONTRACTS & ADVISORY</span>
          </div>

          {/* Perspective Persona Switcher */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-burgundy-deep/90 border border-wine-border/80 w-fit">
            <span className="text-[11px] font-mono text-warmwhite-dim px-3">PERSPECTIVE:</span>
            {['recruiter', 'cto', 'founder', 'researcher'].map((key) => (
              <button
                key={key}
                onClick={() => {
                  sound.playTabSwitch();
                  setActivePersona(key);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold capitalize transition-all ${
                  activePersona === key
                    ? 'bg-rosegold text-burgundy shadow-sm'
                    : 'text-warmwhite-muted hover:text-warmwhite'
                }`}
              >
                {key === 'recruiter' && '🚀 Recruiter'}
                {key === 'cto' && '⚡ CTO / Lead'}
                {key === 'founder' && '💼 Founder'}
                {key === 'researcher' && '🤖 AI Researcher'}
              </button>
            ))}
          </div>

          {/* Magnetic Headings */}
          <div className="space-y-4">
            <div className="text-sm sm:text-base font-mono text-softpink font-medium tracking-wide">
              {PERSONAS[activePersona].tag}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-warmwhite leading-[1.1] tracking-tight">
              {PERSONAS[activePersona].headline.split('&')[0]} &{' '}
              <span className="gradient-rosegold">
                {PERSONAS[activePersona].headline.split('&')[1] || 'Modern AI'}
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-warmwhite-muted leading-relaxed max-w-3xl pt-2">
              {PERSONAS[activePersona].bio}
            </p>
          </div>

          {/* Action Button Deck */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/contact"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-rosegold to-softpink text-burgundy font-bold text-base shadow-xl shadow-rosegold/20 hover:shadow-rosegold/35 active:scale-95 transition-all"
            >
              <span>Schedule 30-Min Strategy Call</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/projects"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-wine border border-wine-border text-warmwhite font-semibold text-base hover:border-rosegold hover:text-rosegold transition-all"
            >
              <span>Inspect 8 Flagship Systems</span>
            </Link>

            <Link
              href="/services"
              onClick={() => sound.playClick()}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-burgundy-deep border border-wine-border text-warmwhite-muted hover:text-warmwhite text-sm font-semibold transition-all"
            >
              <span>Scope & Cost Estimator</span>
            </Link>
          </div>

          {/* Direct Communication Strip */}
          <div className="flex flex-wrap items-center gap-3 p-3.5 rounded-2xl bg-wine/50 border border-wine-border/80 text-xs text-warmwhite-muted max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-warmwhite-dim">Email:</span>
              <span className="font-mono text-warmwhite font-semibold">mianhhadi11@gamil.com</span>
              <button
                onClick={copyEmail}
                className="px-2.5 py-1 rounded-md bg-wine border border-rosegold/30 text-rosegold hover:bg-rosegold hover:text-burgundy transition-all flex items-center gap-1 font-semibold"
              >
                {copiedEmail ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedEmail ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <div className="h-4 w-px bg-wine-border hidden sm:block"></div>

            <div className="flex items-center gap-2">
              <span className="text-warmwhite-dim">Phone:</span>
              <span className="font-mono text-warmwhite font-semibold">12345678910</span>
              <button
                onClick={copyPhone}
                className="px-2.5 py-1 rounded-md bg-wine border border-rosegold/30 text-rosegold hover:bg-rosegold hover:text-burgundy transition-all flex items-center gap-1 font-semibold"
              >
                {copiedPhone ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* MISSION CONTROL CENTERPIECE (STRICTLY NO PICTURES) */}
        <div className="mt-14">
          <MissionControl />
        </div>
      </section>

      {/* VERIFIED PRODUCTION BENCHMARK KPI STRIP */}
      <section className="border-y border-wine-border bg-burgundy-deep/70 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-1">
              <div className="text-3xl sm:text-4xl font-heading font-extrabold text-rosegold">140K+</div>
              <div className="text-xs sm:text-sm text-warmwhite-muted font-medium">Peak Concurrent Users</div>
              <div className="text-[11px] text-warmwhite-dim font-mono">Zero Session Dropouts</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-3xl sm:text-4xl font-heading font-extrabold text-rosegold">28ms</div>
              <div className="text-xs sm:text-sm text-warmwhite-muted font-medium">P99 Microservice Latency</div>
              <div className="text-[11px] text-warmwhite-dim font-mono">Sub-35ms Ingress SLA</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-3xl sm:text-4xl font-heading font-extrabold text-rosegold">99.99%</div>
              <div className="text-xs sm:text-sm text-warmwhite-muted font-medium">Production SLA Uptime</div>
              <div className="text-[11px] text-warmwhite-dim font-mono">Multi-Region Kubernetes</div>
            </div>
            <div className="text-center space-y-1">
              <div className="text-3xl sm:text-4xl font-heading font-extrabold text-rosegold">$18M+</div>
              <div className="text-xs sm:text-sm text-warmwhite-muted font-medium">Total Transaction Volume</div>
              <div className="text-[11px] text-warmwhite-dim font-mono">Double-Spend Invariant</div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE ARCHITECTURAL PILLARS (NO PICTURES) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-rosegold bg-rosegold/10 px-4 py-1.5 rounded-full border border-rosegold/30">
            Systems Engineering
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-warmwhite">
            Architected for Resilience Under Real-World Stress
          </h2>
          <p className="text-base text-warmwhite-muted leading-relaxed">
            Every system is engineered from first principles with isolated fault domains, decoupled asynchronous messaging, and rigorous observability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-wine/90 to-burgundy-deep/95 border border-wine-border hover:border-rosegold/50 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-rosegold/15 border border-rosegold/40 flex items-center justify-center text-rosegold group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-heading font-bold text-warmwhite">
              Low-Latency FinTech & Trading
            </h3>
            <p className="text-sm text-warmwhite-muted leading-relaxed">
              Order routing gateways, binary WebSocket streaming, and timeseries ledgers executing orders in sub-10ms with zero ledger parity deviation.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-2.5 py-1 rounded-md bg-burgundy/80 text-[11px] font-mono text-softpink border border-wine-border">Go</span>
              <span className="px-2.5 py-1 rounded-md bg-burgundy/80 text-[11px] font-mono text-softpink border border-wine-border">TimescaleDB</span>
              <span className="px-2.5 py-1 rounded-md bg-burgundy/80 text-[11px] font-mono text-softpink border border-wine-border">WebSockets</span>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rosegold pt-2 group-hover:underline"
            >
              <span>Inspect Synaptic Trade ($2.5M Vol)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pillar 2 */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-wine/90 to-burgundy-deep/95 border border-wine-border hover:border-rosegold/50 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-rosegold/15 border border-rosegold/40 flex items-center justify-center text-rosegold group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-heading font-bold text-warmwhite">
              Autonomous AI Agent Workflows
            </h3>
            <p className="text-sm text-warmwhite-muted leading-relaxed">
              Multi-agent coordination runtimes, LangChain pipelines, semantic vector memory caching (Qdrant), cutting API costs by up to 42%.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-2.5 py-1 rounded-md bg-burgundy/80 text-[11px] font-mono text-softpink border border-wine-border">LangChain</span>
              <span className="px-2.5 py-1 rounded-md bg-burgundy/80 text-[11px] font-mono text-softpink border border-wine-border">FastAPI</span>
              <span className="px-2.5 py-1 rounded-md bg-burgundy/80 text-[11px] font-mono text-softpink border border-wine-border">Qdrant Vector DB</span>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rosegold pt-2 group-hover:underline"
            >
              <span>Inspect Orion AI (1,450 req/s)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pillar 3 */}
          <div className="p-8 rounded-2xl bg-gradient-to-b from-wine/90 to-burgundy-deep/95 border border-wine-border hover:border-rosegold/50 transition-all space-y-4 group">
            <div className="w-12 h-12 rounded-xl bg-rosegold/15 border border-rosegold/40 flex items-center justify-center text-rosegold group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-heading font-bold text-warmwhite">
              Cloud & Kubernetes Observability
            </h3>
            <p className="text-sm text-warmwhite-muted leading-relaxed">
              Multi-region Kubernetes clusters, automated pod anomaly healing, eBPF telemetry monitors, and infrastructure as code (Terraform).
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-2.5 py-1 rounded-md bg-burgundy/80 text-[11px] font-mono text-softpink border border-wine-border">Kubernetes</span>
              <span className="px-2.5 py-1 rounded-md bg-burgundy/80 text-[11px] font-mono text-softpink border border-wine-border">Docker</span>
              <span className="px-2.5 py-1 rounded-md bg-burgundy/80 text-[11px] font-mono text-softpink border border-wine-border">Prometheus</span>
            </div>
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-rosegold pt-2 group-hover:underline"
            >
              <span>Inspect Synergy Cloud (412 Pods)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* HIGH-IMPACT DIRECT CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-b from-wine/95 to-burgundy-deep border-2 border-wine-border text-center space-y-6 shadow-2xl">
          <span className="text-xs font-mono uppercase tracking-widest text-rosegold">Direct Connection</span>
          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-warmwhite">
            Have a High-Stakes Project or Critical System to Build?
          </h2>
          <p className="text-base text-warmwhite-muted max-w-2xl mx-auto leading-relaxed">
            Whether you need a principal full-stack architect, an autonomous AI agent specialist, or an emergency system turnaround, let&apos;s schedule a discussion.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/contact"
              onClick={() => sound.playClick()}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-rosegold to-softpink text-burgundy font-bold text-base shadow-lg shadow-rosegold/20 hover:brightness-105 active:scale-95 transition-all"
            >
              Book 30-Min Consultation →
            </Link>
            <Link
              href="/services"
              onClick={() => sound.playClick()}
              className="px-6 py-4 rounded-xl bg-wine border border-wine-border text-warmwhite font-semibold text-base hover:border-rosegold hover:text-rosegold transition-all"
            >
              Launch Scope & Cost Estimator
            </Link>
            <button
              onClick={copyPhone}
              className="px-6 py-4 rounded-xl bg-burgundy-deep border border-wine-border text-warmwhite-muted text-sm font-mono hover:text-rosegold transition-all"
            >
              Copy Phone: 12345678910
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
