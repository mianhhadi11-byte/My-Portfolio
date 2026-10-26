'use client';

import React from 'react';
import Link from 'next/link';
import { Briefcase, Award, Star, Copy, FileText, ArrowRight } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { sound } from '@/lib/sound';

export default function ExperiencePage() {
  const { showToast } = useToast();

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

  const downloadJsonResume = () => {
    sound.playChime();
    const resume = {
      name: 'Abdul Hadi Awais',
      title: 'Principal Full-Stack Engineer & AI Systems Architect',
      email: 'mianhhadi11@gamil.com',
      phone: '12345678910',
      summary: '6+ years architecting distributed microservices, LLM agent ecosystems, and low-latency financial gateways.',
      skills: ['Go', 'Node.js', 'Python FastAPI', 'Next.js', 'LangChain', 'Kubernetes', 'Redis', 'Docker'],
      experience: [
        { role: 'Principal AI & Full-Stack Systems Architect', period: '2024-Present', focus: 'Multi-agent LLM runtimes, vector caching' },
        { role: 'Staff Distributed Backend Engineer', period: '2022-2024', focus: 'Sub-10ms FinTech trading gateway ($2.5M daily vol)' },
        { role: 'Senior Full-Stack Engineer', period: '2019-2022', focus: 'Cloud SaaS, Kubernetes migration, CI/CD' },
      ],
    };
    const blob = new Blob([JSON.stringify(resume, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Abdul_Hadi_Awais_Resume.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Exported JSON resume!', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-rosegold bg-rosegold/10 px-4 py-1.5 rounded-full border border-rosegold/30">
          Executive Track Record
        </span>
        <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-warmwhite leading-tight">
          Career Milestones & <span className="gradient-rosegold">Verified Endorsements</span>
        </h1>
        <p className="text-base sm:text-lg text-warmwhite-muted leading-relaxed">
          A track record forged across venture-backed startups, high-frequency FinTech platforms, and enterprise AI initiatives. Every role backed by quantifiable business outcomes.
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            onClick={downloadJsonResume}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rosegold to-softpink text-burgundy font-bold text-sm shadow-md hover:brightness-105 transition-all"
          >
            <FileText className="w-4 h-4" />
            <span>Export JSON Profile</span>
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

      {/* DETAILED ROLES */}
      <div className="space-y-8">
        <div className="p-8 rounded-3xl bg-gradient-to-b from-wine/90 to-burgundy-deep/95 border border-wine-border space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-mono text-rosegold bg-rosegold/10 px-3 py-1 rounded-full border border-rosegold/30">
                CURRENT ROLE
              </span>
              <h3 className="text-2xl font-heading font-bold text-warmwhite mt-2">
                Principal AI & Full-Stack Systems Architect
              </h3>
              <div className="text-sm text-softpink font-semibold">Autonomous Systems & Enterprise Advisory</div>
            </div>
            <div className="text-right">
              <span className="font-mono text-sm text-rosegold font-bold">2024 — Present</span>
              <div className="text-xs text-warmwhite-dim">Global Remote / Strategic Contracts</div>
            </div>
          </div>
          <p className="text-sm text-warmwhite-muted leading-relaxed">
            Architecting generative AI orchestration runtimes, vector database infrastructure, and multi-agent coordination frameworks for enterprise clients. Leading technical strategy for 4 concurrent mission-critical products.
          </p>
          <div className="p-4 rounded-xl bg-burgundy/60 border border-wine-border space-y-2 text-xs text-warmwhite-muted">
            <strong className="text-warmwhite block">Quantifiable Impact:</strong>
            <p>• Engineered semantic caching pipeline lowering monthly enterprise OpenAI inference costs by <strong>$14,200/month (42%)</strong>.</p>
            <p>• Directed squad of 9 engineers shipping an autonomous agent telemetry framework operating at <strong>1,450 req/s</strong>.</p>
            <p>• Achieved zero security incidents across SOC2 compliance verification and external penetration testing.</p>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {['LangChain', 'FastAPI', 'Next.js', 'Qdrant Vector DB', 'Redis Streams'].map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-lg bg-burgundy text-[11px] font-mono text-softpink border border-wine-border">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="p-8 rounded-3xl bg-gradient-to-b from-wine/90 to-burgundy-deep/95 border border-wine-border space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-[11px] font-mono text-softpink bg-softpink/10 px-3 py-1 rounded-full border border-softpink/30">
                ENTERPRISE FINTECH
              </span>
              <h3 className="text-2xl font-heading font-bold text-warmwhite mt-2">
                Staff Distributed Backend & WebSocket Architect
              </h3>
              <div className="text-sm text-softpink font-semibold">Synaptic Financial Network</div>
            </div>
            <div className="text-right">
              <span className="font-mono text-sm text-softpink font-bold">2022 — 2024</span>
              <div className="text-xs text-warmwhite-dim">Senior Systems Lead</div>
            </div>
          </div>
          <p className="text-sm text-warmwhite-muted leading-relaxed">
            Designed and managed high-throughput order routing mechanisms and real-time market data streaming engines. Built zero-allocation WebSocket gateways connecting traders with multi-exchange spot order books.
          </p>
          <div className="p-4 rounded-xl bg-burgundy/60 border border-wine-border space-y-2 text-xs text-warmwhite-muted">
            <strong className="text-warmwhite block">Quantifiable Impact:</strong>
            <p>• Maintained <strong>sub-10ms (8.4ms avg)</strong> order matching latency during major crypto market volatility spikes.</p>
            <p>• Handled peak daily trading volumes surpassing <strong>$2.5M USD</strong> with zero ledger discrepancies or dropped packets.</p>
            <p>• Re-engineered serialization layer from JSON to binary Protobuf, saving 65% network bandwidth costs.</p>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {['Go', 'Node.js', 'WebSockets', 'TimescaleDB', 'Docker'].map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-lg bg-burgundy text-[11px] font-mono text-softpink border border-wine-border">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CLIENT TESTIMONIALS */}
      <div className="space-y-8">
        <h2 className="text-2xl font-heading font-bold text-warmwhite">Client Endorsements & Recommendations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-wine/80 border border-wine-border space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="text-rosegold text-sm">★★★★★</div>
              <p className="text-xs sm:text-sm text-warmwhite leading-relaxed italic">
                &ldquo;Abdul Hadi is one of those rare engineers who operates comfortably at the nexus of deep infrastructure and polished product design. He brought our WebSocket ingress p99 down to 8.4ms.&rdquo;
              </p>
            </div>
            <div className="pt-4 border-t border-wine-border">
              <strong className="block text-xs text-warmwhite">Marcus Sterling</strong>
              <span className="text-[11px] text-warmwhite-dim">CTO @ Apex Quant Labs</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-wine/80 border border-wine-border space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="text-rosegold text-sm">★★★★★</div>
              <p className="text-xs sm:text-sm text-warmwhite leading-relaxed italic">
                &ldquo;Hadi designed our enterprise multi-agent AI pipeline from scratch. His semantic caching shaved thousands off our OpenAI bills while doubling retrieval speed.&rdquo;
              </p>
            </div>
            <div className="pt-4 border-t border-wine-border">
              <strong className="block text-xs text-warmwhite">Elena Rostova</strong>
              <span className="text-[11px] text-warmwhite-dim">Founder @ Cognition Systems</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-wine/80 border border-wine-border space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="text-rosegold text-sm">★★★★★</div>
              <p className="text-xs sm:text-sm text-warmwhite leading-relaxed italic">
                &ldquo;Working with Abdul Hadi feels like having an entire senior SWAT team in one person. His code is pristine with 94%+ automated test coverage.&rdquo;
              </p>
            </div>
            <div className="pt-4 border-t border-wine-border">
              <strong className="block text-xs text-warmwhite">David Vance</strong>
              <span className="text-[11px] text-warmwhite-dim">VP of Engineering @ CloudPulse</span>
            </div>
          </div>
        </div>
      </div>

      {/* OPEN SOURCE TOOLS */}
      <div className="p-8 rounded-3xl bg-wine/80 border border-wine-border space-y-6">
        <h3 className="text-xl font-heading font-bold text-warmwhite">Open Source Developer Packages</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-burgundy/80 border border-wine-border space-y-2">
            <div className="flex justify-between items-center">
              <strong className="text-warmwhite text-sm font-mono">@hadi/redis-event-mesh</strong>
              <span className="text-xs text-rosegold font-mono">v2.4.1</span>
            </div>
            <p className="text-xs text-warmwhite-muted">Zero-allocation Node.js wrapper for high-frequency Redis Streams with automatic backpressure.</p>
            <button
              onClick={() => {
                sound.playClick();
                navigator.clipboard.writeText('npm install @hadi/redis-event-mesh');
                showToast('Copied npm install command!', 'success');
              }}
              className="text-xs font-mono text-softpink hover:underline"
            >
              npm install @hadi/redis-event-mesh
            </button>
          </div>

          <div className="p-4 rounded-xl bg-burgundy/80 border border-wine-border space-y-2">
            <div className="flex justify-between items-center">
              <strong className="text-warmwhite text-sm font-mono">fastapi-semantic-cache</strong>
              <span className="text-xs text-rosegold font-mono">v1.1.0</span>
            </div>
            <p className="text-xs text-warmwhite-muted">Python FastAPI middleware delivering sub-5ms cosine similarity semantic caching for OpenAI endpoints.</p>
            <button
              onClick={() => {
                sound.playClick();
                navigator.clipboard.writeText('pip install fastapi-semantic-cache');
                showToast('Copied pip install command!', 'success');
              }}
              className="text-xs font-mono text-softpink hover:underline"
            >
              pip install fastapi-semantic-cache
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
