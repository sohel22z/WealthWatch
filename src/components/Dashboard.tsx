import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Transaction } from '../types';
import { categories } from '../data/categories';
import { Card } from './ui/Card';
import { StatCard } from './ui/StatCard';
import { useCurrency } from '../hooks/useCurrency';

type DashboardProps = {
  transactions: Transaction[];
};

export function Dashboard({ transactions }: DashboardProps) {
  const { formatAmount } = useCurrency();
  
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;

  const expensesByCategory = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      const category = categories.find(c => c.id === t.category);
      if (!category) return acc;
      
      acc[category.name] = (acc[category.name] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const pieData = Object.entries(expensesByCategory).map(([name, value]) => ({
    name,
    value,
    color: categories.find(c => c.name === name)?.color || '#gray',
  }));

  const barData = transactions
    .slice(-7)
    .map(t => ({
      date: new Date(t.date).toLocaleDateString(),
      amount: t.type === 'income' ? t.amount : -t.amount,
    }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          title="Total Income"
          value={formatAmount(totalIncome)}
          type="success"
        />
        <StatCard
          title="Total Expenses"
          value={formatAmount(totalExpenses)}
          type="danger"
        />
        <StatCard
          title="Balance"
          value={formatAmount(balance)}
          type={balance >= 0 ? 'success' : 'danger'}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Expenses by Category</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label={({ name, value }) => `${name}: ${formatAmount(value)}`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatAmount(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Cash Flow</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis dataKey="date" />
                <YAxis tickFormatter={(value: number) => formatAmount(value)} />
                <Tooltip formatter={(value: number) => formatAmount(value)} />
                <Bar dataKey="amount" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}