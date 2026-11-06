import React, { useState, useMemo } from 'react';
import { 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  MessageCircle, 
  Search, 
  Filter, 
  IndianRupee, 
  Utensils, 
  AlertCircle,
  HelpCircle,
  RotateCcw,
  Plus
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { formatINR } from '../../utils/currency';
import { formatDateIST, getDayOfWeekKey, isMealScheduledForDay, getTodayIST } from '../../utils/date';
import { useApp } from '../../context/AppContext';

export const CustomerMonthlyAttendanceRegister = ({ 
  customer, 
  customerMeals = [], 
  onClose 
}) => {
  const { markDispatched, cancelMealOrder, addOneTimeOrder, settings } = useApp();

  // Current year & month state (defaults to current date, e.g. "2026-11")
  const todayIso = getTodayIST();
  const currentYearMonth = todayIso.slice(0, 7); // "YYYY-MM"
  const [selectedMonth, setSelectedMonth] = useState(currentYearMonth);
  const [dateSearch, setDateSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'taken' | 'skipped' | 'off'

  // Month navigation options (previous 3 months + current + next 1 month)
  const monthOptions = useMemo(() => {
    const list = [];
    const baseDate = new Date(`${todayIso}T12:00:00+05:30`);
    for (let i = -2; i <= 1; i++) {
      const d = new Date(baseDate.getFullYear(), baseDate.getMonth() + i, 1);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, '0');
      const val = `${y}-${m}`;
      const label = d.toLocaleString('en-IN', { month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' });
      list.push({ val, label });
    }
    return list;
  }, [todayIso]);

  // Compute all calendar days in the selected month
  const monthDays = useMemo(() => {
    const [year, month] = selectedMonth.split('-').map(Number);
    const daysInMonth = new Date(year, month, 0).getDate();
    const days = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const dayStr = String(day).padStart(2, '0');
      const monthStr = String(month).padStart(2, '0');
      const dateStr = `${year}-${monthStr}-${dayStr}`;
      const dayKey = getDayOfWeekKey(dateStr);

      const d = new Date(`${dateStr}T12:00:00+05:30`);
      const dayName = d.toLocaleString('en-IN', { weekday: 'short', timeZone: 'Asia/Kolkata' });
      const fullDayName = d.toLocaleString('en-IN', { weekday: 'long', timeZone: 'Asia/Kolkata' });
      const displayLabel = `${dayStr} ${d.toLocaleString('en-IN', { month: 'short', timeZone: 'Asia/Kolkata' })} (${dayName})`;

      // Find lunch order for this day
      const lunchOrder = customerMeals.find(
        (m) => m.date === dateStr && m.mealType === 'lunch'
      );

      // Find dinner order for this day
      const dinnerOrder = customerMeals.find(
        (m) => m.date === dateStr && m.mealType === 'dinner'
      );

      // Weekly schedule check for regular customers
      const isLunchScheduled = customer.type === 'regular'
        ? isMealScheduledForDay(customer.schedule, dayKey, 'lunch')
        : false;

      const isDinnerScheduled = customer.type === 'regular'
        ? isMealScheduledForDay(customer.schedule, dayKey, 'dinner')
        : false;

      // Classify Lunch status
      let lunchStatus = 'off'; // 'dispatched' | 'cancelled' | 'pending' | 'off'
      let lunchPrice = 0;
      if (lunchOrder) {
        lunchStatus = lunchOrder.status; // 'dispatched' | 'cancelled' | 'pending'
        lunchPrice = lunchStatus === 'dispatched' ? Number(lunchOrder.price || customer.lunchPrice || 110) : 0;
      } else if (isLunchScheduled) {
        lunchStatus = 'not_generated';
      }

      // Classify Dinner status
      let dinnerStatus = 'off';
      let dinnerPrice = 0;
      if (dinnerOrder) {
        dinnerStatus = dinnerOrder.status;
        dinnerPrice = dinnerStatus === 'dispatched' ? Number(dinnerOrder.price || customer.dinnerPrice || 120) : 0;
      } else if (isDinnerScheduled) {
        dinnerStatus = 'not_generated';
      }

      const totalMealsTaken = 
        (lunchStatus === 'dispatched' ? 1 : 0) + 
        (dinnerStatus === 'dispatched' ? 1 : 0);

      const dayTotalAmount = lunchPrice + dinnerPrice;

      const hasDispatched = lunchStatus === 'dispatched' || dinnerStatus === 'dispatched';
      const hasCancelled = lunchStatus === 'cancelled' || dinnerStatus === 'cancelled';
      const isOff = lunchStatus === 'off' && dinnerStatus === 'off';

      days.push({
        date: dateStr,
        dayNumber: day,
        dayName,
        fullDayName,
        displayLabel,
        isToday: dateStr === todayIso,
        lunchOrder,
        dinnerOrder,
        isLunchScheduled,
        isDinnerScheduled,
        lunchStatus,
        dinnerStatus,
        lunchPrice,
        dinnerPrice,
        totalMealsTaken,
        dayTotalAmount,
        hasDispatched,
        hasCancelled,
        isOff,
      });
    }

    return days;
  }, [selectedMonth, customerMeals, customer, todayIso]);

  // Filtered rows for tabular display
  const filteredDays = useMemo(() => {
    return monthDays.filter((d) => {
      // Date Search filter
      if (dateSearch.trim()) {
        const query = dateSearch.trim().toLowerCase();
        const matchesDate = d.displayLabel.toLowerCase().includes(query) || d.date.includes(query);
        if (!matchesDate) return false;
      }

      // Status pill filter
      if (statusFilter === 'taken' && !d.hasDispatched) return false;
      if (statusFilter === 'skipped' && !d.hasCancelled) return false;
      if (statusFilter === 'off' && !d.isOff) return false;

      return true;
    });
  }, [monthDays, dateSearch, statusFilter]);

  // Aggregate monthly attendance metrics
  const monthlyMetrics = useMemo(() => {
    let dispatchedLunchCount = 0;
    let dispatchedDinnerCount = 0;
    let cancelledCount = 0;
    let totalRevenue = 0;
    let daysWithTiffin = 0;

    monthDays.forEach((d) => {
      if (d.lunchStatus === 'dispatched') dispatchedLunchCount += 1;
      if (d.dinnerStatus === 'dispatched') dispatchedDinnerCount += 1;
      if (d.lunchStatus === 'cancelled') cancelledCount += 1;
      if (d.dinnerStatus === 'cancelled') cancelledCount += 1;
      if (d.hasDispatched) daysWithTiffin += 1;
      totalRevenue += d.dayTotalAmount;
    });

    const totalTiffinsTaken = dispatchedLunchCount + dispatchedDinnerCount;

    return {
      dispatchedLunchCount,
      dispatchedDinnerCount,
      totalTiffinsTaken,
      cancelledCount,
      daysWithTiffin,
      totalRevenue,
    };
  }, [monthDays]);

  // WhatsApp share message generation
  const handleShareWhatsApp = () => {
    const cleanPhone = (customer.phone || '').replace(/\D/g, '');
    const phoneTarget = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const currentMonthLabel = monthOptions.find((m) => m.val === selectedMonth)?.label || selectedMonth;
    const bName = settings?.businessName || 'Tiffin Service';

    let message = `*Namaste ${customer.name}!* 🙏\n`;
    message += `Here is your verified daily tiffin delivery record for *${currentMonthLabel}* from *${bName}*:\n\n`;
    message += `🍱 *Total Tiffins Delivered:* ${monthlyMetrics.totalTiffinsTaken}\n`;
    message += `☀️ *Lunch Service:* ${monthlyMetrics.dispatchedLunchCount} meals\n`;
    message += `🌙 *Dinner Service:* ${monthlyMetrics.dispatchedDinnerCount} meals\n`;
    if (monthlyMetrics.cancelledCount > 0) {
      message += `❌ *Skipped / Cancelled:* ${monthlyMetrics.cancelledCount} meals\n`;
    }
    message += `💰 *Total Billable Amount:* ₹${monthlyMetrics.totalRevenue}\n\n`;
    message += `*Day-by-Day Dispatch Attendance:*\n`;

    // Add days where tiffins were taken or cancelled
    const activeRecords = monthDays.filter((d) => d.hasDispatched || d.hasCancelled);
    if (activeRecords.length === 0) {
      message += `_No tiffin deliveries logged yet for this month._\n`;
    } else {
      activeRecords.forEach((d) => {
        let line = `• ${d.displayLabel}: `;
        const parts = [];
        if (d.lunchStatus === 'dispatched') parts.push(`Lunch (✓ Taken - ₹${d.lunchPrice})`);
        else if (d.lunchStatus === 'cancelled') parts.push(`Lunch (✕ Skipped)`);

        if (d.dinnerStatus === 'dispatched') parts.push(`Dinner (✓ Taken - ₹${d.dinnerPrice})`);
        else if (d.dinnerStatus === 'cancelled') parts.push(`Dinner (✕ Skipped)`);

        line += parts.join(', ');
        message += `${line}\n`;
      });
    }

    message += `\n_If you have any questions or dispute regarding any date, please let us know. Thank you!_`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneTarget}?text=${encoded}`, '_blank');
  };

  // Helper action: dispute resolution (mark as not taken / cancel)
  const handleMarkNotTaken = (orderId, date, mealType) => {
    const reason = window.prompt(
      `Mark ${mealType.toUpperCase()} on ${date} as NOT TAKEN (Cancelled)?\nEnter reason or dispute note:`,
      'Customer stated tiffin not received'
    );
    if (reason !== null) {
      cancelMealOrder(orderId, reason || 'Customer dispute');
    }
  };

  // Helper action: dispute resolution (mark as dispatched / taken)
  const handleMarkTaken = (orderId) => {
    markDispatched(orderId);
  };

  // Helper action: add missing meal for a specific date
  const handleAddMissingMeal = (dateStr, mealType) => {
    const defaultPrice = mealType === 'lunch' ? Number(customer.lunchPrice || 110) : Number(customer.dinnerPrice || 120);
    const confirmed = window.confirm(
      `Add confirmed ${mealType.toUpperCase()} tiffin for ${customer.name} on ${dateStr} (Rate: ₹${defaultPrice})?`
    );
    if (confirmed) {
      addOneTimeOrder({
        customerId: customer.id,
        date: dateStr,
        mealType: mealType,
        price: defaultPrice,
        source: 'regular',
        instructions: 'Confirmed delivery logged by owner',
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* 1. Header Toolbar: Month Selector, Quick Jump & WhatsApp Export */}
      <div className="p-3.5 bg-surface-subtle rounded-card border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <Calendar className="w-4 h-4 text-forest" />
          <span className="text-xs font-bold text-charcoal uppercase tracking-wider">
            Select Billing Month:
          </span>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="text-xs font-bold text-forest bg-white border border-border rounded-button px-2.5 py-1.5 focus:outline-none focus:ring-2 focus:ring-forest/20 cursor-pointer shadow-subtle"
          >
            {monthOptions.map((opt) => (
              <option key={opt.val} value={opt.val}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <Button
            variant="secondary"
            size="sm"
            iconLeft={MessageCircle}
            className="bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100 font-bold"
            onClick={handleShareWhatsApp}
            title="Send WhatsApp attendance sheet to customer"
          >
            Send Attendance On WhatsApp
          </Button>
        </div>
      </div>

      {/* 2. Monthly Summary Metric Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
        <div className="p-3 bg-white rounded-card border border-border shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-muted-text block">
            Total Tiffins Taken
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-xl font-bold font-mono text-forest">
              {monthlyMetrics.totalTiffinsTaken}
            </span>
            <span className="text-[11px] text-muted-text">
              ({monthlyMetrics.dispatchedLunchCount} L / {monthlyMetrics.dispatchedDinnerCount} D)
            </span>
          </div>
          <span className="text-[10px] text-muted-text">Confirmed dispatched</span>
        </div>

        <div className="p-3 bg-white rounded-card border border-border shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-muted-text block">
            Skipped / Cancelled
          </span>
          <span className="text-xl font-bold font-mono text-status-error mt-0.5 block">
            {monthlyMetrics.cancelledCount}
          </span>
          <span className="text-[10px] text-muted-text">Excluded from billing</span>
        </div>

        <div className="p-3 bg-white rounded-card border border-border shadow-subtle">
          <span className="text-[10px] uppercase font-bold text-muted-text block">
            Days Delivered
          </span>
          <span className="text-xl font-bold font-mono text-charcoal mt-0.5 block">
            {monthlyMetrics.daysWithTiffin} <span className="text-xs font-normal text-muted-text">days</span>
          </span>
          <span className="text-[10px] text-muted-text">With at least 1 tiffin</span>
        </div>

        <div className="p-3 bg-emerald-50/50 rounded-card border border-emerald-200">
          <span className="text-[10px] uppercase font-bold text-emerald-900 block">
            Total Month Value
          </span>
          <span className="text-xl font-bold font-mono text-status-success mt-0.5 block">
            {formatINR(monthlyMetrics.totalRevenue)}
          </span>
          <span className="text-[10px] text-emerald-700">Dispatched billable total</span>
        </div>
      </div>

      {/* 3. Search Bar & Status Filter Pills */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-1">
        <div className="relative flex-1 max-w-xs">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-light" />
          <input
            type="text"
            placeholder="Search date (e.g. 04 or Wed)..."
            value={dateSearch}
            onChange={(e) => setDateSearch(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-white border border-border rounded-input focus:outline-none focus:ring-1 focus:ring-forest"
          />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-button transition-colors ${
              statusFilter === 'all'
                ? 'bg-forest text-white'
                : 'bg-surface-subtle text-muted-text hover:text-charcoal border border-border'
            }`}
          >
            All Days ({monthDays.length})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('taken')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-button transition-colors ${
              statusFilter === 'taken'
                ? 'bg-emerald-700 text-white'
                : 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200'
            }`}
          >
            ✓ Taken ({monthlyMetrics.daysWithTiffin})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('skipped')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-button transition-colors ${
              statusFilter === 'skipped'
                ? 'bg-rose-700 text-white'
                : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200'
            }`}
          >
            ✕ Skipped ({monthlyMetrics.cancelledCount})
          </button>
          <button
            type="button"
            onClick={() => setStatusFilter('off')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-button transition-colors ${
              statusFilter === 'off'
                ? 'bg-charcoal text-white'
                : 'bg-surface-subtle text-muted-text hover:text-charcoal border border-border'
            }`}
          >
            — Days Off
          </button>
        </div>
      </div>

      {/* 4. Day-by-Day Tabular Record Table */}
      <div className="rounded-card border border-border bg-white overflow-hidden shadow-subtle">
        <div className="max-h-[380px] overflow-y-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="sticky top-0 z-10 bg-surface-subtle border-b border-border text-[11px] font-bold text-charcoal uppercase tracking-wider">
              <tr>
                <th className="py-2.5 px-3">Date & Day</th>
                <th className="py-2.5 px-3">Lunch Service (दोपहर)</th>
                <th className="py-2.5 px-3">Dinner Service (रात)</th>
                <th className="py-2.5 px-3 text-center">Tiffins Taken</th>
                <th className="py-2.5 px-3 text-right">Day Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredDays.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-xs text-muted-text italic">
                    No matching dates found for this filter.
                  </td>
                </tr>
              ) : (
                filteredDays.map((d) => (
                  <tr 
                    key={d.date} 
                    className={`hover:bg-surface-subtle/80 transition-colors ${
                      d.isToday ? 'bg-mint/15 font-medium' : ''
                    }`}
                  >
                    {/* Date Column */}
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-charcoal">{d.displayLabel}</span>
                        {d.isToday && (
                          <span className="text-[10px] font-bold px-1.5 py-0.2 bg-forest text-white rounded uppercase tracking-wider">
                            Today
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Lunch Service Column */}
                    <td className="py-2.5 px-3">
                      {d.lunchStatus === 'dispatched' ? (
                        <div className="flex items-center justify-between gap-2 max-w-xs">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-status-success border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3 text-status-success" />
                              Taken ({formatINR(d.lunchPrice)})
                            </span>
                            {d.lunchOrder?.dispatchedAt && (
                              <span className="text-[10px] text-muted-text flex items-center gap-0.5">
                                <Clock className="w-3 h-3" />
                                {d.lunchOrder.dispatchedAt}
                              </span>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleMarkNotTaken(d.lunchOrder.id, d.date, 'lunch')}
                            className="text-[10px] text-rose-700 hover:text-rose-900 underline ml-1 hover:font-bold"
                            title="Customer disputed? Mark as Not Taken"
                          >
                            Mark Not Taken
                          </button>
                        </div>
                      ) : d.lunchStatus === 'cancelled' ? (
                        <div className="flex items-center justify-between gap-2 max-w-xs">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-100 text-status-error border border-rose-200">
                            <XCircle className="w-3 h-3 text-status-error" />
                            Skipped / Cancelled
                          </span>
                          <button
                            type="button"
                            onClick={() => handleMarkTaken(d.lunchOrder.id)}
                            className="text-[10px] text-forest hover:text-forest-deep underline ml-1 hover:font-bold"
                            title="Actually taken? Mark as Dispatched"
                          >
                            Mark Taken
                          </button>
                        </div>
                      ) : d.lunchStatus === 'pending' ? (
                        <div className="flex items-center justify-between gap-2 max-w-xs">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                            <Clock className="w-3 h-3 text-amber-700" />
                            Scheduled (Pending)
                          </span>
                          <button
                            type="button"
                            onClick={() => handleMarkTaken(d.lunchOrder.id)}
                            className="text-[10px] text-forest underline hover:font-bold"
                          >
                            Dispatch
                          </button>
                        </div>
                      ) : d.isLunchScheduled ? (
                        <div className="flex items-center justify-between gap-1 text-[11px] text-muted-text">
                          <span>Scheduled on Plan</span>
                          <button
                            type="button"
                            onClick={() => handleAddMissingMeal(d.date, 'lunch')}
                            className="text-[10px] text-forest hover:underline font-semibold"
                          >
                            + Log Tiffin
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-muted-light italic">
                          — No Service (Off)
                        </span>
                      )}
                    </td>

                    {/* Dinner Service Column */}
                    <td className="py-2.5 px-3">
                      {d.dinnerStatus === 'dispatched' ? (
                        <div className="flex items-center justify-between gap-2 max-w-xs">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-status-success border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3 text-status-success" />
                              Taken ({formatINR(d.dinnerPrice)})
                            </span>
                            {d.dinnerOrder?.dispatchedAt && (
                              <span className="text-[10px] text-muted-text flex items-center gap-0.5">
                                <Clock className="w-3 h-3" />
                                {d.dinnerOrder.dispatchedAt}
                              </span>
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleMarkNotTaken(d.dinnerOrder.id, d.date, 'dinner')}
                            className="text-[10px] text-rose-700 hover:text-rose-900 underline ml-1 hover:font-bold"
                            title="Customer disputed? Mark as Not Taken"
                          >
                            Mark Not Taken
                          </button>
                        </div>
                      ) : d.dinnerStatus === 'cancelled' ? (
                        <div className="flex items-center justify-between gap-2 max-w-xs">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-rose-100 text-status-error border border-rose-200">
                            <XCircle className="w-3 h-3 text-status-error" />
                            Skipped / Cancelled
                          </span>
                          <button
                            type="button"
                            onClick={() => handleMarkTaken(d.dinnerOrder.id)}
                            className="text-[10px] text-forest hover:text-forest-deep underline ml-1 hover:font-bold"
                            title="Actually taken? Mark as Dispatched"
                          >
                            Mark Taken
                          </button>
                        </div>
                      ) : d.dinnerStatus === 'pending' ? (
                        <div className="flex items-center justify-between gap-2 max-w-xs">
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                            <Clock className="w-3 h-3 text-amber-700" />
                            Scheduled (Pending)
                          </span>
                          <button
                            type="button"
                            onClick={() => handleMarkTaken(d.dinnerOrder.id)}
                            className="text-[10px] text-forest underline hover:font-bold"
                          >
                            Dispatch
                          </button>
                        </div>
                      ) : d.isDinnerScheduled ? (
                        <div className="flex items-center justify-between gap-1 text-[11px] text-muted-text">
                          <span>Scheduled on Plan</span>
                          <button
                            type="button"
                            onClick={() => handleAddMissingMeal(d.date, 'dinner')}
                            className="text-[10px] text-forest hover:underline font-semibold"
                          >
                            + Log Tiffin
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-muted-light italic">
                          — No Service (Off)
                        </span>
                      )}
                    </td>

                    {/* Total Tiffins Taken Today Column */}
                    <td className="py-2.5 px-3 text-center">
                      <span className={`inline-block font-mono font-bold px-2 py-0.5 rounded ${
                        d.totalMealsTaken > 0
                          ? 'bg-forest/10 text-forest'
                          : 'text-muted-light'
                      }`}>
                        {d.totalMealsTaken}
                      </span>
                    </td>

                    {/* Day Amount Column */}
                    <td className="py-2.5 px-3 text-right font-mono font-bold">
                      <span className={d.dayTotalAmount > 0 ? 'text-charcoal' : 'text-muted-light'}>
                        {formatINR(d.dayTotalAmount)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-muted-text px-1">
        <span>
          💡 <strong>Dispute Tip</strong>: If a customer says they never took tiffin on a day, tap <u>Mark Not Taken</u> to remove it from their bill immediately.
        </span>
        <span className="font-semibold text-forest">
          {monthlyMetrics.totalTiffinsTaken} Tiffins billed in {monthOptions.find((m) => m.val === selectedMonth)?.label || selectedMonth}
        </span>
      </div>
    </div>
  );
};

export default CustomerMonthlyAttendanceRegister;