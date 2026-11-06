import React, { useState, useEffect } from 'react';
import { IndianRupee, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/currency';
import { getTodayIST } from '../../utils/date';

export const RecordPaymentModal = ({
  isOpen,
  onClose,
  invoice,
}) => {
  const { recordPayment } = useApp();

  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(getTodayIST());
  const [method, setMethod] = useState('UPI');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (invoice) {
      setAmount(String(invoice.balanceDue || ''));
      setDate(getTodayIST());
      setMethod('UPI');
      setNotes('');
      setError(null);
    }
  }, [invoice, isOpen]);

  if (!isOpen || !invoice) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const numAmount = Number(amount);

    if (!numAmount || numAmount <= 0) {
      setError('Payment amount must be greater than zero.');
      return;
    }

    if (numAmount > invoice.balanceDue) {
      setError(`Payment cannot exceed outstanding balance of ${formatINR(invoice.balanceDue)}.`);
      return;
    }

    recordPayment(invoice.id, numAmount, method, notes.trim());
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Record Customer Payment"
      description={`Record cash, UPI, or bank transfer for ${invoice.invoiceNumber}.`}
      footer={
        <>
          <Button variant="secondary" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            iconLeft={CheckCircle2}
            onClick={handleSubmit}
          >
            Confirm & Save Payment
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-status-error text-xs rounded-card flex items-start gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Invoice Summary Box */}
        <div className="p-4 bg-surface-subtle rounded-card border border-border space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-muted-text">Customer:</span>
            <span className="font-bold text-charcoal">{invoice.customerName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-text">Invoice Total:</span>
            <span className="font-mono font-semibold text-charcoal">{formatINR(invoice.totalAmount)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-text">Previously Paid:</span>
            <span className="font-mono text-status-success font-semibold">{formatINR(invoice.paidAmount)}</span>
          </div>
          <div className="flex justify-between pt-1 border-t border-border font-bold">
            <span className="text-muted-text">Remaining Due:</span>
            <span className="font-mono text-amber-dark text-sm">{formatINR(invoice.balanceDue)}</span>
          </div>
        </div>

        {/* Payment Amount */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Payment Amount (₹)"
            type="number"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setError(null);
            }}
            iconLeft={IndianRupee}
            required
            hint="Supports partial payments"
          />

          <Input
            label="Payment Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        {/* Payment Method */}
        <Select
          label="Payment Method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          options={[
            { value: 'UPI', label: 'UPI (Google Pay / PhonePe / Paytm)' },
            { value: 'Cash', label: 'Cash in Hand' },
            { value: 'Bank Transfer', label: 'Bank Transfer (NEFT / IMPS)' },
          ]}
        />

        {/* Optional Notes */}
        <Input
          label="Transaction Note (Optional)"
          placeholder="e.g. GPay reference number or collected by helper"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="flex items-center gap-2 text-[11px] text-muted-text pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-forest flex-shrink-0" />
          <span>
            Outstanding amount = Invoice Total - All Payments Received. Updating payment derives invoice status automatically.
          </span>
        </div>
      </form>
    </Modal>
  );
};

export default RecordPaymentModal;
