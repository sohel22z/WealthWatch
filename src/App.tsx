import { useState } from 'react';
import { Transaction } from './types';
import { TransactionForm } from './components/TransactionForm';
import { TransactionList } from './components/TransactionList';
import { Dashboard } from './components/Dashboard';
import { Logo } from './components/brand/Logo';
import { CurrencyProvider } from './contexts/CurrencyContext';
import { CurrencySelector } from './components/CurrencySelector';
import './styles/theme.css';

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const handleAddTransaction = (transaction: Transaction) => {
    setTransactions([...transactions, transaction]);
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(transactions.filter(t => t.id !== id));
  };

  return (
    <CurrencyProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <header className="bg-white border-b border-gray-100 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <Logo />
              <CurrencySelector />
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[400px,1fr]">
            <div className="space-y-6">
              <TransactionForm onAddTransaction={handleAddTransaction} />
              <TransactionList
                transactions={transactions}
                onDeleteTransaction={handleDeleteTransaction}
              />
            </div>
            <Dashboard transactions={transactions} />
          </div>
        </main>
      </div>
    </CurrencyProvider>
  );
}