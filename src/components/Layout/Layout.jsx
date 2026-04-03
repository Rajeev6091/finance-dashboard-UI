import Header from './Header';
import Sidebar from './Sidebar';

/**
 * Main layout shell: Header + Sidebar + Content area.
 */
export default function Layout({ children }) {
  return (
    <div style={{ minHeight: '100vh' }}>
      <Header />
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 63px)' }}>
        <Sidebar />
        <main className="main-content" style={{ flex: 1, padding: 24, overflow: 'auto', minWidth: 0 }}>
          <style>{`
            @media (max-width: 768px) {
              .main-content { padding: 16px !important; }
            }
          `}</style>
          {children}
        </main>
      </div>
    </div>
  );
}
