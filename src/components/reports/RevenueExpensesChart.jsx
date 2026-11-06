import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../common/Card';
import { formatINR } from '../../utils/currency';

export const RevenueExpensesChart = ({ data = [] }) => {
  // Custom Tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const revenue = payload.find((p) => p.dataKey === 'revenue')?.value || 0;
      const expenses = payload.find((p) => p.dataKey === 'expenses')?.value || 0;
      const profit = revenue - expenses;

      return (
        <div className="bg-white p-3 rounded-card shadow-modal border border-border text-xs space-y-1.5">
          <p className="font-bold text-charcoal">{label}</p>
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-forest">
              <span className="w-2.5 h-2.5 rounded-full bg-forest" />
              Meal Revenue:
            </span>
            <span className="font-mono font-bold">{formatINR(revenue)}</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-status-error">
              <span className="w-2.5 h-2.5 rounded-full bg-status-error" />
              Kitchen Expenses:
            </span>
            <span className="font-mono font-bold">{formatINR(expenses)}</span>
          </div>
          <div className="border-t border-border pt-1 flex items-center justify-between gap-4 font-semibold">
            <span className="text-charcoal">Net Margin:</span>
            <span className={`font-mono ${profit >= 0 ? 'text-status-success' : 'text-status-error'}`}>
              {formatINR(profit)}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Revenue vs. Operating Expenses</CardTitle>
        <CardDescription>
          Daily meal dispatch revenue compared with recorded kitchen and operating costs.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E4DE" vertical={false} />
              <XAxis
                dataKey="dateLabel"
                stroke="#737A75"
                fontSize={11}
                tickLine={false}
              />
              <YAxis
                stroke="#737A75"
                fontSize={11}
                tickLine={false}
                tickFormatter={(val) => `₹${val}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                iconType="circle"
              />
              <Bar
                name="Dispatched Revenue"
                dataKey="revenue"
                fill="#173D35" // Primary Forest Green
                radius={[4, 4, 0, 0]}
                maxBarSize={32}
              />
              <Bar
                name="Operating Expenses"
                dataKey="expenses"
                fill="#D49A34" // Amber Accent
                radius={[4, 4, 0, 0]}
                maxBarSize={32}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueExpensesChart;
