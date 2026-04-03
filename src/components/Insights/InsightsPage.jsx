import { useAppContext } from '../../context/AppContext';
import InsightCard from './InsightCard';
import CategoryBreakdown from './CategoryBreakdown';

/**
 * Insights page showing computed financial observations and category analysis.
 */
export default function InsightsPage() {
  const { insights } = useAppContext();

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <div style={{ marginBottom: 24 }}>
        <h1
          style={{
            fontSize: 24,
            fontWeight: 700,
            marginBottom: 4,
            letterSpacing: -0.5,
            color: 'var(--text-primary)',
          }}
        >
          Insights
        </h1>
        <p style={{ fontSize: 13.5, color: 'var(--text-secondary)' }}>
          Key observations from your financial data
        </p>
      </div>

      {/* Insight Cards Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 16,
          marginBottom: 28,
        }}
      >
        {insights.map((insight) => (
          <InsightCard key={insight.id} insight={insight} />
        ))}
      </div>

      {/* Category Breakdown */}
      <CategoryBreakdown />
    </div>
  );
}
