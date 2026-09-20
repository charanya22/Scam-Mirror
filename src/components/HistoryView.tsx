import { useState } from 'react';
import { 
  History, 
  Search, 
  Trash2, 
  Play, 
  FileText, 
  ShieldAlert, 
  Download, 
  ArrowLeft,
  Filter,
  Clock
} from 'lucide-react';
import { AnalysisResult, RiskLevel } from '../types';

interface HistoryViewProps {
  analyses: AnalysisResult[];
  onViewAnalysis: (analysis: AnalysisResult) => void;
  onReplayAnalysis: (analysis: AnalysisResult) => void;
  onDeleteAnalysis: (id: string) => void;
  onClearAll: () => void;
  onBack: () => void;
}

export function HistoryView({
  analyses,
  onViewAnalysis,
  onReplayAnalysis,
  onDeleteAnalysis,
  onClearAll,
  onBack,
}: HistoryViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRisk, setSelectedRisk] = useState<string>('ALL');

  const filteredAnalyses = analyses.filter((item) => {
    const matchesSearch = 
      (item.scenario_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.summary || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.attacker_objective || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesRisk = selectedRisk === 'ALL' || item.overall_risk === selectedRisk;
    return matchesSearch && matchesRisk;
  });

  const getRiskBadge = (risk: RiskLevel) => {
    switch (risk) {
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

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(analyses, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `scammirror-history-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-white transition-colors cursor-pointer mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] tracking-tight flex items-center gap-2.5">
            <span>Analysis Archive</span>
            <span className="text-xs font-mono font-medium px-2 py-0.5 rounded bg-[#151D2E] text-[#94A3B8] border border-[#263247]">
              {analyses.length} RECORDS
            </span>
          </h1>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {analyses.length > 0 && (
            <>
              <button
                onClick={handleExportJSON}
                className="px-3 py-1.5 rounded-lg border border-[#263247] bg-[#151D2E] text-xs text-[#CBD5E1] hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#00D9FF]" />
                <span>Export JSON</span>
              </button>
              <button
                onClick={() => {
                  if (confirm('Are you sure you want to clear your entire analysis history? This action cannot be undone.')) {
                    onClearAll();
                  }
                }}
                className="px-3 py-1.5 rounded-lg border border-[#EF4444]/30 bg-[#EF4444]/10 text-xs text-[#EF4444] hover:bg-[#EF4444]/20 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl border border-[#263247] bg-[#151D2E] flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#64748B]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search transcripts or summaries..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-[#263247] bg-[#0B1020] text-xs text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:border-[#00D9FF]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-mono text-[#94A3B8] hidden sm:inline">RISK FILTER:</span>
          {(['ALL', 'CRITICAL', 'HIGH', 'MEDIUM', 'LOW'] as const).map((r) => (
            <button
              key={r}
              onClick={() => setSelectedRisk(r)}
              className={`px-2.5 py-1 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                selectedRisk === r
                  ? 'bg-[#00D9FF] text-[#06121A] font-bold shadow-sm'
                  : 'bg-[#0B1020] text-[#94A3B8] hover:text-white border border-[#263247]'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* History Items List */}
      <div className="cyber-card p-6 shadow-xl">
        {filteredAnalyses.length === 0 ? (
          <div className="py-12 text-center text-[#94A3B8] space-y-2">
            <ShieldAlert className="w-8 h-8 mx-auto text-[#64748B]" />
            <p className="text-sm">No analysis matching current query or filters.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#263247]">
            {filteredAnalyses.map((item) => (
              <div
                key={item.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#111827]/60 p-3 rounded-xl transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-[#F8FAFC]">
                      {item.scenario_name || item.attacker_objective || 'Conversation Analysis'}
                    </span>
                    {getRiskBadge(item.overall_risk)}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-[#94A3B8] font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#64748B]" />
                      {new Date(item.created_at || item.timestamp || Date.now()).toLocaleString()}
                    </span>
                    <span>•</span>
                    <span>Score: <strong className="text-[#00D9FF]">{item.risk_score}/100</strong></span>
                    <span>•</span>
                    <span>Confidence: {item.confidence}%</span>
                  </div>
                  <p className="text-xs text-[#CBD5E1] line-clamp-2 max-w-2xl leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                  <button
                    onClick={() => onReplayAnalysis(item)}
                    className="px-3 py-1.5 rounded-lg border border-[#263247] bg-[#0B1020] text-xs font-medium text-[#22C55E] hover:text-[#22C55E] hover:border-[#22C55E]/40 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    <span>Replay Attack</span>
                  </button>

                  <button
                    onClick={() => onViewAnalysis(item)}
                    className="btn-primary-cyber text-xs py-1.5 px-3 flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Report</span>
                  </button>

                  <button
                    onClick={() => onDeleteAnalysis(item.id || '')}
                    className="p-1.5 rounded-lg text-[#64748B] hover:text-[#EF4444] transition-colors cursor-pointer"
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
