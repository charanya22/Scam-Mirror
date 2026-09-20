import React from 'react';
import { 
  Plus, 
  Upload, 
  FlaskConical, 
  History, 
  ShieldAlert, 
  ArrowRight, 
  Play, 
  FileText, 
  Clock, 
  Trash2, 
  Activity,
  User as UserIcon,
  CheckCircle2
} from 'lucide-react';
import { UserProfile, AnalysisResult, RiskLevel } from '../types';
import { ScamMirrorLogo } from './ScamMirrorLogo';

interface DashboardProps {
  user: UserProfile;
  analyses: AnalysisResult[];
  onStartAnalyze: () => void;
  onUploadScreenshot: () => void;
  onEnterDemo: () => void;
  onViewAnalysis: (analysis: AnalysisResult) => void;
  onReplayAnalysis: (analysis: AnalysisResult) => void;
  onDeleteAnalysis: (id: string) => void;
}

export function Dashboard({
  user,
  analyses,
  onStartAnalyze,
  onUploadScreenshot,
  onEnterDemo,
  onViewAnalysis,
  onReplayAnalysis,
  onDeleteAnalysis,
}: DashboardProps) {
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Welcome Banner with Prominent ScamMirror Logo */}
      <div className="cyber-card p-6 sm:p-8 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-white border border-[#E2E4F3] shadow-[0_4px_20px_rgba(124,131,253,0.06)]">
        <div className="max-w-2xl space-y-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#7C83FD]" />
            <span className="text-xs font-mono uppercase text-[#7C83FD] font-semibold tracking-wider">
              CYBERSECURITY SOC DASHBOARD
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#27324A] tracking-tight">
            Welcome back, {user.name}
          </h1>
          <p className="text-xs sm:text-sm text-[#68738A] leading-relaxed">
            Monitor, inspect, and reconstruct social-engineering manipulation vectors targeting your communications.
          </p>
        </div>

        {/* Prominent Logo on Dashboard */}
        <div className="p-3.5 rounded-2xl bg-[#F0F2FF] border border-[#E2E4F3] shrink-0 hidden sm:block">
          <ScamMirrorLogo size="md" showTagline={true} />
        </div>
      </div>

      {/* Action Cards in Soft Pastel Palette */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div
          id="dash-card-analyze"
          onClick={onStartAnalyze}
          className="cyber-card-interactive p-6 cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#F0F2FF] border border-[#B8A9E8]/50 text-[#7C83FD] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-xs">
              <Plus className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#27324A] mb-1 group-hover:text-[#7C83FD] transition-colors">
              Analyze New Conversation
            </h3>
            <p className="text-xs text-[#68738A] leading-relaxed mb-6">
              Paste suspicious chat transcripts from messaging apps or SMS for real-time manipulation stage reconstruction.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#7C83FD] group-hover:translate-x-1 transition-transform">
            <span>Launch Analysis</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        <div
          id="dash-card-upload"
          onClick={onUploadScreenshot}
          className="cyber-card-interactive p-6 cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#F0F2FF] border border-[#8EC5FC]/60 text-[#7C83FD] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-xs">
              <Upload className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#27324A] mb-1 group-hover:text-[#7C83FD] transition-colors">
              Upload Screenshot
            </h3>
            <p className="text-xs text-[#68738A] leading-relaxed mb-6">
              Drop an image screenshot of any suspicious chat. ScamMirror extracts and structures the dialogue with AI Vision OCR.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#7C83FD] group-hover:translate-x-1 transition-transform">
            <span>Upload Image</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        <div
          id="dash-card-demo"
          onClick={onEnterDemo}
          className="cyber-card-interactive p-6 cursor-pointer group flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#F0F2FF] border border-[#B8A9E8]/60 text-[#B8A9E8] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-xs">
              <FlaskConical className="w-6 h-6 text-[#7C83FD]" />
            </div>
            <h3 className="text-lg font-bold text-[#27324A] mb-1 group-hover:text-[#7C83FD] transition-colors">
              Try Demo Mode
            </h3>
            <p className="text-xs text-[#68738A] leading-relaxed mb-6">
              Explore 6 preloaded realistic fictional cases including Bank Impersonation, Job Scams, and Cryptocurrency fraud.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-[#7C83FD] group-hover:translate-x-1 transition-transform">
            <span>Explore Demo Scenarios</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Risk Overview (Low / Moderate / High-Critical count) in Soft Pastel */}
      <div className="cyber-card p-5 space-y-3 bg-white border border-[#E2E4F3]">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-mono font-bold text-[#68738A] uppercase tracking-wider flex items-center gap-2">
            <Activity className="w-3.5 h-3.5 text-[#7C83FD]" />
            <span>Risk Overview</span>
          </h3>
          <span className="text-[11px] font-mono text-[#68738A]">
            Total Assessed: {analyses.length}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl border border-[#A8D5BA] bg-[#A8D5BA]/25 flex flex-col items-center justify-center text-center">
            <span className="text-[11px] font-mono font-bold text-[#235738]">LOW RISK</span>
            <span className="text-2xl font-extrabold text-[#27324A] mt-1 font-mono">
              {analyses.filter(a => (a.overall_risk || a.risk_level) === 'LOW').length}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl border border-[#F6DFA4] bg-[#F6DFA4]/35 flex flex-col items-center justify-center text-center">
            <span className="text-[11px] font-mono font-bold text-[#7A580D]">MODERATE RISK</span>
            <span className="text-2xl font-extrabold text-[#27324A] mt-1 font-mono">
              {analyses.filter(a => (a.overall_risk || a.risk_level) === 'MEDIUM').length}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl border border-[#EFA7A7] bg-[#EFA7A7]/30 flex flex-col items-center justify-center text-center">
            <span className="text-[11px] font-mono font-bold text-[#871E1E]">HIGH / CRITICAL</span>
            <span className="text-2xl font-extrabold text-[#27324A] mt-1 font-mono">
              {analyses.filter(a => (a.overall_risk || a.risk_level) === 'HIGH' || (a.overall_risk || a.risk_level) === 'CRITICAL').length}
            </span>
          </div>
        </div>
      </div>

      {/* Recent Analyses Section */}
      <div className="cyber-card p-6 space-y-4 bg-white border border-[#E2E4F3]">
        <div className="flex items-center justify-between pb-3 border-b border-[#E2E4F3]">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-[#F0F2FF] text-[#7C83FD]">
              <History className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-[#27324A] tracking-tight">
              Recent Analyses
            </h3>
            <span className="text-xs font-mono text-[#68738A]">({analyses.length})</span>
          </div>

          {analyses.length > 0 && (
            <span className="text-xs text-[#68738A]">Stored locally in your secure session</span>
          )}
        </div>

        {analyses.length === 0 ? (
          <div className="py-12 text-center text-[#68738A] space-y-3">
            <ShieldAlert className="w-8 h-8 mx-auto text-[#68738A]" />
            <p className="text-sm">No analysis reports recorded yet.</p>
            <button
              onClick={onStartAnalyze}
              className="btn-primary-cyber text-xs py-2 px-4 shadow-sm"
            >
              Start First Analysis
            </button>
          </div>
        ) : (
          <div className="divide-y divide-[#E2E4F3]">
            {analyses.map((item) => (
              <div
                key={item.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F0F2FF]/70 p-3 rounded-2xl transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-[#27324A]">
                      {item.scenario_name || item.attacker_objective || 'Conversation Analysis'}
                    </span>
                    {getRiskBadge(item.overall_risk)}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#68738A] font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#68738A]" />
                      {new Date(item.created_at || item.timestamp || Date.now()).toLocaleString()}
                    </span>
                    <span>•</span>
                    <span>Score: <strong className="text-[#7C83FD]">{item.risk_score}/100</strong></span>
                    <span>•</span>
                    <span>{item.manipulation_stages?.length || 0} stages</span>
                  </div>
                  <p className="text-xs text-[#68738A] line-clamp-1 max-w-xl">
                    {item.summary}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                  <button
                    onClick={() => onReplayAnalysis(item)}
                    className="px-3 py-1.5 rounded-xl border border-[#E2E4F3] bg-white text-xs font-semibold text-[#235738] hover:bg-[#A8D5BA]/20 flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                  >
                    <Play className="w-3 h-3 fill-current text-[#A8D5BA]" />
                    <span>Replay Attack</span>
                  </button>

                  <button
                    onClick={() => onViewAnalysis(item)}
                    className="btn-primary-cyber text-xs py-1.5 px-3 shadow-xs"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Report</span>
                  </button>

                  <button
                    onClick={() => onDeleteAnalysis(item.id || '')}
                    className="p-1.5 rounded-xl text-[#68738A] hover:text-[#871E1E] hover:bg-[#EFA7A7]/20 transition-colors cursor-pointer"
                    title="Delete record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
