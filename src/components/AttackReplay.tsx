import { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  RotateCcw, 
  ShieldAlert, 
  MessageSquare, 
  Zap
} from 'lucide-react';
import { ReplayStep, RiskLevel } from '../types';

interface AttackReplayProps {
  steps: ReplayStep[];
  onStepChange?: (stepIndex: number, stageName?: string) => void;
}

export function AttackReplay({ steps, onStepChange }: AttackReplayProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(2000); // ms per step
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const totalSteps = steps.length;
  const currentStep = steps[currentStepIndex] || steps[0];

  // Notify parent on step change
  useEffect(() => {
    if (onStepChange && currentStep) {
      onStepChange(currentStepIndex, currentStep.detection_stage);
    }
  }, [currentStepIndex, currentStep, onStepChange]);

  // Handle auto playback loop
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentStepIndex((prev) => {
          if (prev >= totalSteps - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, totalSteps, playbackSpeed]);

  const handlePlayToggle = () => {
    if (!isPlaying && currentStepIndex >= totalSteps - 1) {
      setCurrentStepIndex(0);
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setIsPlaying(false);
    if (currentStepIndex < totalSteps - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  const handlePrevious = () => {
    setIsPlaying(false);
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleRestart = () => {
    setIsPlaying(false);
    setCurrentStepIndex(0);
  };

  const getSeverityBadge = (severity?: RiskLevel | 'NONE') => {
    switch (severity) {
      case 'CRITICAL':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#EFA7A7]/30 text-[#871E1E] border border-[#EFA7A7]">CRITICAL</span>;
      case 'HIGH':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#F4B6A6]/35 text-[#9E3A24] border border-[#F4B6A6]">HIGH</span>;
      case 'MEDIUM':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#F6DFA4]/40 text-[#7A580D] border border-[#F6DFA4]">MODERATE</span>;
      case 'LOW':
        return <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#A8D5BA]/35 text-[#235738] border border-[#A8D5BA]">LOW</span>;
      default:
        return <span className="px-2 py-0.5 rounded-full text-[10px] font-mono text-[#68738A] bg-[#F0F2FF] border border-[#E2E4F3]">BASELINE</span>;
    }
  };

  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <div id="attack-replay-section" className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-[#F0F2FF] border border-[#E2E4F3] text-[#7C83FD]">
              <Play className="w-4 h-4 fill-current" />
            </span>
            <h3 className="text-lg font-extrabold text-[#27324A] tracking-tight">
              Attack Replay
            </h3>
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[#F0F2FF] text-[#7C83FD] border border-[#B8A9E8]/50">
              MESSAGE-BY-MESSAGE BREAKDOWN
            </span>
          </div>
          <p className="text-xs text-[#68738A] mt-1">
            Walk through the interaction chronologically to see how each statement advances the psychological trap.
          </p>
        </div>

        {/* Progress & Speed */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="text-xs font-mono text-[#68738A]">
            STEP <span className="text-[#27324A] font-bold">{currentStepIndex + 1}</span> OF {totalSteps}
          </div>
          <div className="flex items-center bg-white border border-[#E2E4F3] rounded-xl p-0.5 text-[10px] font-mono shadow-xs">
            <button
              onClick={() => setPlaybackSpeed(2500)}
              className={`px-2.5 py-1 rounded-lg cursor-pointer ${playbackSpeed === 2500 ? 'bg-[#7C83FD] text-white font-bold' : 'text-[#68738A]'}`}
            >
              1x
            </button>
            <button
              onClick={() => setPlaybackSpeed(1500)}
              className={`px-2.5 py-1 rounded-lg cursor-pointer ${playbackSpeed === 1500 ? 'bg-[#7C83FD] text-white font-bold' : 'text-[#68738A]'}`}
            >
              1.5x
            </button>
          </div>
        </div>
      </div>

      {/* Progress Track */}
      <div className="w-full h-1.5 bg-[#E2E4F3] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#7C83FD] to-[#8EC5FC] transition-all duration-300"
          style={{ width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }}
        />
      </div>

      {/* Replay Display Box */}
      <div className="rounded-2xl border border-[#E2E4F3] bg-white p-6 shadow-xs relative overflow-hidden space-y-6">
        {/* Step Message Bubble */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono font-semibold text-[#7C83FD] uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>MESSAGE FROM {currentStep.sender.toUpperCase()}</span>
            </span>
            <span className="text-[10px] font-mono text-[#68738A]">
              #{currentStep.step_number || currentStepIndex + 1}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#F0F2FF] border border-[#E2E4F3] text-sm sm:text-base font-mono text-[#27324A] leading-relaxed shadow-xs">
            "{currentStep.message}"
          </div>
        </div>

        {/* AI Detection & Tactical Why It Matters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {/* AI Detection */}
          <div className="p-4 rounded-xl bg-white border border-[#E2E4F3] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-[#68738A] uppercase font-semibold flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-[#7C83FD]" />
                <span>AI DETECTION</span>
              </span>
              {getSeverityBadge(currentStep.severity)}
            </div>
            <div className="text-sm font-bold text-[#27324A] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#7C83FD]" />
              <span>{currentStep.detection_stage || 'Contextual Interaction'}</span>
            </div>
          </div>

          {/* Why It Matters */}
          <div className="p-4 rounded-xl bg-white border border-[#E2E4F3] space-y-2">
            <span className="text-xs font-mono text-[#68738A] uppercase font-semibold flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-[#7C83FD]" />
              <span>AI EXPLANATION</span>
            </span>
            <p className="text-xs sm:text-sm text-[#68738A] leading-relaxed">
              {currentStep.tactical_breakdown || 'Establishes baseline trust or maintains engagement for subsequent high-risk requests.'}
            </p>
          </div>
        </div>

        {/* Playback Controls Bar */}
        <div className="pt-4 border-t border-[#E2E4F3] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              id="replay-btn-prev"
              type="button"
              disabled={currentStepIndex === 0}
              onClick={handlePrevious}
              className="p-2.5 rounded-xl border border-[#E2E4F3] bg-white text-[#27324A] hover:bg-[#F0F2FF] hover:border-[#7C83FD] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-xs"
              title="Previous message"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              id="replay-btn-play-pause"
              type="button"
              onClick={handlePlayToggle}
              className="btn-primary-cyber text-xs py-2 px-5 shadow-xs"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4 fill-current" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>{currentStepIndex >= totalSteps - 1 ? 'Replay' : 'Play'}</span>
                </>
              )}
            </button>

            <button
              id="replay-btn-next"
              type="button"
              disabled={currentStepIndex >= totalSteps - 1}
              onClick={handleNext}
              className="p-2.5 rounded-xl border border-[#E2E4F3] bg-white text-[#27324A] hover:bg-[#F0F2FF] hover:border-[#7C83FD] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-xs"
              title="Next message"
            >
              <SkipForward className="w-4 h-4" />
            </button>

            <button
              id="replay-btn-restart"
              type="button"
              onClick={handleRestart}
              className="p-2.5 rounded-xl border border-[#E2E4F3] bg-white text-[#68738A] hover:text-[#27324A] hover:bg-[#F0F2FF] transition-colors cursor-pointer shadow-xs"
              title="Restart from beginning"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Quick step jump indicators */}
          <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-1">
            {steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStepIndex(idx);
                }}
                className={`w-7 h-7 rounded-lg text-[10px] font-mono transition-all cursor-pointer flex items-center justify-center ${
                  idx === currentStepIndex
                    ? 'bg-[#7C83FD] text-white font-bold scale-105 shadow-xs'
                    : 'bg-white text-[#68738A] hover:text-[#27324A] hover:bg-[#F0F2FF] border border-[#E2E4F3]'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
