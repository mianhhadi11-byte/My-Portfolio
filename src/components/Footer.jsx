'use client';

import React from 'react';
import Link from 'next/link';
import { Mail, Phone, ArrowUpRight } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { sound } from '@/lib/sound';

export function Footer() {
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

  return (
    <footer className="relative z-10 border-t border-wine-border bg-burgundy-deep pt-16 pb-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 font-heading font-bold text-xl">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rosegold to-softpink text-burgundy flex items-center justify-center font-extrabold text-base">
                H
              </div>
              <span className="text-warmwhite">
                Abdul Hadi <span className="text-rosegold">Awais</span>
              </span>
            </div>
            <p className="text-sm text-warmwhite-muted leading-relaxed">
              Principal Full-Stack Software Engineer & Generative AI Systems Architect. Designing mission-critical distributed systems and world-class digital applications.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-wine border border-wine-border text-xs text-warmwhite hover:border-rosegold transition-all"
              >
                <Mail className="w-3.5 h-3.5 text-rosegold" />
                <span>mianhhadi11@gamil.com</span>
              </button>
              <button
                onClick={copyPhone}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-wine border border-wine-border text-xs text-warmwhite hover:border-rosegold transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-rosegold" />
                <span>12345678910</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-semibold text-softpink uppercase tracking-wider">
              Architecture & Pages
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="text-warmwhite-muted hover:text-rosegold transition-colors">
                  Home (Mission Control)
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-warmwhite-muted hover:text-rosegold transition-colors">
                  About & Engineering Philosophy
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-warmwhite-muted hover:text-rosegold transition-colors">
                  Projects Catalog (8 Flagship)
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-warmwhite-muted hover:text-rosegold transition-colors">
                  Services & Scope Estimator
                </Link>
              </li>
              <li>
                <Link href="/experience" className="text-warmwhite-muted hover:text-rosegold transition-colors">
                  Experience & Endorsements
                </Link>
              </li>
              <li>
                <Link href="/lab" className="text-warmwhite-muted hover:text-rosegold transition-colors">
                  Interactive Lab & Visualizer
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-warmwhite-muted hover:text-rosegold transition-colors">
                  Contact & Consultation Scheduler
                </Link>
              </li>
            </ul>
          </div>

          {/* Technical Domains */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-semibold text-softpink uppercase tracking-wider">
              Core Specializations
            </h4>
            <ul className="space-y-2.5 text-sm text-warmwhite-muted">
              <li>Autonomous AI Multi-Agent Runtimes</li>
              <li>Low-Latency FinTech & Order Routing</li>
              <li>Distributed Kubernetes & eBPF Telemetry</li>
              <li>Next.js & Three.js WebGL Spatial Apps</li>
              <li>Zero-Trust Cryptographic Authentication</li>
              <li>Database Architecture & Event Ledgers</li>
            </ul>
          </div>

          {/* Direct Collaboration */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm font-semibold text-softpink uppercase tracking-wider">
              Engagement Channels
            </h4>
            <p className="text-xs text-warmwhite-muted leading-relaxed">
              Available globally for strategic consulting, technical advisory, fractional leadership, and full-stack execution.
            </p>
            <div className="space-y-2 pt-1">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rosegold to-softpink text-burgundy font-semibold text-sm shadow-md"
              >
                <span>Book 30-Min Discovery</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <a
                href="mailto:mianhhadi11@gamil.com"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-wine border border-wine-border text-xs font-semibold text-warmwhite hover:border-rosegold transition-all"
              >
                Direct Dispatch: mianhhadi11@gamil.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-wine-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-warmwhite-dim">
          <p>
            &copy; {new Date().getFullYear()} Abdul Hadi Awais. Engineered with Next.js, Tailwind CSS & Pure Burgundy-Wine-RoseGold Palette.
          </p>
          <div className="flex items-center gap-6">
            <button onClick={copyEmail} className="hover:text-rosegold transition-colors">
              Email: mianhhadi11@gamil.com
            </button>
            <button onClick={copyPhone} className="hover:text-rosegold transition-colors">
              Tel: 12345678910
            </button>
            <Link href="/lab" className="hover:text-rosegold transition-colors">
              Interactive Lab
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
