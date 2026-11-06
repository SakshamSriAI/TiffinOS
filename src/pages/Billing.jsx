import React, { useState, useMemo } from 'react';
import { Receipt, Plus, Sparkles, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BillingStatsBar } from '../components/billing/BillingStatsBar';
import { BillingFilterBar } from '../components/billing/BillingFilterBar';
import { InvoiceTable } from '../components/billing/InvoiceTable';
import { InvoicePreviewModal } from '../components/billing/InvoicePreviewModal';
import { RecordPaymentModal } from '../components/billing/RecordPaymentModal';
import { GenerateInvoiceModal } from '../components/billing/GenerateInvoiceModal';

export const Billing = () => {
  const { invoices } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'unpaid' | 'partially_paid' | 'paid'
  
  // Modals state
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);

  // Filter invoices based on search & status
  const filteredInvoices = useMemo(() => {
    return invoices.filter((inv) => {
      // Status filter
      if (statusFilter !== 'all' && inv.status !== statusFilter) {
        return false;
      }

      // Search query (invoice number or customer name or customer phone)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const numMatch = inv.invoiceNumber?.toLowerCase().includes(query);
        const nameMatch = inv.customerName?.toLowerCase().includes(query);
        const phoneMatch = inv.customerPhone?.includes(query);
        if (!numMatch && !nameMatch && !phoneMatch) return false;
      }

      return true;
    });
  }, [invoices, statusFilter, searchQuery]);

  const handleViewInvoice = (invoice) => {
    setSelectedInvoice(invoice);
    setIsPreviewOpen(true);
  };

  const handleRecordPayment = (invoice) => {
    setSelectedInvoice(invoice);
    setIsRecordPaymentOpen(true);
  };

  const handleInvoiceCreated = (newInvoice) => {
    setSelectedInvoice(newInvoice);
    setIsPreviewOpen(true);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-charcoal">
            Monthly Billing & Invoices
          </h1>
          <p className="text-sm text-muted-text mt-0.5">
            Auto-generate customer billing from verified dispatches. Track cash/UPI payments and outstanding balances.
          </p>
        </div>
      </div>

      {/* KPI Stats Bar */}
      <BillingStatsBar invoices={invoices} />

      {/* Search, Filter & Action Bar */}
      <BillingFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        onOpenGenerateModal={() => setIsGenerateModalOpen(true)}
      />

      {/* Invoices List / Table */}
      <InvoiceTable
        invoices={filteredInvoices}
        onViewInvoice={handleViewInvoice}
        onRecordPayment={handleRecordPayment}
      />

      {/* Modal: Invoice Printable Preview */}
      <InvoicePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        invoice={selectedInvoice}
        onRecordPayment={handleRecordPayment}
      />

      {/* Modal: Record Payment */}
      <RecordPaymentModal
        isOpen={isRecordPaymentOpen}
        onClose={() => setIsRecordPaymentOpen(false)}
        invoice={selectedInvoice}
      />

      {/* Modal: Generate Customer Invoice */}
      <GenerateInvoiceModal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        onInvoiceCreated={handleInvoiceCreated}
      />

    </div>
  );
};

export default Billing;
