import { useState } from 'react';
import { 
  ShieldCheck, 
  AlertOctagon, 
  CheckCircle2, 
  PhoneCall, 
  Lock, 
  Ban, 
  Building2, 
  FileWarning, 
  Copy, 
  Check
} from 'lucide-react';

interface SafetyRecommendationsProps {
  recommendedActions: string[];
}

export function SafetyRecommendations({ recommendedActions }: SafetyRecommendationsProps) {
  const [copied, setCopied] = useState(false);

  const defaultActions = [
    'Do not send money or approve UPI mandates without independent callback verification.',
    'Never share OTPs, PINs, passwords, or recovery codes under any circumstance.',
    'Do not click hyperlinks or download attachments sent in unverified chats.',
    'Contact your bank or institution using official verified numbers on your physical card or official website.',
    'Do not install remote-access software (e.g. AnyDesk, QuickAssist, TeamViewer) from unsolicited calls.',
    'Immediately block and report the sender on your messaging platform.',
    'If credentials or money were already transferred, immediately freeze accounts via official fraud-reporting channels.'
  ];

  const actions = recommendedActions && recommendedActions.length > 0 ? recommendedActions : defaultActions;

  const handleCopyChecklist = () => {
    const text = actions.map((a, i) => `${i + 1}. ${a}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="safety-recommendations-section" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E]">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <h3 className="text-lg font-extrabold text-[#F8FAFC] tracking-tight">
              Recommended Safe Actions
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#111827] text-[#22C55E] border border-[#263247]">
              DEFENSIVE PROTOCOLS
            </span>
          </div>
          <p className="text-xs text-[#94A3B8] mt-1">
            Immediate actions to neutralize attacker leverage and protect yourself.
          </p>
        </div>

        <button
          onClick={handleCopyChecklist}
          className="self-start sm:self-auto px-3.5 py-1.5 rounded-lg border border-[#263247] bg-[#151D2E] text-xs text-[#CBD5E1] hover:text-white hover:border-[#00D9FF]/50 flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-[#22C55E]" /> : <Copy className="w-3.5 h-3.5 text-[#00D9FF]" />}
          <span>{copied ? 'Copied Actions' : 'Copy Checklist'}</span>
        </button>
      </div>

      {/* Actionable Recommendations List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {actions.map((act, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl border border-[#263247] bg-[#151D2E] hover:border-[#00D9FF]/40 transition-colors flex items-start gap-3 shadow-lg"
          >
            <div className="w-6 h-6 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold">
              {idx + 1}
            </div>
            <p className="text-xs sm:text-sm text-[#CBD5E1] leading-relaxed font-medium">
              {act}
            </p>
          </div>
        ))}
      </div>

      {/* Emergency Protocol Box (If funds or credentials already transferred) */}
      <div className="rounded-2xl border border-[#EF4444]/40 bg-[#151D2E] p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex items-center gap-2.5 mb-2 text-[#EF4444] font-bold text-sm">
          <AlertOctagon className="w-5 h-5" />
          <span>EMERGENCY PROTOCOL (IF ALREADY INTERACTED)</span>
        </div>
        <p className="text-xs text-[#94A3B8] mb-4 max-w-3xl leading-relaxed">
          If you have already sent money, shared OTPs, or granted remote device access, follow these critical steps immediately:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-[#0B1020] border border-[#263247] space-y-1">
            <div className="text-[#EF4444] font-semibold flex items-center gap-1.5">
              <Building2 className="w-4 h-4" />
              <span>1. Freeze Accounts</span>
            </div>
            <p className="text-[#94A3B8] leading-relaxed">
              Call your bank hotline to immediately freeze payment cards, net banking, and UPI handles.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0B1020] border border-[#263247] space-y-1">
            <div className="text-[#F59E0B] font-semibold flex items-center gap-1.5">
              <PhoneCall className="w-4 h-4" />
              <span>2. File Incident</span>
            </div>
            <p className="text-[#94A3B8] leading-relaxed">
              Report the transaction on national cybercrime hotlines (e.g., 1930 / cybercrime.gov.in) or local fraud units.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-[#0B1020] border border-[#263247] space-y-1">
            <div className="text-[#00D9FF] font-semibold flex items-center gap-1.5">
              <Ban className="w-4 h-4" />
              <span>3. Disconnect Device</span>
            </div>
            <p className="text-[#94A3B8] leading-relaxed">
              Disconnect Wi-Fi immediately, uninstall remote tools (AnyDesk/QuickAssist), and run a complete malware scan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
