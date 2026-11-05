import React from 'react';
import { Check, Sun, Moon } from 'lucide-react';

const DAYS = [
  { key: 'mon', label: 'Mon', full: 'Monday' },
  { key: 'tue', label: 'Tue', full: 'Tuesday' },
  { key: 'wed', label: 'Wed', full: 'Wednesday' },
  { key: 'thu', label: 'Thu', full: 'Thursday' },
  { key: 'fri', label: 'Fri', full: 'Friday' },
  { key: 'sat', label: 'Sat', full: 'Saturday' },
  { key: 'sun', label: 'Sun', full: 'Sunday' },
];

export const CustomerScheduleEditor = ({ schedule = {}, onChange }) => {
  const toggleMeal = (dayKey, mealType) => {
    const daySchedule = schedule[dayKey] || { lunch: false, dinner: false };
    const updatedDay = {
      ...daySchedule,
      [mealType]: !daySchedule[mealType],
    };

    onChange({
      ...schedule,
      [dayKey]: updatedDay,
    });
  };

  const applyPreset = (presetType) => {
    let newSchedule = {};

    if (presetType === 'mon-sat-both') {
      DAYS.forEach((d) => {
        newSchedule[d.key] = {
          lunch: d.key !== 'sun',
          dinner: d.key !== 'sun',
        };
      });
    } else if (presetType === 'mon-fri-lunch') {
      DAYS.forEach((d) => {
        newSchedule[d.key] = {
          lunch: ['mon', 'tue', 'wed', 'thu', 'fri'].includes(d.key),
          dinner: false,
        };
      });
    } else if (presetType === 'all-seven-both') {
      DAYS.forEach((d) => {
        newSchedule[d.key] = { lunch: true, dinner: true };
      });
    } else if (presetType === 'clear') {
      DAYS.forEach((d) => {
        newSchedule[d.key] = { lunch: false, dinner: false };
      });
    }

    onChange(newSchedule);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider">
          Weekly Meal Schedule Matrix
        </label>

        {/* Quick Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={() => applyPreset('mon-sat-both')}
            className="text-[10px] font-medium text-forest hover:bg-forest/10 px-2 py-0.5 rounded border border-forest/20"
          >
            Mon–Sat Both
          </button>
          <button
            type="button"
            onClick={() => applyPreset('mon-fri-lunch')}
            className="text-[10px] font-medium text-forest hover:bg-forest/10 px-2 py-0.5 rounded border border-forest/20"
          >
            Mon–Fri Lunch
          </button>
          <button
            type="button"
            onClick={() => applyPreset('all-seven-both')}
            className="text-[10px] font-medium text-forest hover:bg-forest/10 px-2 py-0.5 rounded border border-forest/20"
          >
            7 Days Both
          </button>
        </div>
      </div>

      {/* Day by Day Grid */}
      <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
        {DAYS.map((day) => {
          const dayData = schedule[day.key] || { lunch: false, dinner: false };
          const hasAny = dayData.lunch || dayData.dinner;

          return (
            <div
              key={day.key}
              className={`p-2 rounded-card border text-center transition-all ${
                hasAny
                  ? 'bg-surface-subtle border-forest/30 shadow-xs'
                  : 'bg-white border-border opacity-70'
              }`}
            >
              <span className="text-[11px] font-bold text-charcoal block mb-1.5">
                {day.label}
              </span>

              <div className="space-y-1">
                {/* Lunch Check */}
                <button
                  type="button"
                  onClick={() => toggleMeal(day.key, 'lunch')}
                  className={`w-full py-1 rounded text-[10px] font-semibold flex items-center justify-center gap-0.5 transition-colors ${
                    dayData.lunch
                      ? 'bg-forest text-white'
                      : 'bg-white text-muted-text border border-border hover:border-forest/40'
                  }`}
                  title={`${day.full} Lunch`}
                >
                  <Sun className="w-2.5 h-2.5" />
                  <span>L</span>
                </button>

                {/* Dinner Check */}
                <button
                  type="button"
                  onClick={() => toggleMeal(day.key, 'dinner')}
                  className={`w-full py-1 rounded text-[10px] font-semibold flex items-center justify-center gap-0.5 transition-colors ${
                    dayData.dinner
                      ? 'bg-amber-accent text-white'
                      : 'bg-white text-muted-text border border-border hover:border-amber-accent/40'
                  }`}
                  title={`${day.full} Dinner`}
                >
                  <Moon className="w-2.5 h-2.5" />
                  <span>D</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-muted-text">
        <span className="font-semibold text-forest">L = Lunch</span>,{' '}
        <span className="font-semibold text-amber-dark">D = Dinner</span>. Scheduled meals automatically generate in the daily packing line for selected days.
      </p>
    </div>
  );
};

export default CustomerScheduleEditor;
