import { useState, useRef } from 'react';
import { 
  FileText, 
  Image as ImageIcon, 
  ShieldCheck, 
  Sparkles, 
  Trash2, 
  Upload, 
  Eye, 
  Lock, 
  AlertTriangle, 
  ArrowRight, 
  Layers, 
  RefreshCw,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { sanitizeConversation, SanitizationResult } from '../utils/sanitizer';
import { DEMO_SCENARIOS } from '../data/demoScenarios';
import { DemoScenario } from '../types';

interface AnalysisWorkspaceProps {
  onAnalyze: (text: string, language: 'en' | 'hi' | 'te', scenarioName?: string) => void;
  isLoading: boolean;
  selectedLanguage: 'en' | 'hi' | 'te';
  onChangeLanguage: (lang: 'en' | 'hi' | 'te') => void;
  preloadedText?: string;
  preloadedScenarioName?: string;
}

export function AnalysisWorkspace({
  onAnalyze,
  isLoading,
  selectedLanguage,
  onChangeLanguage,
  preloadedText = '',
  preloadedScenarioName = '',
}: AnalysisWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<'paste' | 'upload'>('paste');
  const [conversationText, setConversationText] = useState(preloadedText);
  const [scenarioName, setScenarioName] = useState(preloadedScenarioName);
  
  // Screenshot states
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [isExtractingOcr, setIsExtractingOcr] = useState(false);
  const [ocrError, setOcrError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Privacy & Sanitization toggle
  const [removePersonalInfo, setRemovePersonalInfo] = useState(true);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [sanitizationData, setSanitizationData] = useState<SanitizationResult | null>(null);

  // Handle Image File Upload (drag and drop or click)
  const processImageFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setOcrError('Please upload an image file (PNG, JPEG, WEBP).');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setOcrError('Image exceeds 10MB limit. Please upload a smaller file.');
      return;
    }

    setOcrError(null);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setScreenshotPreview(base64);
      setIsExtractingOcr(true);

      try {
        const res = await fetch('/api/extract-screenshot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            imageBase64: base64,
            mimeType: file.type,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to extract text from screenshot');
        }

        setConversationText(data.extractedText);
        setScenarioName('Uploaded Screenshot Transcript');
      } catch (err: any) {
        console.error('OCR Error:', err);
        setOcrError(err.message || 'Error processing screenshot. You can paste conversation text manually.');
      } finally {
        setIsExtractingOcr(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // Pre-analysis trigger: always show Privacy Preview before analysis
  const handleInitiateAnalysis = () => {
    if (!conversationText.trim()) return;

    const result = sanitizeConversation(conversationText);
    setSanitizationData(result);
    setShowPrivacyModal(true);
  };

  const executeAnalysis = (useSanitized: boolean) => {
    setShowPrivacyModal(false);
    const textToAnalyze = useSanitized && sanitizationData ? sanitizationData.sanitizedText : conversationText;
    onAnalyze(textToAnalyze, selectedLanguage, scenarioName);
  };

  const handleLoadDemoScenario = (scen: DemoScenario) => {
    setConversationText(scen.conversation);
    setScenarioName(scen.title);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Privacy Preview Modal in Soft Pastel Aesthetic */}
      {showPrivacyModal && sanitizationData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#27324A]/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            id="privacy-preview-modal"
            className="w-full max-w-2xl rounded-2xl border border-[#E2E4F3] bg-white p-6 sm:p-8 shadow-2xl text-[#27324A] relative"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 rounded-2xl bg-[#F0F2FF] border border-[#B8A9E8]/50 text-[#7C83FD]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#27324A]">Privacy Preview & Sanitization</h3>
                <p className="text-xs text-[#7C83FD] font-mono font-semibold">CONFIDENTIALITY GUARANTEE</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-[#F0F2FF] border border-[#E2E4F3] text-xs text-[#27324A] mb-4 leading-relaxed">
              <span className="text-[#7C83FD] font-bold">Security Notice: </span>
              Your conversation is treated confidentially. ScamMirror automatically sanitizes sensitive identifiers locally before cloud AI processing.
            </div>

            {/* Sensitive entities breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-between text-xs text-[#68738A] font-medium pb-1 border-b border-[#E2E4F3]">
                <span>DETECTED IDENTIFIERS</span>
                <span className="font-mono font-bold text-[#7C83FD]">
                  {sanitizationData.hasSensitiveData ? 'REPLACED WITH MASKED TOKENS' : 'NO SENSITIVE DATA DETECTED'}
                </span>
              </div>

              {sanitizationData.hasSensitiveData ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {sanitizationData.detectedCount.phones > 0 && (
                    <div className="p-2.5 rounded-xl bg-[#F0F2FF] border border-[#E2E4F3] text-xs">
                      <div className="text-[#68738A] text-[10px] font-mono font-semibold">PHONE NUMBERS</div>
                      <div className="text-[#7C83FD] font-mono font-bold mt-0.5">
                        {sanitizationData.detectedCount.phones} → [PHONE]
                      </div>
                    </div>
                  )}
                  {sanitizationData.detectedCount.emails > 0 && (
                    <div className="p-2.5 rounded-xl bg-[#F0F2FF] border border-[#E2E4F3] text-xs">
                      <div className="text-[#68738A] text-[10px] font-mono font-semibold">EMAIL ADDRESSES</div>
                      <div className="text-[#7C83FD] font-mono font-bold mt-0.5">
                        {sanitizationData.detectedCount.emails} → [EMAIL]
                      </div>
                    </div>
                  )}
                  {sanitizationData.detectedCount.upiIds > 0 && (
                    <div className="p-2.5 rounded-xl bg-[#F0F2FF] border border-[#E2E4F3] text-xs">
                      <div className="text-[#68738A] text-[10px] font-mono font-semibold">UPI VIRTUAL IDs</div>
                      <div className="text-[#7C83FD] font-mono font-bold mt-0.5">
                        {sanitizationData.detectedCount.upiIds} → [UPI_ID]
                      </div>
                    </div>
                  )}
                  {sanitizationData.detectedCount.cards > 0 && (
                    <div className="p-2.5 rounded-xl bg-[#F0F2FF] border border-[#E2E4F3] text-xs">
                      <div className="text-[#68738A] text-[10px] font-mono font-semibold">CARD NUMBERS</div>
                      <div className="text-[#7C83FD] font-mono font-bold mt-0.5">
                        {sanitizationData.detectedCount.cards} → [CARD]
                      </div>
                    </div>
                  )}
                  {sanitizationData.detectedCount.accounts > 0 && (
                    <div className="p-2.5 rounded-xl bg-[#F0F2FF] border border-[#E2E4F3] text-xs">
                      <div className="text-[#68738A] text-[10px] font-mono font-semibold">ACCOUNT NUMBERS</div>
                      <div className="text-[#7C83FD] font-mono font-bold mt-0.5">
                        {sanitizationData.detectedCount.accounts} → [ACCOUNT]
                      </div>
                    </div>
                  )}
                  {sanitizationData.detectedCount.addresses > 0 && (
                    <div className="p-2.5 rounded-xl bg-[#F0F2FF] border border-[#E2E4F3] text-xs">
                      <div className="text-[#68738A] text-[10px] font-mono font-semibold">PHYSICAL ADDRESSES</div>
                      <div className="text-[#7C83FD] font-mono font-bold mt-0.5">
                        {sanitizationData.detectedCount.addresses} → [ADDRESS]
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-[#A8D5BA]/25 border border-[#A8D5BA] text-xs text-[#235738] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#235738]" />
                  <span>No explicit phone numbers, bank accounts, or cards detected.</span>
                </div>
              )}

              {/* Masked Preview Snippet */}
              <div>
                <label className="block text-[11px] font-mono text-[#68738A] mb-1 font-semibold">
                  SANITIZED PAYLOAD PREVIEW:
                </label>
                <div className="p-3 rounded-xl bg-[#F0F2FF] border border-[#E2E4F3] font-mono text-xs text-[#27324A] max-h-32 overflow-y-auto whitespace-pre-wrap leading-relaxed">
                  {sanitizationData.sanitizedText}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-[#E2E4F3]">
              <button
                type="button"
                onClick={() => setShowPrivacyModal(false)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#E2E4F3] text-xs font-semibold text-[#68738A] hover:text-[#27324A] cursor-pointer"
              >
                Back to Edit
              </button>
              <button
                id="btn-analyze-original"
                type="button"
                onClick={() => executeAnalysis(false)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-[#E2E4F3] bg-white text-xs font-semibold text-[#27324A] hover:border-[#7C83FD] transition-colors cursor-pointer"
              >
                Analyze Original
              </button>
              <button
                id="btn-analyze-sanitized"
                type="button"
                onClick={() => executeAnalysis(true)}
                className="w-full sm:w-auto btn-primary-cyber text-xs py-2.5 px-5 shadow-sm"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Analyze Sanitized Version (Recommended)</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Workspace Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#27324A] tracking-tight flex items-center gap-2.5">
            <span>Threat Analysis Workspace</span>
            <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[#F0F2FF] text-[#7C83FD] border border-[#B8A9E8]/50">
              STAGE RECONSTRUCTION
            </span>
          </h1>
          <p className="text-xs sm:text-sm text-[#68738A] mt-1">
            Input a suspicious message transcript or screenshot to expose the underlying social-engineering levers.
          </p>
        </div>

        {/* Options: Language + Remove Personal Info Toggle */}
        <div className="flex flex-wrap items-center gap-3 self-start sm:self-auto">
          {/* Language selector in workspace */}
          <div className="flex items-center gap-1.5 bg-white border border-[#E2E4F3] rounded-xl p-1 shrink-0 shadow-xs">
            <span className="text-[11px] font-mono text-[#68738A] px-1.5 font-semibold">LANGUAGE:</span>
            {(['en', 'hi', 'te'] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => onChangeLanguage(lang)}
                className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-colors cursor-pointer ${
                  selectedLanguage === lang
                    ? 'bg-[#7C83FD] text-white font-bold shadow-xs'
                    : 'text-[#68738A] hover:text-[#27324A]'
                }`}
              >
                {lang === 'en' ? 'EN' : lang === 'hi' ? 'हिंदी' : 'తెలుగు'}
              </button>
            ))}
          </div>

          {/* Remove Personal Info Toggle */}
          <label className="flex items-center gap-2.5 bg-white border border-[#E2E4F3] rounded-xl px-3 py-1.5 cursor-pointer select-none shadow-xs">
            <input
              type="checkbox"
              id="toggle-remove-personal-info"
              checked={removePersonalInfo}
              onChange={(e) => setRemovePersonalInfo(e.target.checked)}
              className="sr-only"
            />
            <span className="text-[11px] font-mono text-[#68738A] font-semibold">REMOVE PERSONAL INFO:</span>
            <div className={`w-8 h-4.5 rounded-full transition-colors relative ${removePersonalInfo ? 'bg-[#7C83FD]' : 'bg-[#E2E4F3]'}`}>
              <div className={`w-3.5 h-3.5 rounded-full bg-white shadow-xs absolute top-0.5 transition-transform ${removePersonalInfo ? 'left-4' : 'left-0.5'}`} />
            </div>
            <span className="text-[10px] font-mono font-bold text-[#7C83FD]">
              {removePersonalInfo ? 'ON' : 'OFF'}
            </span>
          </label>
        </div>
      </div>

      {/* Main card */}
      <div className="cyber-card shadow-[0_4px_20px_rgba(124,131,253,0.06)] overflow-hidden bg-white border border-[#E2E4F3]">
        {/* Tabs & Controls Header */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#E2E4F3] px-4 sm:px-6 py-3 bg-[#F0F2FF]/60 gap-3">
          <div className="flex items-center gap-2">
            <button
              id="tab-paste-conversation"
              onClick={() => setActiveTab('paste')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'paste'
                  ? 'bg-white text-[#7C83FD] border border-[#B8A9E8]/60 shadow-xs'
                  : 'text-[#68738A] hover:text-[#27324A] hover:bg-white/60'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Paste Conversation</span>
            </button>

            <button
              id="tab-upload-screenshot"
              onClick={() => setActiveTab('upload')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'upload'
                  ? 'bg-white text-[#7C83FD] border border-[#B8A9E8]/60 shadow-xs'
                  : 'text-[#68738A] hover:text-[#27324A] hover:bg-white/60'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Upload Screenshot</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-[#F0F2FF] text-[#7C83FD] border border-[#E2E4F3] font-semibold">
                OCR
              </span>
            </button>
          </div>

          {/* Quick Demo Preloader Dropdown */}
          <div className="flex items-center gap-2">
            <label className="text-[11px] font-mono text-[#68738A] hidden sm:inline font-semibold">LOAD DEMO:</label>
            <select
              id="select-quick-demo"
              onChange={(e) => {
                const scen = DEMO_SCENARIOS.find((s) => s.id === e.target.value);
                if (scen) handleLoadDemoScenario(scen);
              }}
              defaultValue=""
              className="bg-white border border-[#E2E4F3] rounded-xl px-2.5 py-1.5 text-xs text-[#27324A] focus:outline-none focus:border-[#7C83FD] cursor-pointer shadow-xs"
            >
              <option value="" disabled>Select preloaded scenario...</option>
              {DEMO_SCENARIOS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.title} ({s.risk_level})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6">
          {activeTab === 'paste' ? (
            <div className="space-y-4">
              <div className="relative">
                <textarea
                  id="conversation-textarea"
                  value={conversationText}
                  onChange={(e) => setConversationText(e.target.value)}
                  placeholder="Paste messaging app, SMS, email, or social media conversation...&#10;&#10;Example:&#10;Unknown: Hello, I'm calling from the bank security department.&#10;User: What happened?&#10;Unknown: We detected suspicious activity on your account. You have only 10 minutes to complete verification."
                  rows={11}
                  className="w-full rounded-xl border border-[#E2E4F3] bg-[#F0F2FF]/40 p-4 font-mono text-xs sm:text-sm text-[#27324A] placeholder-[#68738A]/60 focus:outline-none focus:border-[#7C83FD] focus:ring-1 focus:ring-[#7C83FD] transition-all leading-relaxed resize-y"
                />

                {scenarioName && (
                  <div className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-white border border-[#E2E4F3] text-[10px] font-mono text-[#7C83FD] flex items-center gap-1.5 pointer-events-none shadow-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7C83FD]" />
                    <span>Loaded Scenario: {scenarioName}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#68738A]">
                <div className="flex items-center gap-2">
                  <Lock className="w-3.5 h-3.5 text-[#235738]" />
                  <span>Client-side privacy masking enabled before cloud inference.</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono">{conversationText.length} characters</span>
                  {conversationText && (
                    <button
                      id="btn-clear-conversation"
                      type="button"
                      onClick={() => {
                        setConversationText('');
                        setScenarioName('');
                      }}
                      className="text-[#68738A] hover:text-[#871E1E] flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Screenshot Upload Dropzone */}
              <div
                id="screenshot-dropzone"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all flex flex-col items-center justify-center min-h-[260px] ${
                  isExtractingOcr
                    ? 'border-[#7C83FD] bg-[#F0F2FF]'
                    : 'border-[#E2E4F3] bg-white hover:border-[#7C83FD] hover:bg-[#F0F2FF]/40'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png, image/jpeg, image/webp"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      processImageFile(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />

                {isExtractingOcr ? (
                  <div className="flex flex-col items-center gap-3">
                    <RefreshCw className="w-8 h-8 text-[#7C83FD] animate-spin" />
                    <p className="text-sm font-semibold text-[#27324A]">
                      Extracting dialogue with AI Vision OCR...
                    </p>
                    <p className="text-xs text-[#68738A] max-w-sm">
                      Reconstructing timestamps, speech bubbles, and dialog sequence.
                    </p>
                  </div>
                ) : screenshotPreview ? (
                  <div className="flex flex-col items-center gap-3">
                    <img
                      src={screenshotPreview}
                      alt="Uploaded screenshot"
                      className="max-h-48 rounded-xl border border-[#E2E4F3] object-contain shadow-md"
                    />
                    <p className="text-xs text-[#7C83FD] font-semibold">Click or drop another image to replace</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3">
                    <div className="p-4 rounded-2xl bg-[#F0F2FF] border border-[#E2E4F3] text-[#7C83FD] shadow-xs">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#27324A]">
                        Drag and drop conversation screenshot here
                      </p>
                      <p className="text-xs text-[#68738A] mt-1">
                        Supports messaging apps, SMS, and email screenshots (PNG, JPG, WEBP)
                      </p>
                    </div>
                    <button
                      type="button"
                      className="px-4 py-2 rounded-xl bg-white text-xs font-semibold text-[#27324A] border border-[#E2E4F3] shadow-xs transition-colors pointer-events-none mt-2"
                    >
                      Browse Files
                    </button>
                  </div>
                )}
              </div>

              {ocrError && (
                <div className="p-3 rounded-xl bg-[#EFA7A7]/25 border border-[#EFA7A7] text-[#871E1E] text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{ocrError}</span>
                </div>
              )}

              {/* Extracted Conversation Editor on Tab 2 */}
              {conversationText && (
                <div className="space-y-2 mt-4 text-left">
                  <div className="flex items-center justify-between text-xs text-[#68738A]">
                    <span className="font-mono text-[#7C83FD] flex items-center gap-1.5 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#235738]" />
                      Extracted Conversation (Editable):
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="font-mono">{conversationText.length} characters</span>
                      <button
                        type="button"
                        onClick={() => {
                          setConversationText('');
                          setScreenshotPreview(null);
                          setScenarioName('');
                        }}
                        className="text-[#68738A] hover:text-[#871E1E] flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Clear</span>
                      </button>
                    </div>
                  </div>
                  <textarea
                    id="screenshot-extracted-textarea"
                    value={conversationText}
                    onChange={(e) => setConversationText(e.target.value)}
                    rows={8}
                    className="w-full rounded-xl border border-[#E2E4F3] bg-[#F0F2FF]/40 p-4 font-mono text-xs sm:text-sm text-[#27324A] placeholder-[#68738A]/60 focus:outline-none focus:border-[#7C83FD] focus:ring-1 focus:ring-[#7C83FD] transition-all leading-relaxed resize-y"
                    placeholder="Extracted conversation will appear here. Edit or correct messages before analyzing."
                  />
                </div>
              )}
            </div>
          )}

          {/* Action Row */}
          <div className="mt-6 pt-5 border-t border-[#E2E4F3] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs text-[#68738A]">
              <span className="w-2 h-2 rounded-full bg-[#A8D5BA]" />
              <span>AI Behavioral Engine: Operational</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                id="btn-analyze-scammirror"
                type="button"
                disabled={isLoading || isExtractingOcr || !conversationText.trim()}
                onClick={handleInitiateAnalysis}
                className="w-full sm:w-auto btn-primary-cyber text-sm py-3 px-8 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Reconstructing Attack Levers...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 fill-current" />
                    <span>Analyze with ScamMirror</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
