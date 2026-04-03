// ── Categories ──
export const CATEGORIES = [
  'Food & Dining',
  'Shopping',
  'Transportation',
  'Entertainment',
  'Utilities',
  'Healthcare',
  'Education',
  'Salary',
  'Freelance',
  'Investment',
];

export const EXPENSE_CATEGORIES = CATEGORIES.slice(0, 7);
export const INCOME_CATEGORIES = CATEGORIES.slice(7);

// ── Chart Colors ──
export const CHART_COLORS = [
  '#6366f1',
  '#f59e0b',
  '#10b981',
  '#ef4444',
  '#8b5cf6',
  '#ec4899',
  '#06b6d4',
  '#f97316',
  '#84cc16',
  '#14b8a6',
];

// ── Role Config ──
export const ROLES = {
  admin: { label: 'Admin', color: '#6366f1' },
  viewer: { label: 'Viewer', color: '#10b981' },
};

// ── Navigation Items ──
export const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'transactions', label: 'Transactions' },
  { key: 'insights', label: 'Insights' },
];

// ── Transaction Descriptions ──
export const DESCRIPTIONS = {
  'Food & Dining': ['Starbucks Coffee', 'Domino\'s Pizza', 'Grocery Store', 'Restaurant Dinner', 'Zomato Order'],
  'Shopping': ['Amazon Purchase', 'Flipkart Order', 'Nike Store', 'IKEA Furniture', 'Electronics Mart'],
  'Transportation': ['Uber Ride', 'Metro Card Recharge', 'Fuel Station', 'Ola Cab', 'Parking Fee'],
  'Entertainment': ['Netflix Subscription', 'Movie Tickets', 'Spotify Premium', 'Concert Tickets', 'Gaming Purchase'],
  'Utilities': ['Electricity Bill', 'Internet Bill', 'Water Bill', 'Gas Bill', 'Phone Recharge'],
  'Healthcare': ['Pharmacy', 'Doctor Visit', 'Lab Tests', 'Health Insurance', 'Dental Checkup'],
  'Education': ['Online Course', 'Books Purchase', 'Workshop Fee', 'Certification Exam', 'Stationery'],
  'Salary': ['Monthly Salary', 'Bonus Payment', 'Overtime Pay'],
  'Freelance': ['Client Project', 'Consulting Fee', 'Design Work', 'Writing Assignment'],
  'Investment': ['Dividend Income', 'Stock Sale', 'Interest Income', 'Rental Income'],
};
