import { DemoScenario } from '../types';

export const DEMO_SCENARIOS: DemoScenario[] = [
  {
    id: 'bank-impersonation',
    title: 'Bank Impersonation',
    icon: 'Building2',
    attack_type: 'Financial Social Engineering',
    difficulty: 'Intermediate',
    risk_level: 'HIGH',
    description: 'Fake bank employee → urgency → OTP and verification fee request',
    conversation: `Unknown: Hello, I'm calling from the bank security department.
User: What happened?
Unknown: We detected suspicious activity on your account.
Unknown: You have only 10 minutes to complete verification.
Unknown: Don't tell anyone because this is confidential.
Unknown: Send ₹2,000 to the verification account.
Unknown: The money will be refunded after verification.`,
    expected_tactics: [
      'False Authority',
      'Fear Induction',
      'Urgency Pressure',
      'Social Isolation',
      'Financial Request',
      'False Refund Guarantee'
    ]
  },
  {
    id: 'job-scam',
    title: 'Work-From-Home Job Scam',
    icon: 'Briefcase',
    attack_type: 'Employment Advance-Fee Fraud',
    difficulty: 'Beginner',
    risk_level: 'HIGH',
    description: 'Fake recruiter → attractive salary → registration fee for training materials',
    conversation: `Apex Talent HR: Greetings! Your profile was shortlisted for a Global Remote Reviewer role.
User: I don't remember applying to this.
Apex Talent HR: Our global talent scouting algorithm selected you directly. Daily pay is ₹4,500 for 1-2 hours of smartphone tasks.
User: Sounds interesting. What are the details?
Apex Talent HR: You will review enterprise merchant products. First step is onboarding and kit provisioning.
Apex Talent HR: To activate your employee portal credentials, please transfer ₹1,200 refundable registration and software bond.
User: Can you deduct it from my first day payment?
Apex Talent HR: Company protocol requires upfront clearing to bind equipment warranty. Offer expires at 5:00 PM today.`,
    expected_tactics: [
      'Flattery & Trust Building',
      'Unrealistic Reward',
      'Advance-Fee Pretext',
      'Artificial Deadline'
    ]
  },
  {
    id: 'crypto-investment-scam',
    title: 'Cryptocurrency Investment Fraud',
    icon: 'TrendingUp',
    attack_type: 'Ponzi & Liquidity Pool Scheme',
    difficulty: 'Advanced',
    risk_level: 'CRITICAL',
    description: 'Fake advisor → fabricated trading portal → emergency liquidity fee extortion',
    conversation: `Crypto Arbitrage Analyst: Hello sir, I am reaching out from Apex Web3 Asset Management. Our automated arbitrage engine generated 340% yields this week.
User: How did you find my Telegram username?
Crypto Arbitrage Analyst: We randomly whitelist active blockchain addresses. You can start with a micro-deposit of $250 with zero risk.
User: I'm skeptical of high returns.
Crypto Arbitrage Analyst: Here is our certified audit screenshot and trading ledger. You can test withdrawal of your initial profits after 2 hours.
User: Okay, I deposited $250 on your portal.
Crypto Arbitrage Analyst: Incredible! Your balance is now $1,840. To unlock and execute your blockchain withdrawal, the smart contract requires a liquidity clearing deposit of $600 within 45 minutes or your wallet address gets blacklisted.`,
    expected_tactics: [
      'Unsolicited High-Yield Opportunity',
      'Fabricated Social Proof & Audits',
      'Initial Small Commitment Hook',
      'Artificial Asset Surge',
      'Emergency Liquidity Extortion'
    ]
  },
  {
    id: 'tech-support',
    title: 'Tech Support Scam',
    icon: 'Smartphone',
    attack_type: 'Remote Access / Device Compromise',
    difficulty: 'Intermediate',
    risk_level: 'HIGH',
    description: 'Fake support agent → device problem warning → remote-access software installation',
    conversation: `System Alert Agent: Critical Alert: Your device has triggered 14 Trojan virus signatures on our network gateway.
User: Who is this? My antivirus hasn't shown anything.
System Alert Agent: This is Certified Senior Security Specialist Mark from Microsoft Windows Infrastructure Support.
System Alert Agent: Third-party antivirus cannot see kernel-level rootkits. Hackers are currently scraping your stored passwords.
User: What do I need to do to stop it?
System Alert Agent: Do not restart or turn off your device. Immediately open your browser and download QuickAssist / AnyDesk software so I can purge the server threat.
User: Is that safe?
System Alert Agent: Every second you hesitate, your banking credentials are broadcasting to an overseas IP. Grant remote access now.`,
    expected_tactics: [
      'Fabricated Technical Threat',
      'Impersonation of Established Brand',
      'Panic Escalation',
      'Remote Administration Tool Coercion'
    ]
  },
  {
    id: 'prize-scam',
    title: 'Lucky Winner Prize Scam',
    icon: 'Gift',
    attack_type: 'Lottery / Reward Advance Fee',
    difficulty: 'Beginner',
    risk_level: 'MEDIUM',
    description: 'Fake reward notification → customs processing fee → payment request',
    conversation: `Global Rewards Dept: CONGRATULATIONS! Your mobile number has been selected as the 1st prize winner of ₹5,00,000 cash prize and iPhone 16 Pro in our 2026 Customer Appreciation Draw!
User: I never entered any lottery draw.
Global Rewards Dept: Every active SIM in the telecom network is entered automatically by algorithm. Reference Ticket #WIN-99214.
Global Rewards Dept: To release the consignment and dispatch courier through secure insured cargo, deposit government GST clearance charges of ₹3,499.
User: Can you take it from the 5 lakh prize money?
Global Rewards Dept: Direct deduction is prohibited under Section 194B of the Lottery Tax Act. Pay via UPI immediately within 30 minutes to claim before reallocation.`,
    expected_tactics: [
      'Unsolicited Grand Prize',
      'Pseudo-Legal Justification',
      'Time-Bound Urgency',
      'Upfront Processing Fee Pretext'
    ]
  },
  {
    id: 'government-impersonation',
    title: 'Government / Law Enforcement Scam',
    icon: 'Landmark',
    attack_type: 'Digital Arrest / Legal Intimidation',
    difficulty: 'Advanced',
    risk_level: 'CRITICAL',
    description: 'Fake police/cyber officer → legal threat → demands secret funds verification',
    conversation: `Officer Sharma (CBI): Attention. This is Inspector Sharma, Cyber Crime Cell Headquarters.
User: Why are you messaging me?
Officer Sharma (CBI): A courier package containing 5 expired passports and synthetic narcotics in your name was intercepted at Mumbai International Cargo.
User: That has nothing to do with me! Somebody else must have used my name!
Officer Sharma (CBI): A non-bailable arrest warrant #CBI-8820 has been registered. You are under Digital Arrest starting this moment.
Officer Sharma (CBI): Do not disconnect this call or notify family members, or local police will raid your premises immediately.
Officer Sharma (CBI): To verify your innocence and clear your bank accounts from money-laundering blacklists, transfer all balances to RBI Reserve Security Account for forensic clearance.`,
    expected_tactics: [
      'State Authority Coercion',
      'Fabricated Criminal Accusation',
      'Digital Arrest / Severe Legal Threat',
      'Total Secrecy / Isolation',
      'Asset Liquidation Demand'
    ]
  }
];
