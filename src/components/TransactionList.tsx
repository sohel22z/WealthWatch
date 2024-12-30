import { format } from 'date-fns';
import { Transaction } from '../types';
import { categories } from '../data/categories';
import { Trash2 } from 'lucide-react';
import { Card } from './ui/Card';
import { useCurrency } from '../hooks/useCurrency';

type TransactionListProps = {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
};

export function TransactionList({ transactions, onDeleteTransaction }: TransactionListProps) {
  const { formatAmount } = useCurrency();
  
  const getCategoryName = (categoryId: string) => {
    return categories.find(cat => cat.id === categoryId)?.name || 'Unknown';
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Transactions</h2>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div
            key={transaction.id}
            className="group relative p-4 rounded-xl border-2 border-gray-100 hover:border-gray-200 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-sm font-semibold ${
                    transaction.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}{formatAmount(transaction.amount)}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm font-medium text-gray-600">
                    {getCategoryName(transaction.category)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{transaction.description}</p>
                <p className="text-xs text-gray-400 mt-1">{format(transaction.date, 'MMM d, yyyy')}</p>
              </div>
              <button
                onClick={() => onDeleteTransaction(transaction.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-gray-100 rounded-lg"
              >
                <Trash2 size={16} className="text-gray-400 hover:text-rose-500" />
              </button>
            </div>
          </div>
        ))}
        {transactions.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No transactions yet</p>
            <p className="text-sm text-gray-400 mt-1">Add your first transaction to get started</p>
          </div>
        )}
      </div>
    </Card>
  );
}