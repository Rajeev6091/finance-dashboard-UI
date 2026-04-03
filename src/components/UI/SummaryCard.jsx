import { ArrowUp, ArrowDown } from 'lucide-react';

/**
 * Summary metric card shown on the dashboard.
 * Displays an icon, label, value, and optional trend indicator.
 */
export default function SummaryCard({ icon: Icon, label, value, trend, trendLabel, color }) {
  const isUp = trend >= 0;

  return (
    <div className="card card-hover" style={{ padding: '22px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative circle */}
      <div
        style={{
          position: 'absolute',
          top: -30,
          right: -30,
          width: 90,
          height: 90,
          borderRadius: '50%',
          background: color,
          opacity: 0.08,
        }}
      />

      {/* Icon + Label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 12,
            background: color + '18',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon size={20} color={color} />
        </div>
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)', letterSpacing: 0.3 }}>
          {label}
        </span>
      </div>

      {/* Value */}
      <div style={{ fontSize: 26, fontWeight: 700, color: 'var(--text-primary)', letterSpacing: -0.5, marginBottom: trend !== undefined ? 8 : 0 }}>
        {value}
      </div>

      {/* Trend */}
      {trend !== undefined && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12.5 }}>
          {isUp ? <ArrowUp size={14} color="#10b981" /> : <ArrowDown size={14} color="#ef4444" />}
          <span style={{ color: isUp ? '#10b981' : '#ef4444', fontWeight: 600 }}>
            {Math.abs(trend).toFixed(1)}%
          </span>
          <span style={{ color: 'var(--text-muted)' }}>{trendLabel}</span>
        </div>
      )}
    </div>
  );
}
