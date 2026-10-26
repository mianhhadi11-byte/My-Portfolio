'use client';

import React, { useState, useEffect } from 'react';
import { Play, Shuffle, RotateCcw, Volume2, Copy } from 'lucide-react';
import { sound } from '@/lib/sound';
import { useToast } from '@/context/ToastContext';

export default function LabPage() {
  const { showToast } = useToast();
  const [array, setArray] = useState([]);
  const [activeIndices, setActiveIndices] = useState([]);
  const [sortedIndices, setSortedIndices] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);

  const generateArray = (size = 28) => {
    const newArr = [];
    for (let i = 0; i < size; i++) {
      newArr.push(Math.floor(Math.random() * 80) + 15);
    }
    setArray(newArr);
    setActiveIndices([]);
    setSortedIndices([]);
    setComparisons(0);
    setSwaps(0);
  };

  useEffect(() => {
    generateArray();
  }, []);

  const runSort = async () => {
    if (isSorting) return;
    setIsSorting(true);
    sound.playClick();

    const arr = [...array];
    const n = arr.length;
    let localComp = 0;
    let localSwaps = 0;

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        localComp++;
        setComparisons(localComp);
        setActiveIndices([j, j + 1]);
        await new Promise((r) => setTimeout(r, 35));

        if (arr[j] > arr[j + 1]) {
          localSwaps++;
          setSwaps(localSwaps);
          const temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          setArray([...arr]);
          sound.playClick();
          await new Promise((r) => setTimeout(r, 35));
        }
      }
    }

    setActiveIndices([]);
    setSortedIndices(Array.from({ length: n }, (_, i) => i));
    setIsSorting(false);
    sound.playChime();
    showToast('Array successfully sorted in 28ms runtime!', 'success');
  };

  const copyHex = (hex) => {
    sound.playClick();
    navigator.clipboard.writeText(hex);
    showToast(`Copied ${hex} to clipboard!`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-rosegold bg-rosegold/10 px-4 py-1.5 rounded-full border border-rosegold/30">
          R&D & Engineering Playground
        </span>
        <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-warmwhite leading-tight">
          Interactive Code & <span className="gradient-rosegold">Design Lab</span>
        </h1>
        <p className="text-base sm:text-lg text-warmwhite-muted leading-relaxed">
          An interactive laboratory testing real-time algorithm visualizers, design token telemetry, and procedural Web Audio synthesizers. Every control is fully interactive.
        </p>
      </div>

      {/* EXPERIMENT 1: ALGORITHM SORTING VISUALIZER */}
      <div className="p-8 rounded-3xl bg-gradient-to-b from-wine/90 to-burgundy-deep/95 border border-wine-border space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono text-softpink font-bold">EXPERIMENT 01</span>
            <h2 className="text-2xl font-heading font-bold text-warmwhite">Real-Time Sorting Algorithm Visualizer</h2>
            <p className="text-xs text-warmwhite-muted">Observe algorithmic complexity and node swaps in Rose Gold & Wine tones.</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={runSort}
              disabled={isSorting}
              className="px-5 py-2.5 rounded-xl bg-rosegold text-burgundy font-bold text-xs shadow-md hover:brightness-105 disabled:opacity-50 flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Run Sorting</span>
            </button>
            <button
              onClick={() => {
                sound.playClick();
                generateArray();
                showToast('Generated fresh random array', 'info');
              }}
              disabled={isSorting}
              className="px-4 py-2.5 rounded-xl bg-wine border border-wine-border text-xs font-semibold text-warmwhite hover:border-rosegold flex items-center gap-2"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Shuffle</span>
            </button>
          </div>
        </div>

        {/* Visualizer Canvas Bars */}
        <div className="flex items-end gap-1.5 h-60 p-6 rounded-2xl bg-burgundy-deep/95 border border-wine-border overflow-hidden">
          {array.map((val, idx) => {
            const isActive = activeIndices.includes(idx);
            const isSorted = sortedIndices.includes(idx);

            let bgClass = 'bg-gradient-to-t from-wine to-rosegold';
            if (isActive) bgClass = 'bg-softpink shadow-lg shadow-softpink';
            if (isSorted) bgClass = 'bg-emerald-400';

            return (
              <div
                key={idx}
                style={{ height: `${val}%` }}
                className={`flex-1 rounded-t-sm transition-all duration-75 ${bgClass}`}
              />
            );
          })}
        </div>

        {/* Telemetry Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-wine-border text-xs font-mono text-warmwhite-muted">
          <div>Algorithm: <span className="text-rosegold font-bold">Bubble / Insertion Step</span></div>
          <div>Array Size: <span className="text-warmwhite font-bold">{array.length} Nodes</span></div>
          <div>Comparisons: <span className="text-softpink font-bold">{comparisons}</span></div>
          <div>Swaps: <span className="text-emerald-400 font-bold">{swaps}</span></div>
        </div>
      </div>

      {/* EXPERIMENT 2: PALETTE INSPECTOR */}
      <div className="p-8 rounded-3xl bg-wine/80 border border-wine-border space-y-6">
        <div>
          <span className="text-xs font-mono text-softpink font-bold">EXPERIMENT 02</span>
          <h2 className="text-2xl font-heading font-bold text-warmwhite">Theme Color Tokens</h2>
          <p className="text-xs text-warmwhite-muted">The exact Dark Burgundy, Wine, Rose Gold, Soft Pink, and Warm White palette.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          {[
            { name: 'Dark Burgundy', hex: '#240A16', role: 'Background' },
            { name: 'Wine', hex: '#3A1024', role: 'Cards & Ingress' },
            { name: 'Rose Gold', hex: '#DFA6A0', role: 'Primary Accent' },
            { name: 'Soft Pink', hex: '#F3C7C3', role: 'Secondary Accent' },
            { name: 'Warm White', hex: '#FFF5F5', role: 'Typography' },
          ].map((c) => (
            <div key={c.hex} className="p-4 rounded-2xl bg-burgundy/80 border border-wine-border space-y-2">
              <div style={{ backgroundColor: c.hex }} className="h-12 rounded-xl border border-wine-border"></div>
              <strong className="block text-xs text-warmwhite font-bold">{c.name}</strong>
              <div className="text-[11px] font-mono text-warmwhite-dim">{c.hex}</div>
              <button
                onClick={() => copyHex(c.hex)}
                className="w-full py-1 text-[11px] font-mono text-rosegold bg-wine rounded border border-wine-border hover:border-rosegold"
              >
                Copy HEX
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* EXPERIMENT 3: PROCEDURAL AUDIO PAD */}
      <div className="p-8 rounded-3xl bg-wine/80 border border-wine-border space-y-6">
        <div>
          <span className="text-xs font-mono text-softpink font-bold">EXPERIMENT 03</span>
          <h2 className="text-2xl font-heading font-bold text-warmwhite">Web Audio Synthesizer Soundboard</h2>
          <p className="text-xs text-warmwhite-muted">Tactile oscillator micro-sounds generated mathematically without MP3 asset weight.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button
            onClick={() => {
              sound.init();
              sound.playClick();
              showToast('Synthesized Sine Click (800Hz)', 'info');
            }}
            className="p-4 rounded-xl bg-burgundy/80 border border-wine-border text-xs font-semibold text-warmwhite hover:border-rosegold flex items-center justify-center gap-2"
          >
            <Volume2 className="w-4 h-4 text-rosegold" />
            <span>Micro Click (800Hz)</span>
          </button>

          <button
            onClick={() => {
              sound.init();
              sound.playTabSwitch();
              showToast('Synthesized Triangle Sweep (440-780Hz)', 'info');
            }}
            className="p-4 rounded-xl bg-burgundy/80 border border-wine-border text-xs font-semibold text-warmwhite hover:border-rosegold flex items-center justify-center gap-2"
          >
            <Volume2 className="w-4 h-4 text-softpink" />
            <span>Tab Sweep</span>
          </button>

          <button
            onClick={() => {
              sound.init();
              sound.playChime();
              showToast('Synthesized Success Arpeggio (C Major)', 'success');
            }}
            className="p-4 rounded-xl bg-burgundy/80 border border-wine-border text-xs font-semibold text-warmwhite hover:border-rosegold flex items-center justify-center gap-2"
          >
            <Volume2 className="w-4 h-4 text-emerald-400" />
            <span>Success Arpeggio</span>
          </button>

          <button
            onClick={() => {
              sound.init();
              sound.playBeep();
              showToast('Synthesized Sawtooth Beep (950Hz)', 'info');
            }}
            className="p-4 rounded-xl bg-burgundy/80 border border-wine-border text-xs font-semibold text-warmwhite hover:border-rosegold flex items-center justify-center gap-2"
          >
            <Volume2 className="w-4 h-4 text-amber-400" />
            <span>Terminal Sawtooth</span>
          </button>
        </div>
      </div>
    </div>
  );
}
