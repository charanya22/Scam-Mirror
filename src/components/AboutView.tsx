import React from 'react';
import { 
  ShieldCheck, 
  Eye, 
  Lock, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  BrainCircuit, 
  Server, 
  Activity,
  Layers
} from 'lucide-react';
import { ScamMirrorLogo } from './ScamMirrorLogo';

interface AboutViewProps {
  onStartAnalyze: () => void;
  onExploreDemo: () => void;
}

export function AboutView({ onStartAnalyze, onExploreDemo }: AboutViewProps) {
  const manipulationPhases = [
    {
      phase: '1. Trust Building',
      badge: 'PRETEXTING',
      color: '#00D9FF',
      description: 'The attacker establishes credible authority — posing as bank fraud personnel, government officers, or recruiter algorithms with reassuring professional cadence.',
    },
    {
      phase: '2. Artificial Urgency',
      badge: 'TIME COMPRESSION',
      color: '#F59E0B',
      description: 'Strict countdown deadlines (10 minutes, offer expiring at 5 PM) intentionally bypass critical analytical thinking and prevent consulting third parties.',
    },
    {
      phase: '3. Emotional Pressure',
      badge: 'FEAR INDUCTION',
      color: '#F97316',
      description: 'The victim is subjected to fabricated panic: account freeze alerts, digital arrest intimidation, or catastrophic data loss threats.',
    },
    {
      phase: '4. Social Isolation',
      badge: 'SECRECY ENFORCEMENT',
      color: '#EF4444',
      description: 'Strict mandates instructing the victim: "Do not inform family," "Keep this call confidential," or "Do not visit the physical branch."',
    },
    {
      phase: '5. Asset / Credential Demand',
      badge: 'PAYLOAD TRIGGER',
      color: '#EF4444',
      description: 'The endgame lever: irreversible UPI wire, verification security deposit, OTP disclosure, or remote desktop tool (AnyDesk/QuickAssist) authorization.',
    },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="flex justify-center mb-2">
          <ScamMirrorLogo size="xl" showTagline={true} layout="vertical" />
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC] tracking-tight">
          Deconstructing the Anatomy of Social Engineering
        </h1>
        <p className="text-sm sm:text-base text-[#94A3B8] leading-relaxed">
          Traditional spam filters only output binary “Scam / Safe” labels without explaining the underlying attack vectors. ScamMirror mirrors the psychological manipulation back to you so you can recognize the levers before harm occurs.
        </p>
      </div>

      {/* Core Paradigm Shift */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl border border-[#263247] bg-[#111827]/60 space-y-3">
          <div className="flex items-center gap-2 text-[#EF4444] font-mono text-xs font-bold uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <span>The Old Paradigm (Binary Flags)</span>
          </div>
          <h3 className="text-base font-bold text-[#F8FAFC]">
            “Is this message 87% likely to be spam?”
          </h3>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Black-box classifications leave users anxious and uninformed. When a sophisticated adversary impersonates an official authority, simple spam warnings are often dismissed by victims as false alarms.
          </p>
        </div>

        <div className="p-6 rounded-2xl border border-[#00D9FF]/40 bg-[#151D2E] shadow-[0_0_20px_rgba(0,217,255,0.08)] space-y-3">
          <div className="flex items-center gap-2 text-[#00D9FF] font-mono text-xs font-bold uppercase tracking-wider">
            <BrainCircuit className="w-4 h-4 shrink-0" />
            <span>The ScamMirror Paradigm (Cognitive X-Ray)</span>
          </div>
          <h3 className="text-base font-bold text-[#F8FAFC]">
            “How is this message manipulating psychological levers?”
          </h3>
          <p className="text-xs text-[#CBD5E1] leading-relaxed">
            By reverse-engineering manipulation stages, ScamMirror maps every message turn into documented behavioral tactics with verifiable verbatim quotes and defensive mitigation actions.
          </p>
        </div>
      </div>

      {/* The 5-Stage Psychological Attack Vector Pipeline */}
      <div className="cyber-card p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#263247]">
          <div>
            <div className="text-xs font-mono font-bold text-[#00D9FF] uppercase tracking-wider">
              HEURISTIC ATTACK PATTERN ARCHITECTURE
            </div>
            <h2 className="text-xl font-bold text-[#F8FAFC] tracking-tight mt-0.5">
              Trust Building → Urgency → Emotional Pressure → Isolation → Payload
            </h2>
          </div>
          <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-[#0B1020] text-[#94A3B8] border border-[#263247]">
            5 RECONSTRUCTION VECTORS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {manipulationPhases.map((phase, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-[#263247] bg-[#0B1020] space-y-2 flex flex-col justify-between hover:border-[#00D9FF]/40 transition-colors"
            >
              <div className="space-y-1">
                <span
                  className="text-[10px] font-mono font-bold px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: `${phase.color}15`,
                    color: phase.color,
                    border: `1px solid ${phase.color}30`,
                  }}
                >
                  {phase.badge}
                </span>
                <h4 className="text-xs font-bold text-[#F8FAFC] pt-1">
                  {phase.phase}
                </h4>
                <p className="text-[11px] text-[#94A3B8] leading-relaxed">
                  {phase.description}
                </p>
              </div>
              <div className="text-[10px] font-mono text-[#64748B] pt-2">
                STEP 0{idx + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy & Ethical AI Safeguards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="cyber-card p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#00D9FF]/10 border border-[#00D9FF]/30 text-[#00D9FF] flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#F8FAFC]">Client-Side Pre-Flight Sanitization</h3>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Before any conversation snippet touches the analysis model, local regex masks account numbers, credit cards, telephone digits, and email identities into synthetic tokens.
          </p>
        </div>

        <div className="cyber-card p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#F8FAFC]">Evidence-Anchored Explainability</h3>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Every heuristic flag in the ScamMirror Risk Report directly points to verbatim conversational proof. No unsupported AI assertions or hallucinations.
          </p>
        </div>

        <div className="cyber-card p-6 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 border border-[#F59E0B]/30 text-[#F59E0B] flex items-center justify-center">
            <Server className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-[#F8FAFC]">Zero-Storage Architecture</h3>
          <p className="text-xs text-[#94A3B8] leading-relaxed">
            Transcripts are evaluated ephemerally. Your analysis archive is preserved solely inside your browser's private local storage and can be wiped instantly.
          </p>
        </div>
      </div>

      {/* Action Banner */}
      <div className="p-8 rounded-2xl border border-[#00D9FF]/40 bg-gradient-to-r from-[#151D2E] via-[#111827] to-[#151D2E] text-center space-y-4 shadow-xl">
        <h3 className="text-xl font-bold text-[#F8FAFC]">
          Ready to inspect a suspicious communication?
        </h3>
        <p className="text-xs text-[#94A3B8] max-w-lg mx-auto">
          Test with preloaded real-world scenarios or paste your own message transcript.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onStartAnalyze}
            className="btn-primary-cyber text-xs py-2.5 px-5 flex items-center gap-2 cursor-pointer shadow-md"
          >
            <span>Analyze Custom Conversation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onExploreDemo}
            className="px-4 py-2.5 rounded-xl border border-[#263247] bg-[#0B1020] text-xs font-semibold text-[#CBD5E1] hover:text-white hover:border-[#00D9FF]/40 transition-colors cursor-pointer"
          >
            Explore 6 Demo Scenarios
          </button>
        </div>
      </div>
    </div>
  );
}
