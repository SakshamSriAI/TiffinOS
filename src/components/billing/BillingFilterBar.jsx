import React, { useState } from 'react';
import { Search, Plus, Receipt, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { useApp } from '../../context/AppContext';

export const BillingFilterBar = ({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  onOpenGenerateModal,
}) => {
  const { generateBulkInvoices } = useApp();
  const [bulkFeedback, setBulkFeedback] = useState(null);

  const handleBulkGenerate = () => {
    const count = generateBulkInvoices('01 Nov 2026 – 30 Nov 2026');
    if (count > 0) {
      setBulkFeedback(`Successfully generated ${count} customer invoices.`);
    } else {
      setBulkFeedback('All active customers already have issued invoices for this period.');
    }
    setTimeout(() => setBulkFeedback(null), 4000);
  };

  return (
    <div className="bg-white p-4 rounded-card border border-border shadow-subtle space-y-3">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        
        {/* Left: Search input */}
        <div className="w-full lg:max-w-md">
          <Input
            placeholder="Search by invoice number or customer name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            iconLeft={Search}
          />
        </div>

        {/* Right: Status Filters and Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap justify-between lg:justify-end">
          
          {/* Status Tabs */}
          <div className="inline-flex rounded-button bg-surface-subtle p-1 border border-border">
            {[
              { id: 'all', label: 'All Invoices' },
              { id: 'unpaid', label: 'Unpaid' },
              { id: 'partially_paid', label: 'Partially Paid' },
              { id: 'paid', label: 'Paid' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-button transition-colors ${
                  statusFilter === tab.id
                    ? 'bg-forest text-white shadow-xs'
                    : 'text-muted-text hover:text-charcoal'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              iconLeft={Receipt}
              onClick={handleBulkGenerate}
              title="Generate invoices for all eligible active customers with dispatched meals"
            >
              Bulk Generate
            </Button>

            <Button
              variant="primary"
              size="sm"
              iconLeft={Plus}
              onClick={onOpenGenerateModal}
            >
              Create Invoice
            </Button>
          </div>

        </div>

      </div>

      {bulkFeedback && (
        <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-status-success text-xs rounded font-medium flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          <span>{bulkFeedback}</span>
        </div>
      )}
    </div>
  );
};

export default BillingFilterBar;
