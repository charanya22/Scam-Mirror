import React from 'react';
import { 
  FlaskConical, 
  ArrowRight, 
  Sparkles, 
  Search, 
  Zap, 
  Building2, 
  Briefcase, 
  HeartHandshake, 
  Smartphone, 
  Gift, 
  Landmark,
  LogIn,
  ShieldCheck
} from 'lucide-react';
import { DEMO_SCENARIOS } from '../data/demoScenarios';
import { RiskLevel } from '../types';

interface LandingPageProps {
  onTryDemo: () => void;
  onAnalyzeNow?: () => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onSelectScenario: (scenarioId: string) => void;
}

export function LandingPage({
  onTryDemo,
  onAnalyzeNow,
  onOpenAuth,
  onSelectScenario,
}: LandingPageProps) {
  const getScenarioIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2': return <Building2 className="w-5 h-5 text-[#7C83FD]" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-[#8EC5FC]" />;
      case 'HeartHandshake': return <HeartHandshake className="w-5 h-5 text-[#B8A9E8]" />;
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-[#F6DFA4]" />;
      case 'Gift': return <Gift className="w-5 h-5 text-[#F4B6A6]" />;
      case 'Landmark': return <Landmark className="w-5 h-5 text-[#A8D5BA]" />;
      default: return <Sparkles className="w-5 h-5 text-[#7C83FD]" />;
    }
  };

  const getRiskBadge = (risk: RiskLevel) => {
    switch (risk) {
      case 'CRITICAL':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#EFA7A7]/30 text-[#871E1E] border border-[#EFA7A7]">CRITICAL</span>;
      case 'HIGH':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#F4B6A6]/35 text-[#9E3A24] border border-[#F4B6A6]">HIGH</span>;
      case 'MEDIUM':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#F6DFA4]/40 text-[#7A580D] border border-[#F6DFA4]">MODERATE</span>;
      case 'LOW':
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#A8D5BA]/35 text-[#235738] border border-[#A8D5BA]">LOW</span>;
    }
  };

  return (
    <div className="py-8 pb-16 space-y-12">
      {/* Hero Section with Soft Pastel Aesthetic */}
      <section className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-6 sm:pt-12">
        {/* Soft pastel ambient background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[540px] h-[300px] bg-gradient-to-tr from-[#8EC5FC]/20 via-[#B8A9E8]/20 to-[#7C83FD]/10 blur-[80px] pointer-events-none rounded-full" />

        {/* Brand Name / Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#E2E4F3] bg-white text-[#7C83FD] text-xs font-mono font-semibold mb-6 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-[#7C83FD] shadow-xs" />
          <span>SCAMMIRROR • AI CYBERSECURITY DEFENSE</span>
        </div>

        {/* Tagline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#27324A] tracking-tight max-w-4xl mx-auto leading-[1.15] mb-5">
          Don’t just detect the scam.{' '}
          <span className="text-[#7C83FD]">
            See the strategy behind it.
          </span>
        </h1>

        {/* Short description */}
        <p className="text-sm sm:text-base text-[#68738A] max-w-2xl mx-auto mb-8 leading-relaxed">
          Paste a suspicious conversation or upload a screenshot to uncover the progressive manipulation stages, risk score, and attacker strategy.
        </p>

        {/* Primary Buttons: TRY DEMO, ANALYZE NOW, LOGIN */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-12">
          <button
            id="hero-try-demo-btn"
            onClick={onTryDemo}
            className="btn-primary-cyber text-xs sm:text-sm"
          >
            <FlaskConical className="w-4 h-4" />
            <span>TRY DEMO</span>
          </button>

          <button
            id="hero-analyze-now-btn"
            onClick={onAnalyzeNow || onTryDemo}
            className="btn-secondary-cyber text-xs sm:text-sm"
          >
            <Search className="w-4 h-4" />
            <span>ANALYZE NOW</span>
          </button>

          <button
            id="hero-login-btn"
            onClick={() => onOpenAuth('login')}
            className="py-2.5 px-5 rounded-xl bg-white border border-[#E2E4F3] hover:border-[#7C83FD] hover:text-[#7C83FD] text-[#27324A] font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <LogIn className="w-4 h-4 text-[#68738A]" />
            <span>LOGIN</span>
          </button>
        </div>
      </section>

      {/* 6 Preloaded Demo Scenarios (Fast Judge Evaluation) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-[#E2E4F3]">
          <div>
            <h2 className="text-lg font-bold text-[#27324A] tracking-tight flex items-center gap-2">
              <span>Try Preloaded Scenarios</span>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#F0F2FF] text-[#7C83FD] border border-[#B8A9E8]/50 font-semibold">
                1-CLICK ANALYSIS
              </span>
            </h2>
            <p className="text-xs text-[#68738A] mt-0.5">
              Select any realistic scam pattern below to immediately run AI attack reconstruction.
            </p>
          </div>
          <button
            onClick={onTryDemo}
            className="text-xs font-mono font-semibold text-[#7C83FD] hover:text-[#6D74F7] flex items-center gap-1 self-start sm:self-auto cursor-pointer"
          >
            <span>Explore All Scenarios</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {DEMO_SCENARIOS.map((scen) => (
            <div
              key={scen.id}
              id={`landing-scenario-card-${scen.id}`}
              className="cyber-card-interactive p-5 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="p-2.5 rounded-xl bg-[#F0F2FF] border border-[#E2E4F3]">
                    {getScenarioIcon(scen.icon)}
                  </div>
                  {getRiskBadge(scen.risk_level)}
                </div>

                <h3 className="text-sm font-bold text-[#27324A] group-hover:text-[#7C83FD] transition-colors">
                  {scen.title}
                </h3>
                <p className="text-xs text-[#68738A] leading-relaxed line-clamp-2">
                  {scen.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#E2E4F3]">
                <button
                  id={`btn-instant-analyze-${scen.id}`}
                  onClick={() => onSelectScenario(scen.id)}
                  className="w-full btn-primary-cyber text-xs py-2 shadow-xs"
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>Instant Analyze</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
