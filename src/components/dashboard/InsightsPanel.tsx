import { Card } from '../common/Card';
import { useInsights } from '../../hooks';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { TrendingUp, TrendingDown, Zap, BarChart3, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';

export const InsightsPanel = () => {
  const insights = useInsights();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight flex items-center gap-3">
          <div className="p-3 bg-linear-to-br from-indigo-600 to-purple-600 rounded-xl">
            <Lightbulb size={24} className="text-white" />
          </div>
          Financial Insights
        </h2>
        <p className="text-slate-600 dark:text-slate-400">Key metrics and trends from your finances</p>
      </div>

      <motion.div
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Highest Spending Card */}
        <motion.div variants={itemVariants}>
          <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 cursor-pointer border-l-4 border-yellow-500 bg-linear-to-br from-yellow-50/50 to-transparent dark:from-yellow-900/20 dark:to-transparent">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-yellow-100 dark:bg-yellow-900/40 rounded-lg group-hover:bg-yellow-200 dark:group-hover:bg-yellow-800/40 transition-colors">
                    <Zap size={24} className="text-yellow-600 dark:text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-yellow-600 dark:text-yellow-400 uppercase tracking-widest">Highest Spending</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Category with most expenses</p>
                  </div>
                </div>
                {insights.highestSpendingCategory ? (
                  <div className="ml-0">
                    <p className="text-4xl font-black text-slate-900 dark:text-white">{insights.highestSpendingCategory.category}</p>
                    <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400 mt-2">{formatCurrency(insights.highestSpendingCategory.amount)}</p>
                  </div>
                ) : (
                  <p className="text-slate-500 dark:text-slate-400">No data available</p>
                )}
              </div>
              <div className="opacity-10 group-hover:opacity-20 transition-opacity text-6xl">⚡</div>
            </div>
          </Card>
        </motion.div>

        {/* Monthly Comparison Card */}
        <motion.div variants={itemVariants}>
          <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 border-l-4 border-blue-500 bg-linear-to-br from-blue-50/50 to-transparent dark:from-blue-900/20 dark:to-transparent">
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-lg group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors">
                    {insights.monthlyComparison.percentageChange > 0 ? (
                      <TrendingUp size={24} className="text-blue-600 dark:text-blue-400" />
                    ) : (
                      <TrendingDown size={24} className="text-blue-600 dark:text-blue-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest">Monthly Comparison</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">This month vs last month</p>
                  </div>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                insights.monthlyComparison.percentageChange > 0
                  ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              }`}>
                {insights.monthlyComparison.percentageChange > 0 ? '↑' : '↓'} {formatPercentage(Math.abs(insights.monthlyComparison.percentageChange))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white dark:bg-slate-800/50 rounded-lg">
                <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-2">This Month</p>
                <p className="text-2xl font-black text-blue-600 dark:text-blue-400">{formatCurrency(insights.monthlyComparison.currentMonth)}</p>
              </div>
              <div className="p-4 bg-white dark:bg-slate-800/50 rounded-lg">
                <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-2">Last Month</p>
                <p className="text-2xl font-black text-slate-600 dark:text-slate-300">{formatCurrency(insights.monthlyComparison.previousMonth)}</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Average Transaction Card */}
        <motion.div variants={itemVariants}>
          <Card className="relative overflow-hidden group hover:shadow-2xl transition-all duration-300 border-l-4 border-purple-500 bg-linear-to-br from-purple-50/50 to-transparent dark:from-purple-900/20 dark:to-transparent">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/40 rounded-lg group-hover:bg-purple-200 dark:group-hover:bg-purple-800/40 transition-colors">
                    <BarChart3 size={24} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">Average Transaction</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Mean transaction value</p>
                  </div>
                </div>
              </div>
              <div className="text-5xl opacity-10 group-hover:opacity-20 transition-opacity">📊</div>
            </div>
            <p className="text-4xl font-black text-purple-600 dark:text-purple-400 mt-4">{formatCurrency(insights.averageTransaction)}</p>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};
