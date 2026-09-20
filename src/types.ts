export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface ManipulationStage {
  stage: string;
  severity: RiskLevel;
  message_reference: string;
  evidence: string;
  explanation: string;
}

export interface ReplayStep {
  step_number: number;
  sender: string;
  message: string;
  detection_stage?: string;
  severity?: RiskLevel | 'NONE';
  tactical_breakdown?: string;
}

export interface AnalysisResult {
  id?: string;
  timestamp?: string;
  created_at?: string;
  title?: string;
  overall_risk: RiskLevel;
  risk_level?: RiskLevel;
  risk_score: number;
  summary: string;
  attacker_objective: string;
  targeted_assets: string[];
  manipulation_stages: ManipulationStage[];
  red_flags: string[];
  evidence?: string[];
  requests_detected: string[];
  recommended_actions: string[];
  confidence: number;
  uncertainty_notes: string[];
  replay_steps?: ReplayStep[];
  conversation_text?: string;
  language?: 'en' | 'hi' | 'te';
  scenario_name?: string;
  is_demo?: boolean;
}

export interface DemoScenario {
  id: string;
  title: string;
  icon: string;
  attack_type: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  risk_level: RiskLevel;
  description: string;
  conversation: string;
  expected_tactics: string[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  accountType: 'Regular User' | 'Demo User' | 'Cybersecurity Analyst' | 'SOC Analyst' | 'Security Analyst (Guest)';
  createdAt: string;
}
