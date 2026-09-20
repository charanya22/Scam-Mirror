import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FlaskConical, 
  User as UserIcon, 
  LogOut, 
  LogIn, 
  Menu, 
  X, 
  Globe,
  LayoutDashboard,
  Search,
  History as HistoryIcon,
  Info
} from 'lucide-react';
import { UserProfile } from '../types';
import { ScamMirrorLogo } from './ScamMirrorLogo';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  currentUser: UserProfile | null;
  isDemoMode: boolean;
  onExitDemo: () => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onLogout: () => void;
  selectedLanguage: 'en' | 'hi' | 'te';
  onChangeLanguage: (lang: 'en' | 'hi' | 'te') => void;
}

export function Navbar({
  currentView,
  onNavigate,
  currentUser,
  isDemoMode,
  onExitDemo,
  onOpenAuth,
  onLogout,
  selectedLanguage,
  onChangeLanguage,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const languages = [
    { code: 'en' as const, name: 'English', native: 'English' },
    { code: 'hi' as const, name: 'Hindi', native: 'हिंदी' },
    { code: 'te' as const, name: 'Telugu', native: 'తెలుగు' },
  ];

  const handleNavClick = (view: string) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#E2E4F3] bg-white/90 backdrop-blur-md">
      {/* Demo Mode Watermark Notice in soft pastel */}
      {isDemoMode && (
        <div className="bg-[#F0F2FF] border-b border-[#E2E4F3] px-4 py-1.5 text-xs text-[#27324A] flex items-center justify-between">
          <div className="flex items-center gap-2 mx-auto">
            <span className="inline-flex items-center gap-1 font-semibold px-2 py-0.5 rounded-full bg-white text-[#7C83FD] border border-[#B8A9E8]/60 shadow-xs">
              <FlaskConical className="w-3.5 h-3.5" />
              DEMO LAB
            </span>
            <span className="hidden sm:inline text-[#68738A]">
              Evaluating preloaded social-engineering manipulation vectors with zero risk.
            </span>
          </div>
          <button
            onClick={onExitDemo}
            className="text-xs text-[#7C83FD] hover:underline font-semibold ml-2 shrink-0 cursor-pointer"
          >
            Exit Demo
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo with Soft Pastel Aesthetic */}
          <div 
            id="nav-brand-logo"
            onClick={() => handleNavClick(currentUser ? 'dashboard' : 'landing')}
            className="cursor-pointer"
          >
            <ScamMirrorLogo size="sm" showTagline={true} layout="horizontal" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5">
            <button
              id="nav-link-dashboard"
              onClick={() => handleNavClick('dashboard')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                currentView === 'dashboard'
                  ? 'bg-[#F0F2FF] text-[#7C83FD] border border-[#B8A9E8]/60 font-semibold shadow-xs'
                  : 'text-[#68738A] hover:text-[#27324A] hover:bg-[#F0F2FF]/60'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              Dashboard
            </button>

            <button
              id="nav-link-analyze"
              onClick={() => handleNavClick('analyze')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                currentView === 'analyze' || currentView === 'results'
                  ? 'bg-[#F0F2FF] text-[#7C83FD] border border-[#B8A9E8]/60 font-semibold shadow-xs'
                  : 'text-[#68738A] hover:text-[#27324A] hover:bg-[#F0F2FF]/60'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              Analyze
            </button>

            <button
              id="nav-link-history"
              onClick={() => handleNavClick('history')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                currentView === 'history'
                  ? 'bg-[#F0F2FF] text-[#7C83FD] border border-[#B8A9E8]/60 font-semibold shadow-xs'
                  : 'text-[#68738A] hover:text-[#27324A] hover:bg-[#F0F2FF]/60'
              }`}
            >
              <HistoryIcon className="w-3.5 h-3.5" />
              History
            </button>

            <button
              id="nav-link-about"
              onClick={() => handleNavClick('about')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                currentView === 'about'
                  ? 'bg-[#F0F2FF] text-[#7C83FD] border border-[#B8A9E8]/60 font-semibold shadow-xs'
                  : 'text-[#68738A] hover:text-[#27324A] hover:bg-[#F0F2FF]/60'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              About
            </button>

            {currentUser && (
              <button
                id="nav-link-profile"
                onClick={() => handleNavClick('profile')}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  currentView === 'profile'
                    ? 'bg-[#F0F2FF] text-[#7C83FD] border border-[#B8A9E8]/60 font-semibold shadow-xs'
                    : 'text-[#68738A] hover:text-[#27324A] hover:bg-[#F0F2FF]/60'
                }`}
              >
                <UserIcon className="w-3.5 h-3.5" />
                Profile
              </button>
            )}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Selector */}
            <div className="relative">
              <button
                id="language-selector-button"
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-[#E2E4F3] bg-white text-xs text-[#27324A] hover:border-[#7C83FD] transition-colors cursor-pointer shadow-xs"
                title="Select Analysis Language"
              >
                <Globe className="w-3.5 h-3.5 text-[#7C83FD]" />
                <span className="uppercase font-mono font-medium">{selectedLanguage}</span>
              </button>

              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-36 rounded-2xl border border-[#E2E4F3] bg-white shadow-xl py-1.5 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        onChangeLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full px-3 py-1.5 text-left text-xs flex items-center justify-between hover:bg-[#F0F2FF] cursor-pointer ${
                        selectedLanguage === lang.code ? 'text-[#7C83FD] font-semibold bg-[#F0F2FF]' : 'text-[#27324A]'
                      }`}
                    >
                      <span>{lang.native}</span>
                      <span className="text-[10px] text-[#68738A] font-mono uppercase">{lang.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth / Demo buttons */}
            {isDemoMode ? (
              <button
                id="nav-exit-demo-btn"
                onClick={onExitDemo}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#E2E4F3] bg-white text-[#27324A] hover:text-[#7C83FD] hover:border-[#7C83FD] text-xs font-medium transition-colors cursor-pointer shadow-xs"
              >
                <LogOut className="w-3.5 h-3.5" />
                Exit Demo
              </button>
            ) : currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  id="nav-profile-badge"
                  onClick={() => handleNavClick('profile')}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[#E2E4F3] bg-[#F0F2FF] text-xs text-[#27324A] hover:border-[#7C83FD] cursor-pointer transition-colors"
                >
                  <div className="w-5 h-5 rounded-full bg-[#7C83FD] text-white flex items-center justify-center text-[10px] font-bold">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="max-w-[120px] truncate font-medium">{currentUser.name}</span>
                </button>
                <button
                  id="nav-logout-btn"
                  onClick={onLogout}
                  className="p-1.5 rounded-xl border border-[#E2E4F3] text-[#68738A] hover:text-[#A82D2D] hover:border-[#EFA7A7] hover:bg-[#EFA7A7]/20 transition-colors cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  id="nav-try-demo-btn"
                  onClick={() => handleNavClick('demo-scenarios')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#7C83FD] bg-white text-[#7C83FD] hover:bg-[#F0F2FF] text-xs font-semibold shadow-xs transition-all cursor-pointer"
                >
                  <FlaskConical className="w-3.5 h-3.5" />
                  Try Demo
                </button>
                <button
                  id="nav-login-btn"
                  onClick={() => onOpenAuth('login')}
                  className="px-3.5 py-1.5 rounded-xl text-xs font-medium text-[#27324A] hover:text-[#7C83FD] hover:bg-[#F0F2FF] border border-[#E2E4F3] transition-colors cursor-pointer"
                >
                  Login
                </button>
                <button
                  id="nav-signup-btn"
                  onClick={() => onOpenAuth('signup')}
                  className="btn-primary-cyber text-xs py-1.5 px-3.5 shadow-sm"
                >
                  Create Account
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl border border-[#E2E4F3] bg-white text-[#27324A] hover:bg-[#F0F2FF] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu in Soft Pastel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E2E4F3] bg-white px-4 py-4 space-y-3 shadow-lg">
          <div className="flex items-center justify-between pb-2 border-b border-[#E2E4F3]">
            <span className="text-xs text-[#68738A] font-mono">LANGUAGE:</span>
            <div className="flex gap-2">
              {languages.map((l) => (
                <button
                  key={l.code}
                  onClick={() => onChangeLanguage(l.code)}
                  className={`px-2 py-1 text-xs rounded-lg border ${
                    selectedLanguage === l.code
                      ? 'border-[#7C83FD] text-[#7C83FD] bg-[#F0F2FF] font-semibold'
                      : 'border-[#E2E4F3] text-[#68738A] bg-white'
                  }`}
                >
                  {l.native}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <button
              onClick={() => handleNavClick('dashboard')}
              className="text-left py-2 px-3 rounded-xl text-sm text-[#27324A] hover:bg-[#F0F2FF] flex items-center gap-2 font-medium"
            >
              <LayoutDashboard className="w-4 h-4 text-[#7C83FD]" />
              Dashboard
            </button>
            <button
              onClick={() => handleNavClick('analyze')}
              className="text-left py-2 px-3 rounded-xl text-sm text-[#27324A] hover:bg-[#F0F2FF] flex items-center gap-2 font-medium"
            >
              <Search className="w-4 h-4 text-[#7C83FD]" />
              Analyze
            </button>
            <button
              onClick={() => handleNavClick('history')}
              className="text-left py-2 px-3 rounded-xl text-sm text-[#27324A] hover:bg-[#F0F2FF] flex items-center gap-2 font-medium"
            >
              <HistoryIcon className="w-4 h-4 text-[#7C83FD]" />
              History
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-left py-2 px-3 rounded-xl text-sm text-[#27324A] hover:bg-[#F0F2FF] flex items-center gap-2 font-medium"
            >
              <Info className="w-4 h-4 text-[#7C83FD]" />
              About
            </button>
            {currentUser && (
              <button
                onClick={() => handleNavClick('profile')}
                className="text-left py-2 px-3 rounded-xl text-sm text-[#27324A] hover:bg-[#F0F2FF] flex items-center gap-2 font-medium"
              >
                <UserIcon className="w-4 h-4 text-[#7C83FD]" />
                Profile ({currentUser.name})
              </button>
            )}
          </div>

          <div className="pt-2 border-t border-[#E2E4F3]">
            {isDemoMode ? (
              <button
                onClick={onExitDemo}
                className="w-full py-2 px-3 rounded-xl text-sm text-[#A82D2D] bg-[#EFA7A7]/25 border border-[#EFA7A7] font-semibold"
              >
                Exit Demo Mode
              </button>
            ) : currentUser ? (
              <button
                onClick={onLogout}
                className="w-full py-2 px-3 rounded-xl text-sm text-[#A82D2D] hover:bg-[#EFA7A7]/25 border border-[#E2E4F3] font-medium"
              >
                Logout
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => handleNavClick('demo-scenarios')}
                  className="w-full py-2 rounded-xl bg-white text-[#7C83FD] border border-[#7C83FD] text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <FlaskConical className="w-4 h-4" />
                  Try Demo
                </button>
                <button
                  onClick={() => {
                    onOpenAuth('login');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 rounded-xl border border-[#E2E4F3] bg-white text-[#27324A] text-sm font-medium"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    onOpenAuth('signup');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 rounded-xl bg-[#7C83FD] text-white text-sm font-bold shadow-md shadow-[#7C83FD]/20"
                >
                  Create Account
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
