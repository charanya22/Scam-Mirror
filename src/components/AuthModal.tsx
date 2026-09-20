import { useState } from 'react';
import { X, Lock, Mail, User, ShieldCheck, ArrowRight, FlaskConical, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { UserProfile } from '../types';
import { ScamMirrorLogo } from './ScamMirrorLogo';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup' | 'forgot';
  onLoginSuccess: (user: UserProfile) => void;
  onContinueAsDemo: () => void;
}

export function AuthModal({
  isOpen,
  onClose,
  initialMode = 'login',
  onLoginSuccess,
  onContinueAsDemo,
}: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(initialMode);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (mode === 'login') {
      if (!email.trim() || !password) {
        setError('Please enter both email and password.');
        return;
      }
      // Demo authentication without storing raw password
      const user: UserProfile = {
        id: 'usr_' + Math.random().toString(36).slice(2, 9),
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        email: email.trim().toLowerCase(),
        accountType: 'Cybersecurity Analyst',
        createdAt: new Date().toISOString(),
      };
      onLoginSuccess(user);
      onClose();
    } else if (mode === 'signup') {
      if (!fullName.trim() || !email.trim() || !password) {
        setError('Please fill in all required fields.');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters long.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      const user: UserProfile = {
        id: 'usr_' + Math.random().toString(36).slice(2, 9),
        name: fullName.trim(),
        email: email.trim().toLowerCase(),
        accountType: 'SOC Analyst',
        createdAt: new Date().toISOString(),
      };
      onLoginSuccess(user);
      onClose();
    } else if (mode === 'forgot') {
      if (!email.trim()) {
        setError('Please provide your registered email address.');
        return;
      }
      setSuccessMsg(`Password reset link dispatched to ${email}. (Demo mock notice)`);
      setTimeout(() => {
        setMode('login');
        setSuccessMsg(null);
      }, 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0B1020]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        id="auth-modal-container"
        className="w-full max-w-md rounded-2xl border border-[#263247] bg-[#151D2E] p-6 sm:p-8 shadow-2xl relative text-[#F8FAFC]"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#94A3B8] hover:text-white p-1 rounded-lg hover:bg-[#111827] transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Prominent ScamMirror Logo on Modal */}
        <div className="flex flex-col items-center justify-center text-center mb-6 pt-1">
          <ScamMirrorLogo size="md" showTagline={true} layout="vertical" />
        </div>

        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#263247]">
          <h2 className="text-lg font-bold text-[#F8FAFC] tracking-tight">
            {mode === 'login' && 'Sign in to ScamMirror'}
            {mode === 'signup' && 'Create your account'}
            {mode === 'forgot' && 'Reset your password'}
          </h2>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/30">
            SECURE
          </span>
        </div>

        <p className="text-xs text-[#94A3B8] mb-4">
          {mode === 'login' && 'Access behavioral threat analytics and your saved reconstruction history.'}
          {mode === 'signup' && 'Deploy AI-driven social-engineering defense for your organization or personal inbox.'}
          {mode === 'forgot' && 'Enter your verified email to receive secure recovery credentials.'}
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-4 p-3 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-xs flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-[#CBD5E1] mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-[#64748B]" />
                <input
                  id="signup-name-input"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Alex Vance"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#263247] bg-[#0B1020] text-sm text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:border-[#00D9FF] focus:ring-1 focus:ring-[#00D9FF]"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-medium text-[#CBD5E1] mb-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[#64748B]" />
              <input
                id="auth-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="analyst@domain.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#263247] bg-[#0B1020] text-sm text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:border-[#00D9FF] focus:ring-1 focus:ring-[#00D9FF]"
                required
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-medium text-[#CBD5E1]">Password</label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => {
                      setMode('forgot');
                      setError(null);
                    }}
                    className="text-[11px] text-[#00D9FF] hover:underline cursor-pointer"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-[#64748B]" />
                <input
                  id="auth-password-input"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-[#263247] bg-[#0B1020] text-sm text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:border-[#00D9FF] focus:ring-1 focus:ring-[#00D9FF]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-[#64748B] hover:text-[#CBD5E1] cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-medium text-[#CBD5E1] mb-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-[#64748B]" />
                <input
                  id="signup-confirm-password-input"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#263247] bg-[#0B1020] text-sm text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:border-[#00D9FF] focus:ring-1 focus:ring-[#00D9FF]"
                  required
                />
              </div>
            </div>
          )}

          {/* Remember Me on Login */}
          {mode === 'login' && (
            <div className="flex items-center gap-2 pt-0.5">
              <input
                id="modal-remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-[#263247] bg-[#0B1020] text-[#00D9FF] focus:ring-0 cursor-pointer"
              />
              <label htmlFor="modal-remember-me" className="text-xs text-[#CBD5E1] cursor-pointer select-none">
                Remember me
              </label>
            </div>
          )}

          <button
            id="auth-submit-btn"
            type="submit"
            className="w-full py-2.5 px-4 rounded-xl bg-[#00D9FF] hover:bg-[#22E6FF] text-[#06121A] font-bold text-sm shadow-lg shadow-[#00D9FF]/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            <span>
              {mode === 'login' && 'Login'}
              {mode === 'signup' && 'Create Account'}
              {mode === 'forgot' && 'Send Recovery Email'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Continue as Demo button on login */}
        {mode === 'login' && (
          <div className="mt-4 pt-4 border-t border-[#263247]">
            <button
              id="auth-continue-demo-btn"
              type="button"
              onClick={() => {
                onContinueAsDemo();
                onClose();
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-[#00D9FF] bg-transparent hover:bg-[#00D9FF]/10 text-[#00D9FF] text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <FlaskConical className="w-4 h-4" />
              Continue as Demo (No Account Required)
            </button>
          </div>
        )}

        {/* Footer links */}
        <div className="mt-6 text-center text-xs text-[#94A3B8]">
          {mode === 'login' && (
            <p>
              Don't have an account yet?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setError(null);
                }}
                className="text-[#00D9FF] font-medium hover:underline cursor-pointer"
              >
                Create Account
              </button>
            </p>
          )}

          {mode === 'signup' && (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setError(null);
                }}
                className="text-[#00D9FF] font-medium hover:underline cursor-pointer"
              >
                Sign in
              </button>
            </p>
          )}

          {mode === 'forgot' && (
            <p>
              Remembered your credentials?{' '}
              <button
                type="button"
                onClick={() => {
                  setMode('login');
                  setError(null);
                }}
                className="text-[#00D9FF] font-medium hover:underline cursor-pointer"
              >
                Back to Login
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
