import SummaryCards from './SummaryCards';
import BalanceTrendChart from './BalanceTrendChart';
import SpendingBreakdownChart from './SpendingBreakdownChart';
import IncomeExpenseChart from './IncomeExpenseChart';

/**
 * Dashboard overview page combining summary cards and visualizations.
 */
export default function DashboardPage() {
  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, marginBottom: 4, letterSpacing: -0.5, color: 'var(--text-primary)' }}>
          Dashboard
        </h1>
        <p style={{ fontSize: 13.5, color: 'var(--text-secondary)' }}>
          Your financial overview at a glance
        </p>
      </div>

      {/* Summary Metrics */}
      <SummaryCards />

      {/* Charts Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 20,
        }}
      >
        <BalanceTrendChart />
        <SpendingBreakdownChart />
        <IncomeExpenseChart />
      </div>
    </div>
  );
}
