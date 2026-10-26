/**
 * Interactive Project Scope, Architecture & Budget Estimator
 * Abdul Hadi Awais - Engineering Services
 */

document.addEventListener('DOMContentLoaded', () => {
  const baseCards = document.querySelectorAll('.estimator-base-choice');
  const complexityBtns = document.querySelectorAll('.estimator-complexity-btn');
  const addonCheckboxes = document.querySelectorAll('.estimator-addon-input');
  const urgencyBtns = document.querySelectorAll('.estimator-urgency-btn');
  const currencyBtns = document.querySelectorAll('.estimator-currency-btn');
  
  const displayCost = document.getElementById('calc-display-cost');
  const displayWeeks = document.getElementById('calc-display-weeks');
  const displayHours = document.getElementById('calc-display-hours');
  const stackListEl = document.getElementById('calc-recommended-stack');
  const exportBtn = document.getElementById('btn-export-quote');
  const transferBtn = document.getElementById('btn-transfer-inquiry');

  if (!displayCost) return;

  const RATES = {
    USD: { symbol: '$', rate: 1 },
    EUR: { symbol: '€', rate: 0.92 },
    GBP: { symbol: '£', rate: 0.79 },
    PKR: { symbol: '₨ ', rate: 278 }
  };

  let state = {
    basePrice: 6000,
    baseWeeks: 6,
    baseHours: 120,
    baseName: 'Full-Stack SaaS Platform',
    complexityMultiplier: 1.0,
    complexityName: 'Production Grade',
    urgencyMultiplier: 1.0,
    urgencyName: 'Standard (6-8 Weeks)',
    currency: 'USD',
    addons: []
  };

  function updateCalculations() {
    let totalBase = state.basePrice;
    let totalWeeks = state.baseWeeks;
    let totalHours = state.baseHours;

    // Addons
    addonCheckboxes.forEach(cb => {
      if (cb.checked) {
        const cost = parseFloat(cb.getAttribute('data-cost') || 0);
        const hours = parseFloat(cb.getAttribute('data-hours') || 0);
        const weeks = parseFloat(cb.getAttribute('data-weeks') || 0);
        totalBase += cost;
        totalHours += hours;
        totalWeeks += weeks;
      }
    });

    const finalSubtotal = totalBase * state.complexityMultiplier * state.urgencyMultiplier;
    const finalHours = Math.round(totalHours * state.complexityMultiplier);
    const finalWeeks = Math.max(2, Math.round(totalWeeks * (state.urgencyMultiplier < 1 ? 1 : (1 / state.urgencyMultiplier))));

    const curr = RATES[state.currency];
    const convertedCost = Math.round(finalSubtotal * curr.rate);

    displayCost.textContent = `${curr.symbol}${convertedCost.toLocaleString()}`;
    displayWeeks.textContent = `${finalWeeks} Weeks`;
    displayHours.textContent = `~${finalHours} Engineering Hours`;

    if (window.soundEngine) window.soundEngine.playTabSwitch();
  }

  // Base selection
  baseCards.forEach(card => {
    card.addEventListener('click', () => {
      baseCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      state.basePrice = parseFloat(card.getAttribute('data-base-cost'));
      state.baseWeeks = parseFloat(card.getAttribute('data-base-weeks'));
      state.baseHours = parseFloat(card.getAttribute('data-base-hours'));
      state.baseName = card.querySelector('h4').textContent;
      updateCalculations();
    });
  });

  // Complexity selection
  complexityBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      complexityBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.complexityMultiplier = parseFloat(btn.getAttribute('data-multiplier'));
      state.complexityName = btn.textContent.trim();
      updateCalculations();
    });
  });

  // Urgency selection
  urgencyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      urgencyBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.urgencyMultiplier = parseFloat(btn.getAttribute('data-multiplier'));
      state.urgencyName = btn.textContent.trim();
      updateCalculations();
    });
  });

  // Addons toggle
  addonCheckboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      updateCalculations();
    });
  });

  // Currency toggle
  currencyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currencyBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      state.currency = btn.getAttribute('data-curr');
      updateCalculations();
    });
  });

  // Export quote summary
  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const selectedAddons = Array.from(addonCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.parentElement.querySelector('span').textContent.trim());

      const summaryText = `--- PROJECT SCOPE & ESTIMATE ---
Engineer: Abdul Hadi Awais (mianhhadi11@gamil.com / 12345678910)
Base Architecture: ${state.baseName}
Complexity Tier: ${state.complexityName}
Delivery Schedule: ${state.urgencyName}
Add-ons: ${selectedAddons.length > 0 ? selectedAddons.join(', ') : 'None'}
Projected Investment: ${displayCost.textContent}
Estimated Timeline: ${displayWeeks.textContent}
Total Engineering Effort: ${displayHours.textContent}
Generated on: ${new Date().toLocaleDateString()}`;

      navigator.clipboard.writeText(summaryText).then(() => {
        if (window.showToast) window.showToast('Project Estimate Copied to Clipboard!', 'success');
      });
    });
  }

  // Transfer to contact page
  if (transferBtn) {
    transferBtn.addEventListener('click', () => {
      const selectedAddons = Array.from(addonCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.parentElement.querySelector('span').textContent.trim());

      const inquiry = {
        projectType: state.baseName,
        tier: state.complexityName,
        budget: displayCost.textContent,
        timeline: displayWeeks.textContent,
        addons: selectedAddons
      };

      localStorage.setItem('hadi_pending_inquiry', JSON.stringify(inquiry));
      if (window.showToast) window.showToast('Scope locked! Redirecting to schedule hub...', 'success');
      setTimeout(() => {
        window.location.href = 'contact.html';
      }, 700);
    });
  }

  updateCalculations();
});
