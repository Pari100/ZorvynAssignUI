import { useEffect } from 'react';
import { useUIStore } from './store/useStore';
import { useFinancialSummary } from './hooks';
import { Layout } from './components/layout/Layout';
import { SummaryCard } from './components/dashboard/SummaryCard';
import { BalanceTrendChart } from './components/dashboard/BalanceTrendChart';
import { CategoryChart } from './components/dashboard/CategoryChart';
import { InsightsPanel } from './components/dashboard/InsightsPanel';
import { TransactionList } from './components/transactions/TransactionList';
import { Button } from './components/common/Button';
import { Download } from 'lucide-react';
import { exportToCSV, exportToJSON } from './utils/exporters';
import { useTransactionStore } from './store/useStore';
import { Toaster } from 'react-hot-toast';
import './App.css'

function App() {
  const isDarkMode = useUIStore((state) => state.isDarkMode);
  const transactions = useTransactionStore((state) => state.transactions);
  const summary = useFinancialSummary();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleExportCSV = () => {
    exportToCSV(transactions, `transactions-${new Date().toISOString().split('T')[0]}.csv`);
  };

  const handleExportJSON = () => {
    exportToJSON(transactions, `transactions-${new Date().toISOString().split('T')[0]}.json`);
  };

  return (
    <Layout>
      <Toaster position="top-right" />

      {/* Summary Cards - 4 Column Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SummaryCard
          title="Total Income"
          value={summary.totalIncome}
          icon="📈"
          color="purple"
          trend={{ value: 35, direction: 'up' }}
        />
        <SummaryCard
          title="Total Spending"
          value={summary.totalExpenses}
          icon="💸"
          color="orange"
          trend={{ value: 78, direction: 'up' }}
        />
        <SummaryCard
          title="Spending Goal"
          value={summary.totalBalance}
          icon="🎯"
          color="cyan"
          trend={{ value: 6, direction: 'up' }}
        />
        <SummaryCard
          title="Total Transactions"
          value={transactions.length * 1000}
          icon="💳"
          color="green"
          trend={{ value: 80, direction: 'up' }}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <BalanceTrendChart />
        </div>
        <CategoryChart />
      </div>

      {/* Insights */}
      <div className="mb-8">
        <InsightsPanel />
      </div>

      {/* Export Buttons */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Button
          variant="primary"
          onClick={handleExportCSV}
          className="flex items-center gap-2 text-base py-3 px-6"
        >
          <Download size={20} />
          Export CSV
        </Button>
        <Button
          variant="primary"
          onClick={handleExportJSON}
          className="flex items-center gap-2 text-base py-3 px-6"
        >
          <Download size={20} />
          Export JSON
        </Button>
      </div>

      {/* Transactions */}
      <TransactionList />
    </Layout>
  );
}

export default App;
