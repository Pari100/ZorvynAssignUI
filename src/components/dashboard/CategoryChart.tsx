import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Card } from '../common/Card';
import { EmptyState } from '../common/EmptyState';
import { useCategoryExpenses } from '../../hooks';
import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { PieChart as PieIcon, BarChart3 } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const VIBRANT_COLORS = ['#8b5cf6', '#f97316', '#06b6d4', '#10b981', '#ef4444', '#ec4899', '#f59e0b', '#6366f1'];

export const CategoryChart = () => {
  const data = useCategoryExpenses();
  const [chartType, setChartType] = useState<'pie' | 'bar'>('pie');

  if (data.length === 0) {
    return (
      <Card>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-linear-to-br from-purple-600 to-pink-600 rounded-xl">
              <PieIcon size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Spending by Category</h2>
          </div>
        </div>
        <EmptyState
          title="No Expenses"
          description="Add expense transactions to see spending breakdown by category"
          icon={<PieIcon size={48} />}
        />
      </Card>
    );
  }

  const totalSpending = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <Card>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-3 bg-linear-to-br from-purple-600 to-pink-600 rounded-xl">
                <PieIcon size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Spending by Category</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total: {formatCurrency(totalSpending)}</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setChartType('pie')}
              className={`px-4 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${
                chartType === 'pie'
                  ? 'bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <PieIcon size={18} />
              Pie
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setChartType('bar')}
              className={`px-4 py-2.5 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${
                chartType === 'bar'
                  ? 'bg-linear-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <BarChart3 size={18} />
              Bar
            </motion.button>
          </div>
        </div>
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ResponsiveContainer width="100%" height={320}>
          {chartType === 'pie' ? (
            <PieChart>
              <Pie
                data={data}
                dataKey="amount"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={110}
                innerRadius={60}
                label={(entry: any) => `${entry.category}: ${formatPercentage(entry.percentage)}`}
                labelLine={true}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={VIBRANT_COLORS[index % VIBRANT_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: any) => formatCurrency(value as number)}
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#fff',
                  padding: '12px 16px',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
                }}
              />
            </PieChart>
          ) : (
            <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.2} />
              <XAxis
                dataKey="category"
                stroke="#9ca3af"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                stroke="#9ca3af"
                tick={{ fontSize: 12 }}
                tickFormatter={(value: any) => formatCurrency(value as number)}
              />
              <Tooltip
                formatter={(value: any) => formatCurrency(value as number)}
                contentStyle={{
                  backgroundColor: '#1f2937',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#fff',
                  padding: '12px 16px',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
                }}
              />
              <Bar dataKey="amount" fill="#8b5cf6" radius={[12, 12, 0, 0]} />
            </BarChart>
          )}
        </ResponsiveContainer>
      </motion.div>

      {/* Category Breakdown */}
      <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
        <h3 className="text-sm font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-4">Breakdown</h3>
        <div className="grid grid-cols-2 gap-4">
          {data.slice(0, 4).map((item, index) => (
            <motion.div
              key={item.category}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: VIBRANT_COLORS[index % VIBRANT_COLORS.length] }}
                />
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{item.category}</p>
              </div>
              <p className="text-lg font-bold text-slate-900 dark:text-white">{formatCurrency(item.amount)}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{formatPercentage(item.percentage)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
};
