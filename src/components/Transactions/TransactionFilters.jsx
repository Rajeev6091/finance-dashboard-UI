import { Search } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { CATEGORIES } from '../../constants';

/**
 * Filter bar with search input, type dropdown, and category dropdown.
 */
export default function TransactionFilters() {
  const { searchQuery, setSearchQuery, filterType, setFilterType, filterCategory, setFilterCategory } =
    useAppContext();

  return (
    <div
      style={{
        display: 'flex',
        gap: 10,
        marginBottom: 18,
        flexWrap: 'wrap',
        alignItems: 'center',
      }}
    >
      {/* Search */}
      <div style={{ position: 'relative', flex: '1 1 220px', maxWidth: 320 }}>
        <Search
          size={16}
          style={{
            position: 'absolute',
            left: 12,
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-muted)',
            pointerEvents: 'none',
          }}
        />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search transactions..."
          className="input"
          style={{ paddingLeft: 38, fontSize: 13 }}
          aria-label="Search transactions"
        />
      </div>

      {/* Type Filter */}
      <select
        value={filterType}
        onChange={(e) => setFilterType(e.target.value)}
        className="select"
        aria-label="Filter by type"
      >
        <option value="all">All Types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      {/* Category Filter */}
      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        className="select"
        aria-label="Filter by category"
      >
        <option value="all">All Categories</option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
