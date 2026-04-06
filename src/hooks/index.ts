import { useMemo } from 'react';
import { useTransactionStore, useFilterStore } from '../store/useStore';
import { calculateFinancialSummary, calculateCategoryExpenses, calculateBalanceTrend, calculateInsights } from '../utils/calculations';


export const useTransactions = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  const category = useFilterStore((state) => state.category);
  const type = useFilterStore((state) => state.type);
  const searchQuery = useFilterStore((state) => state.searchQuery);
  const sortBy = useFilterStore((state) => state.sortBy);
  const sortOrder = useFilterStore((state) => state.sortOrder);

  return useMemo(() => {
    let filtered = [...transactions];

    // Apply filters
    if (category) {
      filtered = filtered.filter((t) => t.category === category);
    }
    if (type) {
      filtered = filtered.filter((t) => t.type === type);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (t) => t.category.toLowerCase().includes(query) || t.amount.toString().includes(query)
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any = a[sortBy];
      let bValue: any = b[sortBy];

      if (sortBy === 'date') {
        aValue = new Date(a.date).getTime();
        bValue = new Date(b.date).getTime();
      }

      const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [transactions, category, type, searchQuery, sortBy, sortOrder]);
};

export const useFinancialSummary = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  return useMemo(() => calculateFinancialSummary(transactions), [transactions]);
};

export const useCategoryExpenses = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  return useMemo(() => calculateCategoryExpenses(transactions), [transactions]);
};

export const useBalanceTrend = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  return useMemo(() => calculateBalanceTrend(transactions), [transactions]);
};

export const useInsights = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  return useMemo(() => calculateInsights(transactions), [transactions]);
};
