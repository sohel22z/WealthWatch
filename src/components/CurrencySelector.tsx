import { Globe } from 'lucide-react';
import { currencies } from '../data/currencies';
import { useCurrency } from '../hooks/useCurrency';

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="relative inline-block">
      <div className="flex items-center gap-2 bg-white border-2 border-gray-200 hover:border-gray-300 rounded-xl px-4 py-2 transition-all group">
        <Globe size={18} className="text-gray-500 group-hover:text-gray-700" />
        <select
          value={currency.code}
          onChange={(e) => {
            const selected = currencies.find(c => c.code === e.target.value);
            if (selected) setCurrency(selected);
          }}
          className="appearance-none bg-transparent pr-8 pl-1 focus:outline-none text-sm font-medium cursor-pointer"
        >
          {currencies.map((c) => (
            <option key={c.code} value={c.code}>
              {c.symbol} {c.name}
            </option>
          ))}
        </select>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}