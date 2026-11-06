import React from 'react';
import { Truck, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { Card, CardContent } from '../common/Card';

export const DispatchStatsBar = ({ 
  activeService = 'lunch', 
  orders = [] 
}) => {
  const serviceOrders = orders.filter((o) => o.mealType === activeService);
  const totalExpected = serviceOrders.length;
  const dispatchedCount = serviceOrders.filter((o) => o.status === 'dispatched').length;
  const pendingCount = serviceOrders.filter((o) => o.status === 'pending').length;
  const cancelledCount = serviceOrders.filter((o) => o.status === 'cancelled').length;

  const percentComplete = totalExpected > 0 ? Math.round((dispatchedCount / totalExpected) * 100) : 0;

  return (
    <div className="space-y-3">
      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Total Expected */}
        <Card>
          <CardContent className="p-3.5 sm:p-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-text">
                Expected ({activeService.toUpperCase()})
              </span>
              <div className="w-7 h-7 rounded bg-surface-subtle flex items-center justify-center text-charcoal">
                <Clock className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xl sm:text-2xl font-bold text-charcoal font-mono">
                {totalExpected}
              </span>
              <p className="text-[10px] text-muted-text mt-0.5">Kitchen packing target</p>
            </div>
          </CardContent>
        </Card>

        {/* Dispatched */}
        <Card className="border-status-success/30 bg-emerald-50/20">
          <CardContent className="p-3.5 sm:p-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-status-success">
                Dispatched
              </span>
              <div className="w-7 h-7 rounded bg-emerald-100 flex items-center justify-center text-status-success">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xl sm:text-2xl font-bold text-emerald-900 font-mono">
                {dispatchedCount}
              </span>
              <p className="text-[10px] text-status-success font-medium mt-0.5">
                {percentComplete}% of batch done
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Pending */}
        <Card className={pendingCount > 0 ? 'border-amber-accent/40 bg-amber-50/20' : ''}>
          <CardContent className="p-3.5 sm:p-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-amber-dark">
                Pending Packing
              </span>
              <div className="w-7 h-7 rounded bg-amber-100 flex items-center justify-center text-amber-dark">
                <Truck className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xl sm:text-2xl font-bold text-amber-900 font-mono">
                {pendingCount}
              </span>
              <p className="text-[10px] text-amber-800 font-medium mt-0.5">
                Waiting for kitchen stamp
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Cancelled */}
        <Card>
          <CardContent className="p-3.5 sm:p-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-text">
                Cancelled / Skipped
              </span>
              <div className="w-7 h-7 rounded bg-rose-50 flex items-center justify-center text-status-error">
                <XCircle className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="mt-2">
              <span className="text-xl sm:text-2xl font-bold text-charcoal font-mono">
                {cancelledCount}
              </span>
              <p className="text-[10px] text-rose-700 font-medium mt-0.5">
                Zero bill liability
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Bar */}
      <div className="bg-white p-3 rounded-card border border-border shadow-subtle space-y-1.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-charcoal">
            {activeService === 'lunch' ? '☀️ Lunch Service Progress' : '🌙 Dinner Service Progress'}
          </span>
          <span className="font-mono font-bold text-forest">{percentComplete}% Dispatched</span>
        </div>
        <div className="w-full bg-surface-subtle rounded-full h-2.5 overflow-hidden border border-border/60">
          <div
            className={`h-2.5 rounded-full transition-all duration-300 ${
              activeService === 'lunch' ? 'bg-forest' : 'bg-amber-accent'
            }`}
            style={{ width: `${percentComplete}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default DispatchStatsBar;
