import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar, 
  PlusCircle, 
  RefreshCw, 
  CheckCircle2, 
  ShieldCheck 
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { useApp } from '../../context/AppContext';
import { formatDateIST, getTodayIST } from '../../utils/date';

export const DispatchHeader = ({ onOpenOneTimeOrder }) => {
  const { selectedDate, setSelectedDate, generateDailyScheduledOrders } = useApp();
  const [syncFeedback, setSyncFeedback] = useState(null);

  // Date shifting helpers
  const shiftDate = (days) => {
    const current = new Date(selectedDate);
    current.setDate(current.getDate() + days);
    const isoStr = current.toISOString().split('T')[0];
    setSelectedDate(isoStr);
  };

  const jumpToToday = () => {
    setSelectedDate(getTodayIST());
  };

  const isToday = selectedDate === getTodayIST();
  const formattedDisplay = formatDateIST(new Date(selectedDate), 'full');

  const handleSyncOrders = () => {
    const generatedCount = generateDailyScheduledOrders(selectedDate);
    if (generatedCount > 0) {
      setSyncFeedback(`Generated ${generatedCount} scheduled recurring meals.`);
    } else {
      setSyncFeedback('All recurring customer meals are already in terminal.');
    }
    setTimeout(() => setSyncFeedback(null), 3500);
  };

  return (
    <div className="space-y-4 pb-2 border-b border-border/60">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        
        {/* Title and Badge */}
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-forest-deep">
              Daily Meal Dispatch Terminal
            </h1>
            <Badge variant="mint" size="sm">
              <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse" />
              Kitchen Line
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-charcoal/80 mt-1">
            Pack and dispatch tiffins with 1-tap confirmation. Single source of truth for monthly billing.
          </p>
        </div>

        {/* Date Selector and Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          
          {/* Date Shifter Component */}
          <div className="flex items-center bg-white border border-border rounded-card shadow-subtle p-1">
            <button
              type="button"
              onClick={() => shiftDate(-1)}
              className="p-1.5 text-muted-text hover:text-charcoal hover:bg-surface-subtle rounded transition-colors"
              title="Previous day"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="px-3 py-1 flex items-center gap-2 border-x border-border/60">
              <Calendar className="w-3.5 h-3.5 text-forest flex-shrink-0" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="text-xs font-bold text-charcoal bg-transparent border-none p-0 focus:outline-none cursor-pointer"
              />
            </div>

            <button
              type="button"
              onClick={() => shiftDate(1)}
              className="p-1.5 text-muted-text hover:text-charcoal hover:bg-surface-subtle rounded transition-colors"
              title="Next day"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {!isToday && (
            <Button
              variant="secondary"
              size="sm"
              onClick={jumpToToday}
            >
              Today
            </Button>
          )}

          {/* Sync Scheduled Meals button */}
          <Button
            variant="secondary"
            size="sm"
            iconLeft={RefreshCw}
            onClick={handleSyncOrders}
            title="Auto-generate orders for all regular customers scheduled today"
          >
            Check Schedule
          </Button>

          {/* Book One-Time Order */}
          <Button
            variant="primary"
            size="sm"
            iconLeft={PlusCircle}
            onClick={onOpenOneTimeOrder}
          >
            One-Time Order
          </Button>

        </div>

      </div>

      {/* Date Banner and Feedback Toast */}
      <div className="flex items-center justify-between text-xs text-muted-text flex-wrap gap-2">
        <span className="font-semibold text-charcoal">
          Active Schedule Date: <span className="text-forest">{formattedDisplay}</span>
        </span>

        {syncFeedback && (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-status-success bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 animate-in fade-in">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {syncFeedback}
          </span>
        )}
      </div>
    </div>
  );
};

export default DispatchHeader;
