import { useState } from 'react';
import { 
  ArrowRight, 
  Activity,
  Zap,
  Target
} from 'lucide-react';
import { ManipulationStage, RiskLevel } from '../types';

interface AttackStrategyMapProps {
  stages: ManipulationStage[];
  activeStageIndex?: number | null;
  onSelectStage?: (index: number) => void;
}

export function AttackStrategyMap({
  stages,
  activeStageIndex = null,
  onSelectStage,
}: AttackStrategyMapProps) {
  const [selectedStageIdx, setSelectedStageIdx] = useState<number>(0);

  const currentIdx = activeStageIndex !== null && activeStageIndex !== undefined ? activeStageIndex : selectedStageIdx;
  const currentStage = stages[currentIdx] || stages[0];

  const getSeverityColor = (severity: RiskLevel, isSelected: boolean) => {
    switch (severity) {
      case 'CRITICAL':
        return {
          bg: 'bg-white',
          border: isSelected ? 'border-[#EFA7A7] ring-2 ring-[#EFA7A7]' : 'border-[#EFA7A7]',
          text: 'text-[#871E1E]',
          dot: 'bg-[#EFA7A7]',
          glow: isSelected 
            ? '0 4px 16px rgba(239, 167, 167, 0.35)' 
            : '0 2px 8px rgba(239, 167, 167, 0.15)',
          badge: 'bg-[#EFA7A7]/30 text-[#871E1E] border-[#EFA7A7]',
          icon: '🔴',
        };
      case 'HIGH':
        return {
          bg: 'bg-white',
          border: isSelected ? 'border-[#F4B6A6] ring-2 ring-[#F4B6A6]' : 'border-[#F4B6A6]',
          text: 'text-[#9E3A24]',
          dot: 'bg-[#F4B6A6]',
          glow: isSelected 
            ? '0 4px 16px rgba(244, 182, 166, 0.35)' 
            : '0 2px 8px rgba(244, 182, 166, 0.15)',
          badge: 'bg-[#F4B6A6]/35 text-[#9E3A24] border-[#F4B6A6]',
          icon: '🟠',
        };
      case 'MEDIUM':
        return {
          bg: 'bg-white',
          border: isSelected ? 'border-[#F6DFA4] ring-2 ring-[#F6DFA4]' : 'border-[#F6DFA4]',
          text: 'text-[#7A580D]',
          dot: 'bg-[#F6DFA4]',
          glow: isSelected 
            ? '0 4px 16px rgba(246, 223, 164, 0.35)' 
            : '0 2px 8px rgba(246, 223, 164, 0.15)',
          badge: 'bg-[#F6DFA4]/40 text-[#7A580D] border-[#F6DFA4]',
          icon: '🟡',
        };
      case 'LOW':
      default:
        return {
          bg: 'bg-white',
          border: isSelected ? 'border-[#A8D5BA] ring-2 ring-[#A8D5BA]' : 'border-[#E2E4F3]',
          text: isSelected ? 'text-[#235738]' : 'text-[#68738A]',
          dot: 'bg-[#A8D5BA]',
          glow: isSelected 
            ? '0 4px 16px rgba(168, 213, 186, 0.35)' 
            : '0 2px 6px rgba(0, 0, 0, 0.03)',
          badge: 'bg-[#A8D5BA]/35 text-[#235738] border-[#A8D5BA]',
          icon: '🟢',
        };
    }
  };

  if (!stages || stages.length === 0) {
    return (
      <div className="p-8 rounded-2xl border border-[#E2E4F3] bg-white text-center text-[#68738A] text-xs">
        No progressive manipulation stages detected in this sample.
      </div>
    );
  }

  return (
    <div id="attack-strategy-map-section" className="space-y-6">
      {/* Title & Legend */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-[#F0F2FF] border border-[#E2E4F3] text-[#7C83FD]">
              <Activity className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-extrabold text-[#27324A] tracking-tight">
              Attack Strategy Map
            </h3>
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#F0F2FF] text-[#7C83FD] border border-[#B8A9E8]/50">
              STAGE RECONSTRUCTION
            </span>
          </div>
          <p className="text-xs text-[#68738A] mt-1">
            Reconstructed psychological escalation path. Click any stage to inspect evidence and manipulation mechanism.
          </p>
        </div>

        {/* Severity Legend */}
        <div className="flex items-center gap-2.5 text-[10px] font-mono text-[#68738A] self-start sm:self-auto bg-white px-3 py-1.5 rounded-xl border border-[#E2E4F3] shadow-xs">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#A8D5BA] inline-block" /> Low</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#F6DFA4] inline-block" /> Moderate</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#F4B6A6] inline-block" /> High</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#EFA7A7] inline-block" /> Critical</span>
        </div>
      </div>

      {/* Visual Pipeline Flow Container with connected nodes and thin pastel lines */}
      <div className="p-6 rounded-2xl border border-[#E2E4F3] bg-white shadow-xs overflow-x-auto">
        <div className="min-w-[620px] flex items-center justify-between gap-1 relative py-4">
          {stages.map((stage, idx) => {
            const isSelected = idx === currentIdx;
            const style = getSeverityColor(stage.severity, isSelected);
            const isLast = idx === stages.length - 1;

            return (
              <div key={idx} className="flex items-center flex-1 last:flex-none">
                {/* Stage Node */}
                <div
                  id={`strategy-stage-node-${idx}`}
                  onClick={() => {
                    setSelectedStageIdx(idx);
                    if (onSelectStage) onSelectStage(idx);
                  }}
                  style={{ boxShadow: style.glow }}
                  className={`w-full group cursor-pointer transition-all duration-200 relative p-3.5 rounded-xl border flex flex-col justify-between min-h-[104px] bg-white ${
                    isSelected
                      ? `${style.border} scale-105 z-10`
                      : `${style.border} hover:border-[#7C83FD]/70 hover:scale-[1.02]`
                  }`}
                >
                  {/* Top indicator & step number */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono text-[#68738A] font-bold">
                      STAGE {idx + 1}
                    </span>
                    <span className="text-xs">{style.icon}</span>
                  </div>

                  {/* Stage title */}
                  <div className="text-xs font-bold text-[#27324A] group-hover:text-[#7C83FD] transition-colors line-clamp-2 leading-snug">
                    {stage.stage}
                  </div>

                  {/* Severity badge */}
                  <div className="mt-2.5 flex items-center justify-between">
                    <span className={`text-[9px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-full border ${style.badge}`}>
                      {stage.severity}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#7C83FD] shadow-xs" />
                    )}
                  </div>
                </div>

                {/* Thin Soft Pastel Connected Line */}
                {!isLast && (
                  <div className="px-1.5 flex items-center justify-center shrink-0">
                    <div className="w-5 sm:w-7 h-[2px] bg-[#E2E4F3] relative">
                      <ArrowRight className="w-3 h-3 text-[#7C83FD] absolute -top-[5px] -right-1" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Detail Inspector Card for Active Stage */}
      {currentStage && (
        <div 
          id="stage-detail-inspector"
          className="rounded-2xl border border-[#E2E4F3] bg-white p-5 sm:p-6 shadow-xs relative overflow-hidden"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[#E2E4F3]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#F0F2FF] border border-[#E2E4F3] flex items-center justify-center text-lg">
                {getSeverityColor(currentStage.severity, true).icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono uppercase text-[#68738A] font-semibold">
                    STAGE {currentIdx + 1} OF {stages.length}
                  </span>
                  <span className="text-[#E2E4F3]">•</span>
                  <span className="text-[10px] font-mono text-[#7C83FD] font-semibold uppercase">
                    ACTIVE STAGE INSPECTION
                  </span>
                </div>
                <h4 className="text-lg font-bold text-[#27324A] tracking-tight">
                  {currentStage.stage}
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className={`px-2.5 py-1 rounded-full text-xs font-mono font-bold border ${getSeverityColor(currentStage.severity, true).badge}`}>
                {currentStage.severity} SEVERITY
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Conversation Evidence */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#68738A] font-semibold">
                <Target className="w-3.5 h-3.5 text-[#7C83FD]" />
                <span>EVIDENCE FROM CONVERSATION</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F0F2FF] border border-[#E2E4F3] text-xs sm:text-sm font-mono text-[#27324A] italic leading-relaxed">
                "{currentStage.message_reference || currentStage.evidence}"
              </div>
              {currentStage.evidence && currentStage.evidence !== currentStage.message_reference && (
                <p className="text-xs text-[#68738A] leading-relaxed pt-1">
                  <span className="text-[#27324A] font-medium">Tactical Observation: </span>
                  {currentStage.evidence}
                </p>
              )}
            </div>

            {/* Why It Matters / Psychological Mechanism */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-mono text-[#68738A] font-semibold">
                <Zap className="w-3.5 h-3.5 text-[#7C83FD]" />
                <span>WHY IT IS SUSPICIOUS (PSYCHOLOGICAL EXPLOITATION)</span>
              </div>
              <div className="p-3.5 rounded-xl bg-[#F0F2FF] border border-[#E2E4F3] text-xs sm:text-sm text-[#27324A] leading-relaxed">
                {currentStage.explanation}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
