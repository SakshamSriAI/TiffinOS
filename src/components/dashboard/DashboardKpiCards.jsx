import React from 'react';
import { Users, Clock, CheckCircle2, Truck, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '../common/Card';
import { useApp } from '../../context/AppContext';

export const DashboardKpiCards = () => {
  const { metrics } = useApp();

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4">
      {/* 1. Active Customers */}
      <Card hover={true}>
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted-text">
              Active Customers
            </span>
            <div className="w-8 h-8 rounded-lg bg-forest/10 flex items-center justify-center text-forest">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-bold text-forest-deep font-mono">
              {metrics.activeCustCount}
            </span>
            <p className="text-[11px] text-muted-text mt-1 truncate">
              {metrics.regularCustCount} Regular · {metrics.occasionalCustCount} Occasional
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 2. Expected Meals Today */}
      <Card hover={true}>
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted-text">
              Expected Today
            </span>
            <div className="w-8 h-8 rounded-lg bg-surface-subtle flex items-center justify-center text-charcoal">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-bold text-charcoal font-mono">
              {metrics.expectedToday}
            </span>
            <p className="text-[11px] text-muted-text mt-1 truncate">
              {metrics.lunchOrders.length} Lunch · {metrics.dinnerOrders.length} Dinner
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 3. Meals Dispatched Today */}
      <Card hover={true} className="border-status-success/30 bg-emerald-50/20">
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-status-success">
              Dispatched Today
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-status-success">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-bold text-emerald-900 font-mono">
              {metrics.dispatchedToday}
            </span>
            <p className="text-[11px] text-status-success font-medium mt-1 truncate">
              {metrics.expectedToday > 0 
                ? `${Math.round((metrics.dispatchedToday / metrics.expectedToday) * 100)}% of daily quota`
                : 'No meals scheduled'}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 4. Pending Meals */}
      <Card hover={true} className={metrics.pendingToday > 0 ? 'border-amber-accent/40 bg-amber-50/20' : ''}>
        <CardContent className="p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-amber-dark">
              Pending Meals
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-dark">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <span className="text-2xl sm:text-3xl font-bold text-amber-900 font-mono">
              {metrics.pendingToday}
            </span>
            <p className="text-[11px] text-amber-800 font-medium mt-1 truncate">
              {metrics.pendingToday === 0
                ? 'All meals dispatched'
                : `${metrics.lunchOrders.filter(o => o.status === 'pending').length} Lunch · ${metrics.dinnerOrders.filter(o => o.status === 'pending').length} Dinner pending`}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardKpiCards;
