import { ArrowUpDown, Edit2, Trash2 } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { formatCurrency, formatDate } from '../../utils/helpers';
import EmptyState from '../UI/EmptyState';

const COLUMNS = [
  { key: 'date', label: 'Date' },
  { key: 'description', label: 'Description' },
  { key: 'category', label: 'Category' },
  { key: 'amount', label: 'Amount' },
];

const MAX_VISIBLE = 50;

/**
 * Transaction data table with sortable columns and admin edit/delete actions.
 */
export default function TransactionTable() {
  const {
    filteredTransactions,
    sortField,
    toggleSort,
    isAdmin,
    openEditModal,
    deleteTransaction,
  } = useAppContext();

  if (filteredTransactions.length === 0) {
    return (
      <div className="card" style={{ overflow: 'hidden' }}>
        <EmptyState message="No transactions match your filters" />
      </div>
    );
  }

  const visibleTxns = filteredTransactions.slice(0, MAX_VISIBLE);

  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5 }}>
          {/* Header */}
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  onClick={() => toggleSort(col.key)}
                  style={{
                    padding: '13px 16px',
                    textAlign: 'left',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    fontSize: 12,
                    letterSpacing: 0.4,
                    cursor: 'pointer',
                    userSelect: 'none',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                    {col.label}
                    <ArrowUpDown size={12} style={{ opacity: sortField === col.key ? 1 : 0.3 }} />
                  </span>
                </th>
              ))}
              {isAdmin && (
                <th
                  style={{
                    padding: '13px 16px',
                    textAlign: 'right',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    fontSize: 12,
                  }}
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {visibleTxns.map((txn, idx) => (
              <tr
                key={txn.id}
                style={{
                  borderBottom:
                    idx < visibleTxns.length - 1 ? '1px solid var(--border-color)' : 'none',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-hover)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                {/* Date */}
                <td
                  className="mono"
                  style={{
                    padding: '13px 16px',
                    whiteSpace: 'nowrap',
                    color: 'var(--text-secondary)',
                    fontSize: 12.5,
                  }}
                >
                  {formatDate(txn.date)}
                </td>

                {/* Description */}
                <td style={{ padding: '13px 16px', fontWeight: 500, color: 'var(--text-primary)' }}>
                  {txn.description}
                </td>

                {/* Category */}
                <td style={{ padding: '13px 16px' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '3px 10px',
                      borderRadius: 6,
                      fontSize: 11.5,
                      fontWeight: 600,
                      background: 'var(--bg-tag)',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {txn.category}
                  </span>
                </td>

                {/* Amount */}
                <td
                  className="mono"
                  style={{
                    padding: '13px 16px',
                    fontWeight: 700,
                    whiteSpace: 'nowrap',
                    fontSize: 13,
                    color: txn.type === 'income' ? '#10b981' : '#ef4444',
                  }}
                >
                  {txn.type === 'income' ? '+' : '-'}
                  {formatCurrency(txn.amount)}
                </td>

                {/* Admin Actions */}
                {isAdmin && (
                  <td style={{ padding: '13px 16px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                    <button
                      onClick={() => openEditModal(txn)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#6366f1',
                        padding: 4,
                        marginRight: 4,
                      }}
                      aria-label={`Edit ${txn.description}`}
                    >
                      <Edit2 size={15} />
                    </button>
                    <button
                      onClick={() => deleteTransaction(txn.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#ef4444',
                        padding: 4,
                      }}
                      aria-label={`Delete ${txn.description}`}
                    >
                      <Trash2 size={15} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Overflow indicator */}
        {filteredTransactions.length > MAX_VISIBLE && (
          <div
            style={{
              padding: '12px 16px',
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontSize: 12,
              borderTop: '1px solid var(--border-color)',
            }}
          >
            Showing {MAX_VISIBLE} of {filteredTransactions.length} transactions
          </div>
        )}
      </div>
    </div>
  );
}
