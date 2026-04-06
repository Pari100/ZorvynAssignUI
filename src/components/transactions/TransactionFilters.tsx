import { useFilterStore } from '../../store/useStore';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { CATEGORIES, TRANSACTION_TYPES } from '../../constants';
import { X } from 'lucide-react';

export const TransactionFilters = () => {
  const searchQuery = useFilterStore((state) => state.searchQuery);
  const setSearchQuery = useFilterStore((state) => state.setSearchQuery);
  const category = useFilterStore((state) => state.category);
  const setCategory = useFilterStore((state) => state.setCategory);
  const type = useFilterStore((state) => state.type);
  const setType = useFilterStore((state) => state.setType);
  const sortBy = useFilterStore((state) => state.sortBy);
  const setSortBy = useFilterStore((state) => state.setSortBy);
  const sortOrder = useFilterStore((state) => state.sortOrder);
  const setSortOrder = useFilterStore((state) => state.setSortOrder);
  const resetFilters = useFilterStore((state) => state.resetFilters);

  const hasActiveFilters = searchQuery || category || type || sortBy !== 'date' || sortOrder !== 'desc';

  return (
    <div className="space-y-5 p-7 bg-linear-to-br from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-800 rounded-2xl border border-gray-200 dark:border-slate-600 transition-colors duration-200">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Input
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Select
          placeholder="All Categories"
          value={category || ''}
          onChange={(e) => setCategory(e.target.value || null)}
          options={CATEGORIES.map((cat) => ({ value: cat, label: cat }))}
        />

        <Select
          placeholder="All Types"
          value={type || ''}
          onChange={(e) => setType((e.target.value as any) || null)}
          options={TRANSACTION_TYPES.map((t) => ({ value: t, label: t.charAt(0).toUpperCase() + t.slice(1) }))}
        />

        <Select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          options={[
            { value: 'date', label: 'Date' },
            { value: 'amount', label: 'Amount' },
            { value: 'category', label: 'Category' },
          ]}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="inline-flex bg-gray-300 dark:bg-slate-600 rounded-lg p-1 border border-gray-400 dark:border-slate-500">
            <button
              onClick={() => setSortOrder('asc')}
              className={`px-3 py-1 rounded text-sm font-semibold transition-all ${
                sortOrder === 'asc'
                  ? 'bg-white dark:bg-slate-500 text-primary-600 dark:text-primary-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              ↑ Asc
            </button>
            <button
              onClick={() => setSortOrder('desc')}
              className={`px-3 py-1 rounded text-sm font-semibold transition-all ${
                sortOrder === 'desc'
                  ? 'bg-white dark:bg-slate-500 text-primary-600 dark:text-primary-400 shadow-sm'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              ↓ Desc
            </button>
          </div>
        </div>

        {hasActiveFilters && (
          <Button
            variant="secondary"
            size="sm"
            onClick={resetFilters}
            className="flex items-center gap-2"
          >
            <X size={16} />
            Reset Filters
          </Button>
        )}
      </div>
    </div>
  );
};
