import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, DESCRIPTIONS } from '../constants';

/**
 * Generate realistic mock transaction data spanning 6 months.
 */
export const generateTransactions = () => {
  const transactions = [];

  for (let m = 0; m < 6; m++) {
    const month = 9 + m;
    const year = month > 12 ? 2026 : 2025;
    const actualMonth = month > 12 ? month - 12 : month;
    const daysInMonth = new Date(year, actualMonth, 0).getDate();
    const txnCount = 18 + Math.floor(Math.random() * 8);

    for (let i = 0; i < txnCount; i++) {
      const isIncome = Math.random() < 0.25;
      const category = isIncome
        ? INCOME_CATEGORIES[Math.floor(Math.random() * INCOME_CATEGORIES.length)]
        : EXPENSE_CATEGORIES[Math.floor(Math.random() * EXPENSE_CATEGORIES.length)];

      const descs = DESCRIPTIONS[category];
      const day = 1 + Math.floor(Math.random() * daysInMonth);

      const amount = isIncome
        ? Math.round((2000 + Math.random() * 8000) * 100) / 100
        : Math.round((50 + Math.random() * 1500) * 100) / 100;

      transactions.push({
        id: `txn-${year}${actualMonth}-${i}`,
        date: `${year}-${String(actualMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
        description: descs[Math.floor(Math.random() * descs.length)],
        category,
        amount,
        type: isIncome ? 'income' : 'expense',
      });
    }
  }

  return transactions.sort((a, b) => b.date.localeCompare(a.date));
};

/**
 * Pre-generated initial dataset.
 */
export const INITIAL_TRANSACTIONS = generateTransactions();
