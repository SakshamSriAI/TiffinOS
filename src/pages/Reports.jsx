import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ReportsKpiHeader } from '../components/reports/ReportsKpiHeader';
import { RevenueExpensesChart } from '../components/reports/RevenueExpensesChart';
import { MealDispatchChart } from '../components/reports/MealDispatchChart';
import { ExpenseDonutChart } from '../components/reports/ExpenseDonutChart';
import { ProfitLossStatement } from '../components/reports/ProfitLossStatement';
import { getCategoryById } from '../utils/expenseCategories';
import { isSupabaseConfigured } from '../services/supabaseClient';
import { formatDateIST, getTodayIST } from '../utils/date';

export const Reports = () => {
  const { mealOrders, expenses, invoices } = useApp();
  const [period, setPeriod] = useState('November 2026');

  // 1. Calculations for Dispatched Meal Revenue
  const {
    dispatchedCount,
    lunchRevenue,
    dinnerRevenue,
    oneTimeRevenue,
    recognizedRevenue,
  } = useMemo(() => {
    // Only dispatched meals count towards recognized revenue
    const dispatched = mealOrders.filter((o) => o.status === 'dispatched');
    const count = dispatched.length;

    let lunch = 0;
    let dinner = 0;
    let oneTime = 0;

    dispatched.forEach((m) => {
      const price = Number(m.price || 0);
      if (m.source === 'one_time') {
        oneTime += price;
      } else if (m.mealType === 'lunch') {
        lunch += price;
      } else {
        dinner += price;
      }
    });

    const total = lunch + dinner + oneTime;

    return {
      dispatchedCount: count,
      lunchRevenue: lunch,
      dinnerRevenue: dinner,
      oneTimeRevenue: oneTime,
      recognizedRevenue: total,
    };
  }, [mealOrders]);

  // 2. Calculations for Expenses
  const { totalExpenses, categoryBreakdown } = useMemo(() => {
    const total = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);

    const catMap = {};
    expenses.forEach((e) => {
      const catKey = e.category || 'miscellaneous';
      catMap[catKey] = (catMap[catKey] || 0) + Number(e.amount || 0);
    });

    const breakdown = Object.keys(catMap).map((catId) => {
      const catMeta = getCategoryById(catId);
      const amount = catMap[catId];
      const percentage = total > 0 ? Math.round((amount / total) * 100) : 0;
      return {
        ...catMeta,
        amount,
        percentage,
      };
    }).sort((a, b) => b.amount - a.amount);

    return {
      totalExpenses: total,
      categoryBreakdown: breakdown,
    };
  }, [expenses]);

  // 3. Operating Profit & Margin
  const operatingProfit = recognizedRevenue - totalExpenses;
  const operatingMargin = recognizedRevenue > 0
    ? Math.round((operatingProfit / recognizedRevenue) * 100)
    : 0;

  // 4. Invoicing & Collections
  const totalBilled = invoices.reduce((sum, i) => sum + Number(i.totalAmount || 0), 0);
  const totalCollected = invoices.reduce((sum, i) => sum + Number(i.paidAmount || 0), 0);
  const outstanding = invoices.reduce((sum, i) => sum + Number(i.balanceDue || 0), 0);
  const collectionRate = totalBilled > 0 ? Math.round((totalCollected / totalBilled) * 100) : 0;

  // 5. Daily Time-Series Data strictly from real dispatched orders & expenses
  const dailyChartData = useMemo(() => {
    const todayStr = getTodayIST();
    const todayDate = new Date(`${todayStr}T12:00:00+05:30`);
    
    // Generate dates from beginning of month or past 6 days up to today
    const dates = [];
    const countDays = Math.max(6, todayDate.getDate());
    for (let i = countDays - 1; i >= 0; i--) {
      const d = new Date(todayDate);
      d.setDate(todayDate.getDate() - i);
      const iso = formatDateIST(d, 'iso');
      const dayNum = String(d.getDate()).padStart(2, '0');
      const monthShort = d.toLocaleString('en-IN', { month: 'short', timeZone: 'Asia/Kolkata' });
      const label = iso === todayStr ? `${dayNum} ${monthShort} (Today)` : `${dayNum} ${monthShort}`;
      dates.push({ date: iso, label });
    }

    return dates.map((d) => {
      const dayOrders = mealOrders.filter((o) => o.date === d.date && o.status === 'dispatched');
      const dayLunch = dayOrders.filter((o) => o.mealType === 'lunch').length;
      const dayDinner = dayOrders.filter((o) => o.mealType === 'dinner').length;
      const dayRev = dayOrders.reduce((sum, o) => sum + Number(o.price || 0), 0);

      const dayExp = expenses
        .filter((e) => e.date === d.date)
        .reduce((sum, e) => sum + Number(e.amount || 0), 0);

      return {
        dateLabel: d.label,
        date: d.date,
        revenue: dayRev,
        expenses: dayExp,
        lunch: dayLunch,
        dinner: dayDinner,
      };
    });
  }, [mealOrders, expenses]);

  return (
    <div className="space-y-6">
      
      {/* KPI Header & Export Trigger */}
      <ReportsKpiHeader
        period={period}
        setPeriod={setPeriod}
        recognizedRevenue={recognizedRevenue}
        dispatchedCount={dispatchedCount}
        totalExpenses={totalExpenses}
        operatingProfit={operatingProfit}
        operatingMargin={operatingMargin}
        totalBilled={totalBilled}
        totalCollected={totalCollected}
        outstanding={outstanding}
        collectionRate={collectionRate}
        mealOrders={mealOrders}
        invoices={invoices}
        expenses={expenses}
        categoryBreakdown={categoryBreakdown}
        lunchRevenue={lunchRevenue}
        dinnerRevenue={dinnerRevenue}
        oneTimeRevenue={oneTimeRevenue}
      />

      {/* Chart Row 1: Daily Revenue vs Expenses & Daily Meal Dispatch Volume */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueExpensesChart data={dailyChartData} />
        <MealDispatchChart data={dailyChartData} />
      </div>

      {/* Chart Row 2: Expense Distribution Donut Chart */}
      <div className="grid grid-cols-1 gap-6">
        <ExpenseDonutChart categoryBreakdown={categoryBreakdown} />
      </div>

      {/* Statement of Profit & Loss Table */}
      <ProfitLossStatement
        period={period}
        recognizedRevenue={recognizedRevenue}
        lunchRevenue={lunchRevenue}
        dinnerRevenue={dinnerRevenue}
        oneTimeRevenue={oneTimeRevenue}
        dispatchedCount={dispatchedCount}
        totalExpenses={totalExpenses}
        categoryBreakdown={categoryBreakdown}
        operatingProfit={operatingProfit}
        operatingMargin={operatingMargin}
        totalBilled={totalBilled}
        totalCollected={totalCollected}
        outstanding={outstanding}
      />

    </div>
  );
};

export default Reports;
