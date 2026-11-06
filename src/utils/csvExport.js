/**
 * CSV Export utility for TiffinOS.
 * Converts structured data into standard CSV and triggers browser download.
 */

const downloadCSV = (csvContent, fileName) => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

const escapeCSV = (field) => {
  if (field === null || field === undefined) return '""';
  const stringField = String(field);
  return `"${stringField.replace(/"/g, '""')}"`;
};

// 1. Export Dispatched Meals CSV
export const exportMealsCSV = (meals = [], dateStr = '') => {
  const headers = ['Order ID', 'Date', 'Meal Type', 'Customer Name', 'Price (INR)', 'Status', 'Dispatched At', 'Service Type', 'Phone', 'Address'];
  
  const rows = meals.map((m) => [
    escapeCSV(m.id),
    escapeCSV(m.date),
    escapeCSV(m.mealType?.toUpperCase()),
    escapeCSV(m.customerName),
    escapeCSV(m.price),
    escapeCSV(m.status),
    escapeCSV(m.dispatchedAt || '—'),
    escapeCSV(m.source === 'one_time' ? 'One-Time Ad-hoc' : 'Recurring Subscription'),
    escapeCSV(m.phone || '—'),
    escapeCSV(m.address || '—'),
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const filename = `tiffinos-meals-${dateStr || new Date().toISOString().split('T')[0]}.csv`;
  downloadCSV(csvContent, filename);
};

// 2. Export Invoices CSV
export const exportInvoicesCSV = (invoices = [], period = '') => {
  const headers = ['Invoice Number', 'Customer Name', 'Phone', 'Billing Period', 'Meals Count', 'Total Amount (INR)', 'Paid Amount (INR)', 'Balance Due (INR)', 'Payment Status', 'Issued Date'];

  const rows = invoices.map((inv) => [
    escapeCSV(inv.invoiceNumber),
    escapeCSV(inv.customerName),
    escapeCSV(inv.customerPhone || '—'),
    escapeCSV(inv.period),
    escapeCSV(inv.mealCount || 0),
    escapeCSV(inv.totalAmount),
    escapeCSV(inv.paidAmount),
    escapeCSV(inv.balanceDue),
    escapeCSV(inv.status?.toUpperCase()),
    escapeCSV(inv.createdAt),
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const filename = `tiffinos-invoices-${period ? period.replace(/\s+/g, '_') : 'all'}.csv`;
  downloadCSV(csvContent, filename);
};

// 3. Export Expenses CSV
export const exportExpensesCSV = (expenses = []) => {
  const headers = ['Expense ID', 'Date', 'Title', 'Category', 'Amount (INR)', 'Payment Mode', 'Vendor / Payee', 'Notes'];

  const rows = expenses.map((e) => [
    escapeCSV(e.id),
    escapeCSV(e.date),
    escapeCSV(e.title),
    escapeCSV(e.category),
    escapeCSV(e.amount),
    escapeCSV(e.paymentMethod || 'Cash'),
    escapeCSV(e.vendor || '—'),
    escapeCSV(e.notes || '—'),
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const filename = `tiffinos-expenses-${new Date().toISOString().split('T')[0]}.csv`;
  downloadCSV(csvContent, filename);
};

// 4. Export Monthly Profit & Loss Statement CSV
export const exportPandLSummaryCSV = ({
  period = 'November 2026',
  recognizedRevenue = 0,
  lunchRevenue = 0,
  dinnerRevenue = 0,
  oneTimeRevenue = 0,
  dispatchedMealsCount = 0,
  totalExpenses = 0,
  categoryBreakdown = [],
  operatingProfit = 0,
  profitMargin = '0%',
  totalBilled = 0,
  totalCollected = 0,
  outstanding = 0,
}) => {
  const lines = [
    `"TIFFINOS FINANCIAL STATEMENT & PROFIT LOSS SUMMARY"`,
    `"Statement Period",${escapeCSV(period)}`,
    `"Generated On",${escapeCSV(new Date().toLocaleDateString('en-IN'))}`,
    ``,
    `"1. REVENUE RECOGNITION (DISPATCHED MEALS)"`,
    `"Total Dispatched Meals",${escapeCSV(dispatchedMealsCount)}`,
    `"Regular Lunch Service Revenue",${escapeCSV(lunchRevenue)}`,
    `"Regular Dinner Service Revenue",${escapeCSV(dinnerRevenue)}`,
    `"One-Time / Ad-Hoc Meal Revenue",${escapeCSV(oneTimeRevenue)}`,
    `"GROSS RECOGNIZED REVENUE (INR)",${escapeCSV(recognizedRevenue)}`,
    ``,
    `"2. OPERATING EXPENSES (KITCHEN & LOGISTICS)"`,
    ...categoryBreakdown.map((c) => `"${c.label}",${escapeCSV(c.amount)}`),
    `"TOTAL OPERATING EXPENSES (INR)",${escapeCSV(totalExpenses)}`,
    ``,
    `"3. OPERATING PROFITABILITY"`,
    `"NET OPERATING PROFIT (INR)",${escapeCSV(operatingProfit)}`,
    `"OPERATING PROFIT MARGIN",${escapeCSV(profitMargin)}`,
    ``,
    `"4. CASH FLOW & COLLECTION STATUS"`,
    `"Total Invoiced Amount (Billed)",${escapeCSV(totalBilled)}`,
    `"Total Cash / UPI Collected",${escapeCSV(totalCollected)}`,
    `"Outstanding Balances Due",${escapeCSV(outstanding)}`,
  ];

  const csvContent = lines.join('\n');
  const filename = `tiffinos-profit-loss-${period.toLowerCase().replace(/\s+/g, '-')}.csv`;
  downloadCSV(csvContent, filename);
};
