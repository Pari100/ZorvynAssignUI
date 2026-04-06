import type { SelectHTMLAttributes } from 'react';
import clsx from 'clsx';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: Array<{ value: string | number; label: string }>;
  placeholder?: string;
}

export const Select = ({ label, error, options, placeholder, className, ...props }: SelectProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-bold text-gray-700 dark:text-gray-300">{label}</label>}
      <select
        {...props}
        className={clsx(
          'px-5 py-3 border rounded-xl transition-all duration-300',
          'bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100',
          'border-gray-300 dark:border-slate-600',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400',
          'focus:shadow-md hover:border-gray-400 dark:hover:border-slate-500 cursor-pointer',
          error && 'border-danger-500 focus:ring-danger-500 dark:focus:ring-danger-400',
          className
        )}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="text-sm font-medium text-danger-600 dark:text-danger-400">{error}</span>}
    </div>
  );
};
