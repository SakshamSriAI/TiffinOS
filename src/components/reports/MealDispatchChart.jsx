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

export const MealDispatchChart = ({ data = [] }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const lunch = payload.find((p) => p.dataKey === 'lunch')?.value || 0;
      const dinner = payload.find((p) => p.dataKey === 'dinner')?.value || 0;
      const total = lunch + dinner;

      return (
        <div className="bg-white p-3 rounded-card shadow-modal border border-border text-xs space-y-1.5">
          <p className="font-bold text-charcoal">{label}</p>
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-forest">
              <span className="w-2.5 h-2.5 rounded-full bg-forest" />
              Lunch Dispatches:
            </span>
            <span className="font-mono font-bold">{lunch} meals</span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="flex items-center gap-1.5 text-forest-deep">
              <span className="w-2.5 h-2.5 rounded-full bg-status-success" />
              Dinner Dispatches:
            </span>
            <span className="font-mono font-bold">{dinner} meals</span>
          </div>
          <div className="border-t border-border pt-1 flex items-center justify-between gap-4 font-semibold text-charcoal">
            <span>Total Dispatched:</span>
            <span className="font-mono">{total} meals</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Meal Dispatch Volume</CardTitle>
        <CardDescription>
          Daily count of prepared and dispatched lunch boxes vs dinner boxes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
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
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }}
                iconType="circle"
              />
              <Bar
                name="Lunch Dispatches"
                dataKey="lunch"
                fill="#173D35" // Primary Forest Green
                radius={[4, 4, 0, 0]}
                maxBarSize={28}
              />
              <Bar
                name="Dinner Dispatches"
                dataKey="dinner"
                fill="#27845D" // Soft Forest / Green
                radius={[4, 4, 0, 0]}
                maxBarSize={28}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MealDispatchChart;
