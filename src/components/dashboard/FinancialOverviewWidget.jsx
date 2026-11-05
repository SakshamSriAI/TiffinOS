import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  TrendingDown, 
  Receipt, 
  IndianRupee, 
  ArrowRight,
  AlertCircle,
  ShieldCheck
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { formatINR } from '../../utils/currency';
import { useApp } from '../../context/AppContext';

export const FinancialOverviewWidget = () => {
  const { metrics } = useApp();

  const operatingMarginPercent = metrics.mealRevenue > 0
    ? Math.round((metrics.operatingProfit / metrics.mealRevenue) * 100)
    : 0;

  return (
    <Card className="h-full flex flex-col justify-between shadow-subtle">
      <div>
        <CardHeader
          action={
            <Link to="/app/reports">
              <Button variant="ghost" size="sm" iconRight={ArrowRight}>
                Full Report
              </Button>
            </Link>
          }
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-mint/40 text-forest-deep flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <CardTitle className="text-base text-forest-deep">Monthly Financials</CardTitle>
              <CardDescription>November 2026 recognized ledger (INR)</CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          
          {/* Recognized Meal Revenue */}
          <div className="p-3.5 bg-surface-subtle rounded-card border border-border">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-text font-medium">Recognized Meal Revenue</span>
              <Badge variant="forest" size="sm">Dispatched Meals</Badge>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-forest font-mono mt-1">
              {formatINR(metrics.mealRevenue)}
            </p>
            <p className="text-[11px] text-muted-text mt-0.5">
              Strictly calculated from meals stamped dispatched
            </p>
          </div>

          {/* Kitchen Expenses */}
          <div className="p-3.5 bg-surface-subtle rounded-card border border-border">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-text font-medium">Recorded Expenses</span>
              <span className="text-[11px] text-status-error font-medium">Mandi, Gas, Pack</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-charcoal font-mono mt-1">
              {formatINR(metrics.totalExpenses)}
            </p>
            <p className="text-[11px] text-muted-text mt-0.5">
              Daily average: ~₹710/day
            </p>
          </div>

          {/* Cash Received vs Outstanding Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-emerald-50/50 rounded-card border border-emerald-200">
              <span className="text-[10px] uppercase font-bold text-emerald-800 block">
                Cash Collected
              </span>
              <span className="text-base sm:text-lg font-bold text-status-success font-mono mt-0.5 block">
                {formatINR(metrics.paymentsReceived)}
              </span>
              <span className="text-[10px] text-emerald-700">UPI & Cash in hand</span>
            </div>

            <div className="p-3 bg-amber-50/50 rounded-card border border-amber-200">
              <span className="text-[10px] uppercase font-bold text-amber-800 block">
                Outstanding Due
              </span>
              <span className="text-base sm:text-lg font-bold text-amber-dark font-mono mt-0.5 block">
                {formatINR(metrics.outstandingPayments)}
              </span>
              <span className="text-[10px] text-amber-700">To be collected</span>
            </div>
          </div>

          {/* Operating Margin Summary Box */}
          <div className="p-3.5 bg-forest-deep text-white rounded-card flex items-center justify-between">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-mint block">
                Net Operating Margin
              </span>
              <span className="text-lg font-bold font-mono text-white mt-0.5 block">
                {formatINR(metrics.operatingProfit)}
              </span>
            </div>
            <div className="text-right">
              <Badge variant="mint" size="sm">
                {operatingMarginPercent}% Profit
              </Badge>
              <span className="text-[10px] text-gray-300 block mt-1">Revenue - Expenses</span>
            </div>
          </div>

        </CardContent>
      </div>

      {/* Footer Disclaimer */}
      <div className="px-5 py-3 bg-surface-subtle border-t border-border/60 text-[11px] text-muted-text flex items-center gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-forest flex-shrink-0" />
        <span>Cash collected is recorded separately from revenue.</span>
      </div>
    </Card>
  );
};

export default FinancialOverviewWidget;
