import React from 'react';
import { Trash2, AlertTriangle } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/currency';
import { formatDateIST } from '../../utils/date';

export const ExpenseDeleteModal = ({
  isOpen,
  onClose,
  expense,
}) => {
  const { deleteExpense } = useApp();

  if (!isOpen || !expense) return null;

  const handleDelete = () => {
    deleteExpense(expense.id);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Expense Entry"
      description="Are you sure you want to delete this recorded transaction?"
      size="sm"
    >
      <div className="space-y-4">
        
        {/* Warning Callout */}
        <div className="p-3 bg-red-50 border border-status-error/30 rounded-button flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-status-error flex-shrink-0 mt-0.5" />
          <div className="text-xs text-charcoal">
            <p className="font-semibold text-status-error">Permanent Action</p>
            <p className="mt-0.5 text-muted-text">
              Deleting this record will immediately recalculate total monthly expenses and operating profit.
            </p>
          </div>
        </div>

        {/* Transaction Summary Preview */}
        <div className="bg-surface-subtle p-3 rounded-card border border-border space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-text">Item / Title:</span>
            <span className="font-semibold text-charcoal">{expense.title}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-text">Amount:</span>
            <span className="font-mono font-bold text-status-error">{formatINR(expense.amount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-text">Date:</span>
            <span className="font-mono text-charcoal">{formatDateIST(expense.date, 'display')}</span>
          </div>
          {expense.vendor && (
            <div className="flex justify-between">
              <span className="text-muted-text">Vendor:</span>
              <span className="text-charcoal">{expense.vendor}</span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-border">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            iconLeft={Trash2}
            className="bg-status-error hover:bg-red-700 text-white"
            onClick={handleDelete}
          >
            Delete Expense
          </Button>
        </div>

      </div>
    </Modal>
  );
};

export default ExpenseDeleteModal;
