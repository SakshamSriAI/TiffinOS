import React from 'react';
import { Truck, CheckCircle2, TrendingDown, IndianRupee, Clock, ArrowUpRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../common/Card';
import { Badge } from '../common/Badge';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/currency';

export const RecentActivityFeed = () => {
  const { activities } = useApp();

  return (
    <Card className="shadow-subtle">
      <CardHeader>
        <div className="flex items-center justify-between w-full">
          <div>
            <CardTitle className="text-base text-charcoal">Recent Kitchen Activity</CardTitle>
            <CardDescription>Live log of dispatches, payments, and expenses</CardDescription>
          </div>
          <Badge variant="neutral" size="sm">
            <span className="w-1.5 h-1.5 rounded-full bg-forest animate-pulse" />
            Live Feed
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="divide-y divide-border/60">
          {activities.slice(0, 6).map((item) => {
            const isDispatch = item.type === 'dispatch';
            const isPayment = item.type === 'payment';
            const isExpense = item.type === 'expense';

            return (
              <div
                key={item.id}
                className="p-4 flex items-start gap-3.5 hover:bg-surface-subtle/50 transition-colors"
              >
                {/* Semantic Icon */}
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    isDispatch
                      ? 'bg-emerald-100 text-status-success'
                      : isPayment
                      ? 'bg-mint text-forest-deep'
                      : isExpense
                      ? 'bg-amber-100 text-amber-dark'
                      : 'bg-forest/10 text-forest'
                  }`}
                >
                  {isDispatch ? (
                    <Truck className="w-4 h-4" />
                  ) : isPayment ? (
                    <IndianRupee className="w-4 h-4" />
                  ) : isExpense ? (
                    <TrendingDown className="w-4 h-4" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <p className="text-xs font-bold text-charcoal truncate">{item.title}</p>
                    <span className="text-[10px] text-muted-text flex items-center gap-1 flex-shrink-0">
                      <Clock className="w-3 h-3 text-muted-light" />
                      {item.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-muted-text leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Badge/Amount */}
                {item.amount ? (
                  <span
                    className={`font-mono text-xs font-bold flex-shrink-0 ${
                      isPayment ? 'text-status-success' : 'text-charcoal'
                    }`}
                  >
                    {isPayment ? '+' : '-'}{formatINR(item.amount)}
                  </span>
                ) : (
                  <Badge variant={item.badgeVariant || 'neutral'} size="sm">
                    {item.badge}
                  </Badge>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivityFeed;
