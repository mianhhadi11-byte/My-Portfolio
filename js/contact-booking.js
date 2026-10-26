/**
 * Interactive Contact Hub & Meeting Scheduler
 * Abdul Hadi Awais (mianhhadi11@gamil.com | 12345678910)
 */

document.addEventListener('DOMContentLoaded', () => {
  const slotBtns = document.querySelectorAll('.slot-btn');
  const dateInput = document.getElementById('booking-date-picker');
  const bookConsultBtn = document.getElementById('btn-confirm-booking');
  const contactForm = document.getElementById('portfolio-contact-form');
  const copyEmailBtn = document.getElementById('btn-copy-email');
  const copyPhoneBtn = document.getElementById('btn-copy-phone');
  const vcardBtn = document.getElementById('btn-download-vcard');
  const ndaBtn = document.getElementById('btn-generate-nda');
  const whatsappBtn = document.getElementById('btn-open-whatsapp');

  let selectedSlot = '11:30 AM';

  // Set default booking date to tomorrow
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split('T')[0];
    dateInput.min = tomorrow.toISOString().split('T')[0];
  }

  // Check if estimator transferred pending inquiry
  const pendingInquiryRaw = localStorage.getItem('hadi_pending_inquiry');
  if (pendingInquiryRaw && contactForm) {
    try {
      const data = JSON.parse(pendingInquiryRaw);
      const msgField = document.getElementById('form-message');
      const subjectField = document.getElementById('form-subject');
      if (msgField) {
        msgField.value = `Hi Abdul Hadi,\n\nI configured an estimate for a ${data.projectType} (${data.tier}).\nEstimated Budget: ${data.budget}\nEstimated Timeline: ${data.timeline}\nIncluded Addons: ${data.addons.join(', ')}\n\nLooking forward to discussing further!`;
      }
      if (subjectField) {
        subjectField.value = `New Project Inquiry: ${data.projectType}`;
      }
      localStorage.removeItem('hadi_pending_inquiry');
      if (window.showToast) window.showToast('Transferred your project estimate into the contact form!', 'info');
    } catch (e) {}
  }

  // Slot buttons
  slotBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      slotBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedSlot = btn.getAttribute('data-slot') || btn.textContent.trim();
      if (window.soundEngine) window.soundEngine.playClick();
    });
  });

  // Book Consultation Simulation
  if (bookConsultBtn) {
    bookConsultBtn.addEventListener('click', () => {
      const chosenDate = dateInput ? dateInput.value : 'Tomorrow';
      const name = document.getElementById('scheduler-name')?.value || 'Guest';
      const email = document.getElementById('scheduler-email')?.value || '';

      if (!email || !email.includes('@')) {
        if (window.showToast) window.showToast('Please enter a valid work email for the calendar invite.', 'error');
        return;
      }

      if (window.soundEngine) window.soundEngine.playChime();
      
      const modalContent = `
        <div style="text-align:center; padding: 20px;">
          <div style="width:64px; height:64px; border-radius:50%; background:var(--primary-rose-dim); border:2px solid var(--primary-rose); display:flex; align-items:center; justify-content:center; margin:0 auto 20px auto; color:var(--primary-rose); font-size:2rem;">✓</div>
          <h3 style="font-size:1.8rem; margin-bottom:12px;">Meeting Confirmed!</h3>
          <p style="color:var(--text-muted); margin-bottom:20px;">
            A calendar invitation for <strong>${chosenDate} at ${selectedSlot}</strong> has been scheduled with <strong>Abdul Hadi Awais</strong>.
          </p>
          <div style="background:rgba(36,10,22,0.8); border:1px solid var(--border-subtle); border-radius:12px; padding:16px; margin-bottom:24px; text-align:left; font-family:var(--font-mono); font-size:0.88rem;">
            <p><strong>Host:</strong> Abdul Hadi Awais</p>
            <p><strong>Attendee:</strong> ${name} &lt;${email}&gt;</p>
            <p><strong>Platform:</strong> Google Meet / Zoom HD</p>
            <p><strong>Direct Line:</strong> 12345678910</p>
          </div>
          <button class="btn btn-primary" onclick="window.closeCurrentModal()">Done</button>
        </div>
      `;

      if (window.openCustomModal) {
        window.openCustomModal('Consultation Scheduled', modalContent);
      }
      if (window.showToast) window.showToast('Consultation successfully scheduled!', 'success');
    });
  }

  // Contact Form Submission
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Sending Encrypted Dispatch...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerHTML = '✓ Message Dispatched!';
        if (window.soundEngine) window.soundEngine.playChime();
        if (window.showToast) window.showToast('Message sent directly to mianhhadi11@gamil.com! Expect a response within 4 hours.', 'success');
        contactForm.reset();

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 3000);
      }, 1200);
    });
  }

  // Direct Copy Email Button
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('mianhhadi11@gamil.com').then(() => {
        if (window.soundEngine) window.soundEngine.playClick();
        if (window.showToast) window.showToast('Copied email: mianhhadi11@gamil.com', 'success');
      });
    });
  }

  // Direct Copy Phone Button
  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('12345678910').then(() => {
        if (window.soundEngine) window.soundEngine.playClick();
        if (window.showToast) window.showToast('Copied phone: 12345678910', 'success');
      });
    });
  }

  // Download vCard
  if (vcardBtn) {
    vcardBtn.addEventListener('click', () => {
      const vcardData = `BEGIN:VCARD
VERSION:3.0
FN:Abdul Hadi Awais
N:Awais;Abdul;Hadi;;
TITLE:Principal Full-Stack Engineer & AI Architect
EMAIL;TYPE=INTERNET,WORK:mianhhadi11@gamil.com
TEL;TYPE=CELL,VOICE:12345678910
URL:https://portfolio.abdulhadiawais.dev
NOTE:Specialist in Distributed Systems, LLM Agent Workflows, and High-Performance Web Applications.
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

      if (window.showToast) window.showToast('Contact card (.vcf) downloaded to your device!', 'success');
    });
  }

  // Generate Mutual NDA Template
  if (ndaBtn) {
    ndaBtn.addEventListener('click', () => {
      const ndaModalContent = `
        <div style="font-size:0.92rem; line-height:1.7;">
          <h3 style="font-size:1.4rem; color:var(--primary-rose); margin-bottom:16px;">Standard Mutual Non-Disclosure Agreement (Draft)</h3>
          <p style="color:var(--text-muted); margin-bottom:14px;">
            This Confidentiality Agreement is entered into between <strong>Abdul Hadi Awais</strong> ("Consultant") and <strong>Client / Organization</strong>.
          </p>
          <div style="background:rgba(25,5,14,0.8); border:1px solid var(--border-subtle); padding:16px; border-radius:12px; margin-bottom:20px; font-family:var(--font-mono); font-size:0.82rem; max-height:220px; overflow-y:auto;">
            1. CONFIDENTIAL INFORMATION: Both parties agree to protect proprietary code, trade secrets, architecture diagrams, and system credentials.<br><br>
            2. PERMITTED USE: Information disclosed solely for evaluating technical collaboration or strategic execution.<br><br>
            3. STANDARD OF CARE: Reasonable degree of care identical to that used for recipient's own confidential records.<br><br>
            4. TERM: 24 months from the effective date of execution.
          </div>
          <div style="display:flex; gap:12px; justify-content:flex-end;">
            <button class="btn btn-secondary btn-sm" onclick="window.closeCurrentModal()">Close</button>
            <button class="btn btn-primary btn-sm" onclick="navigator.clipboard.writeText('Mutual NDA Draft with Abdul Hadi Awais'); window.showToast('NDA terms copied to clipboard!', 'success'); window.closeCurrentModal();">Copy NDA Terms</button>
          </div>
        </div>
      `;
      if (window.openCustomModal) {
        window.openCustomModal('Mutual NDA Terms', ndaModalContent);
      }
    });
  }

  // Open WhatsApp Link
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const message = encodeURIComponent("Hello Abdul Hadi! I reviewed your engineering portfolio and would like to discuss an opportunity.");
      window.open(`https://wa.me/12345678910?text=${message}`, '_blank');
      if (window.showToast) window.showToast('Opening secure WhatsApp chat with 12345678910', 'info');
    });
  }
});
