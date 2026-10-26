/**
 * Interactive Command Line Terminal for Abdul Hadi Awais Portfolio
 */

document.addEventListener('DOMContentLoaded', () => {
  const terminalInput = document.getElementById('terminal-cli-input');
  const terminalBody = document.getElementById('terminal-content-body');
  const quickCmdBtns = document.querySelectorAll('.t-quick-cmd');

  if (!terminalInput || !terminalBody) return;

  const COMMANDS = {
    help: () => `
<div class="t-response">
  <p><strong style="color:var(--primary-rose)">AVAILABLE COMMANDS:</strong></p>
  <p>  <strong>about</strong>     - View professional background & architectural focus</p>
  <p>  <strong>skills</strong>    - Inspect technical competencies & stack breakdown</p>
  <p>  <strong>projects</strong>  - Catalog of 8+ flagship enterprise systems</p>
  <p>  <strong>contact</strong>   - Direct communication channels (phone & email)</p>
  <p>  <strong>hire</strong>      - Schedule technical discussion or request proposal</p>
  <p>  <strong>stats</strong>     - Real-time engineering benchmarks & metrics</p>
  <p>  <strong>matrix</strong>    - Activate neural telemetry stream</p>
  <p>  <strong>clear</strong>     - Reset terminal display</p>
</div>`,

    about: () => `
<div class="t-response">
  <p><strong style="color:var(--primary-rose)">ABDUL HADI AWAIS</strong> | Principal Full-Stack Engineer & AI Architect</p>
  <p>• 6+ years architecting distributed microservices, LLM agent ecosystems, and high-velocity web apps.</p>
  <p>• Specialization in low-latency WebSockets, React/Next.js/Node/TypeScript, Python AI pipelines, and cloud native resilience.</p>
  <p>• Track record: Scaled systems to 140k+ concurrent sessions with sub-35ms p99 response times.</p>
</div>`,

    skills: () => `
<div class="t-response">
  <p><strong style="color:var(--secondary-pink)">CORE COMPETENCIES:</strong></p>
  <p>• <span style="color:var(--primary-rose)">Frontend:</span> React, Next.js, TypeScript, Vue 3, WebGL, Canvas, Modern CSS Glassmorphism</p>
  <p>• <span style="color:var(--primary-rose)">Backend:</span> Node.js, Express, Fastify, Python FastAPI, Go, GraphQL, gRPC</p>
  <p>• <span style="color:var(--primary-rose)">AI / ML:</span> LangChain, LlamaIndex, OpenAI/Gemini API, Vector DBs (Pinecone/Qdrant), Fine-tuning</p>
  <p>• <span style="color:var(--primary-rose)">Cloud & Infra:</span> Docker, Kubernetes, AWS (ECS, Lambda, RDS), Redis, PostgreSQL, CI/CD</p>
</div>`,

    projects: () => `
<div class="t-response">
  <p><strong style="color:var(--primary-rose)">FLAGSHIP PRODUCTION PROJECTS:</strong></p>
  <p>1. <span style="color:var(--text-white)">Orion AI Orchestrator:</span> Multi-agent neural workflow manager (1,450 req/s)</p>
  <p>2. <span style="color:var(--text-white)">Synaptic Trade:</span> High-frequency crypto asset engine ($2.5M daily vol)</p>
  <p>3. <span style="color:var(--text-white)">Synergy Cloud:</span> Kubernetes telemetry visualizer (412 active pods)</p>
  <p>4. <span style="color:var(--text-white)">ArxDesign 3D:</span> Luxury spatial configurator & WebGL commerce</p>
  <p><em>Type 'projects.html' in your browser or click 'Explore Projects' for deep dive case studies.</em></p>
</div>`,

    contact: () => `
<div class="t-response">
  <p><strong style="color:var(--secondary-pink)">COMMUNICATION ENDPOINTS:</strong></p>
  <p>• <strong>Email:</strong> <a href="mailto:mianhhadi11@gamil.com" style="color:var(--primary-rose)">mianhhadi11@gamil.com</a></p>
  <p>• <strong>Phone:</strong> <a href="tel:12345678910" style="color:var(--primary-rose)">12345678910</a></p>
  <p>• <strong>Location:</strong> Available Globally (Remote / Hybrid / On-Site)</p>
</div>`,

    hire: () => {
      setTimeout(() => {
        window.location.href = 'contact.html';
      }, 1000);
      return `<div class="t-response" style="color:#10b981;">Initiating direct connection to Abdul Hadi Awais... Redirecting to schedule hub.</div>`;
    },

    stats: () => `
<div class="t-response">
  <p><strong style="color:var(--primary-rose)">ENGINEERING TELEMETRY:</strong></p>
  <p>• Average Production Latency: 28ms</p>
  <p>• Total System Uptime: 99.98% across 42 microservices</p>
  <p>• Automated Test Coverage: 94.6%</p>
  <p>• Code Deployments / Month: 180+</p>
</div>`,

    matrix: () => `
<div class="t-response" style="color:#34d399; font-family:var(--font-mono);">
  01000001 01001000 01000100 01010101 01001100 &bull; 01001000 01000001 01000100 01001001<br>
  [NEURAL ARCHITECTURE SYNCHRONIZED] &bull; 4096 TENSORS LOADED &bull; 100% OPERATIONAL
</div>`,

    clear: () => {
      terminalBody.innerHTML = '';
      return '';
    }
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    if (window.soundEngine) window.soundEngine.playTerminalBeep();

    // Print command entered
    const cmdLine = document.createElement('div');
    cmdLine.className = 't-line';
    cmdLine.innerHTML = `<span class="t-prompt">hadi@architect:~$</span> <span class="t-cmd">${escapeHtml(cmd)}</span>`;
    terminalBody.appendChild(cmdLine);

    if (cmd === 'clear') {
      COMMANDS.clear();
      return;
    }

    let output = '';
    if (COMMANDS[cmd]) {
      output = COMMANDS[cmd]();
    } else {
      output = `<div class="t-response" style="color:#f87171;">Command not found: "${escapeHtml(cmd)}". Type <strong style="color:var(--primary-rose)">help</strong> for available commands.</div>`;
    }

    if (output) {
      const respLine = document.createElement('div');
      respLine.innerHTML = output;
      terminalBody.appendChild(respLine);
    }

    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  function escapeHtml(text) {
    return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      terminalInput.value = '';
      executeCommand(val);
    }
  });

  quickCmdBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      if (cmd) executeCommand(cmd);
    });
  });
});
