import { useState } from 'react';
import { 
  Building2, 
  Briefcase, 
  HeartHandshake, 
  Smartphone, 
  Gift, 
  Landmark, 
  FlaskConical, 
  ArrowRight, 
  ShieldAlert, 
  CheckCircle2, 
  Sparkles,
  Zap,
  Info
} from 'lucide-react';
import { DEMO_SCENARIOS } from '../data/demoScenarios';
import { DemoScenario, RiskLevel } from '../types';

interface DemoScenarioSelectorProps {
  onSelectScenario: (scenario: DemoScenario, autoAnalyze?: boolean) => void;
  onCustomAnalyze: () => void;
}

export function DemoScenarioSelector({
  onSelectScenario,
  onCustomAnalyze,
}: DemoScenarioSelectorProps) {
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [selectedId, setSelectedId] = useState<string>('bank-impersonation');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="w-5 h-5 text-cyan-400" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-blue-400" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-rose-400" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-amber-400" />;
      case 'Gift': return <Gift className="w-5 h-5 text-purple-400" />;
      case 'Landmark': return <Landmark className="w-5 h-5 text-emerald-400" />;
      default: return <ShieldAlert className="w-5 h-5 text-cyan-400" />;
    }
  };

  const getRiskBadge = (risk: RiskLevel) => {
    switch (risk) {
      case 'CRITICAL':
        return <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30">CRITICAL RISK</span>;
      case 'HIGH':
        return <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#F97316]/15 text-[#F97316] border border-[#F97316]/30">HIGH RISK</span>;
      case 'MEDIUM':
        return <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30">MEDIUM RISK</span>;
      case 'LOW':
        return <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30">LOW RISK</span>;
    }
  };

  const selectedScenario = DEMO_SCENARIOS.find((s) => s.id === selectedId) || DEMO_SCENARIOS[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Demo Welcome Modal (Judge Quick Start requirement) */}
      {showWelcomeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1020]/85 backdrop-blur-md animate-in fade-in duration-200">
          <div 
            id="demo-mode-intro-card"
            className="w-full max-w-lg rounded-2xl border border-[#00D9FF]/30 bg-[#151D2E] p-6 sm:p-8 shadow-2xl text-[#F8FAFC] text-center relative overflow-hidden"
          >
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#00D9FF]/10 border border-[#00D9FF]/30 flex items-center justify-center mb-4 text-[#00D9FF]">
              <FlaskConical className="w-7 h-7" />
            </div>

            <span className="inline-block text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/30 mb-3">
              DEMO LAB
            </span>

            <h2 className="text-2xl font-extrabold text-[#F8FAFC] tracking-tight mb-2">
              Explore ScamMirror
            </h2>
            <p className="text-sm text-[#94A3B8] max-w-md mx-auto mb-6 leading-relaxed">
              Explore ScamMirror using realistic fictional cases designed for hackathon judges. No account or credentials required.
            </p>

            <div className="p-4 rounded-xl bg-[#0B1020] border border-[#263247] text-left mb-6 space-y-2 text-xs text-[#CBD5E1]">
              <div className="flex items-center gap-2 text-[#00D9FF] font-medium">
                <Sparkles className="w-4 h-4 shrink-0" />
                <span>Recommended 2-minute Hackathon Journey:</span>
              </div>
              <p className="text-[#94A3B8] pl-6">
                1. Select <span className="text-[#F8FAFC] font-medium">Bank Impersonation</span> (default)
                <br />
                2. Click <span className="text-[#F8FAFC] font-medium">Analyze Demo</span>
                <br />
                3. Inspect the <span className="text-[#00D9FF] font-medium">Attack Strategy Map</span> & <span className="text-[#22C55E] font-medium">Attack Replay</span>
              </p>
            </div>

            <button
              id="demo-modal-explore-btn"
              onClick={() => setShowWelcomeModal(false)}
              className="w-full btn-primary-cyber py-3 px-6 text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Demo Scenarios</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-semibold bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/30 font-mono">
              <FlaskConical className="w-3.5 h-3.5" />
              DEMO LAB
            </span>
            <span className="text-xs text-[#64748B] font-mono">6 REALISTIC FICTIONAL CASES</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#F8FAFC] tracking-tight">
            Choose a scenario
          </h1>
          <p className="text-sm text-[#94A3B8] mt-1 max-w-2xl">
            Select a preloaded social-engineering conversation to reconstruct how the attacker maneuvers through authority, panic, and isolation.
          </p>
        </div>

        <button
          onClick={onCustomAnalyze}
          className="self-start md:self-auto px-4 py-2 rounded-xl border border-[#263247] bg-[#151D2E] text-xs font-medium text-[#CBD5E1] hover:text-white hover:border-[#00D9FF]/40 transition-colors flex items-center gap-2 cursor-pointer"
        >
          <span>Paste Custom Conversation</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#00D9FF]" />
        </button>
      </div>

      {/* Grid of scenarios */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {DEMO_SCENARIOS.map((scen) => {
          const isSelected = selectedId === scen.id;
          return (
            <div
              key={scen.id}
              id={`scenario-card-${scen.id}`}
              onClick={() => setSelectedId(scen.id)}
              className={`rounded-2xl border p-5 transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden group ${
                isSelected
                  ? 'border-[#00D9FF] bg-[#151D2E] shadow-xl shadow-[#00D9FF]/10'
                  : 'border-[#263247] bg-[#151D2E]/70 hover:border-[#263247] hover:bg-[#151D2E]'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-[#0B1020] border border-[#263247] group-hover:scale-105 transition-transform">
                    {getIcon(scen.icon)}
                  </div>
                  {getRiskBadge(scen.risk_level)}
                </div>

                <h3 className="text-base font-bold text-[#F8FAFC] mb-1 group-hover:text-[#00D9FF] transition-colors">
                  {scen.title}
                </h3>
                <p className="text-xs text-[#94A3B8] mb-3 line-clamp-2">
                  {scen.description}
                </p>

                <div className="flex items-center gap-2 mb-4 text-[11px] text-[#94A3B8]">
                  <span className="font-mono text-[#64748B] uppercase">TYPE:</span>
                  <span className="text-[#CBD5E1] font-medium truncate">{scen.attack_type}</span>
                  <span className="text-[#64748B]">•</span>
                  <span className="text-[#94A3B8]">{scen.difficulty}</span>
                </div>

                {/* Tacticals preview tags */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {scen.expected_tactics.slice(0, 3).map((t, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#0B1020] text-[#CBD5E1] border border-[#263247]"
                    >
                      {t}
                    </span>
                  ))}
                  {scen.expected_tactics.length > 3 && (
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#0B1020] text-[#64748B]">
                      +{scen.expected_tactics.length - 3}
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-[#263247] flex items-center justify-between gap-2">
                <button
                  id={`btn-analyze-demo-${scen.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectScenario(scen, true);
                  }}
                  className="w-full btn-primary-cyber py-2 px-3 text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>Analyze Demo</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Scenario Preview Banner */}
      {selectedScenario && (
        <div className="cyber-card p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-semibold text-[#00D9FF] uppercase">
                ACTIVE SELECTION PREVIEW
              </span>
              <span className="text-[#64748B]">•</span>
              <span className="text-xs text-[#94A3B8]">{selectedScenario.title}</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#0B1020] border border-[#263247] font-mono text-xs text-[#CBD5E1] max-h-36 overflow-y-auto whitespace-pre-wrap leading-relaxed">
              {selectedScenario.conversation}
            </div>
          </div>

          <div className="shrink-0 w-full lg:w-auto">
            <button
              id="selected-scenario-run-btn"
              onClick={() => onSelectScenario(selectedScenario, true)}
              className="w-full lg:w-auto btn-primary-cyber py-3 px-6 text-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Launch Full Attack Reconstruction</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
