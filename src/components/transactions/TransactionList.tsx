import { useState } from 'react';
import type { Transaction } from '../../types';
import { useUIStore } from '../../store/useStore';
import { useTransactions } from '../../hooks';
import { Card } from '../common/Card';
import { EmptyState } from '../common/EmptyState';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { TransactionFilters } from './TransactionFilters';
import { TransactionForm } from './TransactionForm';
import { TransactionItem } from './TransactionItem';
import { Plus, CreditCard } from 'lucide-react';

export const TransactionList = () => {
  const role = useUIStore((state) => state.role);
  const showTransactionForm = useUIStore((state) => state.showTransactionForm);
  const setShowTransactionForm = useUIStore((state) => state.setShowTransactionForm);
  const setEditingTransaction = useUIStore((state) => state.setEditingTransaction);
  const transactions = useTransactions();
  const [selectedForEdit, setSelectedForEdit] = useState<Transaction | null>(null);

  const handleEdit = (transaction: Transaction) => {
    setSelectedForEdit(transaction);
    setShowTransactionForm(true);
  };

  const handleClose = () => {
    setShowTransactionForm(false);
    setEditingTransaction(null);
    setSelectedForEdit(null);
  };

  return (
    <>
      <Card>
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-linear-to-br from-blue-600 to-cyan-600 rounded-xl">
                <CreditCard size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Latest Transactions</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">View all your recent financial activities</p>
              </div>
            </div>
          </div>
          {role === 'admin' && (
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setSelectedForEdit(null);
                setShowTransactionForm(true);
              }}
              className="flex items-center gap-2"
            >
              <Plus size={18} />
              Add Transaction
            </Button>
          )}
        </div>

        {/* Filters */}
        <div className="mb-6">
          <TransactionFilters />
        </div>

        {/* Empty State */}
        {transactions.length === 0 ? (
          <div className="mt-6">
            <EmptyState
              title="No Transactions"
              description="No transactions match your search criteria. Try adjusting your filters or add a new transaction."
            />
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
            <div className="overflow-x-auto">
              <table className="w-full">
                {/* Table Header */}
                <thead>
                  <tr className="bg-linear-to-r from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-700/50 border-b border-slate-200 dark:border-slate-700">
                    <th className="px-6 py-4 text-left">
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">Date</span>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">Category</span>
                    </th>
                    <th className="px-6 py-4 text-left">
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">Type</span>
                    </th>
                    <th className="px-6 py-4 text-right">
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">Amount</span>
                    </th>
                    {role === 'admin' && (
                      <th className="px-6 py-4 text-right">
                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">Actions</span>
                      </th>
                    )}
                  </tr>
                </thead>
                {/* Table Body */}
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {transactions.map((t) => (
                    <TransactionItem key={t.id} transaction={t} onEdit={handleEdit} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Card>

      {/* Add/Edit Modal */}
      <Modal isOpen={showTransactionForm} onClose={handleClose} title={selectedForEdit ? 'Edit Transaction' : 'Add New Transaction'}>
        <TransactionForm transaction={selectedForEdit || undefined} onClose={handleClose} />
      </Modal>
    </>
  );
};
