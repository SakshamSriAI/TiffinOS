// Category Definitions for TiffinOS Business Expenses

export const EXPENSE_CATEGORIES = [
  {
    id: 'groceries',
    label: 'Groceries & Provisions',
    shortLabel: 'Groceries',
    badgeVariant: 'forest',
    description: 'Flour, rice, pulses, cooking oils, spices & dry provisions',
    colorHex: '#173D35',
  },
  {
    id: 'vegetables',
    label: 'Vegetables & Dairy',
    shortLabel: 'Vegetables',
    badgeVariant: 'mint',
    description: 'Fresh mandi vegetables, paneer, curd, milk, herbs & salads',
    colorHex: '#27845D',
  },
  {
    id: 'gas',
    label: 'Cooking Gas & LPG',
    shortLabel: 'LPG Gas',
    badgeVariant: 'amber',
    description: 'Commercial 19kg gas cylinders, refills, regulators',
    colorHex: '#D49A34',
  },
  {
    id: 'salaries',
    label: 'Staff & Worker Salaries',
    shortLabel: 'Salaries',
    badgeVariant: 'default',
    description: 'Daily wages, monthly helper salaries, cook advances',
    colorHex: '#252B29',
  },
  {
    id: 'packaging',
    label: 'Packaging & Containers',
    shortLabel: 'Packaging',
    badgeVariant: 'secondary',
    description: 'Disposable boxes, foil containers, cling wrap, carry bags',
    colorHex: '#737A75',
  },
  {
    id: 'fuel',
    label: 'Delivery Fuel & Transport',
    shortLabel: 'Delivery & Fuel',
    badgeVariant: 'amber',
    description: 'Delivery two-wheeler petrol, tempo fare, auto charges',
    colorHex: '#B27D20',
  },
  {
    id: 'maintenance',
    label: 'Kitchen & Maintenance',
    shortLabel: 'Maintenance',
    badgeVariant: 'secondary',
    description: 'Utensil replacement, stove burner cleaning, sanitation supplies',
    colorHex: '#555C57',
  },
  {
    id: 'miscellaneous',
    label: 'Miscellaneous & Other',
    shortLabel: 'Other',
    badgeVariant: 'default',
    description: 'General miscellaneous operational expenses',
    colorHex: '#737A75',
  },
];

export const getCategoryById = (id) => {
  return EXPENSE_CATEGORIES.find((c) => c.id === id) || {
    id: id || 'miscellaneous',
    label: 'Other',
    shortLabel: 'Other',
    badgeVariant: 'default',
    description: 'Operational expense',
    colorHex: '#737A75',
  };
};

export const PAYMENT_METHODS = [
  { id: 'UPI', label: 'UPI (PhonePe / GPay / Paytm)' },
  { id: 'Cash', label: 'Cash (Petty Cash)' },
  { id: 'Bank Transfer', label: 'Bank Transfer (IMPS / NEFT)' },
];
