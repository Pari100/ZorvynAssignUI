import { create } from 'zustand';
import type { Transaction, Role, SortBy, SortOrder } from '../types';
import { MOCK_TRANSACTIONS } from '../constants';

interface TransactionState {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: string, transaction: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  setTransactions: (transactions: Transaction[]) => void;
}

interface UIState {
  role: Role;
  setRole: (role: Role) => void;
  isDarkMode: boolean;
  setDarkMode: (isDarkMode: boolean) => void;
  toggleDarkMode: () => void;
  showTransactionForm: boolean;
  setShowTransactionForm: (show: boolean) => void;
  editingTransaction: string | null;
  setEditingTransaction: (id: string | null) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

interface FilterState_Store {
  category: string | null;
  type: 'income' | 'expense' | null;
  searchQuery: string;
  sortBy: SortBy;
  sortOrder: SortOrder;
  setCategory: (category: string | null) => void;
  setType: (type: 'income' | 'expense' | null) => void;
  setSearchQuery: (query: string) => void;
  setSortBy: (sortBy: SortBy) => void;
  setSortOrder: (sortOrder: SortOrder) => void;
  resetFilters: () => void;
}

const generateId = () => Math.random().toString(36).substr(2, 9);

export const useTransactionStore = create<TransactionState>((set) => {
  const savedTransactions = localStorage.getItem('transactions');
  const initialTransactions = savedTransactions ? JSON.parse(savedTransactions) : MOCK_TRANSACTIONS;

  return {
    transactions: initialTransactions,
    addTransaction: (transaction) =>
      set((state) => {
        const newTransaction = { ...transaction, id: generateId() };
        const updated = [...state.transactions, newTransaction];
        localStorage.setItem('transactions', JSON.stringify(updated));
        return { transactions: updated };
      }),
    updateTransaction: (id, transaction) =>
      set((state) => {
        const updated = state.transactions.map((t) => (t.id === id ? { ...transaction, id } : t));
        localStorage.setItem('transactions', JSON.stringify(updated));
        return { transactions: updated };
      }),
    deleteTransaction: (id) =>
      set((state) => {
        const updated = state.transactions.filter((t) => t.id !== id);
        localStorage.setItem('transactions', JSON.stringify(updated));
        return { transactions: updated };
      }),
    setTransactions: (transactions) => {
      localStorage.setItem('transactions', JSON.stringify(transactions));
      set({ transactions });
    },
  };
});

export const useUIStore = create<UIState>((set) => ({
  role: 'viewer',
  setRole: (role) => set({ role }),
  isDarkMode: localStorage.getItem('darkMode') === 'true',
  setDarkMode: (isDarkMode) => {
    localStorage.setItem('darkMode', String(isDarkMode));
    set({ isDarkMode });
  },
  toggleDarkMode: () => set((state) => {
    const newDarkMode = !state.isDarkMode;
    localStorage.setItem('darkMode', String(newDarkMode));
    return { isDarkMode: newDarkMode };
  }),
  showTransactionForm: false,
  setShowTransactionForm: (show) => set({ showTransactionForm: show }),
  editingTransaction: null,
  setEditingTransaction: (id) => set({ editingTransaction: id }),
  currentPage: 'dashboard',
  setCurrentPage: (page) => set({ currentPage: page }),
}));

export const useFilterStore = create<FilterState_Store>((set) => ({
  category: null,
  type: null,
  searchQuery: '',
  sortBy: 'date',
  sortOrder: 'desc',
  setCategory: (category) => set({ category }),
  setType: (type) => set({ type }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSortBy: (sortBy) => set({ sortBy }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  resetFilters: () => set({ category: null, type: null, searchQuery: '', sortBy: 'date', sortOrder: 'desc' }),
}));
