import { useContext } from 'react';
import { CurrencyContext } from '../contexts/CurrencyContext';

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}