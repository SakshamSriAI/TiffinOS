import React from 'react';
import { UserPlus, PlusCircle, Receipt, TrendingDown } from 'lucide-react';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';

export const QuickActionToolbar = () => {
  const { setActiveModal } = useApp();

  return (
    <div className="bg-white p-3.5 sm:p-4 rounded-card border border-border shadow-subtle flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-muted-text">
          Quick Actions:
        </span>
      </div>

      <div className="grid grid-cols-2 sm:flex sm:items-center gap-2.5">
        <Button
          variant="primary"
          size="sm"
          iconLeft={UserPlus}
          onClick={() => setActiveModal('addCustomer')}
          className="w-full sm:w-auto"
        >
          Add Customer
        </Button>

        <Button
          variant="secondary"
          size="sm"
          iconLeft={PlusCircle}
          onClick={() => setActiveModal('addOrder')}
          className="w-full sm:w-auto"
        >
          One-Time Order
        </Button>

        <Button
          variant="secondary"
          size="sm"
          iconLeft={Receipt}
          onClick={() => setActiveModal('generateBills')}
          className="w-full sm:w-auto"
        >
          Generate Bills
        </Button>

        <Button
          variant="secondary"
          size="sm"
          iconLeft={TrendingDown}
          onClick={() => setActiveModal('addExpense')}
          className="w-full sm:w-auto"
        >
          Add Expense
        </Button>
      </div>
    </div>
  );
};

export default QuickActionToolbar;
