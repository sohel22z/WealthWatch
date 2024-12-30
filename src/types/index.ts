export type TransactionType = 'income' | 'expense';

export type Category = {
  id: string;
  name: string;
  color: string;
};

export type Transaction = {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  description: string;
  date: Date;
};

export type Currency = {
  code: string;
  symbol: string;
  name: string;
  symbolPosition: 'before' | 'after';
};