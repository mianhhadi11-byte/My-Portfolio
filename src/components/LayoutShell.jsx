'use client';

import React, { useState } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CommandPalette } from './CommandPalette';

export function LayoutShell({ children }) {
  const [paletteOpen, setPaletteOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col z-10">
      <Navbar onOpenPalette={() => setPaletteOpen(true)} />
      <main className="flex-1">{children}</main>
      <Footer />
      <CommandPalette isOpen={paletteOpen} onClose={() => setPaletteOpen(false)} />
    </div>
  );
}
