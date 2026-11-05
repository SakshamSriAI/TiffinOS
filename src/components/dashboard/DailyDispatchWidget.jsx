import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Truck, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  AlertCircle, 
  X, 
  Phone, 
  MapPin, 
  Calendar 
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../common/Card';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/currency';

export const DailyDispatchWidget = () => {
  const { mealOrders, markDispatched, cancelMealOrder, metrics, selectedDate } = useApp();
  const [activeTab, setActiveTab] = useState('dinner'); // Defaulting to dinner since lunch is 100% dispatched in seed data
  const [confirmOrder, setConfirmOrder] = useState(null);
  const [cancelOrder, setCancelOrder] = useState(null);
  const [cancelReason, setCancelReason] = useState('Customer called to cancel');

  // Filter orders for the selected batch
  const currentBatchOrders = mealOrders.filter(
    (o) => o.date === selectedDate && o.mealType === activeTab
  );

  const lunchTotal = metrics.lunchOrders.length;
  const lunchDispatched = metrics.lunchDispatched;
  const lunchPercent = lunchTotal > 0 ? Math.round((lunchDispatched / lunchTotal) * 100) : 0;

  const dinnerTotal = metrics.dinnerOrders.length;
  const dinnerDispatched = metrics.dinnerDispatched;
  const dinnerPercent = dinnerTotal > 0 ? Math.round((dinnerDispatched / dinnerTotal) * 100) : 0;

  const handleConfirmDispatch = () => {
    if (confirmOrder) {
      markDispatched(confirmOrder.id);
      setConfirmOrder(null);
    }
  };

  const handleConfirmCancel = () => {
    if (cancelOrder) {
      cancelMealOrder(cancelOrder.id, cancelReason);
      setCancelOrder(null);
      setCancelReason('Customer called to cancel');
    }
  };

  return (
    <Card className="border-forest/20 shadow-card">
      {/* Header */}
      <CardHeader
        action={
          <Link to="/app/dispatch">
            <Button variant="ghost" size="sm" iconRight={ArrowRight}>
              Open Dispatch Terminal
            </Button>
          </Link>
        }
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-forest text-white flex items-center justify-center">
            <Truck className="w-4 h-4" />
          </div>
          <div>
            <CardTitle className="text-lg text-forest-deep">Daily Meal Dispatch</CardTitle>
            <CardDescription>Live kitchen packaging line & delivery progress</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        
        {/* Dual Progress Monitors: Lunch vs Dinner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          
          {/* Lunch Progress Card */}
          <div
            onClick={() => setActiveTab('lunch')}
            className={`p-4 rounded-card border cursor-pointer transition-all duration-150 ${
              activeTab === 'lunch'
                ? 'bg-forest/5 border-forest shadow-xs ring-1 ring-forest/20'
                : 'bg-surface-subtle border-border hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-charcoal flex items-center gap-1.5">
                ☀️ Lunch Service
              </span>
              <Badge variant={lunchPercent === 100 ? 'success' : 'pending'} size="sm">
                {lunchDispatched} of {lunchTotal} Dispatched
              </Badge>
            </div>

            <div className="w-full bg-border/60 rounded-full h-2 overflow-hidden mb-2">
              <div
                className="bg-forest h-2 rounded-full transition-all duration-300"
                style={{ width: `${lunchPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-muted-text">
              <span>{lunchPercent}% Completed</span>
              <span className="font-semibold text-forest">
                {lunchTotal - lunchDispatched === 0 ? 'All Delivered' : `${lunchTotal - lunchDispatched} Remaining`}
              </span>
            </div>
          </div>

          {/* Dinner Progress Card */}
          <div
            onClick={() => setActiveTab('dinner')}
            className={`p-4 rounded-card border cursor-pointer transition-all duration-150 ${
              activeTab === 'dinner'
                ? 'bg-amber-accent/10 border-amber-accent shadow-xs ring-1 ring-amber-accent/30'
                : 'bg-surface-subtle border-border hover:bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-charcoal flex items-center gap-1.5">
                🌙 Dinner Service
              </span>
              <Badge variant={dinnerPercent === 100 ? 'success' : 'pending'} size="sm">
                {dinnerDispatched} of {dinnerTotal} Dispatched
              </Badge>
            </div>

            <div className="w-full bg-border/60 rounded-full h-2 overflow-hidden mb-2">
              <div
                className="bg-amber-accent h-2 rounded-full transition-all duration-300"
                style={{ width: `${dinnerPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-muted-text">
              <span>{dinnerPercent}% Completed</span>
              <span className="font-semibold text-amber-dark">
                {dinnerTotal - dinnerDispatched} Boxes Ready to Pack
              </span>
            </div>
          </div>

        </div>

        {/* Active Batch Order List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between pb-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal flex items-center gap-2">
              <span>Orders in {activeTab.toUpperCase()} Batch</span>
              <span className="text-[10px] bg-forest/10 text-forest px-2 py-0.5 rounded font-mono font-bold">
                {currentBatchOrders.length} Orders
              </span>
            </h4>
            <span className="text-xs text-muted-text">Tap to Mark Dispatched</span>
          </div>

          {currentBatchOrders.length === 0 ? (
            <div className="text-center py-8 text-sm text-muted-text bg-surface-subtle rounded-card border border-dashed border-border">
              No meal orders scheduled for this batch.
            </div>
          ) : (
            <div className="divide-y divide-border/60 rounded-card border border-border bg-white overflow-hidden shadow-subtle">
              {currentBatchOrders.map((order) => {
                const isDispatched = order.status === 'dispatched';
                const isCancelled = order.status === 'cancelled';

                return (
                  <div
                    key={order.id}
                    className={`p-3.5 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                      isDispatched
                        ? 'bg-surface-subtle/40'
                        : isCancelled
                        ? 'bg-rose-50/40 opacity-75'
                        : 'hover:bg-surface-subtle/60'
                    }`}
                  >
                    {/* Customer & Address Details */}
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-bold text-charcoal">{order.customerName}</span>
                        {order.source === 'one_time' ? (
                          <Badge variant="mint" size="sm">One-Time</Badge>
                        ) : (
                          <Badge variant="forest" size="sm">Regular</Badge>
                        )}
                        <span className="font-mono text-xs font-bold text-forest">
                          {formatINR(order.price)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-xs text-muted-text truncate">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-muted-light" />
                        <span className="truncate">{order.address}</span>
                      </div>

                      {order.instructions && (
                        <p className="text-[11px] text-amber-dark font-medium pl-5 italic">
                          "{order.instructions}"
                        </p>
                      )}
                    </div>

                    {/* Status & Action Buttons */}
                    <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
                      {isDispatched ? (
                        <div className="flex items-center gap-2">
                          <Badge variant="success" size="sm" dot={true}>
                            Dispatched ({order.dispatchedAt || 'Today'})
                          </Badge>
                        </div>
                      ) : isCancelled ? (
                        <Badge variant="error" size="sm" dot={true}>
                          Cancelled
                        </Badge>
                      ) : (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setCancelOrder(order)}
                            className="p-1.5 text-muted-text hover:text-status-error hover:bg-rose-50 rounded transition-colors text-xs font-medium"
                            title="Cancel meal"
                          >
                            <X className="w-4 h-4" />
                          </button>

                          <Button
                            variant="primary"
                            size="sm"
                            iconLeft={CheckCircle2}
                            onClick={() => setConfirmOrder(order)}
                          >
                            Mark Dispatched
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </CardContent>

      {/* Confirmation Modal for Dispatch */}
      {confirmOrder && (
        <Modal
          isOpen={true}
          onClose={() => setConfirmOrder(null)}
          title="Confirm Meal Dispatch"
          description="Verify delivery details before committing this meal to the monthly billing ledger."
          footer={
            <>
              <Button variant="secondary" size="md" onClick={() => setConfirmOrder(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                iconLeft={CheckCircle2}
                onClick={handleConfirmDispatch}
              >
                Confirm Dispatch
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <div className="p-4 bg-surface-subtle rounded-card border border-border space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-text">Customer:</span>
                <span className="font-semibold text-charcoal">{confirmOrder.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-text">Address:</span>
                <span className="text-charcoal font-medium truncate max-w-xs">{confirmOrder.address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-text">Meal Type:</span>
                <span className="font-semibold text-forest capitalize">{confirmOrder.mealType} Service</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-text">Amount to Bill:</span>
                <span className="font-mono font-bold text-forest">{formatINR(confirmOrder.price)}</span>
              </div>
            </div>

            <p className="text-xs text-muted-text">
              ⚠️ <strong>Rule Check</strong>: Only meals stamped "Dispatched" will appear on the customer's monthly invoice. Pending meals are never billed.
            </p>
          </div>
        </Modal>
      )}

      {/* Cancellation Modal */}
      {cancelOrder && (
        <Modal
          isOpen={true}
          onClose={() => setCancelOrder(null)}
          title="Cancel Meal Order"
          description="Cancelled meals remain in historical records for audit but are excluded from monthly customer billing."
          footer={
            <>
              <Button variant="secondary" size="md" onClick={() => setCancelOrder(null)}>
                Keep Order
              </Button>
              <Button
                variant="danger"
                size="md"
                onClick={handleConfirmCancel}
              >
                Cancel Meal
              </Button>
            </>
          }
        >
          <div className="space-y-3">
            <p className="text-sm text-charcoal">
              Are you sure you want to cancel the <strong>{cancelOrder.mealType}</strong> meal for <strong>{cancelOrder.customerName}</strong>?
            </p>
            <div>
              <label className="text-xs font-semibold text-charcoal uppercase block mb-1">
                Cancellation Reason:
              </label>
              <input
                type="text"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full text-sm border border-border rounded-input px-3 py-2 bg-white"
                placeholder="e.g. WhatsApp message: out of town"
              />
            </div>
          </div>
        </Modal>
      )}
    </Card>
  );
};

export default DailyDispatchWidget;
