import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from '../../constants';

const DEFAULT_FORM = {
  description: '',
  amount: '',
  category: EXPENSE_CATEGORIES[0],
  type: 'expense',
  date: new Date().toISOString().slice(0, 10),
};

/**
 * Modal dialog for creating or editing a transaction.
 * Controlled by the AppContext modal state.
 */
export default function TransactionModal() {
  const { modalOpen, editingTransaction, closeModal, addTransaction, updateTransaction } =
    useAppContext();

  const [form, setForm] = useState(DEFAULT_FORM);

  // Sync form when modal opens
  useEffect(() => {
    if (editingTransaction) {
      setForm({
        description: editingTransaction.description,
        amount: String(editingTransaction.amount),
        category: editingTransaction.category,
        type: editingTransaction.type,
        date: editingTransaction.date,
      });
    } else {
      setForm(DEFAULT_FORM);
    }
  }, [editingTransaction, modalOpen]);

  if (!modalOpen) return null;

  const categories = form.type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  const isValid =
    form.description.trim() && form.amount && !isNaN(Number(form.amount)) && Number(form.amount) > 0;

  const handleTypeSwitch = (type) => {
    const cats = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
    setForm((prev) => ({ ...prev, type, category: cats[0] }));
  };

  const handleSubmit = () => {
    if (!isValid) return;

    const data = {
      description: form.description.trim(),
      amount: Number(form.amount),
      category: form.category,
      type: form.type,
      date: form.date,
    };

    if (editingTransaction) {
      updateTransaction(editingTransaction.id, data);
    } else {
      addTransaction(data);
    }

    closeModal();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.5)',
        backdropFilter: 'blur(4px)',
        padding: 16,
      }}
      onClick={closeModal}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="card animate-scale-in"
        style={{
          padding: 28,
          width: '100%',
          maxWidth: 420,
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 22,
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 700,
              color: 'var(--text-primary)',
            }}
          >
            {editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
          </h3>
          <button
            onClick={closeModal}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              padding: 4,
            }}
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Type Toggle */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
          {['expense', 'income'].map((type) => (
            <button
              key={type}
              onClick={() => handleTypeSwitch(type)}
              style={{
                flex: 1,
                padding: '10px 0',
                borderRadius: 10,
                border: 'none',
                cursor: 'pointer',
                fontSize: 13,
                fontWeight: 600,
                background:
                  form.type === type
                    ? type === 'expense'
                      ? '#ef444420'
                      : '#10b98120'
                    : 'var(--bg-input)',
                color:
                  form.type === type
                    ? type === 'expense'
                      ? '#ef4444'
                      : '#10b981'
                    : 'var(--text-secondary)',
                transition: 'all 0.2s',
              }}
            >
              {type === 'expense' ? 'Expense' : 'Income'}
            </button>
          ))}
        </div>

        {/* Form Fields */}
        <div style={{ marginBottom: 14 }}>
          <label
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--text-secondary)',
              display: 'block',
              marginBottom: 6,
            }}
          >
            Description
          </label>
          <input
            value={form.description}
            onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
            type="text"
            placeholder="e.g. Coffee at Starbucks"
            className="input"
          />
        </div>

        <div style={{ marginBottom: 14 }}>
          <label
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--text-secondary)',
              display: 'block',
              marginBottom: 6,
            }}
          >
            Amount (₹)
          </label>
          <input
            value={form.amount}
            onChange={(e) => setForm((p) => ({ ...p, amount: e.target.value }))}
            type="number"
            placeholder="0.00"
            className="input"
            min="0"
            step="0.01"
          />
        </div>

        <div style={{ marginBottom: 14 }}>
          <label
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--text-secondary)',
              display: 'block',
              marginBottom: 6,
            }}
          >
            Date
          </label>
          <input
            value={form.date}
            onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
            type="date"
            className="input"
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: 'var(--text-secondary)',
              display: 'block',
              marginBottom: 6,
            }}
          >
            Category
          </label>
          <select
            value={form.category}
            onChange={(e) => setForm((p) => ({ ...p, category: e.target.value }))}
            className="select"
            style={{ width: '100%' }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          style={{
            width: '100%',
            padding: '12px 0',
            borderRadius: 12,
            border: 'none',
            cursor: isValid ? 'pointer' : 'not-allowed',
            fontSize: 14,
            fontWeight: 700,
            color: '#fff',
            letterSpacing: 0.3,
            background: isValid ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : '#555',
            opacity: isValid ? 1 : 0.6,
            transition: 'all 0.2s',
          }}
        >
          {editingTransaction ? 'Update' : 'Add'} Transaction
        </button>
      </div>
    </div>
  );
}
