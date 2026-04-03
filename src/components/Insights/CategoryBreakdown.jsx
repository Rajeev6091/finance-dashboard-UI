import { Tag } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { formatCurrency } from '../../utils/helpers';
import { CHART_COLORS } from '../../constants';
import EmptyState from '../UI/EmptyState';

/**
 * Detailed category breakdown with horizontal progress bars
 * showing each category's share of total expenses.
 */
export default function CategoryBreakdown() {
  const { categoryData, totalExpenses } = useAppContext();

  return (
    <div className="card" style={{ padding: '22px 24px' }}>
      <h3
        style={{
          fontSize: 15,
          fontWeight: 700,
          marginBottom: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          color: 'var(--text-primary)',
        }}
      >
        <Tag size={16} color="#f59e0b" />
        Category Breakdown
      </h3>

      {categoryData.length === 0 ? (
        <EmptyState message="No expense data to analyze" />
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {categoryData.map((cat, i) => {
            const pct = totalExpenses > 0 ? (cat.value / totalExpenses) * 100 : 0;
            return (
              <div key={cat.name}>
                {/* Label Row */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 6,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: 3,
                        background: CHART_COLORS[i % CHART_COLORS.length],
                      }}
                    />
                    <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>
                      {cat.name}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'baseline' }}>
                    <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      {pct.toFixed(1)}%
                    </span>
                    <span
                      className="mono"
                      style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}
                    >
                      {formatCurrency(cat.value)}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div
                  style={{
                    height: 6,
                    borderRadius: 3,
                    background: 'var(--bg-bar)',
                  }}
                >
                  <div
                    style={{
                      height: '100%',
                      borderRadius: 3,
                      width: `${pct}%`,
                      background: CHART_COLORS[i % CHART_COLORS.length],
                      transition: 'width 0.6s ease-out',
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
