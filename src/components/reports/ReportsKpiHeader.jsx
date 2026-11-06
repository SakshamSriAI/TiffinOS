import React, { useState } from 'react';
import { Download, Calendar, TrendingUp, TrendingDown, IndianRupee, Percent, CheckCircle2, FileSpreadsheet } from 'lucide-react';
import { Card, CardContent } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { formatINR } from '../../utils/currency';
import { exportMealsCSV, exportInvoicesCSV, exportExpensesCSV, exportPandLSummaryCSV } from '../../utils/csvExport';

export const ReportsKpiHeader = ({
  period,
  setPeriod,
  recognizedRevenue,
  dispatchedCount,
  totalExpenses,
  operatingProfit,
  operatingMargin,
  totalBilled,
  totalCollected,
  outstanding,
  collectionRate,
  mealOrders,
  invoices,
  expenses,
  categoryBreakdown,
  lunchRevenue,
  dinnerRevenue,
  oneTimeRevenue,
}) => {
  const [isExportMenuOpen, setIsExportMenuOpen] = useState(false);

  const handleExportAll = () => {
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
    setIsExportMenuOpen(false);
  };

  return (
    <div className="space-y-4">
      
      {/* Top Header Row: Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-charcoal">
            Business Reports & Analytics
          </h1>
          <p className="text-sm text-muted-text mt-0.5">
            Recognized meal revenue, operating margins, expense breakdowns, and monthly P&L statement.
          </p>
        </div>

        {/* Period Selector & Export Dropdown */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Period selector */}
          <div className="inline-flex rounded-button bg-white border border-border p-1 shadow-subtle text-xs font-semibold">
            {['November 2026', 'October 2026 (Archive)'].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-button transition-colors ${
                  period === p
                    ? 'bg-forest text-white'
                    : 'text-muted-text hover:text-charcoal'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Export CSV Button with Dropdown */}
          <div className="relative">
            <Button
              variant="secondary"
              size="sm"
              iconLeft={Download}
              onClick={() => setIsExportMenuOpen(!isExportMenuOpen)}
            >
              Export CSV
            </Button>

            {isExportMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-card shadow-modal border border-border py-1.5 z-20 text-xs">
                <button
                  type="button"
                  onClick={handleExportAll}
                  className="w-full text-left px-3.5 py-2 hover:bg-surface-subtle font-semibold text-charcoal flex items-center gap-2"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-forest" />
                  Monthly P&L Summary CSV
                </button>
                <div className="border-t border-border my-1" />
                <button
                  type="button"
                  onClick={() => {
                    exportMealsCSV(mealOrders, 'nov-2026');
                    setIsExportMenuOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-surface-subtle text-charcoal flex items-center gap-2"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-muted-text" />
                  Dispatched Meals ({mealOrders.length})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    exportInvoicesCSV(invoices, period);
                    setIsExportMenuOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-surface-subtle text-charcoal flex items-center gap-2"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-muted-text" />
                  Invoices & Ledger ({invoices.length})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    exportExpensesCSV(expenses);
                    setIsExportMenuOpen(false);
                  }}
                  className="w-full text-left px-3.5 py-2 hover:bg-surface-subtle text-charcoal flex items-center gap-2"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-muted-text" />
                  Expenses Log ({expenses.length})
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* 4 Financial KPI Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        
        {/* Recognized Revenue */}
        <Card hover={true}>
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-text">
                Recognized Revenue
              </span>
              <div className="w-8 h-8 rounded-lg bg-forest/10 flex items-center justify-center text-forest">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-forest font-mono">
                {formatINR(recognizedRevenue)}
              </span>
              <p className="text-[11px] text-muted-text mt-1">
                From {dispatchedCount} confirmed meals
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Operating Expenses */}
        <Card hover={true}>
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-text">
                Operating Expenses
              </span>
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-status-error">
                <TrendingDown className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-charcoal font-mono">
                {formatINR(totalExpenses)}
              </span>
              <p className="text-[11px] text-muted-text mt-1">
                Kitchen, fuel, gas & salaries
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Operating Profit */}
        <Card hover={true} className="border-status-success/30 bg-emerald-50/20">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-status-success">
                Net Operating Profit
              </span>
              <Badge variant="success">
                {operatingMargin}% Margin
              </Badge>
            </div>
            <div className="mt-3">
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-status-success font-mono">
                {formatINR(operatingProfit)}
              </span>
              <p className="text-[11px] text-muted-text mt-1">
                Revenue minus operating costs
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Collection Efficiency */}
        <Card hover={true}>
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-text">
                Collection Efficiency
              </span>
              <div className="w-8 h-8 rounded-lg bg-mint/50 flex items-center justify-center text-forest-deep">
                <Percent className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-charcoal font-mono">
                {collectionRate}%
              </span>
              <p className="text-[11px] text-muted-text mt-1">
                {formatINR(totalCollected)} collected of {formatINR(totalBilled)} billed
              </p>
            </div>
          </CardContent>
        </Card>

      </div>

    </div>
  );
};

export default ReportsKpiHeader;
