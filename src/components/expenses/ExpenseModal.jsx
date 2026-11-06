import React, { useState, useEffect } from 'react';
import { Plus, Edit2, AlertCircle, Calendar, IndianRupee, Store, Tag } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { useApp } from '../../context/AppContext';
import { getTodayIST } from '../../utils/date';
import { EXPENSE_CATEGORIES, PAYMENT_METHODS } from '../../utils/expenseCategories';

export const ExpenseModal = ({
  isOpen,
  onClose,
  expense = null, // null for Add mode, existing object for Edit mode
}) => {
  const { addExpense, updateExpense } = useApp();

  const isEditMode = Boolean(expense);

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('groceries');
  const [date, setDate] = useState(getTodayIST());
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [vendor, setVendor] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (expense) {
      setTitle(expense.title || '');
      setAmount(String(expense.amount || ''));
      setCategory(expense.category || 'groceries');
      setDate(expense.date || getTodayIST());
      setPaymentMethod(expense.paymentMethod || 'UPI');
      setVendor(expense.vendor || '');
      setNotes(expense.notes || '');
      setError(null);
    } else {
      setTitle('');
      setAmount('');
      setCategory('groceries');
      setDate(getTodayIST());
      setPaymentMethod('UPI');
      setVendor('');
      setNotes('');
      setError(null);
    }
  }, [expense, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('Please provide an expense title or item description.');
      return;
    }

    const numAmount = Number(amount);
    if (!numAmount || numAmount <= 0) {
      setError('Please enter a valid expense amount greater than zero.');
      return;
    }

    if (!date) {
      setError('Please select an expense date.');
      return;
    }

    const expensePayload = {
      title: title.trim(),
      amount: numAmount,
      category,
      date,
      paymentMethod,
      vendor: vendor.trim(),
      notes: notes.trim(),
    };

    if (isEditMode) {
      updateExpense(expense.id, expensePayload);
    } else {
      addExpense(expensePayload);
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditMode ? 'Edit Business Expense' : 'Log New Expense'}
      description={
        isEditMode
          ? 'Update expense details, payment method, or vendor information.'
          : 'Record kitchen supplies, vegetables, groceries, packaging, or operational costs.'
      }
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Error Notification */}
        {error && (
          <div className="p-3 bg-red-50 border border-status-error/30 text-status-error text-xs rounded-button flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Expense Title */}
        <div>
          <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
            Expense Title / Item *
          </label>
          <Input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError(null);
            }}
            placeholder="e.g. Fresh Mandi Vegetables, 30kg Sharbati Atta, Gas Cylinder"
            required
            autoFocus
          />
        </div>

        {/* Amount & Date Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
              Amount (₹ INR) *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-text font-bold text-sm">
                ₹
              </span>
              <input
                type="number"
                min="1"
                step="any"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError(null);
                }}
                className="w-full pl-8 pr-3 py-2 bg-white border border-border rounded-button text-sm text-charcoal font-mono placeholder:text-muted-text focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition-all"
                placeholder="0"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
              Expense Date *
            </label>
            <Input
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setError(null);
              }}
              required
            />
          </div>
        </div>

        {/* Category & Payment Method Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
              Expense Category *
            </label>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={EXPENSE_CATEGORIES.map((c) => ({
                value: c.id,
                label: c.label,
              }))}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
              Payment Mode *
            </label>
            <Select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              options={PAYMENT_METHODS.map((p) => ({
                value: p.id,
                label: p.label,
              }))}
            />
          </div>
        </div>

        {/* Vendor / Shop Name */}
        <div>
          <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
            Vendor / Payee / Shop Name
          </label>
          <Input
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
            iconLeft={Store}
            placeholder="e.g. Choithram Mandi Subziwala, Agrawal Kirana, Bharat Gas"
          />
        </div>

        {/* Notes / Details */}
        <div>
          <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
            Item Breakdown / Notes (Optional)
          </label>
          <textarea
            rows={2}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="e.g. 15kg onions @ ₹35/kg, 10kg tomatoes @ ₹40/kg, bill #302"
            className="w-full px-3 py-2 bg-white border border-border rounded-button text-sm text-charcoal placeholder:text-muted-text focus:outline-none focus:ring-2 focus:ring-forest focus:border-transparent transition-all"
          />
        </div>

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            iconLeft={isEditMode ? Edit2 : Plus}
          >
            {isEditMode ? 'Update Expense' : 'Save Expense'}
          </Button>
        </div>

      </form>
    </Modal>
  );
};

export default ExpenseModal;
