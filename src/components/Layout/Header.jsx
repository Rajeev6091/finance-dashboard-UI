import { DollarSign, Sun, Moon, Menu } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import RoleBadge from '../UI/RoleBadge';

/**
 * Sticky top header with brand, role switcher, and theme toggle.
 */
export default function Header() {
  const { darkMode, toggleDarkMode, role, setRole, toggleMobileMenu } = useAppContext();

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '14px 24px',
        borderBottom: '1px solid var(--border-color)',
        background: 'var(--bg-secondary)',
        backdropFilter: 'blur(12px)',
        position: 'sticky',
        top: 0,
        zIndex: 80,
      }}
    >
      {/* Left: Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button
          onClick={toggleMobileMenu}
          className="show-mobile"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-primary)',
            padding: 4,
            display: 'none',
          }}
          aria-label="Toggle menu"
        >
          <Menu size={22} />
        </button>

        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <DollarSign size={18} color="#fff" />
        </div>
        <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: -0.3, color: 'var(--text-primary)' }}>
          FinTrack
        </span>
      </div>

      {/* Right: Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <RoleBadge role={role} />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="select"
          style={{ fontSize: 12, fontWeight: 600, padding: '6px 10px' }}
          aria-label="Switch role"
        >
          <option value="admin">Admin</option>
          <option value="viewer">Viewer</option>
        </select>

        <button
          onClick={toggleDarkMode}
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            border: '1px solid var(--border-color)',
            background: 'var(--bg-input)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--text-primary)',
            transition: 'all 0.2s',
          }}
          aria-label="Toggle theme"
        >
          {darkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>
    </header>
  );
}
