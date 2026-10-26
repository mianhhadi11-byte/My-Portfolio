'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, Play, FileCode, BookOpen, Copy, X, AlertTriangle, Check } from 'lucide-react';
import { PROJECTS } from '@/lib/projectsData';
import { useToast } from '@/context/ToastContext';
import { sound } from '@/lib/sound';

export default function ProjectsPage() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [activeModalProject, setActiveModalProject] = useState(null);
  const [simTraffic, setSimTraffic] = useState(1200);
  const [chaosSpike, setChaosSpike] = useState(false);
  const { showToast } = useToast();

  const filtered = PROJECTS.filter((p) => {
    const matchCat = filter === 'all' || p.category === filter;
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.summary.toLowerCase().includes(search.toLowerCase()) ||
      p.stack.some((s) => s.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const handleOpenModal = (project, tab) => {
    sound.playClick();
    setActiveModalProject({ project, tab });
  };

  const closeModal = () => {
    setActiveModalProject(null);
    setChaosSpike(false);
  };

  const copyBrief = (project) => {
    sound.playClick();
    navigator.clipboard.writeText(`${project.title}: ${project.summary}`);
    showToast(`Copied brief for ${project.title}!`, 'success');
  };

  const triggerChaos = () => {
    sound.playBeep();
    setChaosSpike(true);
    showToast('Simulated node spike! Anomaly healer engaged.', 'info');
    setTimeout(() => {
      setChaosSpike(false);
      sound.playChime();
      showToast('Node telemetry re-balanced.', 'success');
    }, 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-rosegold bg-rosegold/10 px-4 py-1.5 rounded-full border border-rosegold/30">
          Production Architecture Catalog
        </span>
        <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-warmwhite leading-tight">
          Enterprise Systems & <span className="gradient-rosegold">Live Case Studies</span>
        </h1>
        <p className="text-base sm:text-lg text-warmwhite-muted leading-relaxed">
          Every project featured here represents real-world engineering challenges solved under strict performance, concurrency, and security benchmarks. Click any system to test the simulated telemetry bench or review core architecture code.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-wine/70 border border-wine-border flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'all', label: 'All Systems (8)' },
            { id: 'ai', label: 'AI & Agents (2)' },
            { id: 'fintech', label: 'FinTech & Trading (2)' },
            { id: 'cloud', label: 'Cloud & Infra (2)' },
            { id: 'fullstack', label: 'Spatial & Logistics (2)' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sound.playTabSwitch();
                setFilter(cat.id);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filter === cat.id
                  ? 'bg-rosegold text-burgundy shadow-sm'
                  : 'bg-burgundy/60 text-warmwhite-muted hover:text-warmwhite'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Live Search */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-burgundy/80 border border-wine-border text-xs min-w-[240px]">
          <Search className="w-4 h-4 text-rosegold" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by tech or keyword..."
            className="bg-transparent border-none outline-none text-warmwhite placeholder-warmwhite-dim w-full"
          />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filtered.map((project) => (
          <div
            key={project.id}
            className="rounded-3xl bg-gradient-to-b from-wine/90 to-burgundy-deep/95 border border-wine-border hover:border-rosegold/50 transition-all overflow-hidden flex flex-col group shadow-xl"
          >
            {/* Visual Media Wrap */}
            <div className="relative aspect-video w-full bg-burgundy-deep overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4 bg-burgundy-deep/85 backdrop-blur-md px-3 py-1 rounded-full border border-wine-border text-xs font-mono text-softpink font-semibold">
                {project.categoryLabel}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-heading font-bold text-warmwhite">
                  {project.title}
                </h3>
                <p className="text-sm text-warmwhite-muted leading-relaxed">
                  {project.summary}
                </p>

                {/* Metrics Strip */}
                <div className="grid grid-cols-3 gap-2 py-3 border-y border-wine-border text-center">
                  {project.metrics.slice(0, 3).map((m, idx) => (
                    <div key={idx}>
                      <strong className="block text-rosegold font-mono text-sm sm:text-base font-bold">{m.value}</strong>
                      <span className="text-[10px] text-warmwhite-dim uppercase tracking-wider">{m.label}</span>
                    </div>
                  ))}
                </div>

                {/* Stack Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.stack.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-burgundy/80 text-[11px] font-mono text-softpink border border-wine-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <button
                  onClick={() => handleOpenModal(project, 'demo')}
                  className="px-4 py-2 rounded-xl bg-rosegold text-burgundy font-bold text-xs shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Telemetry Sandbox</span>
                </button>

                <button
                  onClick={() => handleOpenModal(project, 'case')}
                  className="px-3.5 py-2 rounded-xl bg-wine border border-wine-border text-xs font-semibold text-warmwhite hover:border-rosegold transition-all flex items-center gap-1.5"
                >
                  <BookOpen className="w-3.5 h-3.5 text-softpink" />
                  <span>Case Study</span>
                </button>

                <button
                  onClick={() => handleOpenModal(project, 'code')}
                  className="px-3 py-2 rounded-xl bg-wine border border-wine-border text-xs font-semibold text-warmwhite-muted hover:text-warmwhite transition-all flex items-center gap-1.5"
                  title="Inspect Architecture Code"
                >
                  <FileCode className="w-3.5 h-3.5 text-rosegold" />
                  <span>Code</span>
                </button>

                <button
                  onClick={() => copyBrief(project)}
                  className="p-2 rounded-xl bg-burgundy border border-wine-border text-warmwhite-dim hover:text-rosegold transition-all"
                  title="Copy Project Brief"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL DIALOG */}
      {activeModalProject && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-burgundy-deep/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-3xl bg-wine border border-rosegold/40 rounded-3xl shadow-2xl shadow-burgundy-deep overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-wine-border bg-burgundy/80">
              <div>
                <span className="text-xs font-mono text-softpink">{activeModalProject.project.categoryLabel}</span>
                <h3 className="text-xl font-heading font-bold text-warmwhite">{activeModalProject.project.title}</h3>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-xl bg-wine border border-wine-border text-warmwhite-muted hover:text-warmwhite"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs Bar */}
            <div className="flex gap-2 px-6 pt-4 border-b border-wine-border bg-burgundy/40">
              <button
                onClick={() => setActiveModalProject({ ...activeModalProject, tab: 'demo' })}
                className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all ${
                  activeModalProject.tab === 'demo'
                    ? 'bg-wine text-rosegold border-t border-x border-wine-border'
                    : 'text-warmwhite-muted hover:text-warmwhite'
                }`}
              >
                ⚡ Live Telemetry Sandbox
              </button>
              <button
                onClick={() => setActiveModalProject({ ...activeModalProject, tab: 'case' })}
                className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all ${
                  activeModalProject.tab === 'case'
                    ? 'bg-wine text-rosegold border-t border-x border-wine-border'
                    : 'text-warmwhite-muted hover:text-warmwhite'
                }`}
              >
                Architecture Case Study
              </button>
              <button
                onClick={() => setActiveModalProject({ ...activeModalProject, tab: 'code' })}
                className={`px-4 py-2 text-xs font-bold rounded-t-xl transition-all ${
                  activeModalProject.tab === 'code'
                    ? 'bg-wine text-rosegold border-t border-x border-wine-border'
                    : 'text-warmwhite-muted hover:text-warmwhite'
                }`}
              >
                Inspect Implementation Code
              </button>
            </div>

            {/* Modal Content Scroll Area */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm">
              {activeModalProject.tab === 'demo' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-burgundy/60 border border-wine-border text-xs text-warmwhite-muted">
                    Simulated real-time load testbench for <strong>{activeModalProject.project.title}</strong>. Adjust the concurrency slider below to observe latency and cluster throughput.
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-4 rounded-xl bg-burgundy/80 border border-wine-border">
                      <span className="text-xs text-warmwhite-dim block uppercase font-mono">Simulated Traffic</span>
                      <strong className="text-lg text-rosegold font-heading">{simTraffic} req/s</strong>
                    </div>
                    <div className="p-4 rounded-xl bg-burgundy/80 border border-wine-border">
                      <span className="text-xs text-warmwhite-dim block uppercase font-mono">Response P99</span>
                      <strong className={`text-lg font-heading ${chaosSpike ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {chaosSpike ? '135ms' : `${Math.round(22 + (simTraffic / 1000) * 4)}ms`}
                      </strong>
                    </div>
                    <div className="p-4 rounded-xl bg-burgundy/80 border border-wine-border">
                      <span className="text-xs text-warmwhite-dim block uppercase font-mono">Packet Loss</span>
                      <strong className="text-lg text-emerald-400 font-heading">0.00%</strong>
                    </div>
                  </div>

                  <div className="space-y-2 p-4 rounded-xl bg-burgundy/50 border border-wine-border">
                    <div className="flex justify-between text-xs font-mono">
                      <span>Simulate Traffic Concurrency:</span>
                      <span className="text-rosegold font-bold">{simTraffic} req/s</span>
                    </div>
                    <input
                      type="range"
                      min="200"
                      max="4500"
                      step="100"
                      value={simTraffic}
                      onChange={(e) => setSimTraffic(Number(e.target.value))}
                      className="w-full accent-rosegold cursor-pointer"
                    />
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <button
                      onClick={triggerChaos}
                      className="px-4 py-2.5 rounded-xl bg-wine border border-amber-400/50 text-xs font-semibold text-warmwhite hover:bg-wine-hover transition-all flex items-center gap-2"
                    >
                      <AlertTriangle className="w-4 h-4 text-amber-400" />
                      <span>Inject Synthetic Node Spike</span>
                    </button>
                    <button
                      onClick={() => showToast('Benchmark captured and recorded in telemetry ledger!', 'success')}
                      className="px-5 py-2.5 rounded-xl bg-rosegold text-burgundy font-bold text-xs"
                    >
                      Commit Benchmark
                    </button>
                  </div>
                </div>
              )}

              {activeModalProject.tab === 'case' && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h4 className="font-heading font-bold text-base text-rosegold">Architectural Objectives & Scale</h4>
                    <p className="text-warmwhite-muted leading-relaxed">{activeModalProject.project.fullCaseStudy}</p>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-heading font-bold text-base text-softpink">Key Technical Highlights</h4>
                    <ul className="space-y-2">
                      {activeModalProject.project.architectureHighlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-warmwhite-muted text-xs">
                          <Check className="w-4 h-4 text-rosegold shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-heading font-bold text-base text-warmwhite mb-2">Production Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeModalProject.project.stack.map((s) => (
                        <span key={s} className="px-3 py-1 rounded-lg bg-burgundy text-xs font-mono text-softpink border border-wine-border">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeModalProject.tab === 'code' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-softpink">core-implementation.js</span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(activeModalProject.project.codeSnippet);
                        showToast('Snippet copied to clipboard!', 'success');
                      }}
                      className="flex items-center gap-1.5 text-rosegold hover:text-softpink"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Snippet</span>
                    </button>
                  </div>
                  <pre className="p-5 rounded-2xl bg-burgundy-deep border border-wine-border font-mono text-xs text-softpink overflow-x-auto leading-relaxed">
                    <code>{activeModalProject.project.codeSnippet}</code>
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
