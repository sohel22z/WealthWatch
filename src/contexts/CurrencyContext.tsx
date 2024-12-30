import { createContext, useState, ReactNode } from 'react';
import { Currency } from '../types';
import { currencies } from '../data/currencies';
import { formatCurrencyAmount } from '../utils/currency';

type CurrencyContextType = {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatAmount: (amount: number) => string;
};

export const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>(currencies[0]); // INR by default

  const formatAmount = (amount: number) => {
    return formatCurrencyAmount(amount, currency);
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatAmount }}>
      {children}
    </CurrencyContext.Provider>
  );
}