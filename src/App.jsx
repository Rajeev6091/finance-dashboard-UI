import { AppProvider, useAppContext } from './context/AppContext';
import Layout from './components/Layout/Layout';
import DashboardPage from './components/Dashboard/DashboardPage';
import TransactionsPage from './components/Transactions/TransactionsPage';
import InsightsPage from './components/Insights/InsightsPage';
import TransactionModal from './components/Transactions/TransactionModal';

/**
 * Inner app that consumes context and renders the active page.
 */
function AppContent() {
  const { activeTab, darkMode } = useAppContext();

  return (
    <div
      className={darkMode ? 'theme-dark' : 'theme-light'}
      style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        transition: 'background 0.3s, color 0.3s',
      }}
    >
      <Layout>
        {activeTab === 'dashboard' && <DashboardPage />}
        {activeTab === 'transactions' && <TransactionsPage />}
        {activeTab === 'insights' && <InsightsPage />}
      </Layout>

      {/* Global modal rendered at root level */}
      <TransactionModal />
    </div>
  );
}

/**
 * App root — wraps everything in the global state provider.
 */
export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
