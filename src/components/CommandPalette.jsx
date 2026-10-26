'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Home, User, FolderKanban, Calculator, Briefcase, FlaskConical, Calendar, Mail, Phone } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { sound } from '@/lib/sound';

export function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const router = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const items = [
    { label: 'Home — Architectural Mission Control', icon: Home, action: () => router.push('/'), category: 'Navigation' },
    { label: 'About — Engineering Biography & Philosophy', icon: User, action: () => router.push('/about'), category: 'Navigation' },
    { label: 'Projects — 8+ Flagship Enterprise Systems', icon: FolderKanban, action: () => router.push('/projects'), category: 'Navigation' },
    { label: 'Services — Scope & Real-Time Cost Estimator', icon: Calculator, action: () => router.push('/services'), category: 'Navigation' },
    { label: 'Experience — Career Journey & Client Testimonials', icon: Briefcase, action: () => router.push('/experience'), category: 'Navigation' },
    { label: 'Lab & Sandbox — Real-Time Algorithm Sorting', icon: FlaskConical, action: () => router.push('/lab'), category: 'Navigation' },
    { label: 'Contact — Schedule Google Meet Consultation', icon: Calendar, action: () => router.push('/contact'), category: 'Navigation' },
    {
      label: 'Copy Direct Email (mianhhadi11@gamil.com)',
      icon: Mail,
      action: () => {
        navigator.clipboard.writeText('mianhhadi11@gamil.com');
        showToast('Copied email to clipboard!', 'success');
      },
      category: 'Quick Action'
    },
    {
      label: 'Copy Direct Phone (12345678910)',
      icon: Phone,
      action: () => {
        navigator.clipboard.writeText('12345678910');
        showToast('Copied phone number to clipboard!', 'success');
      },
      category: 'Quick Action'
    },
  ];

  const filtered = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[9999] flex items-start justify-center pt-24 px-4 bg-burgundy-deep/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-wine/95 border border-rosegold/30 rounded-2xl shadow-2xl shadow-burgundy-deep overflow-hidden">
        {/* Header Search Box */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-wine-border">
          <Search className="w-5 h-5 text-rosegold shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to page (e.g. projects, call, email)..."
            autoFocus
            className="w-full bg-transparent border-none outline-none text-warmwhite placeholder-warmwhite-dim text-sm"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-warmwhite-dim hover:text-warmwhite transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-sm text-warmwhite-dim">
              No matching commands found.
            </div>
          ) : (
            filtered.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    sound.playClick();
                    item.action();
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-xl text-left text-sm text-warmwhite-muted hover:text-warmwhite hover:bg-rosegold/10 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-rosegold shrink-0 group-hover:scale-110 transition-transform" />
                    <span>{item.label}</span>
                  </div>
                  <span className="text-xs font-mono text-warmwhite-dim group-hover:text-softpink">
                    {item.category}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
