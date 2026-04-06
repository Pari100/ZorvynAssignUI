import type { InputHTMLAttributes } from 'react';
import clsx from 'clsx';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = ({ label, error, helperText, className, ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-bold text-gray-700 dark:text-gray-300">{label}</label>}
      <input
        {...props}
        className={clsx(
          'px-5 py-3 border rounded-xl transition-all duration-300',
          'bg-white dark:bg-slate-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500',
          'border-gray-300 dark:border-slate-600',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:focus:ring-primary-400',
          'focus:shadow-md hover:border-gray-400 dark:hover:border-slate-500',
          error && 'border-danger-500 focus:ring-danger-500 dark:focus:ring-danger-400',
          className
        )}
      />
      {error && <span className="text-sm font-medium text-danger-600 dark:text-danger-400">{error}</span>}
      {helperText && !error && <span className="text-sm text-gray-500 dark:text-gray-400">{helperText}</span>}
    </div>
  );
};
