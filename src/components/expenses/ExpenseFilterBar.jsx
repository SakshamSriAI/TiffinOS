import React from 'react';
import { Search, Plus, Filter, RotateCcw } from 'lucide-react';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Button } from '../common/Button';
import { EXPENSE_CATEGORIES, PAYMENT_METHODS } from '../../utils/expenseCategories';

export const ExpenseFilterBar = ({
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  paymentMethodFilter,
  setPaymentMethodFilter,
  onOpenAddModal,
  onResetFilters,
  isFiltered,
}) => {
  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    ...EXPENSE_CATEGORIES.map((c) => ({
      value: c.id,
      label: c.label,
    })),
  ];

  const paymentOptions = [
    { value: 'all', label: 'All Payment Modes' },
    ...PAYMENT_METHODS.map((p) => ({
      value: p.id,
      label: p.label,
    })),
  ];

  return (
    <div className="bg-white p-4 rounded-card border border-border shadow-subtle space-y-3">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        
        {/* Search Input */}
        <div className="w-full lg:max-w-xs">
          <Input
            placeholder="Search items, vendors, notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            iconLeft={Search}
          />
        </div>

        {/* Filters and Add Action */}
        <div className="flex flex-wrap items-center gap-2.5 justify-between lg:justify-end flex-1">
          
          {/* Category Dropdown */}
          <div className="w-full sm:w-48">
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              options={categoryOptions}
            />
          </div>

          {/* Payment Method Dropdown */}
          <div className="w-full sm:w-44">
            <Select
              value={paymentMethodFilter}
              onChange={(e) => setPaymentMethodFilter(e.target.value)}
              options={paymentOptions}
            />
          </div>

          {/* Reset Filters button if any filter applied */}
          {isFiltered && (
            <Button
              variant="ghost"
              size="sm"
              iconLeft={RotateCcw}
              onClick={onResetFilters}
              title="Reset all active filters"
            >
              Reset
            </Button>
          )}

          {/* Primary Add Expense Button */}
          <Button
            variant="primary"
            size="sm"
            iconLeft={Plus}
            onClick={onOpenAddModal}
          >
            Add Expense
          </Button>

        </div>

      </div>
    </div>
  );
};

export default ExpenseFilterBar;
