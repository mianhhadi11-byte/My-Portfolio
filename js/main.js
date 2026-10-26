/**
 * Core Application Controller for Abdul Hadi Awais Portfolio
 * Manages Modals, Toast Engine, Command Palette (Ctrl+K), Persona Switcher, Audio, and Resume Generator
 */

document.addEventListener('DOMContentLoaded', () => {
  // Setup Global Toast System
  let toastContainer = document.getElementById('global-toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'global-toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  window.showToast = function(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let icon = '✦';
    if (type === 'success') icon = '✓';
    if (type === 'error') icon = '⚠';
    
    toast.innerHTML = `<span style="color:var(--primary-rose); font-weight:bold;">${icon}</span> <span>${message}</span>`;
    toastContainer.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3800);
  };

  // Setup Global Modal System
  let modalBackdrop = document.getElementById('global-modal-backdrop');
  if (!modalBackdrop) {
    modalBackdrop = document.createElement('div');
    modalBackdrop.id = 'global-modal-backdrop';
    modalBackdrop.className = 'modal-backdrop';
    modalBackdrop.innerHTML = `
      <div class="modal-dialog">
        <div class="modal-header">
          <h3 id="modal-title-heading" style="color:var(--primary-rose); font-size:1.4rem;">Modal</h3>
          <button class="modal-close-btn" id="modal-close-trigger" aria-label="Close Modal">&times;</button>
        </div>
        <div class="modal-body" id="modal-content-area"></div>
      </div>
    `;
    document.body.appendChild(modalBackdrop);

    document.getElementById('modal-close-trigger').addEventListener('click', () => {
      window.closeCurrentModal();
    });

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) window.closeCurrentModal();
    });
  }

  window.openCustomModal = function(title, contentHtml) {
    document.getElementById('modal-title-heading').innerHTML = title;
    document.getElementById('modal-content-area').innerHTML = contentHtml;
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeCurrentModal = function() {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  };

  // Sound Engine Dock & Navigation Toggles
  const soundToggleBtns = document.querySelectorAll('.btn-toggle-sound');
  soundToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (window.soundEngine) {
        const isEnabled = window.soundEngine.toggle();
        soundToggleBtns.forEach(b => {
          b.classList.toggle('active', isEnabled);
          b.setAttribute('title', isEnabled ? 'Audio Feedback Active' : 'Audio Feedback Muted');
          const span = b.querySelector('span');
          if (span) span.textContent = isEnabled ? 'Sound ON' : 'Sound OFF';
        });
        window.showToast(isEnabled ? 'Tactile Audio Feedback Enabled' : 'Audio Feedback Muted', 'info');
      }
    });
  });

  // Glow Booster Toggle
  const glowToggleBtns = document.querySelectorAll('.btn-toggle-glow');
  glowToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const isBoosted = document.body.classList.toggle('glow-boosted');
      glowToggleBtns.forEach(b => b.classList.toggle('active', isBoosted));
      window.showToast(isBoosted ? 'Rose Gold Ambient Glow Boosted!' : 'Balanced Glow Restored', 'info');
      if (window.soundEngine) window.soundEngine.playClick();
    });
  });

  // Mobile Menu Toggle
  const mobileBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      if (window.soundEngine) window.soundEngine.playClick();
    });
  }

  // Navbar Scroll Shadow
  const siteHeader = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (siteHeader) {
      if (window.scrollY > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }
  });

  // Global Button Click Sound Effect Hook
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('button, .btn, .filter-btn, .persona-btn, .slot-btn');
    if (btn && window.soundEngine) {
      window.soundEngine.playClick();
    }
  });

  // Persona Switcher on Home Page
  const personaBtns = document.querySelectorAll('.persona-btn');
  const heroRoleEl = document.getElementById('hero-dynamic-role');
  const heroBioEl = document.getElementById('hero-dynamic-bio');

  const PERSONAS = {
    recruiter: {
      role: 'Principal Full-Stack Engineer & AI Architect',
      bio: '6+ years building enterprise microservices and generative AI solutions. Adept at leading engineering squads, shipping high-velocity web platforms, and scaling systems from 0 to 140k+ active users.'
    },
    cto: {
      role: 'High-Concurrency Systems & Cloud Strategist',
      bio: 'Deep specialization in sub-30ms distributed backends, Go & Node.js event loops, Kubernetes resilience, and zero-trust cryptographic security architectures with 99.99% uptime guarantees.'
    },
    founder: {
      role: 'Product-Focused Technical Partner',
      bio: 'I transform ambiguous commercial requirements into resilient software products that launch on-schedule, crush user conversion metrics, and scale seamlessly without technical debt.'
    },
    researcher: {
      role: 'Autonomous AI Agent & Neural Pipeline Architect',
      bio: 'Engineering multi-agent orchestration frameworks, low-latency semantic caching, vector retrieval pipelines (Pinecone/Qdrant), and fine-tuned domain-specific LLM workflows.'
    }
  };

  personaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      personaBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const pKey = btn.getAttribute('data-persona');
      if (PERSONAS[pKey] && heroRoleEl && heroBioEl) {
        heroRoleEl.style.opacity = '0';
        heroBioEl.style.opacity = '0';
        setTimeout(() => {
          heroRoleEl.textContent = PERSONAS[pKey].role;
          heroBioEl.textContent = PERSONAS[pKey].bio;
          heroRoleEl.style.opacity = '1';
          heroBioEl.style.opacity = '1';
        }, 180);
      }
    });
  });

  // Download Curriculum Vitae / Resume Simulation
  const downloadCvBtns = document.querySelectorAll('.btn-download-cv');
  downloadCvBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cvText = `# ABDUL HADI AWAIS
Principal Full-Stack Engineer & Generative AI Systems Architect
Email: mianhhadi11@gamil.com | Phone: 12345678910 | Location: Global (Remote/Hybrid)

---

## PROFESSIONAL SUMMARY
Seasoned software architect with 6+ years of engineering experience delivering mission-critical distributed systems, AI agent orchestration pipelines, low-latency financial gateways, and high-conversion web applications.

## CORE COMPETENCIES
- Frontend: React, Next.js 14, TypeScript, Vue 3, Three.js, WebGL, Modern CSS Glassmorphism
- Backend: Node.js, Go, Python FastAPI, Express, GraphQL, gRPC, Microservices
- AI & ML: LangChain, LlamaIndex, OpenAI/Gemini API, Vector DBs (Pinecone, Qdrant), Local LLMs
- Cloud & Data: AWS (ECS, Lambda, RDS), Kubernetes, Docker, PostgreSQL, Redis, Kafka, CI/CD
- Architecture: Zero-Trust Security, High-Frequency WebSockets, Event-Driven Ledgers

## FLAGSHIP PROJECTS
1. Orion AI Agent Orchestrator: Multi-agent neural workflow runtime (1,450 req/s, 28ms latency).
2. Synaptic Trade: High-frequency FinTech crypto exchange platform ($2.5M daily volume).
3. Synergy Cloud Telemetry: Kubernetes cluster visualizer and automated pod anomaly healer.
4. ArxDesign 3D Studio: Photorealistic WebGL interior design configurator & luxury e-commerce.

## CONTACT
Email: mianhhadi11@gamil.com
Phone: 12345678910
Portfolio: https://portfolio.abdulhadiawais.dev
`;

      const blob = new Blob([cvText], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Abdul_Hadi_Awais_Resume.md';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      if (window.soundEngine) window.soundEngine.playChime();
      window.showToast('Abdul Hadi Awais Resume Downloaded (.md)!', 'success');
    });
  });

  // Command Palette (Ctrl+K or Spotlight Button)
  let cmdPalette = document.getElementById('command-palette-modal');
  if (!cmdPalette) {
    cmdPalette = document.createElement('div');
    cmdPalette.id = 'command-palette-modal';
    cmdPalette.className = 'modal-backdrop';
    cmdPalette.innerHTML = `
      <div class="modal-dialog" style="max-width:600px;">
        <div class="modal-header">
          <div style="display:flex; align-items:center; gap:10px; width:100%;">
            <span style="color:var(--primary-rose); font-size:1.2rem;">🔍</span>
            <input type="text" id="palette-search-input" placeholder="Type a command or jump to page... (e.g. projects, call, resume)" style="flex:1; background:transparent; border:none; outline:none; color:var(--text-white); font-size:1.1rem; font-family:var(--font-body);">
          </div>
          <button class="modal-close-btn" id="palette-close-btn">&times;</button>
        </div>
        <div class="modal-body" style="padding:16px;">
          <div id="palette-results-list" style="display:flex; flex-direction:column; gap:8px;">
            <div class="palette-item" data-action="home" style="padding:12px 16px; border-radius:8px; background:rgba(36,10,22,0.8); cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
              <span>🏠 Home (Unique Interactive Hub)</span> <span style="font-size:0.8rem; color:var(--text-dim);">Page</span>
            </div>
            <div class="palette-item" data-action="about" style="padding:12px 16px; border-radius:8px; background:rgba(36,10,22,0.8); cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
              <span>👤 About & Engineering Philosophy</span> <span style="font-size:0.8rem; color:var(--text-dim);">Page</span>
            </div>
            <div class="palette-item" data-action="projects" style="padding:12px 16px; border-radius:8px; background:rgba(36,10,22,0.8); cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
              <span>🚀 Projects & Case Studies (8+ Flagship)</span> <span style="font-size:0.8rem; color:var(--text-dim);">Page</span>
            </div>
            <div class="palette-item" data-action="services" style="padding:12px 16px; border-radius:8px; background:rgba(36,10,22,0.8); cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
              <span>💼 Services & Interactive Cost Estimator</span> <span style="font-size:0.8rem; color:var(--text-dim);">Tool</span>
            </div>
            <div class="palette-item" data-action="experience" style="padding:12px 16px; border-radius:8px; background:rgba(36,10,22,0.8); cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
              <span>📈 Career Timeline & Endorsements</span> <span style="font-size:0.8rem; color:var(--text-dim);">Page</span>
            </div>
            <div class="palette-item" data-action="lab" style="padding:12px 16px; border-radius:8px; background:rgba(36,10,22,0.8); cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
              <span>🧪 Interactive Code & Design Lab</span> <span style="font-size:0.8rem; color:var(--text-dim);">Sandbox</span>
            </div>
            <div class="palette-item" data-action="contact" style="padding:12px 16px; border-radius:8px; background:rgba(36,10,22,0.8); cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
              <span>📅 Schedule Consultation / Contact Hub</span> <span style="font-size:0.8rem; color:var(--text-dim);">Action</span>
            </div>
            <div class="palette-item" data-action="copy-email" style="padding:12px 16px; border-radius:8px; background:rgba(58,16,36,0.8); cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
              <span>📧 Copy Email (mianhhadi11@gamil.com)</span> <span style="font-size:0.8rem; color:var(--primary-rose);">Quick Action</span>
            </div>
            <div class="palette-item" data-action="copy-phone" style="padding:12px 16px; border-radius:8px; background:rgba(58,16,36,0.8); cursor:pointer; display:flex; justify-content:space-between; align-items:center;">
              <span>📱 Copy Phone (12345678910)</span> <span style="font-size:0.8rem; color:var(--primary-rose);">Quick Action</span>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(cmdPalette);

    document.getElementById('palette-close-btn').addEventListener('click', () => {
      cmdPalette.classList.remove('open');
    });

    const searchInput = document.getElementById('palette-search-input');
    const items = document.querySelectorAll('.palette-item');

    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      items.forEach(it => {
        const text = it.textContent.toLowerCase();
        it.style.display = text.includes(q) ? 'flex' : 'none';
      });
    });

    items.forEach(it => {
      it.addEventListener('click', () => {
        const action = it.getAttribute('data-action');
        cmdPalette.classList.remove('open');
        if (action === 'home') window.location.href = 'index.html';
        else if (action === 'about') window.location.href = 'about.html';
        else if (action === 'projects') window.location.href = 'projects.html';
        else if (action === 'services') window.location.href = 'services.html';
        else if (action === 'experience') window.location.href = 'experience.html';
        else if (action === 'lab') window.location.href = 'lab.html';
        else if (action === 'contact') window.location.href = 'contact.html';
        else if (action === 'copy-email') {
          navigator.clipboard.writeText('mianhhadi11@gamil.com');
          window.showToast('Copied email: mianhhadi11@gamil.com', 'success');
        } else if (action === 'copy-phone') {
          navigator.clipboard.writeText('12345678910');
          window.showToast('Copied phone: 12345678910', 'success');
        }
      });
    });
  }

  // Open Command Palette via Ctrl+K or Button
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      cmdPalette.classList.add('open');
      document.getElementById('palette-search-input').focus();
    }
    if (e.key === 'Escape') {
      cmdPalette.classList.remove('open');
      window.closeCurrentModal();
    }
  });

  const triggerPaletteBtns = document.querySelectorAll('.btn-trigger-palette');
  triggerPaletteBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      cmdPalette.classList.add('open');
      document.getElementById('palette-search-input').focus();
    });
  });

  // Global Project Modal Handlers
  window.openProjectModal = function(projectId, tab = 'case') {
    if (!window.PROJECTS_DATA) return;
    const project = window.PROJECTS_DATA.find(p => p.id === projectId);
    if (!project) return;

    let bodyHtml = '';

    if (tab === 'case') {
      bodyHtml = `
        <div style="display:flex; flex-direction:column; gap:20px;">
          <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px;">
            <span class="tag-badge">${project.categoryLabel}</span>
            <span style="font-family:var(--font-mono); font-size:0.85rem; color:var(--text-dim);">${project.timeline} &bull; ${project.role}</span>
          </div>
          <p style="font-size:1.1rem; color:var(--text-white);">${project.summary}</p>
          <div class="project-metrics-strip">
            ${project.metrics.map(m => `
              <div class="metric-pill">
                <strong>${m.value}</strong>
                <span>${m.label}</span>
              </div>
            `).join('')}
          </div>
          <div style="line-height:1.7; color:var(--text-muted);">
            ${project.fullCaseStudy}
          </div>
          <div style="margin-top:16px;">
            <h4 style="font-size:0.95rem; margin-bottom:10px; color:var(--secondary-pink);">Production Tech Stack:</h4>
            <div style="display:flex; flex-wrap:wrap; gap:8px;">
              ${project.stack.map(s => `<span class="tag-badge">${s}</span>`).join('')}
            </div>
          </div>
          <div style="display:flex; gap:12px; margin-top:20px; flex-wrap:wrap;">
            <button class="btn btn-primary btn-sm" onclick="window.openProjectModal('${project.id}', 'demo')">Launch Interactive Demo</button>
            <button class="btn btn-secondary btn-sm" onclick="window.openProjectModal('${project.id}', 'code')">Inspect Architecture Code</button>
            <button class="btn btn-ghost btn-sm" onclick="navigator.clipboard.writeText('${project.title} - ${project.summary}'); window.showToast('Project summary copied!', 'success');">Copy Brief</button>
          </div>
        </div>
      `;
    } else if (tab === 'demo') {
      bodyHtml = `
        <div style="display:flex; flex-direction:column; gap:16px;">
          <div style="display:flex; align-items:center; justify-content:space-between;">
            <h4 style="color:var(--primary-rose); font-size:1.15rem;">Live Simulated Telemetry Sandbox</h4>
            <button class="btn btn-ghost btn-sm" onclick="window.openProjectModal('${project.id}', 'case')">← Back to Case Study</button>
          </div>
          <p style="font-size:0.88rem; color:var(--text-muted);">Interactive real-time test bench for ${project.title}. Adjust sliders to simulate load and observe telemetry response.</p>
          
          <div style="background:rgba(25,5,14,0.9); border:1px solid var(--border-medium); border-radius:12px; padding:20px;">
            <div style="display:flex; justify-content:space-between; margin-bottom:16px; font-family:var(--font-mono); font-size:0.85rem;">
              <span>Simulated Traffic: <strong id="sim-traffic-val" style="color:var(--primary-rose)">1,200 req/s</strong></span>
              <span id="sim-status-indicator" style="color:#10b981;">● All Pods Healthy</span>
            </div>
            <input type="range" min="100" max="5000" step="100" value="1200" id="sandbox-load-slider" style="width:100%; accent-color:var(--primary-rose); margin-bottom:20px;">
            
            <div style="height:220px; width:100%; position:relative;">
              <canvas id="sandbox-chart-canvas"></canvas>
            </div>
          </div>

          <div style="display:flex; gap:12px; justify-content:flex-end;">
            <button class="btn btn-secondary btn-sm" id="btn-inject-anomaly">Inject Chaos / Spike</button>
            <button class="btn btn-primary btn-sm" onclick="window.showToast('Telemetry stream synchronized with node!', 'success')">Commit Benchmark</button>
          </div>
        </div>
      `;
    } else if (tab === 'code') {
      bodyHtml = `
        <div>
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:16px;">
            <h4 style="color:var(--primary-rose); font-size:1.15rem;">Core Implementation Code</h4>
            <button class="btn btn-ghost btn-sm" onclick="window.openProjectModal('${project.id}', 'case')">← Back to Case Study</button>
          </div>
          <pre style="background:rgba(20,4,12,0.95); border:1px solid var(--border-medium); border-radius:12px; padding:20px; color:var(--secondary-pink); font-family:var(--font-mono); font-size:0.85rem; overflow-x:auto; line-height:1.6;"><code>${escapeHtml(project.codeSnippet)}</code></pre>
          <div style="display:flex; gap:12px; margin-top:20px; justify-content:flex-end;">
            <button class="btn btn-secondary btn-sm" onclick="navigator.clipboard.writeText(\`${project.codeSnippet.replace(/`/g, '\\`')}\`); window.showToast('Snippet copied to clipboard!', 'success');">Copy Snippet</button>
            <button class="btn btn-primary btn-sm" onclick="window.openProjectModal('${project.id}', 'demo')">Run in Live Sandbox</button>
          </div>
        </div>
      `;
    }

    window.openCustomModal(project.title, bodyHtml);

    // If demo tab opened, initialize Chart.js
    if (tab === 'demo' && window.Chart) {
      setTimeout(() => {
        const canvasEl = document.getElementById('sandbox-chart-canvas');
        if (!canvasEl) return;
        const ctx = canvasEl.getContext('2d');
        
        let labels = ['0s', '5s', '10s', '15s', '20s', '25s', '30s'];
        let dataPoints = [24, 28, 26, 31, 29, 27, 28];

        const chart = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Latency (ms)',
              data: dataPoints,
              borderColor: '#DFA6A0',
              backgroundColor: 'rgba(223, 166, 160, 0.15)',
              borderWidth: 2.5,
              tension: 0.4,
              fill: true,
              pointBackgroundColor: '#F3C7C3'
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              x: { grid: { color: 'rgba(223, 166, 160, 0.08)' }, ticks: { color: 'rgba(255,245,245,0.6)' } },
              y: { grid: { color: 'rgba(223, 166, 160, 0.08)' }, ticks: { color: 'rgba(255,245,245,0.6)' } }
            }
          }
        });

        const slider = document.getElementById('sandbox-load-slider');
        const trafficVal = document.getElementById('sim-traffic-val');
        if (slider && trafficVal) {
          slider.addEventListener('input', () => {
            trafficVal.textContent = `${slider.value} req/s`;
            const multiplier = slider.value / 1200;
            chart.data.datasets[0].data = dataPoints.map(v => Math.round(v * multiplier));
            chart.update();
          });
        }

        const anomalyBtn = document.getElementById('btn-inject-anomaly');
        if (anomalyBtn) {
          anomalyBtn.addEventListener('click', () => {
            chart.data.datasets[0].data[5] = 92;
            chart.update();
            const ind = document.getElementById('sim-status-indicator');
            if (ind) {
              ind.textContent = '▲ Transient Latency Spike Auto-Mitigated';
              ind.style.color = '#f59e0b';
              setTimeout(() => {
                chart.data.datasets[0].data[5] = 30;
                chart.update();
                ind.textContent = '● All Pods Healthy';
                ind.style.color = '#10b981';
              }, 1600);
            }
            window.showToast('Simulated node spike! Auto-remediation triggered.', 'info');
          });
        }
      }, 50);
    }
  };

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }
});
