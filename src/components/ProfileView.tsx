import { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  Lock, 
  Globe, 
  Trash2, 
  CheckCircle2, 
  ArrowLeft,
  KeyRound,
  Shield,
  Clock
} from 'lucide-react';
import { UserProfile } from '../types';

interface ProfileViewProps {
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
  onBack: () => void;
  selectedLanguage: 'en' | 'hi' | 'te';
  onChangeLanguage: (lang: 'en' | 'hi' | 'te') => void;
  onPurgeLocalData: () => void;
}

export function ProfileView({
  user,
  onUpdateUser,
  onBack,
  selectedLanguage,
  onChangeLanguage,
  onPurgeLocalData,
}: ProfileViewProps) {
  const [name, setName] = useState(user.name);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name: name.trim() || user.name,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div>
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs text-[#94A3B8] hover:text-white transition-colors cursor-pointer mb-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#F8FAFC] tracking-tight">
          User Settings & Privacy
        </h1>
        <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
          Manage your account profile, privacy sanitization defaults, and local data persistence.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>Profile configuration updated successfully.</span>
        </div>
      )}

      {/* Profile Info Card */}
      <div className="cyber-card p-6 shadow-xl space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-[#263247]">
          <div className="p-2.5 rounded-xl bg-[#00D9FF]/10 border border-[#00D9FF]/30 text-[#00D9FF]">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#F8FAFC]">Account Information</h3>
            <p className="text-xs text-[#94A3B8] font-mono">ID: {user.id}</p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4 max-w-lg">
          <div>
            <label className="block text-xs font-medium text-[#CBD5E1] mb-1">Display Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-[#263247] bg-[#0B1020] text-sm text-[#F8FAFC] focus:outline-none focus:border-[#00D9FF]"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#CBD5E1] mb-1">Email Address</label>
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full px-3.5 py-2 rounded-xl border border-[#263247] bg-[#0B1020]/50 text-sm text-[#64748B] cursor-not-allowed font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#CBD5E1] mb-1">Account Role</label>
            <div className="px-3.5 py-2 rounded-xl border border-[#263247] bg-[#0B1020]/50 text-sm text-[#CBD5E1] flex items-center justify-between">
              <span>{user.accountType}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/30">
                ACTIVE
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary-cyber text-xs py-2 px-5 cursor-pointer"
          >
            Save Changes
          </button>
        </form>
      </div>

      {/* Privacy & Safeguard Controls */}
      <div className="cyber-card p-6 shadow-xl space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-[#263247]">
          <div className="p-2.5 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E]">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#F8FAFC]">Privacy & Sanitization Policies</h3>
            <p className="text-xs text-[#94A3B8]">Strict client-side token masking controls</p>
          </div>
        </div>

        <div className="space-y-4 text-xs">
          <div className="p-4 rounded-xl bg-[#0B1020] border border-[#263247] flex items-center justify-between gap-4">
            <div>
              <div className="font-semibold text-[#F8FAFC]">PII Pre-Flight Redaction</div>
              <div className="text-[#94A3B8] mt-0.5">
                Automatically masks phone numbers, emails, bank accounts, and UPI IDs into secure placeholders before contacting the AI backend.
              </div>
            </div>
            <span className="px-2.5 py-1 rounded bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 font-mono font-bold text-[10px]">
              ALWAYS ON
            </span>
          </div>

          <div className="p-4 rounded-xl bg-[#0B1020] border border-[#263247] flex items-center justify-between gap-4">
            <div>
              <div className="font-semibold text-[#F8FAFC]">Default Analysis Output Language</div>
              <div className="text-[#94A3B8] mt-0.5">
                Choose the preferred cognitive reasoning language for manipulation breakdowns.
              </div>
            </div>
            <div className="flex gap-1.5">
              {(['en', 'hi', 'te'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => onChangeLanguage(lang)}
                  className={`px-2.5 py-1 rounded text-xs font-mono font-bold cursor-pointer ${
                    selectedLanguage === lang
                      ? 'bg-[#00D9FF] text-[#06121A]'
                      : 'bg-[#151D2E] text-[#94A3B8] border border-[#263247] hover:text-white'
                  }`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone: Purge Data */}
      <div className="rounded-2xl border border-[#EF4444]/30 bg-[#EF4444]/5 p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-[#EF4444] font-bold text-sm">
          <Trash2 className="w-4 h-4" />
          <span>Local Storage & Cache Management</span>
        </div>
        <p className="text-xs text-[#94A3B8] leading-relaxed max-w-2xl">
          ScamMirror stores analysis history inside your browser's private local storage. You can purge all cached transcripts and analysis runs at any time.
        </p>

        <button
          onClick={() => {
            if (confirm('Permanently purge all cached analysis sessions and history from this browser?')) {
              onPurgeLocalData();
            }
          }}
          className="px-4 py-2 rounded-xl border border-[#EF4444]/40 bg-[#EF4444]/15 text-[#EF4444] hover:bg-[#EF4444]/25 text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Purge All Local Session Data</span>
        </button>
      </div>
    </div>
  );
}
