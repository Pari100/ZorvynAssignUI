import type { Transaction } from '../../types';
import { useUIStore, useTransactionStore } from '../../store/useStore';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Edit2, Trash2, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

interface TransactionItemProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
}

const categoryColors: Record<string, { bg: string; text: string; icon: string }> = {
  'Groceries': { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', icon: '🛒' },
  'Utilities': { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', icon: '💡' },
  'Entertainment': { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-400', icon: '🎬' },
  'Transportation': { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-400', icon: '🚗' },
  'Healthcare': { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', icon: '⚕️' },
  'Salary': { bg: 'bg-emerald-100 dark:bg-emerald-900/30', text: 'text-emerald-700 dark:text-emerald-400', icon: '💰' },
  'Freelance': { bg: 'bg-cyan-100 dark:bg-cyan-900/30', text: 'text-cyan-700 dark:text-cyan-400', icon: '💻' },
};

const getPaymentMethodBadge = (category: string) => {
  const colors = categoryColors[category] || { 
    bg: 'bg-slate-100 dark:bg-slate-800', 
    text: 'text-slate-700 dark:text-slate-400',
    icon: '📌'
  };
  return colors;
};

export const TransactionItem = ({ transaction, onEdit }: TransactionItemProps) => {
  const role = useUIStore((state) => state.role);
  const deleteTransaction = useTransactionStore((state) => state.deleteTransaction);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(transaction.id);
      toast.success('Transaction deleted!');
    }
  };

  const colors = getPaymentMethodBadge(transaction.category);
  const isIncome = transaction.type === 'income';

  return (
    <motion.tr
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
        isIncome ? 'bg-emerald-50/30 dark:bg-emerald-900/10' : 'bg-slate-50/30 dark:bg-slate-800/30'
      }`}
      whileHover={{ backgroundColor: 'rgba(0,0,0,0.02)' }}
    >
      {/* Date */}
      <td className="px-6 py-4">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {formatDate(transaction.date)}
        </span>
      </td>

      {/* Category Badge */}
      <td className="px-6 py-4">
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${colors.bg} ${colors.text}`}>
          <span>{getPaymentMethodBadge(transaction.category).icon}</span>
          {transaction.category}
        </div>
      </td>

      {/* Type Badge */}
      <td className="px-6 py-4">
        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
          isIncome 
            ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
            : 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
        }`}>
          {isIncome ? (
            <>
              <ArrowDownLeft size={14} />
              Income
            </>
          ) : (
            <>
              <ArrowUpRight size={14} />
              Expense
            </>
          )}
        </div>
      </td>

      {/* Amount */}
      <td className="px-6 py-4 text-right">
        <span className={`inline-flex items-center gap-2 font-bold text-lg ${
          isIncome
            ? 'text-emerald-600 dark:text-emerald-400'
            : 'text-orange-600 dark:text-orange-400'
        }`}>
          {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
        </span>
      </td>

      {/* Actions */}
      {role === 'admin' && (
        <td className="px-6 py-4 text-right">
          <div className="flex items-center justify-end gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onEdit(transaction)}
              className="p-2.5 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors text-blue-600 dark:text-blue-400 hover:shadow-md"
              title="Edit transaction"
            >
              <Edit2 size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDelete}
              className="p-2.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors text-red-600 dark:text-red-400 hover:shadow-md"
              title="Delete transaction"
            >
              <Trash2 size={18} />
            </motion.button>
          </div>
        </td>
      )}
    </motion.tr>
  );
};
