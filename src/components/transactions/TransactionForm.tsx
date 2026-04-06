import { useState } from 'react';
import type { Transaction } from '../../types';
import { useTransactionStore } from '../../store/useStore';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { CATEGORIES, TRANSACTION_TYPES } from '../../constants';
import { validateTransaction } from '../../utils/validators';
import toast from 'react-hot-toast';

interface TransactionFormProps {
  transaction?: Transaction;
  onClose: () => void;
}

export const TransactionForm = ({ transaction, onClose }: TransactionFormProps) => {
  const [formData, setFormData] = useState({
    date: transaction?.date || new Date().toISOString().split('T')[0],
    amount: transaction?.amount || '',
    category: transaction?.category || 'Food',
    type: transaction?.type || 'expense',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const updateTransaction = useTransactionStore((state) => state.updateTransaction);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validationResult = validateTransaction({
      ...formData,
      amount: Number(formData.amount),
      id: transaction?.id || '',
    });

    if (!validationResult.valid) {
      setErrors(validationResult.errors);
      return;
    }

    if (transaction) {
      updateTransaction(transaction.id, {
        ...formData,
        amount: Number(formData.amount),
      });
      toast.success('Transaction updated!');
    } else {
      addTransaction({
        ...formData,
        amount: Number(formData.amount),
      });
      toast.success('Transaction added!');
    }

    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Date"
        type="date"
        max={new Date().toISOString().split('T')[0]}
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        error={errors.date}
      />

      <Input
        label="Amount"
        type="number"
        step="0.01"
        min="0.01"
        placeholder="0.00"
        value={formData.amount}
        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        error={errors.amount}
      />

      <Select
        label="Category"
        value={formData.category}
        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
        options={CATEGORIES.map((cat) => ({ value: cat, label: cat }))}
        error={errors.category}
      />

      <Select
        label="Type"
        value={formData.type}
        onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
        options={TRANSACTION_TYPES.map((t) => ({ value: t, label: t.charAt(0).toUpperCase() + t.slice(1) }))}
        error={errors.type}
      />

      <div className="flex gap-2 pt-4">
        <Button type="submit" variant="primary" className="flex-1">
          {transaction ? 'Update' : 'Add'} Transaction
        </Button>
        <Button type="button" variant="secondary" onClick={onClose} className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
};
