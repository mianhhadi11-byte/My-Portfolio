'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Volume2, VolumeX, Search, Menu, X } from 'lucide-react';
import { sound } from '@/lib/sound';
import { useToast } from '@/context/ToastContext';

export function Navbar({ onOpenPalette }) {
  const pathname = usePathname();
  const { showToast } = useToast();
  const [soundOn, setSoundOn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const isEnabled = sound.toggle();
    setSoundOn(isEnabled);
    showToast(isEnabled ? 'Tactile Audio Feedback Active' : 'Audio Feedback Muted', 'info');
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects (8+)' },
    { href: '/services', label: 'Services & Estimator' },
    { href: '/experience', label: 'Experience' },
    { href: '/lab', label: 'Lab & Sandbox' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
        scrolled
          ? 'bg-burgundy-deep/95 backdrop-blur-xl border-wine-border shadow-2xl shadow-burgundy-deep/80'
          : 'bg-wine-card backdrop-blur-md border-wine-border/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => sound.playClick()}
            className="flex items-center gap-3 text-warmwhite group font-heading font-bold text-xl tracking-tight"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rosegold to-softpink text-burgundy flex items-center justify-center font-extrabold text-lg shadow-lg shadow-rosegold/30 group-hover:rotate-6 group-hover:scale-105 transition-all">
              H
            </div>
            <div>
              Abdul Hadi <span className="text-rosegold font-semibold">Awais</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => sound.playClick()}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-rosegold/15 text-rosegold border border-rosegold/40 shadow-sm'
                      : 'text-warmwhite-muted hover:text-warmwhite hover:bg-wine/60'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Deck */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                onOpenPalette();
              }}
              title="Quick Command Palette (Ctrl + K)"
              className="p-2.5 rounded-xl bg-wine/80 border border-wine-border text-warmwhite-muted hover:text-rosegold hover:border-rosegold/50 transition-all flex items-center gap-2 text-xs font-mono"
            >
              <Search className="w-4 h-4" />
              <span className="hidden sm:inline">⌘K</span>
            </button>

            <button
              onClick={toggleSound}
              title={soundOn ? 'Sound Active' : 'Sound Muted'}
              className={`p-2.5 rounded-xl border transition-all flex items-center gap-1.5 text-xs font-semibold ${
                soundOn
                  ? 'bg-rosegold/20 border-rosegold text-rosegold'
                  : 'bg-wine/80 border-wine-border text-warmwhite-muted hover:text-warmwhite'
              }`}
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden md:inline">{soundOn ? 'Audio ON' : 'Muted'}</span>
            </button>

            <Link
              href="/contact"
              onClick={() => sound.playClick()}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-rosegold to-softpink text-burgundy font-semibold text-sm shadow-lg shadow-rosegold/25 hover:shadow-rosegold/40 hover:brightness-105 active:scale-95 transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              Hire Me
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 rounded-xl bg-wine border border-wine-border text-warmwhite"
              aria-label="Toggle Navigation"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="lg:hidden py-4 border-t border-wine-border space-y-1 bg-burgundy-deep/95 backdrop-blur-2xl px-2 rounded-b-2xl animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  sound.playClick();
                  setMobileOpen(false);
                }}
                className={`block px-4 py-3 rounded-xl text-base font-medium ${
                  pathname === link.href
                    ? 'bg-rosegold/15 text-rosegold border border-rosegold/40'
                    : 'text-warmwhite-muted hover:text-warmwhite hover:bg-wine'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="/contact"
                onClick={() => {
                  sound.playClick();
                  setMobileOpen(false);
                }}
                className="w-full text-center block py-3 rounded-xl bg-gradient-to-r from-rosegold to-softpink text-burgundy font-bold"
              >
                Schedule Technical Consultation →
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
