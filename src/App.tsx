import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { DemoScenarioSelector } from './components/DemoScenarioSelector';
import { AnalysisWorkspace } from './components/AnalysisWorkspace';
import { AttackStrategyMap } from './components/AttackStrategyMap';
import { AttackReplay } from './components/AttackReplay';
import { RiskDashboard } from './components/RiskDashboard';
import { EvidenceCards } from './components/EvidenceCards';
import { SafetyRecommendations } from './components/SafetyRecommendations';
import { ReportModal } from './components/ReportModal';
import { RedFlagsSection } from './components/RedFlagsSection';
import { AuthModal } from './components/AuthModal';
import { HistoryView } from './components/HistoryView';
import { ProfileView } from './components/ProfileView';
import { AboutView } from './components/AboutView';
import { AuthView } from './components/AuthView';

import { 
  UserProfile, 
  AnalysisResult, 
  DemoScenario 
} from './types';
import { 
  getUserProfile, 
  saveUserProfile, 
  clearUserProfile, 
  getAnalysisHistory, 
  saveAnalysis, 
  deleteAnalysisFromHistory, 
  clearAllHistory 
} from './utils/storage';
import { DEMO_SCENARIOS } from './data/demoScenarios';

import { 
  FileText, 
  RotateCcw, 
  ArrowLeft, 
  Sparkles, 
  AlertTriangle, 
  Share2, 
  Printer,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export function App() {
  // Navigation & User State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => getUserProfile());
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<string>(() => {
    return getUserProfile() ? 'dashboard' : 'landing';
  });

  // Language Preference
  const [selectedLanguage, setSelectedLanguage] = useState<'en' | 'hi' | 'te'>('en');

  // Analysis State
  const [analysisHistory, setAnalysisHistory] = useState<AnalysisResult[]>(() => getAnalysisHistory());
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState<string | null>(null);

  // Replay & Strategy Map Synchronized Active Index
  const [activeStageIndex, setActiveStageIndex] = useState<number | null>(null);

  // Preloaded Inputs for Workspace
  const [workspacePreloadText, setWorkspacePreloadText] = useState('');
  const [workspacePreloadName, setWorkspacePreloadName] = useState('');

  // Modals
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');
  const [reportModalOpen, setReportModalOpen] = useState(false);

  // Synchronize history changes
  const refreshHistory = () => {
    setAnalysisHistory(getAnalysisHistory());
  };

  // Perform Analysis against full-stack backend
  const handleRunAnalysis = async (
    text: string, 
    language: 'en' | 'hi' | 'te' = selectedLanguage,
    scenarioName?: string
  ) => {
    setIsAnalyzing(true);
    setAnalysisError(null);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversation: text,
          language,
          scenario_name: scenarioName || 'Custom Conversation',
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Threat analysis failed to complete.');
      }

      const raw = data.analysis || data;
      const result: AnalysisResult = {
        ...raw,
        id: raw.id || 'sm_' + Math.random().toString(36).slice(2, 9),
        created_at: raw.created_at || new Date().toISOString(),
        scenario_name: scenarioName || raw.scenario_name || 'Conversation Analysis',
        overall_risk: raw.overall_risk || raw.risk_level || 'HIGH',
        risk_level: raw.risk_level || raw.overall_risk || 'HIGH',
        manipulation_stages: raw.manipulation_stages || [],
        red_flags: raw.red_flags || [],
        recommended_actions: raw.recommended_actions || [],
      };
      setCurrentAnalysis(result);
      saveAnalysis(result);
      refreshHistory();
      setCurrentView('results');
    } catch (err: any) {
      console.error('Analysis error:', err);
      setAnalysisError(err.message || 'Error communicating with analysis service.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Handle Demo Scenario Selection
  const handleSelectDemoScenario = (scenario: DemoScenario, autoAnalyze = false) => {
    setWorkspacePreloadText(scenario.conversation);
    setWorkspacePreloadName(scenario.title);

    if (autoAnalyze) {
      handleRunAnalysis(scenario.conversation, selectedLanguage, scenario.title);
    } else {
      setCurrentView('analyze');
    }
  };

  // Auth Handlers
  const handleLoginSuccess = (user: UserProfile) => {
    saveUserProfile(user);
    setCurrentUser(user);
    setIsDemoMode(false);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    clearUserProfile();
    setCurrentUser(null);
    setIsDemoMode(false);
    setCurrentView('landing');
  };

  const handleContinueAsDemo = () => {
    setIsDemoMode(true);
    setCurrentView('demo-scenarios');
  };

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const handleExitDemo = () => {
    setIsDemoMode(false);
    if (currentUser) {
      setCurrentView('dashboard');
    } else {
      setCurrentView('landing');
    }
  };

  // Sync replay step with strategy map
  const handleReplayStepChange = (_stepIdx: number, stageName?: string) => {
    if (!currentAnalysis?.manipulation_stages || !stageName) return;
    
    // Find index of manipulation stage matching detection stage name
    const matchIdx = currentAnalysis.manipulation_stages.findIndex(
      (s) => s.stage.toLowerCase().includes(stageName.toLowerCase()) || 
             stageName.toLowerCase().includes(s.stage.toLowerCase())
    );
    if (matchIdx !== -1) {
      setActiveStageIndex(matchIdx);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5FC] text-[#27324A] flex flex-col font-sans selection:bg-[#B8A9E8] selection:text-[#27324A] pastel-pattern">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          if (view === 'demo-scenarios') {
            setIsDemoMode(true);
          }
          setCurrentView(view);
        }}
        currentUser={currentUser}
        isDemoMode={isDemoMode}
        onExitDemo={handleExitDemo}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        selectedLanguage={selectedLanguage}
        onChangeLanguage={(lang) => setSelectedLanguage(lang)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Error notification banner if any */}
        {analysisError && (
          <div className="max-w-4xl mx-auto mt-4 px-4">
            <div className="p-4 rounded-2xl bg-[#EFA7A7]/20 border border-[#EFA7A7] text-[#A82D2D] text-xs sm:text-sm flex items-center justify-between gap-3 shadow-sm">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[#A82D2D] shrink-0" />
                <span>{analysisError}</span>
              </div>
              <button
                onClick={() => setAnalysisError(null)}
                className="text-[#A82D2D] hover:underline font-mono text-xs cursor-pointer"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* 1. LANDING PAGE */}
        {currentView === 'landing' && (
          <LandingPage
            onTryDemo={() => {
              setIsDemoMode(true);
              setCurrentView('demo-scenarios');
            }}
            onAnalyzeNow={() => {
              setWorkspacePreloadText('');
              setWorkspacePreloadName('');
              setCurrentView('analyze');
            }}
            onOpenAuth={handleOpenAuth}
            onSelectScenario={(scenId) => {
              const scen = DEMO_SCENARIOS.find((s) => s.id === scenId);
              if (scen) {
                setIsDemoMode(true);
                handleSelectDemoScenario(scen, true);
              }
            }}
          />
        )}

        {/* 2. DEMO SCENARIOS LAB */}
        {currentView === 'demo-scenarios' && (
          <DemoScenarioSelector
            onSelectScenario={handleSelectDemoScenario}
            onCustomAnalyze={() => {
              setWorkspacePreloadText('');
              setWorkspacePreloadName('');
              setCurrentView('analyze');
            }}
          />
        )}

        {/* 3. USER DASHBOARD */}
        {currentView === 'dashboard' && (
          <Dashboard
            user={currentUser || {
              id: 'guest_analyst',
              name: 'Cyber Analyst',
              email: 'analyst@scammirror.local',
              accountType: 'Security Analyst (Guest)',
              createdAt: new Date().toISOString(),
            }}
            analyses={analysisHistory}
            onStartAnalyze={() => {
              setWorkspacePreloadText('');
              setWorkspacePreloadName('');
              setCurrentView('analyze');
            }}
            onUploadScreenshot={() => {
              setWorkspacePreloadText('');
              setWorkspacePreloadName('');
              setCurrentView('analyze');
            }}
            onEnterDemo={() => {
              setIsDemoMode(true);
              setCurrentView('demo-scenarios');
            }}
            onViewAnalysis={(item) => {
              setCurrentAnalysis(item);
              setCurrentView('results');
            }}
            onReplayAnalysis={(item) => {
              setCurrentAnalysis(item);
              setCurrentView('results');
            }}
            onDeleteAnalysis={(id) => {
              deleteAnalysisFromHistory(id);
              refreshHistory();
            }}
          />
        )}

        {/* 4. ANALYSIS INPUT WORKSPACE */}
        {currentView === 'analyze' && (
          <AnalysisWorkspace
            onAnalyze={handleRunAnalysis}
            isLoading={isAnalyzing}
            selectedLanguage={selectedLanguage}
            onChangeLanguage={setSelectedLanguage}
            preloadedText={workspacePreloadText}
            preloadedScenarioName={workspacePreloadName}
          />
        )}

        {/* 5. ANALYSIS RESULTS DISPLAY (Interactive Centerpiece) */}
        {currentView === 'results' && currentAnalysis && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
            {/* Top Navigation & Action Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <button
                  id="results-back-btn"
                  onClick={() => setCurrentView(isDemoMode ? 'demo-scenarios' : currentUser ? 'dashboard' : 'analyze')}
                  className="p-2 rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
                  title="Back"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-cyan-400 uppercase">
                      ANALYSIS RECONSTRUCTION COMPLETE
                    </span>
                    <span className="text-slate-600">•</span>
                    <span className="text-xs font-mono text-slate-400">
                      {new Date(currentAnalysis.created_at || currentAnalysis.timestamp || Date.now()).toLocaleTimeString()}
                    </span>
                  </div>
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    {currentAnalysis.scenario_name || currentAnalysis.attacker_objective || 'Behavioral Threat Assessment'}
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-3 self-start sm:self-auto">
                <button
                  id="btn-analyze-another"
                  onClick={() => {
                    setWorkspacePreloadText('');
                    setWorkspacePreloadName('');
                    setCurrentView('analyze');
                  }}
                  className="px-3.5 py-2 rounded-xl border border-slate-700 bg-slate-900 text-xs font-medium text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Analyze Another</span>
                </button>

                <button
                  id="btn-generate-safety-report"
                  onClick={() => setReportModalOpen(true)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 hover:opacity-95 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-950/40 transition-all cursor-pointer flex items-center gap-2"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Generate Safety Report</span>
                </button>
              </div>
            </div>

            {/* A. Risk Evaluation & Attacker Objective */}
            <RiskDashboard
              overallRisk={currentAnalysis.overall_risk}
              riskScore={currentAnalysis.risk_score}
              attackerObjective={currentAnalysis.attacker_objective}
              targetedAssets={currentAnalysis.targeted_assets}
              summary={currentAnalysis.summary}
              confidence={currentAnalysis.confidence}
              redFlags={currentAnalysis.red_flags}
              requestsDetected={currentAnalysis.requests_detected}
            />

            {/* B. Attack Strategy Map (Signature Visual Centerpiece) */}
            <AttackStrategyMap
              stages={currentAnalysis.manipulation_stages}
              activeStageIndex={activeStageIndex}
              onSelectStage={(idx) => setActiveStageIndex(idx)}
            />

            {/* C. Attack Replay (Interactive Sequential Walkthrough) */}
            {currentAnalysis.replay_steps && currentAnalysis.replay_steps.length > 0 && (
              <AttackReplay
                steps={currentAnalysis.replay_steps}
                onStepChange={handleReplayStepChange}
              />
            )}

            {/* D. Detected Red Flags (Small Focused Cards) */}
            {currentAnalysis.red_flags && currentAnalysis.red_flags.length > 0 && (
              <RedFlagsSection redFlags={currentAnalysis.red_flags} />
            )}

            {/* E. Evidence Cards (Traceable Verbatim Findings) */}
            <EvidenceCards
              stages={currentAnalysis.manipulation_stages}
              redFlags={currentAnalysis.red_flags}
              requestsDetected={currentAnalysis.requests_detected}
            />

            {/* F. Safety Recommendations (Defensive Actions & Compromise Protocol) */}
            <SafetyRecommendations
              recommendedActions={currentAnalysis.recommended_actions}
            />
          </div>
        )}

        {/* 6. HISTORY ARCHIVE VIEW */}
        {currentView === 'history' && (
          <HistoryView
            analyses={analysisHistory}
            onViewAnalysis={(item) => {
              setCurrentAnalysis(item);
              setCurrentView('results');
            }}
            onReplayAnalysis={(item) => {
              setCurrentAnalysis(item);
              setCurrentView('results');
            }}
            onDeleteAnalysis={(id) => {
              deleteAnalysisFromHistory(id);
              refreshHistory();
            }}
            onClearAll={() => {
              clearAllHistory();
              refreshHistory();
            }}
            onBack={() => setCurrentView(isDemoMode ? 'demo-scenarios' : currentUser ? 'dashboard' : 'landing')}
          />
        )}

        {/* 7. PROFILE & PRIVACY SETTINGS */}
        {currentView === 'profile' && (
          <ProfileView
            user={currentUser || {
              id: 'guest_analyst',
              name: 'Cyber Analyst',
              email: 'analyst@scammirror.local',
              accountType: 'Security Analyst (Guest)',
              createdAt: new Date().toISOString(),
            }}
            onUpdateUser={(updated) => {
              saveUserProfile(updated);
              setCurrentUser(updated);
            }}
            onBack={() => setCurrentView('dashboard')}
            selectedLanguage={selectedLanguage}
            onChangeLanguage={setSelectedLanguage}
            onPurgeLocalData={() => {
              clearAllHistory();
              refreshHistory();
              alert('All local analysis sessions purged.');
            }}
          />
        )}

        {/* 8. ABOUT VIEW (Mission, Psychological Paradigm, Safeguards) */}
        {currentView === 'about' && (
          <AboutView
            onStartAnalyze={() => {
              setWorkspacePreloadText('');
              setWorkspacePreloadName('');
              setCurrentView('analyze');
            }}
            onExploreDemo={() => {
              setIsDemoMode(true);
              setCurrentView('demo-scenarios');
            }}
          />
        )}

        {/* 9. STANDALONE AUTH PAGES (Login / Signup) */}
        {(currentView === 'login' || currentView === 'signup') && (
          <AuthView
            initialMode={currentView as 'login' | 'signup'}
            onLoginSuccess={(user) => {
              handleLoginSuccess(user);
              setCurrentView('dashboard');
            }}
            onContinueAsDemo={() => {
              handleContinueAsDemo();
              setCurrentView('dashboard');
            }}
            onNavigateHome={() => {
              setCurrentView(currentUser ? 'dashboard' : 'landing');
            }}
          />
        )}
      </main>

      {/* Footer in Soft Pastel Palette */}
      <footer className="border-t border-[#E2E4F3] bg-white py-8 px-4 text-center text-xs text-[#68738A] space-y-2">
        <div className="flex items-center justify-center gap-2">
          <span className="font-bold text-[#27324A] font-mono tracking-wider">SCAM<span className="text-[#7C83FD]">MIRROR</span></span>
          <span className="text-[#E2E4F3]">•</span>
          <span className="text-[#68738A]">Cognitive Cyber Defense & Social-Engineering Attack Reconstruction</span>
        </div>
        <p className="text-[11px] text-[#68738A] max-w-xl mx-auto">
          ScamMirror uses AI heuristics to reconstruct psychological escalation vectors. Transcripts are sanitized locally before processing. Never send money or share credentials without independent verification.
        </p>
      </footer>

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
        onLoginSuccess={handleLoginSuccess}
        onContinueAsDemo={handleContinueAsDemo}
      />

      {/* Safety Report Modal */}
      {currentAnalysis && (
        <ReportModal
          isOpen={reportModalOpen}
          onClose={() => setReportModalOpen(false)}
          analysis={currentAnalysis}
        />
      )}
    </div>
  );
}

export default App;
