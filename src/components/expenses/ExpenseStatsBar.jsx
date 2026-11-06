import React, { useMemo } from 'react';
import { TrendingDown, Calendar, PieChart, ShoppingCart, Flame, CreditCard, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent } from '../common/Card';
import { formatINR } from '../../utils/currency';
import { getTodayIST } from '../../utils/date';
import { EXPENSE_CATEGORIES, getCategoryById } from '../../utils/expenseCategories';

export const ExpenseStatsBar = ({ expenses = [] }) => {
  const todayStr = getTodayIST(); // '2026-11-06'

  const {
    totalExpenses,
    todayExpenses,
    dailyAverage,
    topCategory,
    categoryBreakdown,
  } = useMemo(() => {
    const total = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
    
    // Today's expenses
    const todayTotal = expenses
      .filter((e) => e.date === todayStr)
      .reduce((sum, e) => sum + Number(e.amount || 0), 0);

    // Days elapsed in current month (Nov 1 to today's day number)
    const dayOfMonth = parseInt(todayStr.split('-')[2] || '6', 10);
    const avg = dayOfMonth > 0 ? Math.round(total / dayOfMonth) : total;

    // Category breakdown
    const catMap = {};
    expenses.forEach((e) => {
      const catKey = e.category || 'miscellaneous';
      catMap[catKey] = (catMap[catKey] || 0) + Number(e.amount || 0);
    });

    const breakdownList = Object.keys(catMap).map((catId) => {
      const catMeta = getCategoryById(catId);
      const amount = catMap[catId];
      const percentage = total > 0 ? Math.round((amount / total) * 100) : 0;
      return {
        ...catMeta,
        amount,
        percentage,
      };
    }).sort((a, b) => b.amount - a.amount);

    const top = breakdownList.length > 0 ? breakdownList[0] : null;

    return {
      totalExpenses: total,
      todayExpenses: todayTotal,
      dailyAverage: avg,
      topCategory: top,
      categoryBreakdown: breakdownList,
    };
  }, [expenses, todayStr]);

  return (
    <div className="space-y-4">
      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        
        {/* Total Expenses */}
        <Card hover={true}>
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-text">
                Total Expenses (Nov)
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
                {expenses.length} logged transactions
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Today's Outflow */}
        <Card hover={true}>
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-text">
                Today's Outflow
              </span>
              <div className="w-8 h-8 rounded-lg bg-amber-light flex items-center justify-center text-amber-dark">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-amber-dark font-mono">
                {formatINR(todayExpenses)}
              </span>
              <p className="text-[11px] text-muted-text mt-1">
                Recorded for {todayStr}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Daily Spending Average */}
        <Card hover={true}>
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-text">
                Daily Average
              </span>
              <div className="w-8 h-8 rounded-lg bg-forest/10 flex items-center justify-center text-forest">
                <CreditCard className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-forest font-mono">
                {formatINR(dailyAverage)}
              </span>
              <p className="text-[11px] text-muted-text mt-1">
                Per day across month-to-date
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Top Expense Category */}
        <Card hover={true}>
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-text">
                Top Spending Area
              </span>
              <div className="w-8 h-8 rounded-lg bg-mint/50 flex items-center justify-center text-forest-deep">
                <PieChart className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-base sm:text-lg lg:text-xl font-bold text-charcoal truncate block">
                {topCategory ? topCategory.shortLabel : 'None yet'}
              </span>
              <p className="text-[11px] text-muted-text mt-1">
                {topCategory
                  ? `${formatINR(topCategory.amount)} (${topCategory.percentage}% of total)`
                  : 'No expenses recorded'}
              </p>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* Visual Category Expenditure Distribution Bar */}
      {categoryBreakdown.length > 0 && (
        <div className="bg-white p-3.5 sm:p-4 rounded-card border border-border shadow-subtle space-y-2.5">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-charcoal">Category Expenditure Distribution</span>
            <span className="text-muted-text font-mono">100% accounted</span>
          </div>

          {/* Segmented Color Bar */}
          <div className="h-3 w-full rounded-full bg-surface-subtle overflow-hidden flex">
            {categoryBreakdown.map((item) => (
              <div
                key={item.id}
                style={{
                  width: `${Math.max(item.percentage, 2)}%`,
                  backgroundColor: item.colorHex,
                }}
                className="h-full transition-all duration-300 relative group"
                title={`${item.label}: ${formatINR(item.amount)} (${item.percentage}%)`}
              />
            ))}
          </div>

          {/* Category Chips Legend */}
          <div className="flex flex-wrap gap-2 pt-1 text-xs">
            {categoryBreakdown.map((item) => (
              <div
                key={item.id}
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-subtle border border-border text-[11px]"
              >
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: item.colorHex }}
                />
                <span className="font-medium text-charcoal">{item.shortLabel}:</span>
                <span className="font-mono font-semibold text-charcoal">{formatINR(item.amount)}</span>
                <span className="text-muted-text text-[10px]">({item.percentage}%)</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseStatsBar;
