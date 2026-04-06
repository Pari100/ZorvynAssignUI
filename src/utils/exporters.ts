import type { Transaction } from '../types';
import { formatDate, formatCurrency } from './formatters';

export const exportToCSV = (transactions: Transaction[], filename: string = 'transactions.csv'): void => {
  const headers = ['Date', 'Category', 'Type', 'Amount'];
  const rows = transactions.map((t) => [formatDate(t.date), t.category, t.type, formatCurrency(t.amount)]);

  const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  downloadFile(blob, filename);
};

export const exportToJSON = (transactions: Transaction[], filename: string = 'transactions.json'): void => {
  const json = JSON.stringify(transactions, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  downloadFile(blob, filename);
};

const downloadFile = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
