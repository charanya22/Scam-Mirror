import { AnalysisResult, UserProfile } from '../types';

const USER_KEY = 'scammirror_user';
const HISTORY_KEY = 'scammirror_history';
const DEMO_HISTORY_KEY = 'scammirror_demo_history';

export function getStoredUser(): UserProfile | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function saveUser(user: UserProfile): void {
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  } catch (e) {
    console.error('Failed to save user session', e);
  }
}

export function clearUser(): void {
  try {
    localStorage.removeItem(USER_KEY);
  } catch (e) {
    console.error('Failed to clear user', e);
  }
}

export function getStoredHistory(isDemo: boolean = false): AnalysisResult[] {
  try {
    const key = isDemo ? DEMO_HISTORY_KEY : HISTORY_KEY;
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function saveAnalysisToHistory(analysis: AnalysisResult, isDemo: boolean = false): void {
  try {
    const key = isDemo ? DEMO_HISTORY_KEY : HISTORY_KEY;
    const current = getStoredHistory(isDemo);
    // Avoid duplicate if same id exists
    const filtered = current.filter((item) => item.id !== analysis.id);
    const updated = [analysis, ...filtered].slice(0, 30); // keep recent 30
    localStorage.setItem(key, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save history', e);
  }
}

export function deleteAnalysisFromHistory(id: string, isDemo: boolean = false): void {
  try {
    const key = isDemo ? DEMO_HISTORY_KEY : HISTORY_KEY;
    const current = getStoredHistory(isDemo);
    const updated = current.filter((item) => item.id !== id);
    localStorage.setItem(key, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to delete analysis', e);
  }
}

export function clearAllHistory(isDemo: boolean = false): void {
  try {
    const key = isDemo ? DEMO_HISTORY_KEY : HISTORY_KEY;
    localStorage.removeItem(key);
  } catch (e) {
    console.error('Failed to clear history', e);
  }
}

// Aliases
export const getUserProfile = getStoredUser;
export const saveUserProfile = saveUser;
export const clearUserProfile = clearUser;
export const getAnalysisHistory = getStoredHistory;
export const saveAnalysis = saveAnalysisToHistory;
