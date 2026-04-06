import type { ReactNode } from 'react';
import clsx from 'clsx';

interface CardProps {
  className?: string;
  children: ReactNode;
}

export const Card = ({ className, children }: CardProps) => {
  return (
    <div
      className={clsx(
        'bg-white dark:bg-slate-950 rounded-2xl shadow-sm dark:shadow-xl border border-slate-200 dark:border-slate-800 p-8 transition-all duration-300',
        'hover:shadow-md dark:hover:shadow-2xl hover:border-slate-300 dark:hover:border-slate-700',
        className
      )}
    >
      {children}
    </div>
  );
};
