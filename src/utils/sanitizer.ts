export interface SanitizationResult {
  sanitizedText: string;
  hasSensitiveData: boolean;
  detectedCount: {
    phones: number;
    emails: number;
    upiIds: number;
    accounts: number;
    cards: number;
    addresses: number;
  };
  detectedItems: Array<{
    type: 'PHONE' | 'EMAIL' | 'UPI_ID' | 'ACCOUNT' | 'CARD' | 'ADDRESS';
    preview: string;
  }>;
}

export function sanitizeConversation(text: string): SanitizationResult {
  let sanitized = text;
  const detectedItems: SanitizationResult['detectedItems'] = [];
  const counts = {
    phones: 0,
    emails: 0,
    upiIds: 0,
    accounts: 0,
    cards: 0,
    addresses: 0,
  };

  // 1. Emails
  const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b/g;
  sanitized = sanitized.replace(emailRegex, (match) => {
    counts.emails++;
    detectedItems.push({ type: 'EMAIL', preview: match.slice(0, 3) + '***@***' });
    return '[EMAIL]';
  });

  // 2. UPI IDs (e.g., name@okhdfcbank, user@paytm, 9876543210@ybl)
  const upiRegex = /\b[a-zA-Z0-9.\-_]{2,49}@(okhdfcbank|okaxis|oksbi|okicici|paytm|ybl|ibl|upi|axl|apl|barodampay|postbank)\b/gi;
  sanitized = sanitized.replace(upiRegex, (match) => {
    counts.upiIds++;
    detectedItems.push({ type: 'UPI_ID', preview: match.slice(0, 2) + '***@upi' });
    return '[UPI_ID]';
  });

  // 3. Card Numbers (13 to 19 digits with spaces or hyphens)
  const cardRegex = /\b(?:\d{4}[-\s]?){3}\d{4}\b|\b\d{15,16}\b/g;
  sanitized = sanitized.replace(cardRegex, (match) => {
    counts.cards++;
    detectedItems.push({ type: 'CARD', preview: '**** **** **** ' + match.replace(/\D/g, '').slice(-4) });
    return '[CARD]';
  });

  // 4. Bank Account Numbers (9 to 18 digits)
  const accountRegex = /\b(?:A\/C|Account|Acct|Acc)[\s:#-]*([0-9]{9,18})\b/gi;
  sanitized = sanitized.replace(accountRegex, (_match, group1) => {
    counts.accounts++;
    detectedItems.push({ type: 'ACCOUNT', preview: 'A/C ****' + group1.slice(-4) });
    return 'A/C [ACCOUNT]';
  });

  // 5. Phone numbers (Indian/international standard e.g. +91 98765 43210, 10 digits starting with 6-9, or US formatted)
  const phoneRegex = /(?:\+?\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b|\b[6-9]\d{9}\b/g;
  sanitized = sanitized.replace(phoneRegex, (match) => {
    // Avoid replacing single years like 2026 or pure dollar/rupee numbers if too short
    const digitsOnly = match.replace(/\D/g, '');
    if (digitsOnly.length >= 10 && digitsOnly.length <= 13) {
      counts.phones++;
      detectedItems.push({ type: 'PHONE', preview: match.slice(0, 2) + '******' + match.slice(-2) });
      return '[PHONE]';
    }
    return match;
  });

  // 6. Generic address patterns (e.g., Flat/Street/Road/Nagar/Block with numbers)
  const addressRegex = /\b(?:Flat\s*No\.?|House\s*No\.?|Plot\s*No\.?|Street|Road|Nagar|Colony|Sector|Avenue|Lane)\s+[A-Za-z0-9\s,-]{5,35}(?:,\s*[A-Za-z\s]+)?\b/gi;
  sanitized = sanitized.replace(addressRegex, (match) => {
    counts.addresses++;
    detectedItems.push({ type: 'ADDRESS', preview: match.slice(0, 10) + '...' });
    return '[ADDRESS]';
  });

  const totalDetected = counts.phones + counts.emails + counts.upiIds + counts.accounts + counts.cards + counts.addresses;

  return {
    sanitizedText: sanitized,
    hasSensitiveData: totalDetected > 0,
    detectedCount: counts,
    detectedItems
  };
}
