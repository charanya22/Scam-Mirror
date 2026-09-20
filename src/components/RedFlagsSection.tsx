import { 
  Clock, 
  Lock, 
  Target, 
  KeyRound, 
  Coins, 
  Link as LinkIcon, 
  AlertTriangle,
  Flame,
  ShieldAlert
} from 'lucide-react';

interface RedFlagsSectionProps {
  redFlags: string[];
}

export function RedFlagsSection({ redFlags }: RedFlagsSectionProps) {
  if (!redFlags || redFlags.length === 0) return null;

  const getFlagMeta = (flag: string) => {
    const lower = flag.toLowerCase();
    if (lower.includes('urgenc') || lower.includes('minute') || lower.includes('deadline')) {
      return {
        label: 'Urgency Pressure',
        icon: <Clock className="w-4 h-4 text-[#F59E0B]" />,
        desc: 'Imposes an artificial countdown to induce panic and prevent independent verification.',
        badge: 'TACTIC',
        badgeColor: 'text-[#F59E0B] border-[#F59E0B]/30',
      };
    }
    if (lower.includes('secret') || lower.includes('isolat') || lower.includes('confidential') || lower.includes('tell')) {
      return {
        label: 'Secrecy & Isolation',
        icon: <Lock className="w-4 h-4 text-[#F97316]" />,
        desc: 'Commands target not to inform family members, colleagues, or official bank branches.',
        badge: 'COERCION',
        badgeColor: 'text-[#F97316] border-[#F97316]/30',
      };
    }
    if (lower.includes('authorit') || lower.includes('bank') || lower.includes('police') || lower.includes('officer') || lower.includes('cbi') || lower.includes('support')) {
      return {
        label: 'False Authority',
        icon: <Target className="w-4 h-4 text-[#00D9FF]" />,
        desc: 'Falsely assumes credentials of security department, law enforcement, or corporate support.',
        badge: 'IMPERSONATION',
        badgeColor: 'text-[#00D9FF] border-[#00D9FF]/30',
      };
    }
    if (lower.includes('otp') || lower.includes('pin') || lower.includes('password') || lower.includes('credential')) {
      return {
        label: 'OTP / Credential Request',
        icon: <KeyRound className="w-4 h-4 text-[#EF4444]" />,
        desc: 'Direct or indirect solicitation of single-use verification tokens or security PINs.',
        badge: 'CRITICAL',
        badgeColor: 'text-[#EF4444] border-[#EF4444]/30',
      };
    }
    if (lower.includes('money') || lower.includes('transfer') || lower.includes('fee') || lower.includes('pay') || lower.includes('deposit')) {
      return {
        label: 'Money Request',
        icon: <Coins className="w-4 h-4 text-[#EF4444]" />,
        desc: 'Instructs direct wire or payment transfer under the pretext of refundable fees or verification.',
        badge: 'FINANCIAL',
        badgeColor: 'text-[#EF4444] border-[#EF4444]/30',
      };
    }
    if (lower.includes('link') || lower.includes('remote') || lower.includes('anydesk') || lower.includes('download') || lower.includes('software')) {
      return {
        label: 'Suspicious Link / Tool',
        icon: <LinkIcon className="w-4 h-4 text-[#6366F1]" />,
        desc: 'Coerces victim to click unknown links or install remote administration tools.',
        badge: 'TAKEOVER',
        badgeColor: 'text-[#6366F1] border-[#6366F1]/30',
      };
    }

    return {
      label: flag,
      icon: <AlertTriangle className="w-4 h-4 text-[#F59E0B]" />,
      desc: flag,
      badge: 'INDICATOR',
      badgeColor: 'text-[#F59E0B] border-[#F59E0B]/30',
    };
  };

  return (
    <div id="red-flags-section" className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444]">
            <Flame className="w-4 h-4" />
          </span>
          <h3 className="text-lg font-extrabold text-[#F8FAFC] tracking-tight">
            Detected Red Flags
          </h3>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#111827] text-[#EF4444] border border-[#263247]">
            {redFlags.length} DETECTED
          </span>
        </div>
        <span className="text-xs text-[#94A3B8] font-mono hidden sm:inline">
          ONLY CONFIRMED FLAGS SHOWN
        </span>
      </div>

      {/* Small Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {redFlags.map((flag, idx) => {
          const meta = getFlagMeta(flag);
          return (
            <div
              key={idx}
              id={`red-flag-card-${idx}`}
              className="p-4 rounded-xl border border-[#263247] bg-[#151D2E] shadow-lg flex flex-col justify-between space-y-2.5 transition-all hover:border-[#00D9FF]/40"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {meta.icon}
                  <h4 className="text-xs font-bold text-[#F8FAFC] tracking-wide">
                    {meta.label}
                  </h4>
                </div>
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#0B1020] border ${meta.badgeColor}`}>
                  {meta.badge}
                </span>
              </div>
              <p className="text-xs text-[#CBD5E1] leading-relaxed font-sans">
                {meta.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
