/**
 * Flagship Projects Dataset & Case Study Registry
 * Abdul Hadi Awais - Principal Full-Stack Engineer & AI Architect
 */

window.PROJECTS_DATA = [
  {
    id: 'orion-ai',
    title: 'Orion AI Agent Orchestrator',
    category: 'ai',
    categoryLabel: 'Generative AI & Agents',
    image: 'assets/images/project-ai.jpg',
    summary: 'Autonomous multi-agent orchestration runtime executing complex distributed workflows with dynamic memory routing, human-in-the-loop escalation, and sub-30ms p99 neural inference latency.',
    role: 'Lead Architect & Principal Engineer',
    timeline: '8 Months (Production Shipped)',
    metrics: [
      { value: '1,450 req/s', label: 'Max Throughput' },
      { value: '28ms', label: 'Avg Latency' },
      { value: '99.99%', label: 'Uptime SLA' },
      { value: '38 Active', label: 'Autonomous Agents' }
    ],
    stack: ['Python FastAPI', 'LangChain', 'TypeScript', 'Next.js 14', 'Qdrant Vector DB', 'Redis', 'Docker'],
    fullCaseStudy: `
      <h3>System Architecture & Objectives</h3>
      <p>Orion was engineered to eliminate hallucination cascading in multi-step enterprise workflows. By decoupling task planning from domain-specific agent executors via a central Redis event mesh, agents collaborate asynchronously without blocking.</p>
      
      <h3>Key Engineering Achievements</h3>
      <ul>
        <li>Implemented adaptive vector memory caching reducing OpenAI API expenses by <strong>42%</strong>.</li>
        <li>Architected real-time WebSocket state synchronizer powering a reactive canvas node visualizer.</li>
        <li>Built circuit-breaker fallback triggers guaranteeing 99.99% operational continuity under rate-limiting.</li>
      </ul>
    `,
    codeSnippet: `// Orion Agent Task Dispatcher
export async function dispatchNeuralTask(workflowId: string, payload: AgentTaskPayload) {
  const router = await MemoryVectorRouter.resolve(payload.contextEmbedding);
  const selectedAgent = await AgentPool.acquireOptimalNode({
    capabilities: payload.requiredSkills,
    maxLatencyMs: 35
  });

  const executionStream = await selectedAgent.executeWithCircuitBreaker({
    input: payload.data,
    timeoutMs: 4000,
    retryPolicy: { maxAttempts: 3, backoffFactor: 1.5 }
  });

  await AuditTelemetry.recordTelemetry(workflowId, executionStream.metrics);
  return executionStream.result;
}`,
    demoType: 'ai-chart'
  },

  {
    id: 'synaptic-trade',
    title: 'Synaptic Trade Liquidity Engine',
    category: 'fintech',
    categoryLabel: 'FinTech & Trading',
    image: 'assets/images/project-fintech.jpg',
    summary: 'Ultra-low latency algorithmic trading interface and order routing gateway processing deep liquidity books across spot, perpetuals, and multi-exchange arbitrage pairs.',
    role: 'Principal Systems Architect',
    timeline: '10 Months (Enterprise Deployed)',
    metrics: [
      { value: '$2.5M+', label: 'Daily Volume' },
      { value: '8.4ms', label: 'Order Execution' },
      { value: '224', label: 'Active Orders' },
      { value: 'Zero Drop', label: 'Packet Reliability' }
    ],
    stack: ['Node.js', 'Go', 'WebSocket', 'React', 'TimescaleDB', 'Redis Streams', 'Tailored CSS'],
    fullCaseStudy: `
      <h3>Challenge & High-Frequency Scale</h3>
      <p>FinTech traders demand millisecond updates without browser UI frame freezing. Synaptic Trade uses an off-thread Web Worker order book synchronizer and virtualized canvas rendering to handle 60 frames per second at peak volatility.</p>
      
      <h3>Engineering Milestones</h3>
      <ul>
        <li>Constructed a custom binary WebSocket protocol saving 65% network serialization overhead over standard JSON.</li>
        <li>Engineered automated risk margin guards with sub-10ms liquidation trigger execution.</li>
      </ul>
    `,
    codeSnippet: `// Synaptic Order Matching Gateway
func (gw *Gateway) RouteOrder(order *Order) (*Receipt, error) {
    gw.mu.RLock()
    pool, exists := gw.liquidityPools[order.Pair]
    gw.mu.RUnlock()

    if !exists {
        return nil, ErrPoolUnavailable
    }

    // Atomic execution check against microsecond ledger
    receipt := pool.MatchCrossOrder(order)
    gw.telemetry.EmitLatency("order_fill_time", time.Since(order.Timestamp))
    return receipt, nil
}`,
    demoType: 'trading-chart'
  },

  {
    id: 'synergy-cloud',
    title: 'Synergy Cloud Telemetry Platform',
    category: 'cloud',
    categoryLabel: 'Cloud & Distributed Systems',
    image: 'assets/images/project-saas.jpg',
    summary: 'Distributed microservice telemetry and Kubernetes cluster visualizer providing automated topology discovery, node health auto-remediation, and eBPF-driven network monitoring.',
    role: 'Lead Cloud Architect',
    timeline: '6 Months',
    metrics: [
      { value: '412', label: 'Monitored Pods' },
      { value: '64.3%', label: 'CPU Optimization' },
      { value: '96%', label: 'Cluster Health' },
      { value: '3s', label: 'Incident Auto-Heal' }
    ],
    stack: ['Go', 'Kubernetes', 'Docker', 'Prometheus', 'React', 'TypeScript', 'gRPC'],
    fullCaseStudy: `
      <h3>Observability at Cloud Scale</h3>
      <p>Built to ingest millions of telemetry data points per minute across multi-region AWS and bare-metal Kubernetes clusters without inducing resource contention on production worker nodes.</p>
      
      <h3>Key Innovations</h3>
      <ul>
        <li>Proprietary anomaly detection model predicting pod memory leaks 25 minutes prior to OOMKilled events.</li>
        <li>Reactive SVG cluster node topological visualizer with drill-down metrics.</li>
      </ul>
    `,
    codeSnippet: `// Synergy Automated Pod Anomaly Healer
apiVersion: telemetry.synergy.io/v1alpha1
kind: ClusterTelemetryGuard
metadata:
  name: prod-us-east-guard
spec:
  metricsTarget:
    cpuThreshold: "88%"
    memorySpikeRate: "15%/min"
  action:
    autoScaleHPA: true
    drainUnhealthyReplica: true
    notifySlackWebhook: true`,
    demoType: 'cloud-chart'
  },

  {
    id: 'arx-design',
    title: 'ArxDesign 3D Architectural Studio',
    category: 'fullstack',
    categoryLabel: 'Spatial & Luxury E-Commerce',
    image: 'assets/images/project-luxury.jpg',
    summary: 'Immersive spatial interior configurator and luxury commerce platform allowing users to dynamically customize materials, lighting physics, and furniture arrangements in real-time WebGL photorealism.',
    role: 'Lead Creative Engineer & Full-Stack Developer',
    timeline: '7 Months',
    metrics: [
      { value: '60 FPS', label: 'WebGL Framerate' },
      { value: '+68%', label: 'Conversion Lift' },
      { value: '$14.5k', label: 'Avg Basket Size' },
      { value: '< 1.8s', label: 'First Contentful Paint' }
    ],
    stack: ['Three.js', 'WebGL', 'GLSL Shaders', 'Next.js', 'Stripe Payments', 'PostgreSQL'],
    fullCaseStudy: `
      <h3>Balancing Visual Fidelity & Performance</h3>
      <p>Traditional 3D configurators suffer from massive asset download weights. By implementing progressive Draco mesh compression and custom physically-based rendering (PBR) shaders in WebGL, load times were reduced from 14s to 1.8s.</p>
    `,
    codeSnippet: `// Three.js Shader Material Customizer
const luxuryMaterial = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color(0x3A1024),
  metalness: 0.85,
  roughness: 0.18,
  clearcoat: 0.9,
  clearcoatRoughness: 0.1,
  reflectivity: 0.95
});
engine.registerMaterialVariant('deep-burgundy-leather', luxuryMaterial);`,
    demoType: 'luxury-view'
  },

  {
    id: 'aether-pay',
    title: 'AetherPay Cross-Border Settlement',
    category: 'fintech',
    categoryLabel: 'FinTech & Protocols',
    image: 'assets/images/project-fintech.jpg',
    summary: 'High-security multi-currency treasury and automated FX settlement engine with instant fraud risk assessment and ISO-20022 compliant messaging.',
    role: 'Lead Backend Architect',
    timeline: '5 Months',
    metrics: [
      { value: '180+', label: 'Countries Covered' },
      { value: '0.001%', label: 'Fraud Rate' },
      { value: '< 2s', label: 'Settlement Time' },
      { value: 'PCI-DSS', label: 'Level 1 Certified' }
    ],
    stack: ['Node.js', 'PostgreSQL', 'Redis', 'Kafka', 'Docker', 'AWS KMS'],
    fullCaseStudy: `
      <h3>Secure Transaction Pipelines</h3>
      <p>Engineered an event-driven ledger architecture utilizing Apache Kafka and cryptographic signature verification, preventing double-spending and ledger drift across international payment rails.</p>
    `,
    codeSnippet: `// Settlement Reconciliation Engine
export async function reconcileTreasuryBatch(batchId: string) {
  const session = await db.startTransaction({ isolationLevel: 'SERIALIZABLE' });
  try {
    const records = await session.query('SELECT * FROM fx_settlements WHERE batch_id = $1 FOR UPDATE', [batchId]);
    const balanceVerified = await LedgerAudit.verifyChecksums(records);
    if (!balanceVerified) throw new Error('Ledger parity deviation detected');
    await session.commit();
  } catch (err) {
    await session.rollback();
    throw err;
  }
}`,
    demoType: 'trading-chart'
  },

  {
    id: 'pulse-med',
    title: 'PulseMed Clinical AI Triage',
    category: 'ai',
    categoryLabel: 'Healthcare AI',
    image: 'assets/images/project-ai.jpg',
    summary: 'HIPAA-compliant clinical decision assist tool integrating patient biometric telemetry, lab biomarkers, and probabilistic LLM symptom analysis for emergency departments.',
    role: 'Senior AI Engineer',
    timeline: '9 Months',
    metrics: [
      { value: '98.2%', label: 'Diagnostic Recall' },
      { value: '-35%', label: 'Waitlist Reduction' },
      { value: 'HIPAA', label: 'Certified Compliant' },
      { value: '50k+', label: 'Cases Processed' }
    ],
    stack: ['Python', 'PyTorch', 'FastAPI', 'React', 'Docker', 'Azure Healthcare APIs'],
    fullCaseStudy: `
      <h3>Zero-Leakage Privacy Architecture</h3>
      <p>All sensitive patient health information (PHI) is automatically redacted via local on-premise regex and named-entity recognition (NER) models before generating anonymized diagnostic embeddings.</p>
    `,
    codeSnippet: `// PHI Redaction & Diagnostic Embeddings
def process_clinical_stream(raw_notes: str, patient_telemetry: dict):
    sanitized_text = phi_sanitizer_model.redact(raw_notes)
    clinical_vector = bio_clinical_bert.encode(sanitized_text)
    triage_score = emergency_triage_classifier.predict(clinical_vector, patient_telemetry)
    return {
        "acuity_level": triage_score.acuity,
        "recommended_labs": triage_score.lab_recommendations,
        "sanitized_summary": sanitized_text
    }`,
    demoType: 'ai-chart'
  },

  {
    id: 'omni-route',
    title: 'OmniRoute Logistics Fleet Engine',
    category: 'fullstack',
    categoryLabel: 'Logistics & Distributed Systems',
    image: 'assets/images/project-saas.jpg',
    summary: 'Real-time vehicle routing problem (VRP) solver utilizing genetic optimization and live traffic sensor streams to coordinate 45,000 daily parcel deliveries.',
    role: 'Principal Full-Stack Engineer',
    timeline: '6 Months',
    metrics: [
      { value: '45,000', label: 'Daily Stops' },
      { value: '-22%', label: 'Fuel Overhead' },
      { value: '99.4%', label: 'On-Time Rate' },
      { value: '1.2s', label: 'Route Re-solve' }
    ],
    stack: ['Go', 'TypeScript', 'Node.js', 'Mapbox GL', 'PostGIS', 'Redis'],
    fullCaseStudy: `
      <h3>Dynamic Real-Time Re-Routing</h3>
      <p>When unexpected congestion or driver cancellations occur, OmniRoute recalculates the optimal multi-stop route cluster within 1.2 seconds, instantly pushing new waypoints to the mobile driver app.</p>
    `,
    codeSnippet: `// Genetic Algorithm Waypoint Optimizer
func (r *Router) OptimizeCluster(stops []Waypoint, vehicleCap int) RouteResult {
    population := InitPopulation(stops, 100)
    for gen := 0; gen < 250; gen++ {
        population = population.Evolve(r.TrafficCostMatrix)
    }
    return population.BestFittestRoute()
}`,
    demoType: 'cloud-chart'
  },

  {
    id: 'nexus-id',
    title: 'NexusID Zero-Trust Cryptographic Suite',
    category: 'cloud',
    categoryLabel: 'Cybersecurity & Auth',
    image: 'assets/images/about-architecture.jpg',
    summary: 'Hardware-backed biometric authentication platform replacing traditional passwords with WebAuthn, FIDO2, and ephemeral zero-knowledge proof tokens.',
    role: 'Systems Security Architect',
    timeline: '4 Months',
    metrics: [
      { value: '0 Breaches', label: 'Security Record' },
      { value: '320ms', label: 'Biometric Auth' },
      { value: 'FIDO2', label: 'Certified' },
      { value: '120k', label: 'Active Keys' }
    ],
    stack: ['TypeScript', 'Rust', 'WebAuthn', 'Node.js', 'PostgreSQL', 'Docker'],
    fullCaseStudy: `
      <h3>Zero-Knowledge Cryptographic Verification</h3>
      <p>Eliminated credential stuffing and phishing vectors by storing strictly public keys and biometric challenge attestations signed directly inside user secure hardware enclaves.</p>
    `,
    codeSnippet: `// WebAuthn Passkey Verification
export async function verifyPasskeyAssertion(clientPayload: PasskeyAssertion) {
  const storedCred = await db.credentials.findByCredentialId(clientPayload.id);
  const isValid = await Fido2Authenticator.verifySignature({
    publicKey: storedCred.publicKeyPem,
    signature: clientPayload.signature,
    clientDataJSON: clientPayload.clientDataJSON,
    authenticatorData: clientPayload.authenticatorData
  });
  if (!isValid) throw new AuthenticationError('Cryptographic challenge failed');
  return generateEphemeralSessionJWT(storedCred.userId);
}`,
    demoType: 'cloud-chart'
  }
];
