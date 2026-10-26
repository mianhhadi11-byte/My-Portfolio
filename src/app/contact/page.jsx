'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, Mail, Phone, MessageSquare, Download, FileText, CheckCircle2, X } from 'lucide-react';
import { useToast } from '@/context/ToastContext';
import { sound } from '@/lib/sound';

export default function ContactPage() {
  const { showToast } = useToast();
  const [selectedSlot, setSelectedSlot] = useState('11:30 AM');
  const [bookingDate, setBookingDate] = useState('');
  const [schedulerName, setSchedulerName] = useState('');
  const [schedulerEmail, setSchedulerEmail] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [ndaModalOpen, setNdaModalOpen] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    budget: '$10,000 — $25,000 (Production Grade)',
    domain: 'Generative AI & Agent Workflows',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setBookingDate(tomorrow.toISOString().split('T')[0]);

    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('hadi_pending_inquiry');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setFormData((prev) => ({
            ...prev,
            subject: `Project Inquiry: ${parsed.projectType}`,
            message: `Hi Abdul Hadi,\n\nI configured an estimate for a ${parsed.projectType} (${parsed.tier}).\nEstimated Investment: ${parsed.budget}\nEstimated Delivery: ${parsed.timeline}\nIncluded Addons: ${parsed.addons.join(', ')}\n\nLooking forward to scheduling an introductory architectural discussion.`,
          }));
          localStorage.removeItem('hadi_pending_inquiry');
          showToast('Loaded your configured project estimate into the inquiry form!', 'info');
        } catch {}
      }
    }
  }, [showToast]);

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

  const openWhatsApp = () => {
    sound.playClick();
    const text = encodeURIComponent('Hello Abdul Hadi! I reviewed your engineering portfolio and would like to schedule a technical consultation.');
    window.open(`https://wa.me/12345678910?text=${text}`, '_blank');
    showToast('Opening secure WhatsApp chat with 12345678910', 'info');
  };

  const downloadVCard = () => {
    sound.playChime();
    const vcardData = `BEGIN:VCARD
VERSION:3.0
FN:Abdul Hadi Awais
N:Awais;Abdul;Hadi;;
TITLE:Principal Full-Stack Engineer & AI Systems Architect
EMAIL;TYPE=INTERNET,WORK:mianhhadi11@gamil.com
TEL;TYPE=CELL,VOICE:12345678910
URL:https://portfolio.abdulhadiawais.dev
NOTE:Specialist in Distributed Systems, LLM Agent Workflows, and Low-Latency Gateways.
END:VCARD`;

    const blob = new Blob([vcardData], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Abdul_Hadi_Awais.vcf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Downloaded contact card (.vcf) to your device!', 'success');
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!schedulerEmail || !schedulerEmail.includes('@')) {
      showToast('Please enter a valid work email for calendar dispatch.', 'error');
      return;
    }

    sound.playChime();
    setConfirmedBooking({
      name: schedulerName || 'Guest Attendee',
      email: schedulerEmail,
      date: bookingDate,
      slot: selectedSlot,
    });
    showToast('Meeting confirmed! Google Meet invite dispatched.', 'success');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    sound.playClick();

    setTimeout(() => {
      setIsSubmitting(false);
      sound.playChime();
      showToast('Inquiry dispatched directly to mianhhadi11@gamil.com! Expect a response within 4 hours.', 'success');
      setFormData({
        name: '',
        email: '',
        budget: '$10,000 — $25,000 (Production Grade)',
        domain: 'Generative AI & Agent Workflows',
        subject: '',
        message: '',
      });
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 space-y-16">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-rosegold bg-rosegold/10 px-4 py-1.5 rounded-full border border-rosegold/30">
          Direct Communication Endpoint
        </span>
        <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-warmwhite leading-tight">
          Schedule Consultation or <span className="gradient-rosegold">Initiate Direct Contact</span>
        </h1>
        <p className="text-base sm:text-lg text-warmwhite-muted leading-relaxed">
          Book an introductory 30-minute technical session or send a detailed project scope. Guaranteed response within 4 hours.
        </p>

        {/* 1-Click Action Deck */}
        <div className="flex flex-wrap gap-2.5 pt-2">
          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-rosegold to-softpink text-burgundy font-bold text-xs shadow-md"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Copy Email: mianhhadi11@gamil.com</span>
          </button>
          <button
            onClick={copyPhone}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-wine border border-wine-border text-xs font-semibold text-warmwhite hover:border-rosegold"
          >
            <Phone className="w-3.5 h-3.5 text-rosegold" />
            <span>Copy Phone: 12345678910</span>
          </button>
          <button
            onClick={openWhatsApp}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-wine border border-wine-border text-xs font-semibold text-warmwhite hover:border-rosegold"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp Direct</span>
          </button>
          <button
            onClick={downloadVCard}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-wine border border-wine-border text-xs font-semibold text-warmwhite-muted hover:text-warmwhite"
          >
            <Download className="w-3.5 h-3.5 text-rosegold" />
            <span>Download vCard (.vcf)</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setNdaModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-wine border border-wine-border text-xs font-semibold text-warmwhite-muted hover:text-warmwhite"
          >
            <FileText className="w-3.5 h-3.5 text-softpink" />
            <span>Mutual NDA Terms</span>
          </button>
        </div>
      </div>

      {/* DUAL WORKSPACE: SCHEDULER & DISPATCH FORM */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* LEFT: CALENDAR SCHEDULER */}
        <div className="p-8 rounded-3xl bg-gradient-to-b from-wine/90 to-burgundy-deep/95 border border-wine-border shadow-2xl space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-rosegold font-bold">REAL-TIME APPOINTMENT BOOKER</span>
            <h2 className="text-2xl font-heading font-bold text-warmwhite">Schedule 30-Min Strategy Call</h2>
            <p className="text-xs text-warmwhite-muted">Direct architectural discovery meeting with Abdul Hadi Awais.</p>
          </div>

          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-warmwhite">1. Preferred Date:</label>
              <input
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="w-full bg-burgundy/80 border border-wine-border rounded-xl px-4 py-2.5 text-xs text-warmwhite font-mono outline-none focus:border-rosegold"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-warmwhite">2. Available Time Slots:</label>
              <div className="grid grid-cols-3 gap-2">
                {['10:00 AM', '11:30 AM', '02:00 PM', '03:30 PM', '05:00 PM', '07:00 PM'].map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => {
                      sound.playClick();
                      setSelectedSlot(slot);
                    }}
                    className={`py-2 px-1 rounded-xl text-xs font-mono font-semibold border transition-all ${
                      selectedSlot === slot
                        ? 'bg-rosegold text-burgundy border-rosegold shadow-sm'
                        : 'bg-burgundy/60 border-wine-border text-warmwhite-muted hover:border-rosegold/40'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-warmwhite">Your Full Name:</label>
              <input
                type="text"
                value={schedulerName}
                onChange={(e) => setSchedulerName(e.target.value)}
                placeholder="e.g. Sarah Jenkins"
                className="w-full bg-burgundy/80 border border-wine-border rounded-xl px-4 py-2.5 text-xs text-warmwhite outline-none focus:border-rosegold"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-warmwhite">Your Work Email:</label>
              <input
                type="email"
                value={schedulerEmail}
                onChange={(e) => setSchedulerEmail(e.target.value)}
                placeholder="sarah@company.com"
                className="w-full bg-burgundy/80 border border-wine-border rounded-xl px-4 py-2.5 text-xs text-warmwhite outline-none focus:border-rosegold"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rosegold to-softpink text-burgundy font-bold text-xs shadow-lg hover:brightness-105 active:scale-95 transition-all mt-2"
            >
              Confirm & Generate Google Meet Invite →
            </button>
          </form>
        </div>

        {/* RIGHT: ENCRYPTED DISPATCH FORM */}
        <div className="p-8 rounded-3xl bg-gradient-to-b from-wine/90 to-burgundy-deep/95 border border-wine-border shadow-2xl space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-softpink font-bold">SECURE DISPATCH</span>
            <h2 className="text-2xl font-heading font-bold text-warmwhite">Send Architectural Inquiry</h2>
            <p className="text-xs text-warmwhite-muted">Delivered directly to <strong>mianhhadi11@gamil.com</strong>.</p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-warmwhite">Your Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full bg-burgundy/80 border border-wine-border rounded-xl px-4 py-2 text-xs text-warmwhite outline-none focus:border-rosegold"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-warmwhite">Work Email *</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@enterprise.com"
                  className="w-full bg-burgundy/80 border border-wine-border rounded-xl px-4 py-2 text-xs text-warmwhite outline-none focus:border-rosegold"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-warmwhite">Project Budget Tier</label>
                <select
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  className="w-full bg-burgundy/80 border border-wine-border rounded-xl px-3 py-2 text-xs text-warmwhite outline-none focus:border-rosegold"
                >
                  <option>$5,000 — $10,000 (Sprint / MVP)</option>
                  <option>$10,000 — $25,000 (Production Grade)</option>
                  <option>$25,000 — $50,000+ (Enterprise Multi-Month)</option>
                  <option>Advisory / Fractional Retainer</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-warmwhite">Domain Category</label>
                <select
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  className="w-full bg-burgundy/80 border border-wine-border rounded-xl px-3 py-2 text-xs text-warmwhite outline-none focus:border-rosegold"
                >
                  <option>Generative AI & Agent Workflows</option>
                  <option>Low-Latency FinTech / WebSockets</option>
                  <option>Distributed Cloud SaaS / Next.js</option>
                  <option>Kubernetes & DevOps Observability</option>
                  <option>Codebase Audit / Security Review</option>
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-warmwhite">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g. Next-Gen Enterprise AI Orchestrator"
                className="w-full bg-burgundy/80 border border-wine-border rounded-xl px-4 py-2 text-xs text-warmwhite outline-none focus:border-rosegold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-warmwhite">Technical Scope & Requirements *</label>
              <textarea
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Describe your technical vision, existing architecture, target timeline, and key performance expectations..."
                className="w-full bg-burgundy/80 border border-wine-border rounded-xl p-3.5 text-xs text-warmwhite outline-none focus:border-rosegold leading-relaxed"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rosegold to-softpink text-burgundy font-bold text-xs shadow-lg hover:brightness-105 active:scale-95 transition-all disabled:opacity-50"
            >
              {isSubmitting ? 'Dispatching Encrypted Message...' : 'Send Encrypted Inquiry to Abdul Hadi →'}
            </button>
          </form>
        </div>
      </div>

      {/* CONFIRMED BOOKING MODAL */}
      {confirmedBooking && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-burgundy-deep/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md bg-wine border border-rosegold rounded-3xl p-8 text-center space-y-4 shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-rosegold/20 border-2 border-rosegold flex items-center justify-center mx-auto text-rosegold text-2xl font-bold">
              ✓
            </div>
            <h3 className="text-2xl font-heading font-bold text-warmwhite">Consultation Scheduled!</h3>
            <p className="text-xs text-warmwhite-muted leading-relaxed">
              A Google Meet invitation for <strong>{confirmedBooking.date} at {confirmedBooking.slot}</strong> has been scheduled with <strong>Abdul Hadi Awais</strong>.
            </p>
            <div className="p-4 rounded-xl bg-burgundy-deep/90 border border-wine-border text-left font-mono text-xs space-y-1 text-warmwhite-muted">
              <div><strong>Host:</strong> Abdul Hadi Awais</div>
              <div><strong>Attendee:</strong> {confirmedBooking.name} &lt;{confirmedBooking.email}&gt;</div>
              <div><strong>Platform:</strong> Google Meet HD</div>
              <div><strong>Direct Line:</strong> 12345678910</div>
            </div>
            <button
              onClick={() => setConfirmedBooking(null)}
              className="w-full py-2.5 rounded-xl bg-rosegold text-burgundy font-bold text-xs"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* NDA MODAL */}
      {ndaModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-burgundy-deep/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-xl bg-wine border border-rosegold/40 rounded-3xl p-8 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-heading font-bold text-rosegold">Mutual Non-Disclosure Terms (Draft)</h3>
              <button onClick={() => setNdaModalOpen(false)} className="text-warmwhite-dim hover:text-warmwhite">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-warmwhite-muted">
              Standard mutual agreement between <strong>Abdul Hadi Awais</strong> and client organization protecting proprietary code, schemas, and trade secrets for 24 months.
            </p>
            <div className="p-4 rounded-xl bg-burgundy-deep border border-wine-border font-mono text-xs text-softpink max-h-48 overflow-y-auto leading-relaxed">
              1. CONFIDENTIAL INFORMATION: Proprietary source code, architecture diagrams, and system credentials.<br/><br/>
              2. PERMITTED PURPOSE: Evaluating architectural collaboration and technical execution.<br/><br/>
              3. STANDARD OF CARE: Reasonable degree of care identical to recipient&apos;s own confidential assets.
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setNdaModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-wine border border-wine-border text-xs text-warmwhite"
              >
                Close
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText('Mutual Non-Disclosure Agreement Draft - Abdul Hadi Awais');
                  showToast('NDA terms draft copied!', 'success');
                  setNdaModalOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-rosegold text-burgundy font-bold text-xs"
              >
                Copy Terms
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
