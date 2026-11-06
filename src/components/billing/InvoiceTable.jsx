import React from 'react';
import { Printer, IndianRupee, Eye, CheckCircle2, AlertCircle } from 'lucide-react';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../common/Table';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { formatINR } from '../../utils/currency';

export const InvoiceTable = ({
  invoices = [],
  onViewInvoice,
  onRecordPayment,
}) => {
  return (
    <div className="space-y-4">
      
      {/* DESKTOP TABLE VIEW (>= 768px) */}
      <div className="hidden md:block">
        <Table>
          <TableHead>
            <TableRow hover={false}>
              <TableHeader>Invoice #</TableHeader>
              <TableHeader>Customer Name</TableHeader>
              <TableHeader>Billing Cycle</TableHeader>
              <TableHeader>Dispatched Meals</TableHeader>
              <TableHeader>Total Billed</TableHeader>
              <TableHeader>Paid Amount</TableHeader>
              <TableHeader>Balance Due</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader align="right">Actions</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.length === 0 ? (
              <TableRow hover={false}>
                <TableCell colSpan={9} className="text-center py-12 text-muted-text">
                  No invoices found matching your criteria.
                </TableCell>
              </TableRow>
            ) : (
              invoices.map((inv) => {
                const isPaid = inv.status === 'paid';
                const isPartial = inv.status === 'partially_paid';
                const isUnpaid = inv.status === 'unpaid';

                return (
                  <TableRow key={inv.id}>
                    {/* Invoice Number */}
                    <TableCell>
                      <button
                        onClick={() => onViewInvoice(inv)}
                        className="font-mono font-bold text-forest-deep hover:text-forest hover:underline"
                      >
                        {inv.invoiceNumber}
                      </button>
                    </TableCell>

                    {/* Customer */}
                    <TableCell>
                      <span className="font-semibold text-charcoal block">{inv.customerName}</span>
                      <span className="text-[11px] text-muted-text font-mono">{inv.customerPhone}</span>
                    </TableCell>

                    {/* Period */}
                    <TableCell className="text-xs text-muted-text">
                      {inv.period}
                    </TableCell>

                    {/* Meals Count */}
                    <TableCell className="font-mono text-xs text-charcoal">
                      {inv.mealCount || (inv.lineItems ? inv.lineItems.reduce((s, l) => s + l.quantity, 0) : 0)} meals
                    </TableCell>

                    {/* Total Amount */}
                    <TableCell className="font-mono font-bold text-forest text-sm">
                      {formatINR(inv.totalAmount)}
                    </TableCell>

                    {/* Paid Amount */}
                    <TableCell className="font-mono text-status-success font-medium text-xs">
                      {formatINR(inv.paidAmount)}
                    </TableCell>

                    {/* Balance Due */}
                    <TableCell>
                      <span
                        className={`font-mono font-bold text-sm ${
                          inv.balanceDue > 0 ? 'text-amber-dark' : 'text-muted-text'
                        }`}
                      >
                        {formatINR(inv.balanceDue)}
                      </span>
                    </TableCell>

                    {/* Status Badge */}
                    <TableCell>
                      <Badge
                        variant={isPaid ? 'success' : isPartial ? 'pending' : 'error'}
                        size="sm"
                        dot={true}
                      >
                        {isPaid ? 'Paid' : isPartial ? 'Partially Paid' : 'Unpaid'}
                      </Badge>
                    </TableCell>

                    {/* Actions */}
                    <TableCell align="right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="ghost"
                          size="sm"
                          iconLeft={Printer}
                          onClick={() => onViewInvoice(inv)}
                          title="View and print invoice receipt"
                        >
                          Print
                        </Button>

                        {!isPaid && (
                          <Button
                            variant="secondary"
                            size="sm"
                            iconLeft={IndianRupee}
                            onClick={() => onRecordPayment(inv)}
                            title="Record customer payment"
                          >
                            Pay
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* MOBILE CARD VIEW (< 768px) */}
      <div className="md:hidden space-y-3">
        {invoices.length === 0 ? (
          <div className="text-center py-12 text-sm text-muted-text bg-white rounded-card border border-border">
            No invoices found.
          </div>
        ) : (
          invoices.map((inv) => {
            const isPaid = inv.status === 'paid';
            const isPartial = inv.status === 'partially_paid';

            return (
              <div
                key={inv.id}
                className="bg-white rounded-card border border-border p-4 shadow-subtle space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-mono font-bold text-forest-deep text-sm block">
                      {inv.invoiceNumber}
                    </span>
                    <h3 className="font-bold text-charcoal text-base">
                      {inv.customerName}
                    </h3>
                    <p className="text-xs text-muted-text">{inv.period}</p>
                  </div>

                  <Badge
                    variant={isPaid ? 'success' : isPartial ? 'pending' : 'error'}
                    size="sm"
                    dot={true}
                  >
                    {isPaid ? 'Paid' : isPartial ? 'Partially Paid' : 'Unpaid'}
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs py-2.5 border-y border-border/60 bg-surface-subtle/50 -mx-4 px-4 font-mono">
                  <div>
                    <span className="text-[10px] text-muted-text uppercase font-semibold block">Total</span>
                    <span className="font-bold text-forest">{formatINR(inv.totalAmount)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-text uppercase font-semibold block">Paid</span>
                    <span className="text-status-success font-semibold">{formatINR(inv.paidAmount)}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-text uppercase font-semibold block">Balance</span>
                    <span className={`font-bold ${inv.balanceDue > 0 ? 'text-amber-dark' : 'text-muted-text'}`}>
                      {formatINR(inv.balanceDue)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-1">
                  <span className="text-xs text-muted-text">
                    {inv.mealCount || (inv.lineItems ? inv.lineItems.reduce((s, l) => s + l.quantity, 0) : 0)} Dispatched meals
                  </span>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      iconLeft={Printer}
                      onClick={() => onViewInvoice(inv)}
                    >
                      Print
                    </Button>

                    {!isPaid && (
                      <Button
                        variant="primary"
                        size="sm"
                        iconLeft={IndianRupee}
                        onClick={() => onRecordPayment(inv)}
                      >
                        Record Pay
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};

export default InvoiceTable;
