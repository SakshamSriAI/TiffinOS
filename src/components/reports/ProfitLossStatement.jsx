import React from 'react';
import { FileText, Download, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { formatINR } from '../../utils/currency';
import { exportPandLSummaryCSV } from '../../utils/csvExport';

export const ProfitLossStatement = ({
  period,
  recognizedRevenue,
  lunchRevenue,
  dinnerRevenue,
  oneTimeRevenue,
  dispatchedCount,
  totalExpenses,
  categoryBreakdown,
  operatingProfit,
  operatingMargin,
  totalBilled,
  totalCollected,
  outstanding,
}) => {
  const handleExport = () => {
    exportPandLSummaryCSV({
      period,
      recognizedRevenue,
      lunchRevenue,
      dinnerRevenue,
      oneTimeRevenue,
      dispatchedMealsCount: dispatchedCount,
      totalExpenses,
      categoryBreakdown,
      operatingProfit,
      profitMargin: `${operatingMargin}%`,
      totalBilled,
      totalCollected,
      outstanding,
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <CardTitle>Monthly Statement of Profit & Loss</CardTitle>
            <CardDescription>
              Accounting summary for {period}. Stamped strictly from confirmed dispatched meals.
            </CardDescription>
          </div>
          <Button
            variant="secondary"
            size="sm"
            iconLeft={Download}
            onClick={handleExport}
          >
            Export Statement CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 text-sm">
          
          {/* SECTION 1: REVENUE */}
          <div>
            <div className="bg-surface-subtle px-3 py-1.5 rounded text-xs font-bold text-forest uppercase tracking-wider mb-2">
              1. Recognized Meal Revenue
            </div>
            <div className="space-y-1.5 divide-y divide-border/60">
              <div className="flex items-center justify-between py-1.5 px-2 text-xs">
                <span className="text-charcoal">Regular Lunch Services (Dispatched)</span>
                <span className="font-mono font-medium">{formatINR(lunchRevenue)}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 px-2 text-xs">
                <span className="text-charcoal">Regular Dinner Services (Dispatched)</span>
                <span className="font-mono font-medium">{formatINR(dinnerRevenue)}</span>
              </div>
              <div className="flex items-center justify-between py-1.5 px-2 text-xs">
                <span className="text-charcoal">One-Time / Ad-Hoc Meal Bookings</span>
                <span className="font-mono font-medium">{formatINR(oneTimeRevenue)}</span>
              </div>
              <div className="flex items-center justify-between py-2 px-2 font-bold text-xs bg-forest/5 rounded">
                <span className="text-forest-deep">Total Recognized Meal Revenue</span>
                <span className="font-mono text-forest text-sm">{formatINR(recognizedRevenue)}</span>
              </div>
            </div>
          </div>

          {/* SECTION 2: OPERATING EXPENSES */}
          <div>
            <div className="bg-surface-subtle px-3 py-1.5 rounded text-xs font-bold text-status-error uppercase tracking-wider mb-2">
              2. Kitchen & Operational Expenses
            </div>
            <div className="space-y-1.5 divide-y divide-border/60">
              {categoryBreakdown.map((cat) => (
                <div key={cat.id} className="flex items-center justify-between py-1.5 px-2 text-xs">
                  <span className="text-charcoal">{cat.label}</span>
                  <span className="font-mono font-medium text-charcoal">{formatINR(cat.amount)}</span>
                </div>
              ))}
              <div className="flex items-center justify-between py-2 px-2 font-bold text-xs bg-red-50/50 rounded">
                <span className="text-charcoal">Total Operating Outflow</span>
                <span className="font-mono text-status-error text-sm">{formatINR(totalExpenses)}</span>
              </div>
            </div>
          </div>

          {/* SECTION 3: NET OPERATING PROFIT */}
          <div className="p-4 rounded-card border-2 border-forest/20 bg-forest/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-forest-deep block">
                3. Net Operating Profit
              </span>
              <p className="text-xs text-muted-text mt-0.5">
                Surplus before owner drawings & capital re-investment
              </p>
            </div>
            <div className="text-right sm:text-right">
              <span className="text-2xl font-bold font-mono text-forest block">
                {formatINR(operatingProfit)}
              </span>
              <span className="inline-block mt-0.5 px-2 py-0.5 text-xs font-bold rounded-full bg-forest text-white">
                {operatingMargin}% Net Operating Margin
              </span>
            </div>
          </div>

          {/* SECTION 4: CASH FLOW & RECEIVABLES */}
          <div>
            <div className="bg-surface-subtle px-3 py-1.5 rounded text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
              4. Invoicing & Collection Receivables
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-white rounded border border-border">
                <span className="text-muted-text block">Total Amount Invoiced</span>
                <span className="font-mono font-bold text-base text-charcoal mt-1 block">
                  {formatINR(totalBilled)}
                </span>
              </div>
              <div className="p-3 bg-emerald-50/50 rounded border border-status-success/30">
                <span className="text-status-success block">Cash & UPI Received</span>
                <span className="font-mono font-bold text-base text-status-success mt-1 block">
                  {formatINR(totalCollected)}
                </span>
              </div>
              <div className="p-3 bg-amber-light/30 rounded border border-amber/40">
                <span className="text-amber-dark block">Outstanding Receivables</span>
                <span className="font-mono font-bold text-base text-amber-dark mt-1 block">
                  {formatINR(outstanding)}
                </span>
              </div>
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  );
};

export default ProfitLossStatement;
