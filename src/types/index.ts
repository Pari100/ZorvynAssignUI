export type TransactionType = 'income' | 'expense';
export type Role = 'viewer' | 'admin';
export type SortBy = 'date' | 'amount' | 'category';
export type SortOrder = 'asc' | 'desc';
export type ChartType = 'pie' | 'bar';

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: TransactionType;
}

export interface FilterState {
  category: string | null;
  type: TransactionType | null;
  searchQuery: string;
  sortBy: SortBy;
  sortOrder: SortOrder;
}

export interface FinancialSummary {
  totalBalance: number;
  totalIncome: number;
  totalExpenses: number;
}

export interface CategoryExpense {
  category: string;
  amount: number;
  percentage: number;
}

export interface BalanceTrendData {
  date: string;
  balance: number;
}

export interface Insight {
  highestSpendingCategory: {
    category: string;
    amount: number;
  } | null;
  monthlyComparison: {
    currentMonth: number;
    previousMonth: number;
    percentageChange: number;
  };
  averageTransaction: number;
}
