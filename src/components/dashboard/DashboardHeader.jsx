import React from 'react';
import { Calendar, ShieldCheck, Clock, Store } from 'lucide-react';
import { formatDateIST } from '../../utils/date';
import { Badge } from '../common/Badge';
import { useApp } from '../../context/AppContext';

export const DashboardHeader = () => {
  const { settings } = useApp();
  const fullDateIST = formatDateIST(new Date(), 'full');
  const currentTimeIST = formatDateIST(new Date(), 'time');

  const businessName = settings?.businessName || 'Shree Annapurna Tiffins';
  const ownerName = settings?.ownerName || 'Saksham';

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-2 border-b border-border/60">
      {/* Greeting and Context */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-forest-deep">
            Namaste, {ownerName} 👋
          </h1>
          <Badge variant="mint" size="sm">
            <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse" />
            Kitchen Active
          </Badge>
        </div>
        <p className="text-xs sm:text-sm text-charcoal/80 flex items-center gap-1.5 flex-wrap">
          <span>Operations overview for</span>
          <strong className="text-forest-deep font-semibold">{businessName}</strong>
          <span className="text-muted-text">· Single Family Kitchen</span>
        </p>
      </div>

      {/* Date & Time Widget */}
      <div className="flex items-center gap-3">
        <div className="bg-white px-3.5 py-2 rounded-card border border-border shadow-subtle flex items-center gap-2.5">
          <Calendar className="w-4 h-4 text-forest" />
          <div className="text-right">
            <span className="text-xs font-bold text-charcoal block leading-none">{fullDateIST}</span>
            <span className="text-[10px] text-muted-text font-mono mt-0.5 block">Indian Standard Time (IST)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
