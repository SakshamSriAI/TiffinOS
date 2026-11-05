/**
 * Utility functions for Indian Rupee (INR) currency formatting and calculations.
 * Always handles numbers safely with standard two decimal places or whole numbers.
 */

export const formatINR = (amount, includeDecimals = false) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '₹0';
  }

  const numericAmount = Number(amount);

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: includeDecimals ? 2 : 0,
    maximumFractionDigits: 2,
  }).format(numericAmount);
};

export const parseINR = (formattedStr) => {
  if (!formattedStr) return 0;
  const clean = String(formattedStr).replace(/[^0-9.-]+/g, '');
  const parsed = parseFloat(clean);
  return isNaN(parsed) ? 0 : parsed;
};
