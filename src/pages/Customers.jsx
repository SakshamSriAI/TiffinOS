import React, { useState } from 'react';
import { UserPlus, ShieldCheck } from 'lucide-react';
import CustomerStats from '../components/customers/CustomerStats';
import CustomerList from '../components/customers/CustomerList';
import CustomerModal from '../components/customers/CustomerModal';
import CustomerProfileModal from '../components/customers/CustomerProfileModal';
import { Button } from '../components/common/Button';

export const Customers = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [viewingCustomerId, setViewingCustomerId] = useState(null);

  const handleOpenAdd = () => {
    setEditingCustomer(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (customer) => {
    setEditingCustomer(customer);
    setModalOpen(true);
  };

  const handleViewProfile = (customer) => {
    setViewingCustomerId(customer.id);
  };

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 antialiased">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-border/60">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-forest-deep">
              Customer Management
            </h1>
            <span className="text-xs bg-forest/10 text-forest font-semibold px-2 py-0.5 rounded">
              Single Business Ledger
            </span>
          </div>
          <p className="text-xs sm:text-sm text-charcoal/80 mt-1">
            Maintain individual lunch & dinner agreements, weekly delivery schedules, and customer statements.
          </p>
        </div>

        <Button
          variant="primary"
          size="md"
          iconLeft={UserPlus}
          onClick={handleOpenAdd}
        >
          Add New Customer
        </Button>
      </div>

      {/* 1. Customer KPI Statistics Cards */}
      <CustomerStats />

      {/* 2. Customer Table / Mobile Cards with Search & Filters */}
      <CustomerList
        onViewProfile={handleViewProfile}
        onEditCustomer={handleOpenEdit}
      />

      {/* 3. Add / Edit Customer Modal */}
      <CustomerModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        customer={editingCustomer}
      />

      {/* 4. Complete Customer Profile & History Modal */}
      <CustomerProfileModal
        isOpen={Boolean(viewingCustomerId)}
        onClose={() => setViewingCustomerId(null)}
        customerId={viewingCustomerId}
        onEdit={handleOpenEdit}
      />
    </div>
  );
};

export default Customers;
