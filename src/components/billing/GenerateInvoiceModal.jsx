import React, { useState, useMemo } from 'react';
import { Receipt, AlertCircle, Calendar, CheckCircle2, User, Sparkles } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Select } from '../common/Select';
import { Input } from '../common/Input';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/currency';

export const GenerateInvoiceModal = ({
  isOpen,
  onClose,
  onInvoiceCreated,
}) => {
  const { customers, invoices, mealOrders, generateCustomerInvoice } = useApp();

  const [selectedCustomerId, setSelectedCustomerId] = useState('');
  const [period, setPeriod] = useState('01 Nov 2026 – 30 Nov 2026');
  const [error, setError] = useState(null);

  // Filter only active customers
  const activeCustomers = useMemo(() => {
    return customers.filter((c) => c.status === 'active');
  }, [customers]);

  // Set default customer when opened
  React.useEffect(() => {
    if (isOpen && activeCustomers.length > 0 && !selectedCustomerId) {
      setSelectedCustomerId(activeCustomers[0].id);
    }
    setError(null);
  }, [isOpen, activeCustomers, selectedCustomerId]);

  const selectedCustomer = useMemo(() => {
    return customers.find((c) => c.id === selectedCustomerId);
  }, [customers, selectedCustomerId]);

  // Check duplicate invoice for this customer + period
  const duplicateInvoice = useMemo(() => {
    if (!selectedCustomerId || !period) return null;
    return invoices.find(
      (inv) => inv.customerId === selectedCustomerId && inv.period.trim().toLowerCase() === period.trim().toLowerCase()
    );
  }, [invoices, selectedCustomerId, period]);

  // Calculate billable dispatched meals preview
  const billablePreview = useMemo(() => {
    if (!selectedCustomer) return null;

    const dispatched = mealOrders.filter(
      (o) => o.customerId === selectedCustomer.id && o.status === 'dispatched'
    );

    if (dispatched.length > 0) {
      const lunchDispatched = dispatched.filter((m) => m.mealType === 'lunch');
      const dinnerDispatched = dispatched.filter((m) => m.mealType === 'dinner');
      const totalAmount = dispatched.reduce((sum, m) => sum + Number(m.price), 0);

      return {
        isLiveDispatched: true,
        count: dispatched.length,
        lunchCount: lunchDispatched.length,
        dinnerCount: dinnerDispatched.length,
        totalAmount,
      };
    } else {
      // Projected from recurring schedule
      const lunchCount = selectedCustomer.schedule?.mon?.lunch ? 24 : 0;
      const dinnerCount = selectedCustomer.schedule?.mon?.dinner ? 24 : 0;
      const totalAmount =
        lunchCount * Number(selectedCustomer.lunchPrice) +
        dinnerCount * Number(selectedCustomer.dinnerPrice);

      return {
        isLiveDispatched: false,
        count: lunchCount + dinnerCount,
        lunchCount,
        dinnerCount,
        totalAmount,
      };
    }
  }, [selectedCustomer, mealOrders]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!selectedCustomerId) {
      setError('Please select a customer.');
      return;
    }

    if (duplicateInvoice) {
      setError(`An invoice for ${selectedCustomer?.name} for "${period}" already exists (${duplicateInvoice.invoiceNumber}). Duplicate invoices are prevented.`);
      return;
    }

    try {
      const newInv = generateCustomerInvoice(selectedCustomerId, period.trim());
      if (onInvoiceCreated) {
        onInvoiceCreated(newInv);
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to generate invoice.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Generate Customer Invoice"
      description="Create an official itemized monthly billing statement based on dispatched meals."
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        
        {/* Error Callout */}
        {error && (
          <div className="p-3 bg-red-50 border border-status-error/30 text-status-error text-xs rounded-button flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Customer Select */}
        <div>
          <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
            Select Customer *
          </label>
          <Select
            value={selectedCustomerId}
            onChange={(e) => {
              setSelectedCustomerId(e.target.value);
              setError(null);
            }}
            options={activeCustomers.map((c) => ({
              value: c.id,
              label: `${c.name} (${c.phone}) - Lunch: ₹${c.lunchPrice} | Dinner: ₹${c.dinnerPrice}`,
            }))}
          />
        </div>

        {/* Billing Period */}
        <div>
          <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
            Billing Period *
          </label>
          <Input
            value={period}
            onChange={(e) => {
              setPeriod(e.target.value);
              setError(null);
            }}
            iconLeft={Calendar}
            placeholder="e.g. 01 Nov 2026 – 30 Nov 2026"
            required
          />
          <p className="text-[11px] text-muted-text mt-1">
            Standard monthly billing cycle (1st of month to month-end).
          </p>
        </div>

        {/* Duplicate Warning if detected */}
        {duplicateInvoice && (
          <div className="p-3 bg-amber-light/30 border border-amber/40 text-charcoal text-xs rounded-button flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-amber-dark mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-semibold text-amber-dark">Invoice Already Generated</p>
              <p className="text-[11px] text-muted-text mt-0.5">
                Invoice <span className="font-mono font-bold text-forest">{duplicateInvoice.invoiceNumber}</span> was already issued for this cycle on {duplicateInvoice.createdAt}. You cannot create a duplicate invoice.
              </p>
            </div>
          </div>
        )}

        {/* Live Billable Summary Preview */}
        {billablePreview && (
          <div className="bg-surface-subtle p-3.5 rounded-card border border-border space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-charcoal">Eligible Dispatched Meals:</span>
              <span className="font-mono font-bold text-forest">{billablePreview.count} meals</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-muted-text border-t border-border pt-2">
              <div>
                Lunch Dispatches: <strong className="text-charcoal">{billablePreview.lunchCount}</strong>
              </div>
              <div>
                Dinner Dispatches: <strong className="text-charcoal">{billablePreview.dinnerCount}</strong>
              </div>
            </div>

            <div className="border-t border-border pt-2 flex items-center justify-between">
              <span className="text-xs font-bold text-charcoal">Estimated Invoice Total:</span>
              <span className="text-base font-bold font-mono text-forest">
                {formatINR(billablePreview.totalAmount)}
              </span>
            </div>

            <p className="text-[11px] text-muted-text italic">
              {billablePreview.isLiveDispatched
                ? 'Calculated strictly from meals stamped as dispatched.'
                : 'Projected from customer recurring subscription agreement.'}
            </p>
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            iconLeft={Receipt}
            disabled={Boolean(duplicateInvoice)}
          >
            Generate Invoice
          </Button>
        </div>

      </form>
    </Modal>
  );
};

export default GenerateInvoiceModal;
