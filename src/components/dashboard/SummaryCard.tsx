import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../common/Card';
import { formatCurrency } from '../../utils/formatters';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface SummaryCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  color?: 'purple' | 'orange' | 'cyan' | 'green' | 'blue';
}

const colorClasses = {
  purple: 'border-l-4 border-purple-500 bg-gradient-to-br from-purple-50/40 to-transparent dark:from-purple-900/20',
  orange: 'border-l-4 border-orange-500 bg-gradient-to-br from-orange-50/40 to-transparent dark:from-orange-900/20',
  cyan: 'border-l-4 border-cyan-500 bg-gradient-to-br from-cyan-50/40 to-transparent dark:from-cyan-900/20',
  green: 'border-l-4 border-green-500 bg-gradient-to-br from-green-50/40 to-transparent dark:from-green-900/20',
  blue: 'border-l-4 border-blue-500 bg-gradient-to-br from-blue-50/40 to-transparent dark:from-blue-900/20',
};

const textColorClasses = {
  purple: 'text-purple-600 dark:text-purple-400',
  orange: 'text-orange-600 dark:text-orange-400',
  cyan: 'text-cyan-600 dark:text-cyan-400',
  green: 'text-green-600 dark:text-green-400',
  blue: 'text-blue-600 dark:text-blue-400',
};

export const SummaryCard = ({ title, value, icon, trend, color = 'blue' }: SummaryCardProps) => {
  return (
    <Card className={`relative overflow-hidden group hover:shadow-xl transition-all duration-300 ${colorClasses[color]}`}>
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className={`text-xs font-bold ${textColorClasses[color]} uppercase tracking-widest mb-3`}>{title}</p>
            <motion.div
              key={value}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-4xl font-black text-slate-900 dark:text-white leading-none"
            >
              {formatCurrency(value)}
            </motion.div>
          </div>
          <div className="text-5xl opacity-20 group-hover:opacity-30 transition-opacity ml-4">{icon}</div>
        </div>
        {trend && (
          <div className={`mt-4 flex items-center gap-2 text-sm font-bold ${trend.direction === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
            {trend.direction === 'up' ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
            <span>{Math.abs(trend.value).toFixed(1)}% Increased form last month</span>
          </div>
        )}
      </div>
    </Card>
  );
};
