import React from 'react';
import { Users, CheckCircle2, Calendar, UserCheck, PauseCircle, Archive } from 'lucide-react';
import { Card, CardContent } from '../common/Card';
import { useApp } from '../../context/AppContext';

export const CustomerStats = () => {
  const { metrics } = useApp();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
      {/* Total Customers */}
      <Card hover={true}>
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted-text">
              Total Customers
            </span>
            <div className="w-8 h-8 rounded-lg bg-surface-subtle flex items-center justify-center text-charcoal">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-bold text-charcoal font-mono">
              {metrics.totalCustCount}
            </span>
            <p className="text-[11px] text-muted-text mt-1">
              Registered in kitchen register
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Active Subscriptions */}
      <Card hover={true} className="border-status-success/30 bg-emerald-50/20">
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-status-success">
              Active Subscriptions
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-status-success">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-bold text-emerald-900 font-mono">
              {metrics.activeCustCount}
            </span>
            <p className="text-[11px] text-status-success font-medium mt-1">
              Currently receiving meals
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Regular Weekly Customers */}
      <Card hover={true}>
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-forest">
              Regular Weekly
            </span>
            <div className="w-8 h-8 rounded-lg bg-forest/10 flex items-center justify-center text-forest">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-bold text-forest-deep font-mono">
              {metrics.regularCustCount}
            </span>
            <p className="text-[11px] text-muted-text mt-1">
              Fixed recurring schedules
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Occasional / Paused */}
      <Card hover={true} className={metrics.pausedCustCount > 0 ? 'border-amber-accent/40 bg-amber-50/20' : ''}>
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-amber-dark">
              Occasional & Paused
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-dark">
              <PauseCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-bold text-amber-900 font-mono">
              {metrics.occasionalCustCount + metrics.pausedCustCount}
            </span>
            <p className="text-[11px] text-amber-800 font-medium mt-1">
              {metrics.occasionalCustCount} Occasional · {metrics.pausedCustCount} Paused · {metrics.archivedCustCount} Archived
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerStats;
