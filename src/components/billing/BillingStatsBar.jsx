import React from 'react';
import { Receipt, CheckCircle2, AlertCircle, Clock, Calendar } from 'lucide-react';
import { Card, CardContent } from '../common/Card';
import { formatINR } from '../../utils/currency';

export const BillingStatsBar = ({ invoices = [] }) => {
  const totalBilled = invoices.reduce((sum, inv) => sum + Number(inv.totalAmount || 0), 0);
  const totalCollected = invoices.reduce((sum, inv) => sum + Number(inv.paidAmount || 0), 0);
  const totalOutstanding = invoices.reduce((sum, inv) => sum + Number(inv.balanceDue || 0), 0);

  const paidCount = invoices.filter((i) => i.status === 'paid').length;
  const partialCount = invoices.filter((i) => i.status === 'partially_paid').length;
  const unpaidCount = invoices.filter((i) => i.status === 'unpaid').length;

  return (
    <div className="space-y-3">
      {/* 4 Financial KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
        
        {/* Total Billed */}
        <Card hover={true}>
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-text">
                Total Billed
              </span>
              <div className="w-8 h-8 rounded-lg bg-forest/10 flex items-center justify-center text-forest">
                <Receipt className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-forest font-mono">
                {formatINR(totalBilled)}
              </span>
              <p className="text-[11px] text-muted-text mt-1">
                {invoices.length} issued invoices
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Total Collected */}
        <Card hover={true} className="border-status-success/30 bg-emerald-50/20">
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-status-success">
                Payments Collected
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-status-success">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-status-success font-mono">
                {formatINR(totalCollected)}
              </span>
              <p className="text-[11px] text-emerald-800 font-medium mt-1">
                UPI & cash in hand
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Total Outstanding */}
        <Card hover={true} className={totalOutstanding > 0 ? 'border-amber-accent/40 bg-amber-50/20' : ''}>
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-amber-dark">
                Outstanding Balance
              </span>
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-dark">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-amber-900 font-mono">
                {formatINR(totalOutstanding)}
              </span>
              <p className="text-[11px] text-amber-800 font-medium mt-1">
                Pending customer settlements
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Invoice Health */}
        <Card hover={true}>
          <CardContent className="p-4 sm:p-5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-text">
                Invoice Breakdown
              </span>
              <div className="w-8 h-8 rounded-lg bg-surface-subtle flex items-center justify-center text-charcoal">
                <Calendar className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-charcoal font-mono">
                {invoices.length}
              </span>
              <p className="text-[11px] text-muted-text mt-1">
                <span className="text-status-success font-semibold">{paidCount} Paid</span> ·{' '}
                <span className="text-amber-dark font-semibold">{partialCount} Partial</span> ·{' '}
                <span className="text-rose-700 font-semibold">{unpaidCount} Due</span>
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default BillingStatsBar;
