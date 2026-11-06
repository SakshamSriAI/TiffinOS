import React from 'react';
import { Search, Sun, Moon, Filter } from 'lucide-react';
import { Input } from '../common/Input';

export const DispatchFilterBar = ({
  activeService,
  setActiveService,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  sourceFilter,
  setSourceFilter,
  counts = { lunch: 0, dinner: 0 },
}) => {
  return (
    <div className="bg-white p-4 rounded-card border border-border shadow-subtle space-y-3">
      {/* Top Row: Service Switcher Tabs (Lunch vs Dinner) */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-border/70">
        <div className="inline-flex rounded-card bg-surface-subtle p-1 border border-border w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveService('lunch')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2 rounded-button text-xs font-bold transition-all ${
              activeService === 'lunch'
                ? 'bg-forest text-white shadow-sm'
                : 'text-muted-text hover:text-charcoal'
            }`}
          >
            <Sun className="w-4 h-4" />
            <span>Lunch Service ({counts.lunch})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveService('dinner')}
            className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2 rounded-button text-xs font-bold transition-all ${
              activeService === 'dinner'
                ? 'bg-amber-accent text-white shadow-sm'
                : 'text-muted-text hover:text-charcoal'
            }`}
          >
            <Moon className="w-4 h-4" />
            <span>Dinner Service ({counts.dinner})</span>
          </button>
        </div>

        {/* Source Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-text font-medium hidden sm:inline">Source:</span>
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="text-xs bg-white border border-border rounded-button px-3 py-1.5 text-charcoal focus:ring-forest/20 focus:border-forest"
          >
            <option value="all">All Sources (Regular + One-time)</option>
            <option value="regular">Regular Subscriptions Only</option>
            <option value="one_time">One-Time Orders Only</option>
          </select>
        </div>
      </div>

      {/* Bottom Row: Customer Search and Status Filter Pills */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="w-full md:max-w-md">
          <Input
            placeholder="Search customer, phone, or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            iconLeft={Search}
          />
        </div>

        {/* Status Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {[
            { id: 'all', label: 'All Statuses' },
            { id: 'pending', label: 'Pending Packing' },
            { id: 'dispatched', label: 'Dispatched' },
            { id: 'cancelled', label: 'Cancelled' },
          ].map((pill) => (
            <button
              key={pill.id}
              type="button"
              onClick={() => setStatusFilter(pill.id)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-button transition-colors ${
                statusFilter === pill.id
                  ? 'bg-forest text-white'
                  : 'bg-surface-subtle text-muted-text hover:text-charcoal border border-border'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DispatchFilterBar;
