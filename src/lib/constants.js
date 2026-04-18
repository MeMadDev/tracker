import THEME from './theme';

export const PATTERNS = [
  'Arrays', 'Strings', 'Hashing', 'Two Pointers', 'Sliding Window',
  'Binary Search', 'Stacks', 'Queues', 'Recursion', 'Backtracking',
  'Linked Lists', 'Trees', 'BST', 'Graphs', 'Heaps',
  'DP', 'Greedy', 'Tries', 'Bit Manipulation', 'Math', 'Sorting'
];

export const ROUNDS = [
  'Recruiter Screen', 'Online Assessment', 'Technical 1', 'Technical 2',
  'System Design', 'Behavioral', 'Final / Hiring Manager', 'Founder Round'
];

export const STATUSES = [
  { value: 'applied', label: 'Applied', color: '#64748B' },
  { value: 'screening', label: 'Screening', color: '#3B82F6' },
  { value: 'technical', label: 'Technical', color: '#F59E0B' },
  { value: 'final', label: 'Final', color: '#8B5CF6' },
  { value: 'offer', label: 'Offer', color: '#10B981' },
  { value: 'rejected', label: 'Rejected', color: '#EF4444' },
  { value: 'ghosted', label: 'Ghosted', color: '#9CA3AF' },
];

export const TIERS = [
  { value: 'tier1', label: 'Tier 1', color: THEME.tier1 },
  { value: 'tier15', label: 'Tier 1.5', color: THEME.tier15 },
  { value: 'tier2', label: 'Tier 2', color: THEME.tier2 },
];

export const OUTCOMES = [
  { value: 'nailed', label: 'Nailed', color: THEME.success },
  { value: 'partial', label: 'Partial', color: THEME.warning },
  { value: 'struggled', label: 'Struggled', color: THEME.danger },
];

export const WORKOUT_TYPES = [
  'Chest & Triceps', 'Back & Biceps', 'Shoulders & Legs', 'Cardio', 'Full Body', 'Yoga', 'Rest'
];

export const FINANCE_ACCOUNTS = [
  { key: 'hdfc', name: 'HDFC' },
  { key: 'iob', name: 'IOB' },
  { key: 'pixel', name: 'Pixel Credit Card' },
];

export const DEFAULT_SYSTEM_DESIGN_CHAPTERS = [
  { id: 'ch1', chapter: 1, title: 'Scale from Zero to Millions', completed: false, dateCompleted: null, notes: '' },
  { id: 'ch2', chapter: 2, title: 'Back-of-Envelope Estimation', completed: false, dateCompleted: null, notes: '' },
  { id: 'ch3', chapter: 3, title: 'A Framework for System Design Interviews', completed: false, dateCompleted: null, notes: '' },
  { id: 'ch4', chapter: 4, title: 'Design a Rate Limiter', completed: false, dateCompleted: null, notes: '' },
  { id: 'ch5', chapter: 5, title: 'Design Consistent Hashing', completed: false, dateCompleted: null, notes: '' },
  { id: 'ch6', chapter: 6, title: 'Design a Key-Value Store', completed: false, dateCompleted: null, notes: '' },
  { id: 'ch7', chapter: 7, title: 'Design a Unique ID Generator in Distributed Systems', completed: false, dateCompleted: null, notes: '' },
  { id: 'ch8', chapter: 8, title: 'Design a URL Shortener', completed: false, dateCompleted: null, notes: '' },
  { id: 'ch9', chapter: 9, title: 'Design a Web Crawler', completed: false, dateCompleted: null, notes: '' },
  { id: 'ch10', chapter: 10, title: 'Design a Notification System', completed: false, dateCompleted: null, notes: '' },
  { id: 'ch11', chapter: 11, title: 'Design a News Feed System', completed: false, dateCompleted: null, notes: '' },
  { id: 'ch12', chapter: 12, title: 'Design a Chat System', completed: false, dateCompleted: null, notes: '' },
  { id: 'ch13', chapter: 13, title: 'Design a Search Autocomplete System', completed: false, dateCompleted: null, notes: '' },
];

export const DEFAULT_TARGET_COMPANIES = [
  { id: 'google', company: 'Google', role: 'SWE L3/L4', tier: 'tier1', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18' },
  { id: 'microsoft', company: 'Microsoft', role: 'SDE 2', tier: 'tier1', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18' },
  { id: 'amazon', company: 'Amazon', role: 'SDE 2', tier: 'tier1', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18' },
  { id: 'atlassian', company: 'Atlassian', role: 'Senior SWE', tier: 'tier1', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18' },
  { id: 'uber', company: 'Uber', role: 'SWE II', tier: 'tier1', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18' },
  { id: 'adobe', company: 'Adobe', role: 'MTS 2', tier: 'tier1', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18' },
  { id: 'meta', company: 'Meta', role: 'E4', tier: 'tier1', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18' },
  { id: 'salesforce', company: 'Salesforce', role: 'MTS / Senior MTS', tier: 'tier1', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18' },
  { id: 'razorpay', company: 'Razorpay', role: 'SWE', tier: 'tier15', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18' },
  { id: 'cred', company: 'CRED', role: 'SWE', tier: 'tier15', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18' },
  { id: 'postman', company: 'Postman', role: 'SWE', tier: 'tier15', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18' },
  { id: 'swiggy', company: 'Swiggy', role: 'SWE', tier: 'tier15', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18' },
  { id: 'flipkart', company: 'Flipkart', role: 'SWE', tier: 'tier15', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18' },
  { id: 'phonepe', company: 'PhonePe', role: 'SWE', tier: 'tier15', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18' },
  { id: 'zomato', company: 'Zomato', role: 'SWE', tier: 'tier15', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18' },
  { id: 'dream11', company: 'Dream11', role: 'SWE', tier: 'tier15', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18' },
  { id: 'groww', company: 'Groww', role: 'SWE', tier: 'tier15', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18' },
  { id: 'walmart', company: 'Walmart Labs', role: 'SWE', tier: 'tier15', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18' },
  { id: 'sprinklr', company: 'Sprinklr', role: 'SWE', tier: 'tier15', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18' },
  { id: 'zerodha', company: 'Zerodha', role: 'SWE', tier: 'tier15', applied: false, referralStatus: 'none', referrerName: '', notes: '', dateAdded: '2026-04-18' },
];

export const DEFAULT_AROGYACARE_TASKS = [
  { id: 'ac1', task: 'LangGraph multi-agent: missed-dose detector + family-escalation agent', status: 'todo', notes: '', dateAdded: '2026-04-18', dateCompleted: null },
  { id: 'ac2', task: 'Natural-language chat for patients (RAG over medical FAQ corpus)', status: 'todo', notes: '', dateAdded: '2026-04-18', dateCompleted: null },
  { id: 'ac3', task: 'Deploy publicly: Vercel (frontend) + Railway/Render (backend)', status: 'todo', notes: '', dateAdded: '2026-04-18', dateCompleted: null },
  { id: 'ac4', task: 'Record 90-sec demo video for resume + LinkedIn', status: 'todo', notes: '', dateAdded: '2026-04-18', dateCompleted: null },
];
