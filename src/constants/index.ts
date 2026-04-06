import type { TransactionType } from '../types';

export const CATEGORIES = [
  'Food',
  'Transport',
  'Salary',
  'Entertainment',
  'Healthcare',
  'Education',
  'Shopping',
  'Utilities',
  'Other',
];

export const TRANSACTION_TYPES: TransactionType[] = ['income', 'expense'];

export const EMPTY_STATE_MESSAGES = {
  noTransactions: 'No transactions yet. Add your first transaction to get started!',
  noResults: 'No transactions match your search criteria.',
  noChart: 'Add transactions to see visualization data.',
};

export const CURRENCY_SYMBOL = '$';
export const DATE_FORMAT = 'MMM dd, yyyy';
export const CHART_COLORS = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4', '#14b8a6'];

export const MOCK_TRANSACTIONS = [
  { id: '1', date: '2024-12-20', amount: 5000, category: 'Salary', type: 'income' as const },
  { id: '2', date: '2024-12-18', amount: 45.99, category: 'Food', type: 'expense' as const },
  { id: '3', date: '2024-12-17', amount: 120, category: 'Transport', type: 'expense' as const },
  { id: '4', date: '2024-12-16', amount: 89.99, category: 'Entertainment', type: 'expense' as const },
  { id: '5', date: '2024-12-15', amount: 200, category: 'Healthcare', type: 'expense' as const },
  { id: '6', date: '2024-12-14', amount: 75, category: 'Food', type: 'expense' as const },
  { id: '7', date: '2024-12-13', amount: 150, category: 'Shopping', type: 'expense' as const },
  { id: '8', date: '2024-12-12', amount: 60, category: 'Utilities', type: 'expense' as const },
  { id: '9', date: '2024-12-10', amount: 3000, category: 'Salary', type: 'income' as const },
  { id: '10', date: '2024-12-09', amount: 55.50, category: 'Food', type: 'expense' as const },
];
