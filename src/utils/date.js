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
