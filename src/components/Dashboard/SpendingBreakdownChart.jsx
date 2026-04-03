import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Tag } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { formatCurrency } from '../../utils/helpers';
import { CHART_COLORS } from '../../constants';
import EmptyState from '../UI/EmptyState';

/**
 * Donut chart showing spending distribution by category.
 */
export default function SpendingBreakdownChart() {
  const { categoryData } = useAppContext();

  return (
    <div className="card" style={{ padding: '22px 20px' }}>
      <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 18, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-primary)' }}>
        <Tag size={16} color="#f59e0b" />
        Spending Breakdown
      </h3>

      {categoryData.length === 0 ? (
        <EmptyState message="No expense data" />
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          {/* Pie Chart */}
          <div style={{ width: 180, height: 180, flexShrink: 0 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={3}
                  dataKey="value"
                  stroke="none"
                >
                  {categoryData.map((_, i) => (
                    <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v) => formatCurrency(v)}
                  contentStyle={{
                    background: 'var(--tooltip-bg)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 10,
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1, minWidth: 140 }}>
            {categoryData.slice(0, 5).map((cat, i) => (
              <div key={cat.name} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5 }}>
                <div
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 3,
                    background: CHART_COLORS[i],
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    color: 'var(--text-secondary)',
                    flex: 1,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {cat.name}
                </span>
                <span className="mono" style={{ fontWeight: 600, fontSize: 11.5, color: 'var(--text-primary)' }}>
                  {formatCurrency(cat.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
