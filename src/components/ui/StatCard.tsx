type StatCardProps = {
  title: string;
  value: string;
  type?: 'neutral' | 'success' | 'danger';
};

export function StatCard({ title, value, type = 'neutral' }: StatCardProps) {
  const colors = {
    neutral: 'from-blue-500 to-indigo-600',
    success: 'from-emerald-500 to-teal-600',
    danger: 'from-rose-500 to-pink-600'
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br p-[1px]">
      <div className="absolute inset-0 bg-gradient-to-br opacity-30"></div>
      <div className="relative bg-white rounded-2xl p-6">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <p className={`text-2xl font-bold mt-2 bg-gradient-to-r ${colors[type]} bg-clip-text text-transparent`}>
          {value}
        </p>
      </div>
    </div>
  );
}