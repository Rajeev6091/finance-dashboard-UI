import {
  Tag,
  Activity,
  CreditCard,
  PiggyBank,
  TrendingUp,
  Wallet,
} from 'lucide-react';

/** Map icon name strings to actual components */
const ICON_MAP = {
  Tag,
  Activity,
  CreditCard,
  PiggyBank,
  TrendingUp,
  Wallet,
};

/**
 * Single insight card displaying a computed financial observation.
 */
export default function InsightCard({ insight }) {
  const Icon = ICON_MAP[insight.iconName] || Tag;

  return (
    <div
      className="card card-hover"
      style={{
        padding: '22px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative circle */}
      <div
        style={{
          position: 'absolute',
          top: -20,
          right: -20,
          width: 70,
          height: 70,
          borderRadius: '50%',
          background: insight.color,
          opacity: 0.07,
        }}
      />

      {/* Icon + Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 11,
            background: insight.color + '15',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon size={18} color={insight.color} />
        </div>
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>
          {insight.title}
        </span>
      </div>

      {/* Value */}
      <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.3, color: 'var(--text-primary)' }}>
        {insight.value}
      </div>

      {/* Detail */}
      <div style={{ fontSize: 12.5, color: 'var(--text-secondary)' }}>{insight.detail}</div>
    </div>
  );
}
