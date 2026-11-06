/**
 * Utility functions for Indian Standard Time (IST - Asia/Kolkata) date/time formatting.
 */

export const formatDateIST = (dateInput, formatType = 'display') => {
  if (!dateInput) return '';

  const date = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (isNaN(date.getTime())) return '';

  // IST options
  const timeZone = 'Asia/Kolkata';

  if (formatType === 'iso') {
    // Returns YYYY-MM-DD
    const formatter = new Intl.DateTimeFormat('en-CA', { timeZone });
    return formatter.format(date);
  }

  if (formatType === 'display') {
    // e.g., "05 Nov 2026"
    return new Intl.DateTimeFormat('en-IN', {
      timeZone,
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  }

  if (formatType === 'full') {
    // e.g., "Thursday, 05 Nov 2026"
    return new Intl.DateTimeFormat('en-IN', {
      timeZone,
      weekday: 'long',
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  }

  if (formatType === 'time') {
    // e.g., "1:30 PM"
    return new Intl.DateTimeFormat('en-IN', {
      timeZone,
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(date);
  }

  return date.toLocaleDateString('en-IN', { timeZone });
};

export const getTodayIST = () => {
  return formatDateIST(new Date(), 'iso');
};

/**
 * Get 3-letter lowercase day of week in IST ('mon', 'tue', etc.)
 */
export const getDayOfWeekKey = (dateInput) => {
  if (!dateInput) return 'fri';
  const dateStr = typeof dateInput === 'string' ? dateInput : formatDateIST(dateInput, 'iso');
  const d = new Date(dateStr.includes('T') ? dateStr : `${dateStr}T12:00:00+05:30`);
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  return days[d.getDay()] || 'fri';
};

/**
 * Determine if a customer's schedule has a specific meal (lunch/dinner) on a given day key
 */
export const isMealScheduledForDay = (schedule, dayKey, mealType) => {
  if (!schedule || typeof schedule !== 'object') return false;

  // Format 1: schedule[dayKey] is object { lunch: bool, dinner: bool }
  if (schedule[dayKey] && typeof schedule[dayKey] === 'object') {
    return Boolean(schedule[dayKey][mealType]);
  }

  // Format 2: schedule.days is array of string day keys
  if (Array.isArray(schedule.days)) {
    if (!schedule.days.includes(dayKey)) return false;
    return Boolean(schedule[mealType]);
  }

  // Format 3: boolean values directly on schedule
  if (schedule[mealType] === true) {
    if (schedule.operatingDays && typeof schedule.operatingDays === 'object') {
      return Boolean(schedule.operatingDays[dayKey]);
    }
    return dayKey !== 'sun';
  }

  return false;
};
