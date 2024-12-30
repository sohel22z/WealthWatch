import { useState } from 'react';
import { PlusCircle, Receipt, Wallet } from 'lucide-react';
import { Transaction, TransactionType } from '../types';
import { categories } from '../data/categories';
import { Card } from './ui/Card';
import { useCurrency } from '../hooks/useCurrency';

type TransactionFormProps = {
  onAddTransaction: (transaction: Transaction) => void;
};

export function TransactionForm({ onAddTransaction }: TransactionFormProps) {
  const { currency } = useCurrency();
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState(categories[0].id);
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const transaction: Transaction = {
      id: crypto.randomUUID(),
      type,
      amount: parseFloat(amount),
      category,
      description,
      date: new Date(),
    };

    onAddTransaction(transaction);
    setAmount('');
    setDescription('');
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">New Transaction</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setType('expense')}
            className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
              type === 'expense'
                ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-sm'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Receipt size={20} />
            Expense
          </button>
          <button
            type="button"
            onClick={() => setType('income')}
            className={`flex items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
              type === 'income'
                ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Wallet size={20} />
            Income
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                {currency.symbol}
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-3 pl-8 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors"
                required
                min="0"
                step="0.01"
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors bg-white"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 transition-colors"
              required
              placeholder="Enter description"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          <PlusCircle size={20} />
          Add Transaction
        </button>
      </form>
    </Card>
  );
}