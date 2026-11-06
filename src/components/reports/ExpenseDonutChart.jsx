import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../common/Card';
import { formatINR } from '../../utils/currency';

export const ExpenseDonutChart = ({ categoryBreakdown = [] }) => {
  const hasExpenses = categoryBreakdown && categoryBreakdown.length > 0 && categoryBreakdown.some((c) => Number(c.amount || 0) > 0);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-white p-2.5 rounded-card shadow-modal border border-border text-xs space-y-1">
          <p className="font-bold text-charcoal">{item.label}</p>
          <div className="flex items-center justify-between gap-3">
            <span className="text-muted-text">Amount Spent:</span>
            <span className="font-mono font-bold text-charcoal">{formatINR(item.amount)}</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-muted-text">Share of Budget:</span>
            <span className="font-mono font-semibold text-forest">{item.percentage}%</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Expense Distribution by Category</CardTitle>
          {!hasExpenses && (
            <span className="text-[10px] font-semibold text-muted-text bg-surface-subtle px-2 py-0.5 rounded border border-border">
              ₹0 Spent
            </span>
          )}
        </div>
        <CardDescription>
          Proportion of business outflow spent on provisions, vegetables, gas, and wages.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!hasExpenses ? (
          <div className="py-12 flex flex-col items-center justify-center text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-surface-subtle flex items-center justify-center text-muted-text border border-border">
              <PieChartIcon className="w-6 h-6 text-muted-text" />
            </div>
            <p className="text-sm font-semibold text-charcoal">No Expenses Recorded</p>
            <p className="text-xs text-muted-text max-w-sm">
              No kitchen or operating expenses have been logged for this period yet (₹0). Any recorded expenses will be categorized here automatically.
            </p>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Donut Chart */}
          <div className="h-64 w-full sm:w-1/2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={3}
                  dataKey="amount"
                >
                  {categoryBreakdown.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.colorHex || '#173D35'}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Category Breakdown Legend Table */}
          <div className="w-full sm:w-1/2 space-y-2">
            {categoryBreakdown.map((cat) => (
              <div
                key={cat.id}
                className="flex items-center justify-between text-xs p-1.5 rounded hover:bg-surface-subtle transition-colors"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: cat.colorHex }}
                  />
                  <span className="font-medium text-charcoal truncate">
                    {cat.shortLabel}
                  </span>
                </div>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span className="font-mono font-semibold text-charcoal">
                    {formatINR(cat.amount)}
                  </span>
                  <span className="text-[11px] font-mono text-muted-text w-8 text-right">
                    {cat.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ExpenseDonutChart;
