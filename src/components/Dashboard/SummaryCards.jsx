import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { formatCurrency, percentChange } from '../../utils/helpers';
import SummaryCard from '../UI/SummaryCard';

/**
 * Grid of summary metric cards displayed at the top of the dashboard.
 */
export default function SummaryCards() {
  const { balance, totalIncome, totalExpenses, savingsRate, monthlyData } = useAppContext();

  // Calculate balance trend vs previous month
  const balanceTrend =
    monthlyData.length >= 2
      ? percentChange(
          monthlyData[monthlyData.length - 1].balance,
          monthlyData[monthlyData.length - 2].balance || 1
        )
      : undefined;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 16,
        marginBottom: 28,
      }}
    >
      <SummaryCard
        icon={Wallet}
        label="Total Balance"
        value={formatCurrency(balance)}
        trend={balanceTrend}
        trendLabel="vs last month"
        color="#6366f1"
      />
      <SummaryCard
        icon={TrendingUp}
        label="Total Income"
        value={formatCurrency(totalIncome)}
        color="#10b981"
      />
      <SummaryCard
        icon={TrendingDown}
        label="Total Expenses"
        value={formatCurrency(totalExpenses)}
        color="#ef4444"
      />
      <SummaryCard
        icon={PiggyBank}
        label="Savings Rate"
        value={`${savingsRate.toFixed(1)}%`}
        color="#f59e0b"
      />
    </div>
  );
}
