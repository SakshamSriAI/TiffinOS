import React, { useState } from 'react';
import { XCircle, AlertTriangle } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';

export const DispatchCancelModal = ({
  isOpen,
  onClose,
  order,
  onConfirm,
}) => {
  const [reason, setReason] = useState('Customer notified on WhatsApp');

  if (!isOpen || !order) return null;

  const handleCancelSubmit = (e) => {
    e.preventDefault();
    onConfirm(order.id, reason.trim() || 'Cancelled by customer');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Cancel Meal Order"
      description="Record reason for cancellation. Meal will be strictly excluded from monthly customer billing."
      footer={
        <>
          <Button variant="secondary" size="md" onClick={onClose}>
            Keep Order Active
          </Button>
          <Button
            variant="danger"
            size="md"
            iconLeft={XCircle}
            onClick={handleCancelSubmit}
          >
            Confirm Cancellation
          </Button>
        </>
      }
    >
      <form onSubmit={handleCancelSubmit} className="space-y-4">
        <div className="p-3 bg-surface-subtle rounded-card border border-border text-sm space-y-1">
          <p>
            Customer: <strong className="text-charcoal">{order.customerName}</strong>
          </p>
          <p className="text-xs text-muted-text">
            Meal: {order.date} · <span className="capitalize">{order.mealType} Service</span> (₹{order.price})
          </p>
        </div>

        <div>
          <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
            Cancellation Reason:
          </label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full text-sm rounded-input border border-border px-3.5 py-2.5 bg-white text-charcoal focus:ring-2 focus:ring-forest/20 focus:border-forest"
            placeholder="e.g. Out of town, Fasting, Doctor appointment"
            required
          />
        </div>

        {/* Quick Reason Suggestions */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] text-muted-text">Quick:</span>
          {[
            'WhatsApp message: out of town',
            'Fasting today',
            'Office party / lunch outside',
            'Sick / resting',
          ].map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => setReason(suggestion)}
              className="text-[10px] bg-surface-subtle hover:bg-white text-charcoal px-2 py-0.5 rounded border border-border"
            >
              {suggestion}
            </button>
          ))}
        </div>

        <p className="text-xs text-rose-700 bg-rose-50 p-2.5 rounded border border-rose-200">
          ✓ Cancelled meals stay in the customer's delivery history log for transparency, but are <strong>100% excluded</strong> from their monthly bill.
        </p>
      </form>
    </Modal>
  );
};

export default DispatchCancelModal;
