import { Receipt } from 'lucide-react';

/**
 * Placeholder shown when no data is available.
 */
export default function EmptyState({ message = 'No data available' }) {
  return (
    <div style={{ textAlign: 'center', padding: '48px 24px', color: 'var(--text-muted)' }}>
      <Receipt size={40} style={{ marginBottom: 12, opacity: 0.4 }} />
      <p style={{ fontSize: 14, margin: 0 }}>{message}</p>
    </div>
  );
}
