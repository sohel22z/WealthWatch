import { Currency } from '../types';

export const currencies: Currency[] = [
  { code: 'INR', symbol: '₹', name: 'Indian Rupee', symbolPosition: 'before' },
  { code: 'USD', symbol: '$', name: 'US Dollar', symbolPosition: 'before' },
  { code: 'EUR', symbol: '€', name: 'Euro', symbolPosition: 'before' },
  { code: 'GBP', symbol: '£', name: 'British Pound', symbolPosition: 'before' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen', symbolPosition: 'before' },
];