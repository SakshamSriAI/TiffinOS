import React from 'react';
import { 
  Phone, 
  MapPin, 
  CheckCircle2, 
  X, 
  Clock, 
  Sparkles, 
  ExternalLink,
  AlertTriangle 
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { formatINR } from '../../utils/currency';
import { useSecurity } from '../../context/SecurityContext';

export const DispatchOrderCard = ({
  order,
  onDispatch,
  onCancel,
  onViewCustomer,
}) => {
  const { maskPhone } = useSecurity();
  const isDispatched = order.status === 'dispatched';
  const isCancelled = order.status === 'cancelled';
  const isPending = order.status === 'pending';
  const isOneTime = order.source === 'one_time';

  return (
    <div
      className={`rounded-card border p-4 sm:p-5 transition-all shadow-subtle ${
        isDispatched
          ? 'bg-white border-border/80 opacity-90'
          : isCancelled
          ? 'bg-rose-50/30 border-rose-200 opacity-75'
          : 'bg-white border-forest/30 shadow-card hover:border-forest/60'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        
        {/* Left Customer Info */}
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3
              onClick={() => onViewCustomer(order.customerId)}
              className="text-base font-bold text-forest-deep hover:text-forest cursor-pointer hover:underline"
            >
              {order.customerName}
            </h3>

            {isOneTime ? (
              <Badge variant="mint" size="sm">One-Time Order</Badge>
            ) : (
              <Badge variant="forest" size="sm">Regular Subscription</Badge>
            )}

            <span className="font-mono text-sm font-bold text-forest bg-mint/30 px-2 py-0.5 rounded">
              {formatINR(order.price)}
            </span>
          </div>

          {/* Delivery Address & Contact */}
          <div className="space-y-1 text-xs text-muted-text">
            <div className="flex items-start gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-forest flex-shrink-0 mt-0.5" />
              <span className="text-charcoal font-medium">{order.address}</span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`tel:${order.phone}`}
                className="flex items-center gap-1 text-muted-text hover:text-forest"
              >
                <Phone className="w-3 h-3 text-muted-light" />
                <span className="font-mono">{maskPhone(order.phone)}</span>
              </a>

              <a
                href={`https://wa.me/${order.phone?.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-emerald-700 hover:underline font-medium"
              >
                WhatsApp ↗
              </a>
            </div>
          </div>

          {/* Dietary Notes / Instructions */}
          {order.instructions && (
            <div className="pt-1">
              <div className="p-2 bg-amber-accent/10 border border-amber-accent/30 rounded text-xs text-amber-900 flex items-start gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-dark flex-shrink-0 mt-0.5" />
                <span className="font-medium italic">
                  Kitchen Note: "{order.instructions}"
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right Status Stamp & Action Buttons */}
        <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/60 flex-shrink-0">
          
          {isDispatched && (
            <div className="text-left sm:text-right space-y-1">
              <Badge variant="success" size="md" dot={true}>
                Dispatched
              </Badge>
              <span className="text-[11px] text-muted-text block font-mono">
                {order.dispatchedAt || 'Stamped Today'}
              </span>
            </div>
          )}

          {isCancelled && (
            <div className="text-left sm:text-right space-y-1">
              <Badge variant="error" size="md" dot={true}>
                Cancelled
              </Badge>
              <span className="text-[11px] text-rose-700 block max-w-xs truncate">
                {order.instructions || 'Excluded from bill'}
              </span>
            </div>
          )}

          {isPending && (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {/* Cancel Button */}
              <button
                type="button"
                onClick={() => onCancel(order)}
                className="px-2.5 py-2 text-xs font-medium text-muted-text hover:text-status-error hover:bg-rose-50 rounded-button border border-border transition-colors"
                title="Cancel this meal"
              >
                Cancel
              </button>

              {/* Prominent Mark Dispatched Button */}
              <Button
                variant="primary"
                size="md"
                iconLeft={CheckCircle2}
                onClick={() => onDispatch(order)}
                className="flex-1 sm:flex-initial shadow-subtle hover:scale-[1.02] active:scale-95"
              >
                Mark Dispatched
              </Button>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default DispatchOrderCard;
