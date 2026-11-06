import React from 'react';
import { CheckCircle2, ShieldCheck, MapPin, IndianRupee, AlertCircle } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { formatINR } from '../../utils/currency';
import { formatDateIST } from '../../utils/date';

export const DispatchConfirmModal = ({
  isOpen,
  onClose,
  order,
  onConfirm,
}) => {
  if (!isOpen || !order) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Kitchen Meal Dispatch"
      description="Verify delivery details before stamping this meal as dispatched."
      footer={
        <>
          <Button variant="secondary" size="md" onClick={onClose}>
            Back to Line
          </Button>
          <Button
            variant="primary"
            size="md"
            iconLeft={CheckCircle2}
            onClick={() => {
              onConfirm(order.id);
              onClose();
            }}
          >
            Confirm & Dispatch
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        {/* Verification Summary Box */}
        <div className="p-4 bg-surface-subtle rounded-card border border-border space-y-2.5 text-sm">
          <div className="flex items-center justify-between pb-2 border-b border-border/70">
            <span className="text-muted-text">Customer:</span>
            <span className="font-bold text-forest-deep text-base">{order.customerName}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-text">Delivery Date:</span>
            <span className="font-semibold text-charcoal">{formatDateIST(new Date(order.date), 'full')}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-text">Service Slot:</span>
            <span className="font-semibold text-forest uppercase">{order.mealType} Service</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-muted-text">Delivery Address:</span>
            <span className="font-medium text-charcoal truncate max-w-xs">{order.address}</span>
          </div>

          <div className="flex items-center justify-between pt-1 border-t border-border/70">
            <span className="text-muted-text font-semibold">Billable Amount:</span>
            <span className="font-bold text-lg font-mono text-forest">{formatINR(order.price)}</span>
          </div>
        </div>

        {/* Dietary note if present */}
        {order.instructions && (
          <div className="p-2.5 bg-amber-50 rounded border border-amber-200 text-xs text-amber-900">
            <strong>Kitchen Instructions</strong>: {order.instructions}
          </div>
        )}

        {/* Real-world Rule Reminder */}
        <div className="p-3 bg-mint/40 rounded border border-mint-dark text-xs text-forest-deep flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
          <p>
            <strong>Billing Rule Enforcement</strong>: Stamping "Dispatched" immediately registers this tiffin in the customer's monthly invoice ledger. Pending or undelivered meals are never billed.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default DispatchConfirmModal;
