import type { Transaction } from '../types';

export const validateTransaction = (transaction: Partial<Transaction>): { valid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};

  if (!transaction.date) {
    errors.date = 'Date is required';
  } else if (new Date(transaction.date) > new Date()) {
    errors.date = 'Date cannot be in the future';
  }

  if (!transaction.amount) {
    errors.amount = 'Amount is required';
  } else if (typeof transaction.amount !== 'number' || transaction.amount <= 0) {
    errors.amount = 'Amount must be a positive number';
  }

  if (!transaction.category || transaction.category.trim() === '') {
    errors.category = 'Category is required';
  }

  if (!transaction.type) {
    errors.type = 'Type is required';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
