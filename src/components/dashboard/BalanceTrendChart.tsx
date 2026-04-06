import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, AreaChart } from 'recharts';
import { Card } from '../common/Card';
import { EmptyState } from '../common/EmptyState';
import { useBalanceTrend } from '../../hooks';
import { formatCurrency, formatDate, formatCompactNumber } from '../../utils/formatters';
import { BarChart3, ArrowUp, ArrowDown } from 'lucide-react';
import { motion } from 'framer-motion';

export const BalanceTrendChart = () => {
  const data = useBalanceTrend();

  if (data.length === 0) {
    return (
      <Card>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-linear-to-br from-blue-600 to-cyan-600 rounded-xl">
              <BarChart3 size={24} className="text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Balance Trend</h2>
          </div>
        </div>
        <EmptyState
          title="No Data"
          description="Add transactions to see your balance trend over time"
          icon={<BarChart3 size={48} />}
        />
      </Card>
    );
  }

  const currentBalance = data[data.length - 1]?.balance || 0;
  const previousBalance = data[0]?.balance || 0;
  const balanceChange = currentBalance - previousBalance;
  const maxBalance = Math.max(...data.map((d: any) => d.balance));
  const minBalance = Math.min(...data.map((d: any) => d.balance));

  return (
    <Card>
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-linear-to-br from-blue-600 to-cyan-600 rounded-xl">
                <BarChart3 size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Balance Trend</h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">Your financial journey over time</p>
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-4 rounded-xl ${
              balanceChange >= 0
                ? 'bg-emerald-100 dark:bg-emerald-900/30'
                : 'bg-red-100 dark:bg-red-900/30'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              {balanceChange >= 0 ? (
                <ArrowUp size={20} className="text-emerald-600 dark:text-emerald-400" />
              ) : (
                <ArrowDown size={20} className="text-red-600 dark:text-red-400" />
              )}
              <p className={`text-xs font-bold uppercase tracking-widest ${
                balanceChange >= 0
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-red-600 dark:text-red-400'
              }`}>
                {balanceChange >= 0 ? 'Improvement' : 'Decrease'}
              </p>
            </div>
            <p className={`text-2xl font-black ${
              balanceChange >= 0
                ? 'text-emerald-700 dark:text-emerald-400'
                : 'text-red-700 dark:text-red-400'
            }`}>
              {balanceChange >= 0 ? '+' : ''}{formatCurrency(balanceChange)}
            </p>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-linear-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-lg border-l-4 border-blue-500"
          >
            <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2">Current Balance</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{formatCurrency(currentBalance)}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 bg-linear-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-lg border-l-4 border-emerald-500"
          >
            <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-2">Highest Balance</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{formatCurrency(maxBalance)}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-4 bg-linear-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg border-l-4 border-orange-500"
          >
            <p className="text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest mb-2">Lowest Balance</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white">{formatCurrency(minBalance)}</p>
          </motion.div>
        </div>
      </div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              opacity={0.2}
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tickFormatter={(date: any) => formatDate(date, 'MMM dd')}
              stroke="#9ca3af"
              tick={{ fontSize: 12 }}
              style={{ fontWeight: 500 }}
            />
            <YAxis
              stroke="#9ca3af"
              tick={{ fontSize: 12 }}
              tickFormatter={(value: any) => formatCompactNumber(value as number)}
              style={{ fontWeight: 500 }}
            />
            <Tooltip
              formatter={(value: any) => formatCurrency(value as number)}
              labelFormatter={(label: any) => formatDate(label as string, 'MMM dd, yyyy')}
              contentStyle={{
                backgroundColor: '#1f2937',
                border: 'none',
                borderRadius: '12px',
                color: '#fff',
                padding: '12px 16px',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3)',
              }}
              cursor={{ strokeDasharray: '3 3', stroke: '#9ca3af', strokeOpacity: 0.5 }}
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#3b82f6"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorBalance)"
              dot={{ fill: '#3b82f6', r: 4, strokeWidth: 2, stroke: '#fff' }}
              activeDot={{
                r: 8,
                strokeWidth: 3,
                fill: '#3b82f6',
                stroke: '#fff',
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Additional Info */}
      <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-700">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
            <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-2">Period</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">
              {data.length} days tracked
            </p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg">
            <p className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest mb-2">Average Balance</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">
              {formatCurrency(
                data.reduce((sum: number, item: any) => sum + item.balance, 0) / data.length
              )}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};
