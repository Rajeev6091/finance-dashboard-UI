import { Plus, Download } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { transactionsToCSV, downloadCSV } from '../../utils/helpers';
import TransactionFilters from './TransactionFilters';
import TransactionTable from './TransactionTable';

/**
 * Transactions page composing filters, action buttons, and the data table.
 */
export default function TransactionsPage() {
  const { filteredTransactions, isAdmin, openAddModal } = useAppContext();

  const handleExport = () => {
    const csv = transactionsToCSV(filteredTransactions);
    downloadCSV(csv);
  };

  return (
    <div className="animate-fade-in">
      {/* Page Header + Actions */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 20,
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div>
          <h1
            style={{
              fontSize: 24,
              fontWeight: 700,
              marginBottom: 4,
              letterSpacing: -0.5,
              color: 'var(--text-primary)',
            }}
          >
            Transactions
          </h1>
          <p style={{ fontSize: 13.5, color: 'var(--text-secondary)' }}>
            {filteredTransactions.length} transaction
            {filteredTransactions.length !== 1 ? 's' : ''} found
          </p>
        </div>

        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button onClick={handleExport} className="btn-secondary">
            <Download size={15} /> Export
          </button>
          {isAdmin && (
            <button onClick={openAddModal} className="btn-primary">
              <Plus size={15} /> Add
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <TransactionFilters />

      {/* Table */}
      <TransactionTable />
    </div>
  );
}
