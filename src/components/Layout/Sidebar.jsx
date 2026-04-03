import { LayoutDashboard, Receipt, Lightbulb } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { NAV_ITEMS } from '../../constants';

const ICONS = {
  dashboard: LayoutDashboard,
  transactions: Receipt,
  insights: Lightbulb,
};

/**
 * Sidebar navigation with responsive mobile slide-in behavior.
 */
export default function Sidebar() {
  const { activeTab, setActiveTab, mobileMenuOpen, closeMobileMenu, darkMode } = useAppContext();

  return (
    <>
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          onClick={closeMobileMenu}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.4)',
            zIndex: 90,
          }}
        />
      )}

      {/* Navigation */}
      <nav
        style={{
          width: 220,
          minWidth: 220,
          padding: '20px 12px',
          borderRight: '1px solid var(--border-color)',
          background: darkMode ? 'rgba(18,19,30,0.6)' : 'rgba(245,246,250,0.6)',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          zIndex: 95,
          transition: 'transform 0.3s ease',
        }}
        className={`sidebar-nav ${mobileMenuOpen ? 'sidebar-open' : ''}`}
      >
        <style>{`
          @media (max-width: 768px) {
            .sidebar-nav {
              position: fixed !important;
              left: 0;
              top: 63px;
              bottom: 0;
              transform: translateX(-100%);
              background: var(--bg-primary) !important;
              box-shadow: none;
            }
            .sidebar-nav.sidebar-open {
              transform: translateX(0) !important;
              box-shadow: 4px 0 20px rgba(0, 0, 0, 0.3);
            }
          }
        `}</style>

        {NAV_ITEMS.map((item) => {
          const Icon = ICONS[item.key];
          const isActive = activeTab === item.key;

          return (
            <button
              key={item.key}
              onClick={() => {
                setActiveTab(item.key);
                closeMobileMenu();
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '11px 14px',
                borderRadius: 12,
                border: 'none',
                cursor: 'pointer',
                fontSize: 13.5,
                fontWeight: isActive ? 600 : 500,
                width: '100%',
                textAlign: 'left',
                background: isActive
                  ? darkMode
                    ? 'rgba(99,102,241,0.12)'
                    : 'rgba(99,102,241,0.08)'
                  : 'transparent',
                color: isActive ? '#6366f1' : 'var(--text-muted)',
                transition: 'all 0.15s',
              }}
            >
              <Icon size={18} />
              {item.label}
            </button>
          );
        })}
      </nav>
    </>
  );
}
