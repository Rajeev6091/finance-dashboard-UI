import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { INITIAL_TRANSACTIONS } from '../data/mockData';
import { getMonthLabel, generateId, percentChange } from '../utils/helpers';
import { CHART_COLORS } from '../constants';

const AppContext = createContext(null);

/**
 * Custom hook to consume the app context.
 */
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

/**
 * Global state provider wrapping the entire application.
 * Manages: theme, role, transactions, filters, navigation, and derived data.
 */
export function AppProvider({ children }) {
  // ── Core State ──
  const [darkMode, setDarkMode] = useState(true);
  const [role, setRole] = useState('admin');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);

  // ── Filter State ──
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');

  // ── Modal State ──
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  // ── Mobile State ──
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ── Derived: Role check ──
  const isAdmin = role === 'admin';

  // ── Derived: Financial summaries ──
  const totalIncome = useMemo(
    () => transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const totalExpenses = useMemo(
    () => transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0),
    [transactions]
  );

  const balance = totalIncome - totalExpenses;

  const savingsRate = useMemo(
    () => (totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0),
    [totalIncome, totalExpenses]
  );

  // ── Derived: Monthly data for charts ──
  const monthlyData = useMemo(() => {
    const map = {};

    transactions.forEach((t) => {
      const key = t.date.slice(0, 7);
      if (!map[key]) map[key] = { month: key, income: 0, expenses: 0 };
      if (t.type === 'income') map[key].income += t.amount;
      else map[key].expenses += t.amount;
    });

    return Object.values(map)
      .sort((a, b) => a.month.localeCompare(b.month))
      .map((m) => ({
        ...m,
        balance: m.income - m.expenses,
        label: getMonthLabel(m.month + '-01'),
      }));
  }, [transactions]);

  // ── Derived: Category spending data for pie chart ──
  const categoryData = useMemo(() => {
    const map = {};

    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        map[t.category] = (map[t.category] || 0) + t.amount;
      });

    return Object.entries(map)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }, [transactions]);

  // ── Derived: Filtered & sorted transactions ──
  const filteredTransactions = useMemo(() => {
    let list = [...transactions];

    // Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (t) =>
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }

    // Type filter
    if (filterType !== 'all') {
      list = list.filter((t) => t.type === filterType);
    }

    // Category filter
    if (filterCategory !== 'all') {
      list = list.filter((t) => t.category === filterCategory);
    }

    // Sort
    list.sort((a, b) => {
      let cmp = 0;
      if (sortField === 'date') cmp = a.date.localeCompare(b.date);
      else if (sortField === 'amount') cmp = a.amount - b.amount;
      else if (sortField === 'category') cmp = a.category.localeCompare(b.category);
      else cmp = a.description.localeCompare(b.description);
      return sortDirection === 'asc' ? cmp : -cmp;
    });

    return list;
  }, [transactions, searchQuery, filterType, filterCategory, sortField, sortDirection]);

  // ── Derived: Insight cards ──
  const insights = useMemo(() => {
    const results = [];

    // Top spending category
    if (categoryData.length > 0) {
      results.push({
        id: 'top-category',
        iconName: 'Tag',
        color: '#ef4444',
        title: 'Top Spending Category',
        value: categoryData[0].name,
        detail: `₹${Math.round(categoryData[0].value).toLocaleString('en-IN')} total`,
      });
    }

    // Monthly expense trend
    if (monthlyData.length >= 2) {
      const last = monthlyData[monthlyData.length - 1];
      const prev = monthlyData[monthlyData.length - 2];
      const change = percentChange(last.expenses, prev.expenses);
      results.push({
        id: 'monthly-trend',
        iconName: 'Activity',
        color: change > 0 ? '#ef4444' : '#10b981',
        title: 'Monthly Expense Trend',
        value: `${change > 0 ? '+' : ''}${change.toFixed(1)}%`,
        detail: `${last.label} vs ${prev.label}`,
      });
    }

    // Average expense
    const expenseTxns = transactions.filter((t) => t.type === 'expense');
    if (expenseTxns.length > 0) {
      const avg = expenseTxns.reduce((s, t) => s + t.amount, 0) / expenseTxns.length;
      results.push({
        id: 'avg-expense',
        iconName: 'CreditCard',
        color: '#f59e0b',
        title: 'Average Expense',
        value: `₹${Math.round(avg).toLocaleString('en-IN')}`,
        detail: `Across ${expenseTxns.length} transactions`,
      });
    }

    // Savings rate
    results.push({
      id: 'savings-rate',
      iconName: 'PiggyBank',
      color: '#6366f1',
      title: 'Savings Rate',
      value: `${savingsRate.toFixed(1)}%`,
      detail: 'Of total income',
    });

    // Best month
    if (monthlyData.length > 0) {
      const best = [...monthlyData].sort((a, b) => b.balance - a.balance)[0];
      results.push({
        id: 'best-month',
        iconName: 'TrendingUp',
        color: '#10b981',
        title: 'Best Month',
        value: best.label,
        detail: `₹${Math.round(best.balance).toLocaleString('en-IN')} net savings`,
      });
    }

    // Lowest spending category
    if (categoryData.length >= 2) {
      const least = categoryData[categoryData.length - 1];
      results.push({
        id: 'lowest-spending',
        iconName: 'Wallet',
        color: '#8b5cf6',
        title: 'Lowest Spending',
        value: least.name,
        detail: `₹${Math.round(least.value).toLocaleString('en-IN')} total`,
      });
    }

    return results;
  }, [categoryData, monthlyData, transactions, savingsRate]);

  // ── Actions ──
  const addTransaction = useCallback((formData) => {
    const newTxn = { ...formData, id: generateId() };
    setTransactions((prev) => [newTxn, ...prev]);
  }, []);

  const updateTransaction = useCallback((id, formData) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...formData } : t))
    );
  }, []);

  const deleteTransaction = useCallback((id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toggleSort = useCallback(
    (field) => {
      if (sortField === field) {
        setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortField(field);
        setSortDirection('desc');
      }
    },
    [sortField]
  );

  const openAddModal = useCallback(() => {
    setEditingTransaction(null);
    setModalOpen(true);
  }, []);

  const openEditModal = useCallback((txn) => {
    setEditingTransaction(txn);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setEditingTransaction(null);
  }, []);

  const toggleDarkMode = useCallback(() => setDarkMode((d) => !d), []);
  const toggleMobileMenu = useCallback(() => setMobileMenuOpen((o) => !o), []);
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  // ── Context Value ──
  const value = {
    // Theme
    darkMode,
    toggleDarkMode,

    // Role
    role,
    setRole,
    isAdmin,

    // Navigation
    activeTab,
    setActiveTab,
    mobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,

    // Transactions
    transactions,
    filteredTransactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,

    // Filters
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    filterCategory,
    setFilterCategory,
    sortField,
    sortDirection,
    toggleSort,

    // Modal
    modalOpen,
    editingTransaction,
    openAddModal,
    openEditModal,
    closeModal,

    // Derived data
    totalIncome,
    totalExpenses,
    balance,
    savingsRate,
    monthlyData,
    categoryData,
    insights,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
