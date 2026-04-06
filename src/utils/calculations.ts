import type { Transaction, FinancialSummary, CategoryExpense, BalanceTrendData, Insight } from '../types';

export const calculateFinancialSummary = (transactions: Transaction[]): FinancialSummary => {
  const summary = transactions.reduce(
    (acc, transaction) => {
      const amount = transaction.amount;
      if (transaction.type === 'income') {
        acc.totalIncome += amount;
        acc.totalBalance += amount;
      } else {
        acc.totalExpenses += amount;
        acc.totalBalance -= amount;
      }
      return acc;
    },
    { totalBalance: 0, totalIncome: 0, totalExpenses: 0 }
  );
  return summary;
};

export const calculateCategoryExpenses = (transactions: Transaction[]): CategoryExpense[] => {
  const expensesByCategory: Record<string, number> = {};
  
  transactions
    .filter((t) => t.type === 'expense')
    .forEach((t) => {
      expensesByCategory[t.category] = (expensesByCategory[t.category] || 0) + t.amount;
    });

  const total = Object.values(expensesByCategory).reduce((sum, amount) => sum + amount, 0);

  return Object.entries(expensesByCategory)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: total > 0 ? (amount / total) * 100 : 0,
    }))
    .sort((a, b) => b.amount - a.amount);
};

export const calculateBalanceTrend = (transactions: Transaction[]): BalanceTrendData[] => {
  const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  let balance = 0;
  
  return sortedTransactions.map((t) => {
    if (t.type === 'income') {
      balance += t.amount;
    } else {
      balance -= t.amount;
    }
    return { date: t.date, balance };
  });
};

export const calculateInsights = (transactions: Transaction[]): Insight => {
  const categoryExpenses = calculateCategoryExpenses(transactions);
  const highestSpending = categoryExpenses[0] || null;

  // Calculate monthly comparison
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const currentMonthTransactions = transactions.filter((t) => {
    const tDate = new Date(t.date);
    return tDate.getMonth() === currentMonth && tDate.getFullYear() === currentYear && t.type === 'expense';
  });

  const previousMonthStart = new Date(currentYear, currentMonth - 1, 1);
  const previousMonthEnd = new Date(currentYear, currentMonth, 0);

  const previousMonthTransactions = transactions.filter((t) => {
    const tDate = new Date(t.date);
    return tDate >= previousMonthStart && tDate <= previousMonthEnd && t.type === 'expense';
  });

  const currentMonthTotal = currentMonthTransactions.reduce((sum, t) => sum + t.amount, 0);
  const previousMonthTotal = previousMonthTransactions.reduce((sum, t) => sum + t.amount, 0);
  const percentageChange = previousMonthTotal > 0 ? ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100 : 0;

  // Calculate average transaction
  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);
  const averageTransaction = transactions.length > 0 ? totalAmount / transactions.length : 0;

  return {
    highestSpendingCategory: highestSpending ? { category: highestSpending.category, amount: highestSpending.amount } : null,
    monthlyComparison: {
      currentMonth: currentMonthTotal,
      previousMonth: previousMonthTotal,
      percentageChange,
    },
    averageTransaction,
  };
};
