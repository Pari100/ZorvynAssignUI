import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: ReactNode;
}

export const Button = ({ variant = 'primary', size = 'md', loading = false, className, ...props }: ButtonProps) => {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-slate-950 active:scale-95';

  const variantStyles = {
    primary: 'bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white focus:ring-blue-500 shadow-md hover:shadow-lg',
    secondary: 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-slate-100 focus:ring-slate-500 border border-slate-200 dark:border-slate-700',
    danger: 'bg-linear-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 text-white focus:ring-rose-500 shadow-md hover:shadow-lg',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3 text-lg',
  };

  return (
    <button
      {...props}
      disabled={loading || props.disabled}
      className={clsx(baseStyles, variantStyles[variant], sizeStyles[size], className)}
    >
      {loading ? '...' : props.children}
    </button>
  );
};
