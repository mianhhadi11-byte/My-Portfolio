'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Calculator, Check, Copy, ArrowRight, Shield, Cpu, Activity, Database, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { sound } from '@/lib/sound';

export default function ServicesPage() {
  const router = useRouter();
  const { showToast } = useToast();

  const [selectedBase, setSelectedBase] = useState({
    name: 'Full-Stack SaaS Platform',
    cost: 6000,
    weeks: 6,
    hours: 120,
  });

  const [complexityMultiplier, setComplexityMultiplier] = useState(1.0);
  const [complexityName, setComplexityName] = useState('Standard MVP / V1');

  const [addons, setAddons] = useState({
    websockets: false,
    vectordb: false,
    k8s: false,
    security: false,
    spatial3d: false,
  });

  const [urgencyMultiplier, setUrgencyMultiplier] = useState(1.0);
  const [urgencyName, setUrgencyName] = useState('Standard Cadence');
  const [currency, setCurrency] = useState('USD');

  const CURRENCIES = {
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.79 },
    PKR: { symbol: '₨ ', rate: 278 },
  };

  const ADDON_PRICES = {
    websockets: { cost: 1200, hours: 24, label: 'Real-time WebSockets & Streaming' },
    vectordb: { cost: 2400, hours: 40, label: 'Custom Vector DB & RAG Search' },
    k8s: { cost: 1800, hours: 30, label: 'Docker & K8s Cluster Automation' },
    security: { cost: 2200, hours: 36, label: 'SOC2 & HIPAA Security Hardening' },
    spatial3d: { cost: 1600, hours: 26, label: 'Interactive WebGL / 3D Canvas' },
  };

  const toggleAddon = (key) => {
    sound.playClick();
    setAddons((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  let totalBaseCost = selectedBase.cost;
  let totalHours = selectedBase.hours;

  Object.keys(addons).forEach((key) => {
    if (addons[key]) {
      totalBaseCost += ADDON_PRICES[key].cost;
      totalHours += ADDON_PRICES[key].hours;
    }
  });

  const calculatedTotal = Math.round(totalBaseCost * complexityMultiplier * urgencyMultiplier);
  const calculatedHours = Math.round(totalHours * complexityMultiplier);
  const calculatedWeeks = Math.max(2, Math.round(selectedBase.weeks * (urgencyMultiplier > 1 ? 0.7 : 1)));

  const curr = CURRENCIES[currency];
  const formattedPrice = `${curr.symbol}${Math.round(calculatedTotal * curr.rate).toLocaleString()}`;

  const exportQuote = () => {
    sound.playClick();
    const activeAddonLabels = Object.keys(addons)
      .filter((k) => addons[k])
      .map((k) => ADDON_PRICES[k].label);

    const quoteText = `--- PROJECT SCOPE & PROPOSAL SUMMARY ---
Engineer: Abdul Hadi Awais (mianhhadi11@gamil.com | 12345678910)
Base Platform: ${selectedBase.name}
Architecture Tier: ${complexityName}
Delivery Schedule: ${urgencyName}
Specialized Modules: ${activeAddonLabels.length > 0 ? activeAddonLabels.join(', ') : 'None'}
Projected Investment: ${formattedPrice} (${currency})
Estimated Engineering Effort: ~${calculatedHours} Hours
Projected Delivery Timeline: ${calculatedWeeks} Weeks
Generated: ${new Date().toLocaleDateString()}`;

    navigator.clipboard.writeText(quoteText);
    showToast('Project quote summary copied to clipboard!', 'success');
  };

  const transferToContact = () => {
    sound.playChime();
    const activeAddonLabels = Object.keys(addons)
      .filter((k) => addons[k])
      .map((k) => ADDON_PRICES[k].label);

    const inquiry = {
      projectType: selectedBase.name,
      tier: complexityName,
      budget: formattedPrice,
      timeline: `${calculatedWeeks} Weeks`,
      addons: activeAddonLabels,
    };

    if (typeof window !== 'undefined') {
      localStorage.setItem('hadi_pending_inquiry', JSON.stringify(inquiry));
    }

    showToast('Scope locked! Redirecting to schedule hub...', 'success');
    setTimeout(() => {
      router.push('/contact');
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-rosegold bg-rosegold/10 px-4 py-1.5 rounded-full border border-rosegold/30">
          Strategic Capabilities & Scope Engine
        </span>
        <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-warmwhite leading-tight">
          Engineering Services & <span className="gradient-rosegold">Live Budget Estimator</span>
        </h1>
        <p className="text-base sm:text-lg text-warmwhite-muted leading-relaxed">
          Configure your architectural requirements, add-on modules, and target delivery pace. Estimated timelines, hours, and investments update dynamically with multi-currency support.
        </p>
      </div>

      {/* ESTIMATOR WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column Controls */}
        <div className="lg:col-span-8 space-y-8">
          {/* Step 1: Base Architecture */}
          <div className="p-6 sm:p-8 rounded-3xl bg-wine/80 border border-wine-border space-y-5">
            <h3 className="text-lg font-heading font-bold text-warmwhite flex items-center gap-2">
              <span className="text-rosegold font-mono">1.</span>
              <span>Select Base Architecture Platform</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'Full-Stack SaaS Platform', cost: 6000, weeks: 6, hours: 120, desc: 'Next.js, Node.js, PostgreSQL, Stripe, Auth & Dashboard' },
                { name: 'Generative AI & Agent Pipeline', cost: 4500, weeks: 4, hours: 90, desc: 'LangChain, Vector DB, Semantic Cache, Multi-Agent Loops' },
                { name: 'High-Frequency FinTech Gateway', cost: 7500, weeks: 8, hours: 160, desc: 'Go/Node WebSockets, TimescaleDB, Microsecond Ledger' },
                { name: 'Kubernetes & Cloud Infrastructure', cost: 4000, weeks: 4, hours: 80, desc: 'Docker, K8s, Prometheus, Multi-Region AWS, CI/CD' },
                { name: 'Architecture Audit & Security Review', cost: 3500, weeks: 3, hours: 60, desc: 'Full scalability, latency profiling & 30-day roadmap' },
              ].map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    sound.playClick();
                    setSelectedBase(item);
                  }}
                  className={`p-4 rounded-2xl text-left border transition-all ${
                    selectedBase.name === item.name
                      ? 'bg-rosegold/15 border-rosegold shadow-md'
                      : 'bg-burgundy/60 border-wine-border hover:border-rosegold/40'
                  }`}
                >
                  <strong className="block text-sm text-warmwhite font-bold mb-1">{item.name}</strong>
                  <p className="text-xs text-warmwhite-muted leading-relaxed">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Complexity Tier */}
          <div className="p-6 sm:p-8 rounded-3xl bg-wine/80 border border-wine-border space-y-4">
            <h3 className="text-lg font-heading font-bold text-warmwhite flex items-center gap-2">
              <span className="text-rosegold font-mono">2.</span>
              <span>Architectural Scale & Concurrency Tier</span>
            </h3>

            <div className="flex flex-wrap gap-2.5">
              {[
                { name: 'Standard MVP / V1', mult: 1.0 },
                { name: 'Production Grade (10k+ Users)', mult: 1.35 },
                { name: 'Enterprise Scale (100k+ High-Concurrency)', mult: 1.75 },
              ].map((tier) => (
                <button
                  key={tier.name}
                  onClick={() => {
                    sound.playClick();
                    setComplexityMultiplier(tier.mult);
                    setComplexityName(tier.name);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    complexityMultiplier === tier.mult
                      ? 'bg-rosegold text-burgundy shadow-sm'
                      : 'bg-burgundy/80 text-warmwhite-muted border border-wine-border hover:text-warmwhite'
                  }`}
                >
                  {tier.name}
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Add-on Modules */}
          <div className="p-6 sm:p-8 rounded-3xl bg-wine/80 border border-wine-border space-y-4">
            <h3 className="text-lg font-heading font-bold text-warmwhite flex items-center gap-2">
              <span className="text-rosegold font-mono">3.</span>
              <span>Specialized Add-on Modules</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.keys(ADDON_PRICES).map((key) => {
                const item = ADDON_PRICES[key];
                const isActive = addons[key];
                return (
                  <label
                    key={key}
                    onClick={() => toggleAddon(key)}
                    className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isActive
                        ? 'bg-rosegold/15 border-rosegold text-warmwhite'
                        : 'bg-burgundy/60 border-wine-border text-warmwhite-muted hover:border-rosegold/30'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isActive}
                      onChange={() => {}}
                      className="w-4 h-4 accent-rosegold"
                    />
                    <div>
                      <strong className="block text-xs text-warmwhite font-semibold">{item.label}</strong>
                      <span className="text-[11px] text-rosegold font-mono">+${item.cost} USD (~{item.hours}h)</span>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Step 4: Urgency */}
          <div className="p-6 sm:p-8 rounded-3xl bg-wine/80 border border-wine-border space-y-4">
            <h3 className="text-lg font-heading font-bold text-warmwhite flex items-center gap-2">
              <span className="text-rosegold font-mono">4.</span>
              <span>Delivery Pace Cadence</span>
            </h3>

            <div className="flex flex-wrap gap-2.5">
              {[
                { name: 'Standard Cadence', mult: 1.0 },
                { name: 'Accelerated Sprint (+25%)', mult: 1.25 },
                { name: 'Emergency Rescue Sprint (+60%)', mult: 1.6 },
              ].map((u) => (
                <button
                  key={u.name}
                  onClick={() => {
                    sound.playClick();
                    setUrgencyMultiplier(u.mult);
                    setUrgencyName(u.name);
                  }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    urgencyMultiplier === u.mult
                      ? 'bg-rosegold text-burgundy shadow-sm'
                      : 'bg-burgundy/80 text-warmwhite-muted border border-wine-border hover:text-warmwhite'
                  }`}
                >
                  {u.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sticky Calculation Card */}
        <div className="lg:col-span-4 sticky top-24 space-y-6">
          <div className="p-8 rounded-3xl bg-gradient-to-b from-wine/95 to-burgundy-deep border-2 border-rosegold/40 shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-softpink font-bold">
                Projected Scope Quote
              </span>
              {/* Currency Toggle */}
              <div className="flex gap-1 bg-burgundy p-1 rounded-lg border border-wine-border text-[11px] font-mono">
                {['USD', 'EUR', 'GBP', 'PKR'].map((c) => (
                  <button
                    key={c}
                    onClick={() => {
                      sound.playClick();
                      setCurrency(c);
                    }}
                    className={`px-2 py-0.5 rounded ${
                      currency === c ? 'bg-rosegold text-burgundy font-bold' : 'text-warmwhite-muted hover:text-warmwhite'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs text-warmwhite-dim uppercase font-mono block">Estimated Investment:</span>
              <div className="text-4xl font-heading font-extrabold text-rosegold tracking-tight mt-1">
                {formattedPrice}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 py-4 border-y border-wine-border">
              <div>
                <span className="text-[10px] text-warmwhite-dim uppercase font-mono block">Estimated Delivery</span>
                <strong className="text-base text-warmwhite font-heading font-bold">{calculatedWeeks} Weeks</strong>
              </div>
              <div>
                <span className="text-[10px] text-warmwhite-dim uppercase font-mono block">Engineering Hours</span>
                <strong className="text-base text-softpink font-heading font-bold">~{calculatedHours} Hours</strong>
              </div>
            </div>

            <div className="space-y-2 text-xs text-warmwhite-muted leading-relaxed">
              <p>✓ Direct weekly milestone live demos on staging</p>
              <p>✓ Complete Git code & architecture documentation handover</p>
              <p>✓ 30-day post-launch warranty & telemetry support</p>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={transferToContact}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rosegold to-softpink text-burgundy font-bold text-sm shadow-lg shadow-rosegold/20 hover:brightness-105 active:scale-95 transition-all"
              >
                Transfer to Contact Form & Book →
              </button>
              <button
                onClick={exportQuote}
                className="w-full py-3 rounded-xl bg-wine border border-wine-border text-warmwhite text-xs font-semibold hover:border-rosegold transition-all"
              >
                Copy Proposal Summary
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
