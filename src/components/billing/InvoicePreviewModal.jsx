import React from 'react';
import { Printer, ShieldCheck, Download, CheckCircle2, Phone, MapPin, IndianRupee } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { formatINR } from '../../utils/currency';
import { formatDateIST } from '../../utils/date';

export const InvoicePreviewModal = ({
  isOpen,
  onClose,
  invoice,
  onRecordPayment,
}) => {
  if (!isOpen || !invoice) return null;

  const handlePrint = () => {
    window.print();
  };

  const isPaid = invoice.status === 'paid';
  const isPartial = invoice.status === 'partially_paid';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title={`Customer Statement: ${invoice.invoiceNumber}`}
      description="Official monthly billing invoice calculated strictly from confirmed dispatched meals."
      footer={
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            {!isPaid && (
              <Button
                variant="primary"
                size="sm"
                iconLeft={IndianRupee}
                onClick={() => {
                  onClose();
                  onRecordPayment(invoice);
                }}
              >
                Record Payment
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              iconLeft={Printer}
              onClick={handlePrint}
            >
              Print / Save PDF
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      }
    >
      {/* Printable Invoice Container */}
      <div id="printable-invoice" className="bg-white p-6 sm:p-8 rounded-card border border-border shadow-subtle space-y-6 text-charcoal">
        
        {/* Invoice Header: Business info & Invoice Number */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-forest text-mint flex items-center justify-center font-bold text-sm">
                OS
              </div>
              <div>
                <h2 className="text-lg font-bold text-forest-deep leading-tight">
                  Shree Annapurna Tiffins
                </h2>
                <p className="text-[11px] text-muted-text">Family Edition · Kitchen Reg #452001</p>
              </div>
            </div>
            <p className="text-xs text-muted-text mt-2">
              Plot 44, Kailash Nagar, Indore, MP 452001<br />
              Contact: +91 98765 43210 · UPI: annapurnatiffin@upi
            </p>
          </div>

          <div className="text-left sm:text-right space-y-1">
            <Badge
              variant={isPaid ? 'success' : isPartial ? 'pending' : 'error'}
              size="md"
              dot={true}
            >
              {isPaid ? 'PAID IN FULL' : isPartial ? 'PARTIALLY PAID' : 'PAYMENT DUE'}
            </Badge>
            <p className="font-mono text-sm font-bold text-charcoal mt-1">
              {invoice.invoiceNumber}
            </p>
            <p className="text-[11px] text-muted-text">
              Date: {formatDateIST(invoice.createdAt ? new Date(invoice.createdAt) : new Date(), 'display')}
            </p>
          </div>
        </div>

        {/* Billed To & Billing Period */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs p-4 bg-surface-subtle/60 rounded-card border border-border/60">
          <div>
            <span className="text-[10px] uppercase font-bold text-muted-text block mb-1">
              Billed To Customer:
            </span>
            <p className="font-bold text-charcoal text-sm">{invoice.customerName}</p>
            <p className="text-muted-text mt-0.5">{invoice.customerPhone}</p>
            <p className="text-muted-text truncate">{invoice.customerAddress}</p>
          </div>

          <div className="sm:text-right">
            <span className="text-[10px] uppercase font-bold text-muted-text block mb-1">
              Billing Period:
            </span>
            <p className="font-semibold text-charcoal">{invoice.period}</p>
            <p className="text-muted-text mt-0.5">
              Basis: <strong>Actual Dispatched Meals Only</strong>
            </p>
          </div>
        </div>

        {/* Itemized Line Items Table */}
        <div>
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface-subtle text-muted-text uppercase text-[10px]">
                <th className="py-2.5 px-3 font-semibold">Service Description</th>
                <th className="py-2.5 px-3 font-semibold text-right">Dispatched Qty</th>
                <th className="py-2.5 px-3 font-semibold text-right">Agreed Rate</th>
                <th className="py-2.5 px-3 font-semibold text-right">Line Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 font-mono">
              {invoice.lineItems && invoice.lineItems.length > 0 ? (
                invoice.lineItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-surface-subtle/30">
                    <td className="py-2.5 px-3 font-sans font-medium text-charcoal">
                      {item.description}
                    </td>
                    <td className="py-2.5 px-3 text-right text-muted-text">
                      {item.quantity} meals
                    </td>
                    <td className="py-2.5 px-3 text-right text-muted-text">
                      {formatINR(item.unitPrice)}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-forest">
                      {formatINR(item.total)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="py-2.5 px-3 font-sans font-medium text-charcoal">
                    Dispatched Meals for Period
                  </td>
                  <td className="py-2.5 px-3 text-right text-muted-text">
                    {invoice.mealCount} meals
                  </td>
                  <td className="py-2.5 px-3 text-right text-muted-text">-</td>
                  <td className="py-2.5 px-3 text-right font-bold text-forest">
                    {formatINR(invoice.totalAmount)}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Totals & Payments Summary */}
        <div className="pt-2 border-t border-border flex flex-col items-end space-y-1.5 text-xs">
          <div className="w-full sm:w-64 space-y-1.5">
            <div className="flex justify-between text-muted-text">
              <span>Invoice Subtotal:</span>
              <span className="font-mono text-charcoal font-semibold">{formatINR(invoice.totalAmount)}</span>
            </div>

            <div className="flex justify-between text-muted-text">
              <span>Payments Received:</span>
              <span className="font-mono text-status-success font-semibold">-{formatINR(invoice.paidAmount)}</span>
            </div>

            <div className="flex justify-between text-base font-bold text-forest-deep pt-2 border-t border-border">
              <span>Balance Due:</span>
              <span className={`font-mono ${invoice.balanceDue > 0 ? 'text-amber-dark' : 'text-forest'}`}>
                {formatINR(invoice.balanceDue)}
              </span>
            </div>
          </div>
        </div>

        {/* Recorded Payment History if any */}
        {invoice.payments && invoice.payments.length > 0 && (
          <div className="p-3 bg-emerald-50/50 rounded-card border border-emerald-200 text-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-emerald-800 block">
              Payment Receipts Logged:
            </span>
            {invoice.payments.map((p, i) => (
              <div key={i} className="flex justify-between text-[11px] text-emerald-900 font-mono">
                <span>{p.date} · via {p.paymentMethod} {p.notes ? `(${p.notes})` : ''}</span>
                <span className="font-bold">+{formatINR(p.amount)}</span>
              </div>
            ))}
          </div>
        )}

        {/* Payment Remittance Instructions Footer */}
        <div className="pt-4 border-t border-border/80 text-[11px] text-muted-text flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <p className="font-semibold text-charcoal">How to Pay:</p>
            <p>Scan UPI or pay to: <strong className="text-forest font-mono">annapurnatiffin@upi</strong> (GPay / PhonePe / Paytm).</p>
          </div>
          <div className="text-right text-[10px] text-muted-light">
            <span>Official Computer-Generated Invoice · TiffinOS</span>
          </div>
        </div>

      </div>
    </Modal>
  );
};

export default InvoicePreviewModal;
