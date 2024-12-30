import { Currency } from '../types';

export function formatCurrencyAmount(amount: number, currency: Currency): string {
  const formattedNumber = new Intl.NumberFormat(getCurrencyLocale(currency.code), {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);

  return currency.symbolPosition === 'before'
    ? `${currency.symbol}${formattedNumber}`
    : `${formattedNumber}${currency.symbol}`;
}

function getCurrencyLocale(currencyCode: string): string {
  const localeMap: Record<string, string> = {
    'INR': 'en-IN',
    'USD': 'en-US',
    'EUR': 'de-DE',
    'GBP': 'en-GB',
    'JPY': 'ja-JP',
  };

  return localeMap[currencyCode] || 'en-US';
}