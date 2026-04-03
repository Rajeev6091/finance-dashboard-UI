/**
 * Format number as Indian Rupee currency.
 */
export const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

/**
 * Format ISO date string to readable date (e.g. "3 Apr 2025").
 */
export const formatDate = (dateStr) =>
  new Date(dateStr + 'T00:00:00').toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

/**
 * Get short month label from ISO date (e.g. "Apr '25").
 */
export const getMonthLabel = (dateStr) =>
  new Date(dateStr + 'T00:00:00').toLocaleDateString('en-IN', {
    month: 'short',
    year: '2-digit',
  });

/**
 * Generate a unique ID.
 */
export const generateId = () => `txn-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

/**
 * Convert transactions to CSV string.
 */
export const transactionsToCSV = (transactions) => {
  const header = 'Date,Description,Category,Type,Amount\n';
  const rows = transactions
    .map((t) => `${t.date},"${t.description}",${t.category},${t.type},${t.amount}`)
    .join('\n');
  return header + rows;
};

/**
 * Trigger a CSV file download.
 */
export const downloadCSV = (csvString, filename = 'transactions.csv') => {
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};

/**
 * Calculate percentage change between two values.
 */
export const percentChange = (current, previous) => {
  if (previous === 0) return 0;
  return ((current - previous) / Math.abs(previous)) * 100;
};
