import React from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle, 
  Target, 
  Coins, 
  Info, 
  KeyRound, 
  Clock, 
  UserX, 
  Lock, 
  Link as LinkIcon,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { RiskLevel } from '../types';

interface RiskDashboardProps {
  overallRisk: RiskLevel;
  riskScore: number;
  attackerObjective: string;
  targetedAssets: string[];
  summary: string;
  confidence?: number;
  redFlags?: string[];
  requestsDetected?: string[];
}

export function RiskDashboard({
  overallRisk,
  riskScore,
  attackerObjective,
  targetedAssets,
  summary,
  confidence = 94,
  redFlags = [],
  requestsDetected = [],
}: RiskDashboardProps) {
  // Soft pastel risk metadata
  const getRiskDetails = (risk: RiskLevel) => {
    switch (risk) {
      case 'CRITICAL':
        return {
          title: 'CRITICAL THREAT',
          badgeText: '#871E1E',
          badgeBg: 'bg-[#EFA7A7]/30 border-[#EFA7A7]',
          dotColor: '#EFA7A7',
          textColor: '#A82D2D',
          glow: '0 4px 20px rgba(239, 167, 167, 0.25)',
          barColor: '#EFA7A7',
          icon: <ShieldAlert className="w-4 h-4 text-[#A82D2D]" />,
        };
      case 'HIGH':
        return {
          title: 'HIGH RISK',
          badgeText: '#9E3A24',
          badgeBg: 'bg-[#F4B6A6]/35 border-[#F4B6A6]',
          dotColor: '#F4B6A6',
          textColor: '#9E3A24',
          glow: '0 4px 20px rgba(244, 182, 166, 0.25)',
          barColor: '#F4B6A6',
          icon: <AlertTriangle className="w-4 h-4 text-[#9E3A24]" />,
        };
      case 'MEDIUM':
        return {
          title: 'MODERATE RISK',
          badgeText: '#7A580D',
          badgeBg: 'bg-[#F6DFA4]/40 border-[#F6DFA4]',
          dotColor: '#F6DFA4',
          textColor: '#7A580D',
          glow: '0 4px 20px rgba(246, 223, 164, 0.25)',
          barColor: '#F6DFA4',
          icon: <AlertCircle className="w-4 h-4 text-[#7A580D]" />,
        };
      case 'LOW':
      default:
        return {
          title: 'LOW RISK',
          badgeText: '#235738',
          badgeBg: 'bg-[#A8D5BA]/35 border-[#A8D5BA]',
          dotColor: '#A8D5BA',
          textColor: '#235738',
          glow: '0 4px 20px rgba(168, 213, 186, 0.25)',
          barColor: '#A8D5BA',
          icon: <ShieldCheck className="w-4 h-4 text-[#235738]" />,
        };
    }
  };

  const riskMeta = getRiskDetails(overallRisk);

  // Common contributing signals check
  const signals = [
    {
      name: 'Urgency Pressure',
      active: /urgent|minute|hurry|expire|immediately|fast/i.test(summary + redFlags.join(' ')),
      icon: <Clock className="w-3.5 h-3.5" />,
    },
    {
      name: 'False Authority',
      active: /authority|department|officer|police|bank|inspector|certified/i.test(summary + redFlags.join(' ')),
      icon: <Target className="w-3.5 h-3.5" />,
    },
    {
      name: 'Social Isolation',
      active: /isolation|secret|confidential|disconnect|don't tell/i.test(summary + redFlags.join(' ')),
      icon: <UserX className="w-3.5 h-3.5" />,
    },
    {
      name: 'Financial Request',
      active: /money|transfer|fee|deposit|₹|\$|pay|bond/i.test(summary + requestsDetected.join(' ')),
      icon: <Coins className="w-3.5 h-3.5" />,
    },
    {
      name: 'Credential Solicitation',
      active: /otp|pin|password|credential|card|account/i.test(summary + requestsDetected.join(' ')),
      icon: <KeyRound className="w-3.5 h-3.5" />,
    },
    {
      name: 'Remote / Link Coercion',
      active: /link|software|remote|anydesk|download|click/i.test(summary + requestsDetected.join(' ')),
      icon: <LinkIcon className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <div id="risk-dashboard-section" className="space-y-6">
      {/* Top Banner: Score & Objective Grid in Soft Pastel Theme */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Risk Score Meter Card (5 cols) */}
        <div 
          className="lg:col-span-5 rounded-2xl border border-[#E2E4F3] bg-white p-6 shadow-[0_4px_20px_rgba(124,131,253,0.08)] relative overflow-hidden flex flex-col justify-between"
          style={{ boxShadow: riskMeta.glow }}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-[#68738A] font-bold tracking-wider">
                RISK EVALUATION
              </span>
              <span 
                className={`px-3 py-1 rounded-full text-xs font-bold border ${riskMeta.badgeBg} flex items-center gap-1.5`}
                style={{ color: riskMeta.badgeText }}
              >
                {riskMeta.icon}
                <span>{riskMeta.title}</span>
              </span>
            </div>

            {/* Large Score Display with Pastel Risk Color */}
            <div className="flex items-baseline gap-3 my-1">
              <span 
                className="text-5xl sm:text-6xl font-extrabold tracking-tight font-mono transition-colors"
                style={{ color: riskMeta.textColor }}
              >
                {riskScore}
              </span>
              <span className="text-lg font-mono text-[#68738A]">/ 100</span>
              <span className="text-xs font-mono text-[#68738A] ml-auto">
                CONFIDENCE: <strong className="text-[#27324A]">{confidence}%</strong>
              </span>
            </div>

            {/* Elegant Pastel Risk Meter: Pastel Green (#A8D5BA) -> Pastel Yellow (#F6DFA4) -> Pastel Orange (#F4B6A6) -> Pastel Red (#EFA7A7) */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center justify-between text-[11px] font-mono text-[#68738A]">
                <span>THREAT SPECTRUM</span>
                <span className="font-semibold text-[#27324A]">METER: {riskScore}%</span>
              </div>

              {/* Gradient Track Container */}
              <div className="relative w-full h-4 rounded-full p-0.5 bg-[#F0F2FF] border border-[#E2E4F3] overflow-hidden">
                {/* Full Soft Pastel Gradient Base */}
                <div 
                  className="w-full h-full rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, #A8D5BA 0%, #F6DFA4 35%, #F4B6A6 70%, #EFA7A7 100%)'
                  }}
                />

                {/* Score Indicator Pin Overlay */}
                <div 
                  className="absolute top-0 bottom-0 w-2.5 bg-white border border-[#27324A]/40 rounded-full shadow-md transition-all duration-700 -ml-1.5"
                  style={{
                    left: `${Math.max(3, Math.min(97, riskScore))}%`
                  }}
                />
              </div>

              {/* Pastel Spectrum Segment Legend */}
              <div className="grid grid-cols-4 gap-1 text-[10px] font-mono pt-1 text-center">
                <div className="flex items-center justify-center gap-1 text-[#235738]">
                  <span className="w-2 h-2 rounded-full bg-[#A8D5BA]" />
                  <span>Low (0-25)</span>
                </div>
                <div className="flex items-center justify-center gap-1 text-[#7A580D]">
                  <span className="w-2 h-2 rounded-full bg-[#F6DFA4]" />
                  <span>Mod (26-55)</span>
                </div>
                <div className="flex items-center justify-center gap-1 text-[#9E3A24]">
                  <span className="w-2 h-2 rounded-full bg-[#F4B6A6]" />
                  <span>High (56-80)</span>
                </div>
                <div className="flex items-center justify-center gap-1 text-[#A82D2D]">
                  <span className="w-2 h-2 rounded-full bg-[#EFA7A7]" />
                  <span>Crit (81+)</span>
                </div>
              </div>
            </div>

            {/* Contributing Signals Checklist */}
            <div className="pt-2">
              <div className="text-[11px] font-mono text-[#68738A] uppercase mb-2 font-semibold">
                CONTRIBUTING SIGNALS:
              </div>
              <div className="grid grid-cols-2 gap-2">
                {signals.map((sig, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-xl text-xs flex items-center gap-2 border transition-colors ${
                      sig.active
                        ? 'bg-[#F0F2FF] text-[#27324A] border-[#B8A9E8]/50 font-medium'
                        : 'bg-white/60 text-[#68738A]/60 border-[#E2E4F3] opacity-60'
                    }`}
                  >
                    <span className={sig.active ? 'text-[#7C83FD]' : 'text-[#68738A]'}>
                      {sig.icon}
                    </span>
                    <span className="truncate">{sig.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mandatory Heuristic Disclaimer */}
          <div className="mt-5 pt-3 border-t border-[#E2E4F3] flex items-start gap-2 text-[11px] text-[#68738A] leading-normal">
            <Info className="w-3.5 h-3.5 text-[#7C83FD] shrink-0 mt-0.5" />
            <p>
              This is an AI-generated heuristic indicator, not a scientifically validated probability.
            </p>
          </div>
        </div>

        {/* Probable Attacker Objective & Targeted Assets (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-[#E2E4F3] bg-white p-6 shadow-[0_4px_20px_rgba(124,131,253,0.08)] flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E4F3]">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-[#F0F2FF] border border-[#E2E4F3] text-[#7C83FD]">
                  <Target className="w-4 h-4" />
                </span>
                <h4 className="text-sm font-bold text-[#27324A] tracking-wide uppercase font-mono">
                  PROBABLE OBJECTIVE
                </h4>
              </div>
              <span className="text-[10px] font-mono text-[#68738A] uppercase font-semibold">
                STRATEGIC TARGET
              </span>
            </div>

            {/* Attacker Endgame Card in Light Card Background #F0F2FF */}
            <div className="p-4 rounded-xl bg-[#F0F2FF] border border-[#E2E4F3]">
              <div className="text-xs font-mono text-[#7C83FD] uppercase mb-1 font-bold">
                ATTACKER ENDGAME:
              </div>
              <p className="text-base sm:text-lg font-bold text-[#27324A] leading-snug">
                {attackerObjective || 'Financial exploitation through coercive social manipulation'}
              </p>
            </div>

            {/* Targeted Assets */}
            <div>
              <div className="text-xs font-mono text-[#68738A] uppercase mb-2 flex items-center justify-between font-semibold">
                <span>TARGETED ASSETS:</span>
                <span className="text-[10px] text-[#68738A] font-normal">EXPOSED IN TRANSCRIPT</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {targetedAssets.map((asset, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium bg-[#F0F2FF] text-[#27324A] border border-[#E2E4F3] flex items-center gap-1.5 shadow-sm"
                  >
                    <Coins className="w-3.5 h-3.5 text-[#7C83FD]" />
                    <span>{asset}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Executive Summary in Light Card Background */}
            <div className="pt-1">
              <div className="text-xs font-mono text-[#68738A] uppercase mb-1 font-semibold">
                EXECUTIVE SUMMARY:
              </div>
              <p className="text-xs sm:text-sm text-[#27324A] leading-relaxed bg-[#F0F2FF] p-3.5 rounded-xl border border-[#E2E4F3]">
                {summary}
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-[#E2E4F3] text-[11px] text-[#68738A] font-mono flex items-center justify-between">
            <span>AI inference grounded on available conversation evidence.</span>
            <span className="text-[#7C83FD] font-semibold">ZERO-TRUST VERIFICATION</span>
          </div>
        </div>
      </div>
    </div>
  );
}
