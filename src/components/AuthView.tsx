import React, { useState } from 'react';
import { 
  Lock, 
  Mail, 
  User, 
  ArrowRight, 
  FlaskConical, 
  AlertCircle, 
  CheckCircle2,
  Eye,
  EyeOff
} from 'lucide-react';
import { UserProfile } from '../types';
import { ScamMirrorLogo } from './ScamMirrorLogo';

interface AuthViewProps {
  initialMode?: 'login' | 'signup';
  onLoginSuccess: (user: UserProfile) => void;
  onContinueAsDemo: () => void;
  onNavigateHome: () => void;
}

export function AuthView({
  initialMode = 'login',
  onLoginSuccess,
  onContinueAsDemo,
  onNavigateHome,
}: AuthViewProps) {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(initialMode);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (mode === 'login') {
      if (!email.trim() || !password) {
        setError('Please provide your email address and password.');
        return;
      }
      
      const user: UserProfile = {
        id: 'usr_' + Math.random().toString(36).slice(2, 9),
        name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        email: email.trim().toLowerCase(),
        accountType: 'Cybersecurity Analyst',
        createdAt: new Date().toISOString(),
      };
      
      onLoginSuccess(user);
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
    } else if (mode === 'forgot') {
      if (!email.trim()) {
        setError('Please enter your email to receive recovery instructions.');
        return;
      }
      setSuccessMsg(`Recovery link sent to ${email}. Check your inbox.`);
      setTimeout(() => {
        setMode('login');
        setSuccessMsg(null);
      }, 2500);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md space-y-6">
        {/* Prominently Placed ScamMirror Logo */}
        <div className="flex flex-col items-center text-center space-y-3">
          <ScamMirrorLogo 
            size="lg" 
            showTagline={true} 
            layout="vertical"
            onClick={onNavigateHome}
          />
          <p className="text-xs text-[#94A3B8] max-w-xs">
            {mode === 'login' && 'Sign in to access behavioral social-engineering intelligence and threat archives.'}
            {mode === 'signup' && 'Deploy cognitive threat reconstruction to protect against deceptive communications.'}
            {mode === 'forgot' && 'Reset your cybersecurity operations account credentials.'}
          </p>
        </div>

        {/* Authentication Card */}
        <div className="cyber-card p-6 sm:p-8 shadow-2xl relative">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#263247]">
            <h2 className="text-lg font-bold text-[#F8FAFC]">
              {mode === 'login' && 'Account Login'}
              {mode === 'signup' && 'Create Account'}
              {mode === 'forgot' && 'Password Recovery'}
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00D9FF]/10 text-[#00D9FF] border border-[#00D9FF]/30">
              SECURE
            </span>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 text-[#EF4444] text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="mb-4 p-3 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 text-[#22C55E] text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-medium text-[#CBD5E1] mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-[#64748B]" />
                  <input
                    id="signup-fullname"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Alex Morgan"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#263247] bg-[#0B1020] text-sm text-[#F8FAFC] placeholder-[#64748B] focus:outline-none focus:border-[#00D9FF] focus:ring-1 focus:ring-[#00D9FF]"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-[#CBD5E1] mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-[#64748B]" />
                <input
                  id="auth-email-field"
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
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-medium text-[#CBD5E1]">
                    Password
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      onClick={() => {
                        setMode('forgot');
                        setError(null);
                      }}
                      className="text-xs text-[#00D9FF] hover:underline cursor-pointer"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-[#64748B]" />
                  <input
                    id="auth-password-field"
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
                <label className="block text-xs font-medium text-[#CBD5E1] mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-[#64748B]" />
                  <input
                    id="signup-confirm-password"
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

            {/* Remember Me Checkbox */}
            {mode === 'login' && (
              <div className="flex items-center gap-2 pt-1">
                <input
                  id="remember-me-checkbox"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-[#263247] bg-[#0B1020] text-[#00D9FF] focus:ring-0 focus:ring-offset-0 cursor-pointer"
                />
                <label
                  htmlFor="remember-me-checkbox"
                  className="text-xs text-[#CBD5E1] cursor-pointer select-none"
                >
                  Remember me on this browser
                </label>
              </div>
            )}

            <button
              id="auth-submit-button"
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

          {/* Quick Demo Option */}
          <div className="mt-5 pt-4 border-t border-[#263247]">
            <button
              id="auth-try-demo-btn"
              type="button"
              onClick={onContinueAsDemo}
              className="w-full py-2.5 px-4 rounded-xl border border-[#00D9FF] bg-transparent hover:bg-[#00D9FF]/10 text-[#00D9FF] text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <FlaskConical className="w-4 h-4" />
              <span>Try Demo Mode (No account required)</span>
            </button>
          </div>

          {/* Mode Switcher */}
          <div className="mt-5 text-center text-xs text-[#94A3B8]">
            {mode === 'login' && (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setError(null);
                  }}
                  className="text-[#00D9FF] font-semibold hover:underline cursor-pointer"
                >
                  Create Account
                </button>
              </p>
            )}

            {mode === 'signup' && (
              <p>
                Already registered?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setError(null);
                  }}
                  className="text-[#00D9FF] font-semibold hover:underline cursor-pointer"
                >
                  Sign in
                </button>
              </p>
            )}

            {mode === 'forgot' && (
              <p>
                Remembered your password?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setError(null);
                  }}
                  className="text-[#00D9FF] font-semibold hover:underline cursor-pointer"
                >
                  Back to Login
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
