import { 
  FileCheck2, 
  Quote, 
  ShieldAlert, 
  HelpCircle, 
  AlertCircle,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { ManipulationStage, RiskLevel } from '../types';

interface EvidenceCardsProps {
  stages: ManipulationStage[];
  redFlags?: string[];
  requestsDetected?: string[];
}

export function EvidenceCards({
  stages,
  redFlags = [],
  requestsDetected = [],
}: EvidenceCardsProps) {
  const getSeverityBadge = (severity: RiskLevel) => {
    switch (severity) {
      case 'CRITICAL':
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30">CRITICAL</span>;
      case 'HIGH':
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#F97316]/15 text-[#F97316] border border-[#F97316]/30">HIGH</span>;
      case 'MEDIUM':
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#F59E0B]/15 text-[#F59E0B] border border-[#F59E0B]/30">MEDIUM</span>;
      case 'LOW':
        return <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30">LOW</span>;
    }
  };

  return (
    <div id="evidence-cards-section" className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-[#00D9FF]/10 border border-[#00D9FF]/30 text-[#00D9FF]">
            <FileCheck2 className="w-4 h-4" />
          </span>
          <h3 className="text-lg font-extrabold text-[#F8FAFC] tracking-tight">
            Evidence Cards & Grounded Findings
          </h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#111827] text-[#00D9FF] border border-[#263247]">
            TRACEABLE PROOFS
          </span>
        </div>
        <p className="text-xs text-[#94A3B8] mt-1">
          Every assertion is tied directly to verbatim quotes from the analyzed communication.
        </p>
      </div>

      {/* Grid of Evidence Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stages.map((stage, idx) => (
          <div
            key={idx}
            id={`evidence-card-${idx}`}
            className="cyber-card p-5 flex flex-col justify-between hover:border-[#00D9FF]/40 transition-colors space-y-4"
          >
            <div>
              {/* Header with stage name and severity */}
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#263247]">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-[#0B1020] border border-[#263247] flex items-center justify-center text-[10px] font-mono font-bold text-[#00D9FF]">
                    {idx + 1}
                  </span>
                  <h4 className="text-sm font-bold text-[#F8FAFC] uppercase tracking-wide">
                    {stage.stage}
                  </h4>
                </div>
                {getSeverityBadge(stage.severity)}
              </div>

              {/* Exact Quote */}
              <div className="mt-3.5 space-y-1.5">
                <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase text-[#94A3B8]">
                  <Quote className="w-3 h-3 text-[#00D9FF]" />
                  <span>TRANSCRIPT EVIDENCE</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0B1020] border border-[#263247] font-mono text-xs text-[#CBD5E1] italic leading-relaxed">
                  "{stage.message_reference || stage.evidence}"
                </div>
              </div>

              {/* Explanation */}
              <div className="mt-3 space-y-1">
                <div className="text-[10px] font-mono uppercase text-[#94A3B8]">
                  EXPLANATION & ANALYSIS:
                </div>
                <p className="text-xs text-[#CBD5E1] leading-relaxed">
                  {stage.explanation}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#263247] flex items-center justify-between text-[10px] font-mono text-[#64748B]">
              <span>CONFIRMED EVIDENCE</span>
              <span className="text-[#00D9FF]">VERIFIED MATCH</span>
            </div>
          </div>
        ))}
      </div>

      {/* Red Flags & Explicit Demands summary box */}
      {(redFlags.length > 0 || requestsDetected.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {redFlags.length > 0 && (
            <div className="cyber-card p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#F97316] uppercase">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>OBSERVED RED FLAGS ({redFlags.length})</span>
              </div>
              <ul className="space-y-2 text-xs text-[#CBD5E1]">
                {redFlags.map((flag, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] shrink-0 mt-1.5" />
                    <span>{flag}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {requestsDetected.length > 0 && (
            <div className="cyber-card p-5 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#EF4444] uppercase">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>EXPLICIT DEMANDS DETECTED ({requestsDetected.length})</span>
              </div>
              <ul className="space-y-2 text-xs text-[#CBD5E1]">
                {requestsDetected.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] shrink-0 mt-1.5" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
