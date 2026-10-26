export const PROJECTS = [
  {
    id: 'orion-ai',
    title: 'Orion AI Agent Orchestrator',
    category: 'ai',
    categoryLabel: 'Generative AI & Agents',
    image: '/assets/images/project-ai.jpg',
    summary: 'Autonomous multi-agent orchestration runtime executing complex distributed workflows with dynamic memory routing, human-in-the-loop escalation, and sub-30ms p99 neural inference latency.',
    role: 'Principal Systems Architect',
    timeline: '8 Months (Production Shipped)',
    metrics: [
      { value: '1,450 req/s', label: 'Max Throughput' },
      { value: '28ms', label: 'P99 Latency' },
      { value: '99.99%', label: 'Uptime SLA' },
      { value: '38 Active', label: 'Autonomous Agents' }
    ],
    stack: ['Python FastAPI', 'LangChain', 'TypeScript', 'Next.js', 'Qdrant Vector DB', 'Redis Streams', 'Docker'],
    fullCaseStudy: 'Orion was engineered to eliminate hallucination cascading in multi-step enterprise workflows. By decoupling task planning from domain-specific agent executors via a central Redis event mesh, agents collaborate asynchronously without blocking.',
    codeSnippet: `// Orion Agent Task Dispatcher
export async function dispatchNeuralTask(workflowId, payload) {
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
    architectureHighlights: [
      'Semantic caching with Qdrant vector similarity cut LLM API bills by 42%',
      'Asynchronous task graph with automated fallback circuit breakers',
      'Reactive WebSocket node topology visualizer rendering 60 FPS'
    ]
  },
  {
    id: 'synaptic-trade',
    title: 'Synaptic Trade Liquidity Gateway',
    category: 'fintech',
    categoryLabel: 'FinTech & Trading',
    image: '/assets/images/project-fintech.jpg',
    summary: 'Ultra-low latency algorithmic trading interface and order routing gateway processing deep liquidity books across spot, perpetuals, and multi-exchange arbitrage pairs.',
    role: 'Lead Distributed Systems Architect',
    timeline: '10 Months (Enterprise Deployed)',
    metrics: [
      { value: '$2.5M+', label: 'Daily Volume' },
      { value: '8.4ms', label: 'Order Execution' },
      { value: '224', label: 'Active Orders' },
      { value: 'Zero Drop', label: 'Packet Parity' }
    ],
    stack: ['Go', 'Node.js', 'WebSocket', 'React', 'TimescaleDB', 'Redis', 'Protobuf'],
    fullCaseStudy: 'FinTech traders demand millisecond updates without browser UI frame freezing. Synaptic Trade uses an off-thread Web Worker order book synchronizer and virtualized canvas rendering to handle 60 frames per second at peak market volatility.',
    codeSnippet: `// Synaptic Order Matching Gateway
func (gw *Gateway) RouteOrder(order *Order) (*Receipt, error) {
    gw.mu.RLock()
    pool, exists := gw.liquidityPools[order.Pair]
    gw.mu.RUnlock()

    if !exists {
        return nil, ErrPoolUnavailable
    }

    receipt := pool.MatchCrossOrder(order)
    gw.telemetry.EmitLatency("order_fill_time", time.Since(order.Timestamp))
    return receipt, nil
}`,
    architectureHighlights: [
      'Binary Protobuf WebSocket protocol reduced network payload by 65%',
      'Atomic ledger double-spend validation under 10 microseconds',
      'Automated liquidation risk guards triggering sub-10ms protection'
    ]
  },
  {
    id: 'synergy-cloud',
    title: 'Synergy Cloud Telemetry Platform',
    category: 'cloud',
    categoryLabel: 'Cloud & Kubernetes',
    image: '/assets/images/project-saas.jpg',
    summary: 'Distributed microservice telemetry and Kubernetes cluster visualizer providing automated topology discovery, node health auto-remediation, and eBPF-driven network monitoring.',
    role: 'Lead Cloud Architect',
    timeline: '6 Months',
    metrics: [
      { value: '412', label: 'Monitored Pods' },
      { value: '64.3%', label: 'CPU Optimization' },
      { value: '96%', label: 'Cluster Health' },
      { value: '3s', label: 'Incident Auto-Heal' }
    ],
    stack: ['Go', 'Kubernetes', 'Docker', 'Prometheus', 'React', 'JavaScript', 'gRPC'],
    fullCaseStudy: 'Built to ingest millions of telemetry data points per minute across multi-region AWS and bare-metal Kubernetes clusters without inducing resource contention on production worker nodes.',
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
    architectureHighlights: [
      'Proprietary anomaly detection predicting OOMKilled events 25m in advance',
      'Live SVG topological node visualizer with drill-down pod metrics',
      'Zero-agent eBPF telemetry kernel hooks with sub-1% CPU overhead'
    ]
  },
  {
    id: 'arx-design',
    title: 'ArxDesign 3D Spatial Studio',
    category: 'fullstack',
    categoryLabel: 'Spatial & Luxury E-Commerce',
    image: '/assets/images/project-luxury.jpg',
    summary: 'Immersive spatial interior configurator and luxury commerce platform allowing users to dynamically customize materials, lighting physics, and furniture arrangements in real-time WebGL photorealism.',
    role: 'Lead Creative Engineer & Full-Stack Developer',
    timeline: '7 Months',
    metrics: [
      { value: '60 FPS', label: 'WebGL Framerate' },
      { value: '+68%', label: 'Conversion Lift' },
      { value: '$14.5k', label: 'Avg Basket Size' },
      { value: '< 1.8s', label: 'First Paint' }
    ],
    stack: ['Three.js', 'WebGL', 'GLSL Shaders', 'Next.js', 'Stripe Payments', 'PostgreSQL'],
    fullCaseStudy: 'Traditional 3D configurators suffer from massive asset download weights. By implementing progressive Draco mesh compression and custom physically-based rendering (PBR) shaders in WebGL, load times were reduced from 14s to 1.8s.',
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
    architectureHighlights: [
      'Draco geometric mesh compression yielding 74% smaller 3D payloads',
      'Real-time PBR lighting simulation rendering smoothly at 60 FPS',
      'Integrated Stripe Checkout and custom AR iOS QuickLook exports'
    ]
  },
  {
    id: 'aether-pay',
    title: 'AetherPay Global Settlement Protocol',
    category: 'fintech',
    categoryLabel: 'FinTech & Protocols',
    image: '/assets/images/project-fintech.jpg',
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
    fullCaseStudy: 'Engineered an event-driven ledger architecture utilizing Apache Kafka and cryptographic signature verification, preventing double-spending and ledger drift across international payment rails.',
    codeSnippet: `// Settlement Reconciliation Engine
export async function reconcileTreasuryBatch(batchId) {
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
    architectureHighlights: [
      'Zero double-spending guarantee with serializable database transactions',
      'Automated machine learning anti-fraud heuristic engine running in 14ms',
      'Full cryptographic ledger audit logs with AWS KMS encryption'
    ]
  },
  {
    id: 'pulse-med',
    title: 'PulseMed Clinical AI Triage',
    category: 'ai',
    categoryLabel: 'Healthcare AI',
    image: '/assets/images/project-ai.jpg',
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
    fullCaseStudy: 'All sensitive patient health information (PHI) is automatically redacted via local on-premise regex and named-entity recognition (NER) models before generating anonymized diagnostic embeddings.',
    codeSnippet: `// PHI Redaction & Diagnostic Embeddings
def process_clinical_stream(raw_notes, patient_telemetry):
    sanitized_text = phi_sanitizer_model.redact(raw_notes)
    clinical_vector = bio_clinical_bert.encode(sanitized_text)
    triage_score = emergency_triage_classifier.predict(clinical_vector, patient_telemetry)
    return {
        "acuity_level": triage_score.acuity,
        "recommended_labs": triage_score.lab_recommendations,
        "sanitized_summary": sanitized_text
    }`,
    architectureHighlights: [
      'Zero-leakage local on-premise PHI de-identification pipeline',
      'Emergency room patient acuity prioritization with 98.2% clinical recall',
      'Real-time HL7 and FHIR medical electronic health record integration'
    ]
  },
  {
    id: 'omni-route',
    title: 'OmniRoute Logistics Fleet Engine',
    category: 'fullstack',
    categoryLabel: 'Logistics & Distributed Systems',
    image: '/assets/images/project-saas.jpg',
    summary: 'Real-time vehicle routing problem (VRP) solver utilizing genetic optimization and live traffic sensor streams to coordinate 45,000 daily parcel deliveries.',
    role: 'Principal Full-Stack Engineer',
    timeline: '6 Months',
    metrics: [
      { value: '45,000', label: 'Daily Stops' },
      { value: '-22%', label: 'Fuel Overhead' },
      { value: '99.4%', label: 'On-Time Rate' },
      { value: '1.2s', label: 'Route Re-solve' }
    ],
    stack: ['Go', 'JavaScript', 'Node.js', 'Mapbox GL', 'PostGIS', 'Redis'],
    fullCaseStudy: 'When unexpected congestion or driver cancellations occur, OmniRoute recalculates the optimal multi-stop route cluster within 1.2 seconds, instantly pushing new waypoints to the mobile driver app.',
    codeSnippet: `// Genetic Algorithm Waypoint Optimizer
func (r *Router) OptimizeCluster(stops []Waypoint, vehicleCap int) RouteResult {
    population := InitPopulation(stops, 100)
    for gen := 0; gen < 250; gen++ {
        population = population.Evolve(r.TrafficCostMatrix)
    }
    return population.BestFittestRoute()
}`,
    architectureHighlights: [
      'Sub-2s genetic algorithm dynamic route cluster optimization',
      'Real-time telemetry streams from 1,200 active fleet courier devices',
      'Spatial PostGIS geo-partitioning handling high-velocity coordinates'
    ]
  },
  {
    id: 'nexus-id',
    title: 'NexusID Zero-Trust Cryptographic Suite',
    category: 'cloud',
    categoryLabel: 'Cybersecurity & Auth',
    image: '/assets/images/about-architecture.jpg',
    summary: 'Hardware-backed biometric authentication platform replacing traditional passwords with WebAuthn, FIDO2, and ephemeral zero-knowledge proof tokens.',
    role: 'Systems Security Architect',
    timeline: '4 Months',
    metrics: [
      { value: '0 Breaches', label: 'Security Record' },
      { value: '320ms', label: 'Biometric Auth' },
      { value: 'FIDO2', label: 'Certified' },
      { value: '120k', label: 'Active Keys' }
    ],
    stack: ['JavaScript', 'Rust', 'WebAuthn', 'Node.js', 'PostgreSQL', 'Docker'],
    fullCaseStudy: 'Eliminated credential stuffing and phishing vectors by storing strictly public keys and biometric challenge attestations signed directly inside user secure hardware enclaves.',
    codeSnippet: `// WebAuthn Passkey Verification
export async function verifyPasskeyAssertion(clientPayload) {
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
    architectureHighlights: [
      'Eliminated password databases entirely via public-key cryptography',
      'Hardware secure enclave signature verification in under 350ms',
      'Automated SOC2 compliance attestation logging'
    ]
  }
];
