import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  IndianRupee, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Receipt, 
  PauseCircle, 
  PlayCircle,
  Archive,
  ArchiveRestore,
  Trash2,
  AlertTriangle,
  Edit,
  History,
  AlertCircle
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/currency';
import { formatDateIST } from '../../utils/date';

const DAYS = [
  { key: 'mon', label: 'Mon' },
  { key: 'tue', label: 'Tue' },
  { key: 'wed', label: 'Wed' },
  { key: 'thu', label: 'Thu' },
  { key: 'fri', label: 'Fri' },
  { key: 'sat', label: 'Sat' },
  { key: 'sun', label: 'Sun' },
];

export const CustomerProfileModal = ({ 
  isOpen, 
  onClose, 
  customerId, 
  onEdit 
}) => {
  const { 
    getCustomerProfileData, 
    pauseCustomer, 
    reactivateCustomer, 
    archiveCustomer,
    unarchiveCustomer,
    deleteCustomer 
  } = useApp();

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'history' | 'invoices'
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteCustomer(customerId);
      setConfirmDelete(false);
      onClose();
    } catch (err) {
      console.error('Failed to delete customer:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen || !customerId) return null;

  const data = getCustomerProfileData(customerId);
  if (!data) return null;

  const { customer, customerMeals, totalDispatchedCount, totalRecognizedBill, totalPaidAmount, totalOutstanding, customerInvoices } = data;

  const isPaused = customer.status === 'paused';
  const isArchived = customer.status === 'archived';
  const isActive = customer.status === 'active';

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      title={`${customer.name}'s Profile`}
      description="Individual pricing agreement, weekly schedule, and financial ledger."
      footer={
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2 flex-wrap">
            {isActive && (
              <Button
                variant="secondary"
                size="sm"
                iconLeft={PauseCircle}
                onClick={() => pauseCustomer(customer.id)}
              >
                Pause Meals
              </Button>
            )}
            {isPaused && (
              <Button
                variant="primary"
                size="sm"
                iconLeft={PlayCircle}
                onClick={() => reactivateCustomer(customer.id)}
              >
                Reactivate Meals
              </Button>
            )}
            {!isArchived ? (
              <Button
                variant="ghost"
                size="sm"
                iconLeft={Archive}
                className="text-muted-text hover:text-charcoal"
                onClick={() => {
                  if (confirm('Archive this customer?')) {
                    archiveCustomer(customer.id);
                  }
                }}
              >
                Archive
              </Button>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                iconLeft={ArchiveRestore}
                className="text-forest hover:bg-forest/10"
                onClick={() => unarchiveCustomer(customer.id)}
              >
                Unarchive Customer
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              iconLeft={Trash2}
              className="text-status-error hover:bg-rose-50"
              onClick={() => setConfirmDelete(true)}
            >
              Delete Customer
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="sm"
              iconLeft={Edit}
              onClick={() => {
                onClose();
                onEdit(customer);
              }}
            >
              Edit Agreement
            </Button>
            <Button variant="primary" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-6">
        
        {/* Top Profile Summary Card */}
        <div className="p-4 sm:p-5 bg-surface-subtle rounded-card border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-xl font-bold text-forest-deep">{customer.name}</h2>
              <Badge variant={isActive ? 'success' : isPaused ? 'pending' : 'neutral'} size="sm" dot={true}>
                {customer.status.toUpperCase()}
              </Badge>
              <Badge variant="forest" size="sm">
                {customer.type.toUpperCase()}
              </Badge>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-text flex-wrap pt-1">
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-muted-light" />
                {customer.phone}
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-muted-light" />
                {customer.address}
              </span>
            </div>

            {customer.instructions && (
              <p className="text-xs text-amber-dark font-medium pt-1 italic">
                "{customer.instructions}"
              </p>
            )}
          </div>

          {/* Quick Rates Pill */}
          <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-card border border-border shadow-subtle flex-shrink-0">
            <div className="text-center pr-3 border-r border-border">
              <span className="text-[10px] text-muted-text uppercase font-semibold block">Lunch Rate</span>
              <span className="text-sm font-bold text-forest font-mono">{formatINR(customer.lunchPrice)}</span>
            </div>
            <div className="text-center pl-1">
              <span className="text-[10px] text-muted-text uppercase font-semibold block">Dinner Rate</span>
              <span className="text-sm font-bold text-forest font-mono">{formatINR(customer.dinnerPrice)}</span>
            </div>
          </div>
        </div>

        {/* 4-Stat Financial Ledger Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 bg-white rounded-card border border-border shadow-subtle">
            <span className="text-[10px] uppercase font-semibold text-muted-text block">Dispatched Meals</span>
            <span className="text-lg font-bold text-charcoal font-mono mt-0.5 block">{totalDispatchedCount}</span>
            <span className="text-[10px] text-muted-text">Confirmed delivered</span>
          </div>

          <div className="p-3 bg-white rounded-card border border-border shadow-subtle">
            <span className="text-[10px] uppercase font-semibold text-muted-text block">Monthly Bill</span>
            <span className="text-lg font-bold text-forest font-mono mt-0.5 block">{formatINR(totalRecognizedBill || totalDispatchedCount * customer.lunchPrice)}</span>
            <span className="text-[10px] text-muted-text">Dispatched value</span>
          </div>

          <div className="p-3 bg-emerald-50/50 rounded-card border border-emerald-200">
            <span className="text-[10px] uppercase font-semibold text-emerald-800 block">Payments Received</span>
            <span className="text-lg font-bold text-status-success font-mono mt-0.5 block">{formatINR(totalPaidAmount)}</span>
            <span className="text-[10px] text-emerald-700">UPI / Cash collected</span>
          </div>

          <div className="p-3 bg-amber-50/50 rounded-card border border-amber-200">
            <span className="text-[10px] uppercase font-semibold text-amber-800 block">Outstanding Balance</span>
            <span className="text-lg font-bold text-amber-dark font-mono mt-0.5 block">{formatINR(totalOutstanding)}</span>
            <span className="text-[10px] text-amber-700">Pending settlement</span>
          </div>
        </div>

        {/* Weekly Recurring Matrix Visualization (for regular subscribers) */}
        {customer.type === 'regular' && (
          <div className="p-4 bg-white rounded-card border border-border space-y-2">
            <span className="text-xs font-semibold text-charcoal uppercase tracking-wider block">
              Active Weekly Schedule
            </span>
            <div className="grid grid-cols-7 gap-1.5 text-center">
              {DAYS.map((d) => {
                const dayPlan = customer.schedule?.[d.key] || { lunch: false, dinner: false };
                return (
                  <div key={d.key} className="p-2 rounded bg-surface-subtle border border-border/60 text-xs">
                    <span className="font-bold text-charcoal block mb-1">{d.label}</span>
                    <div className="space-y-0.5 text-[10px]">
                      <span className={`block py-0.5 rounded font-semibold ${dayPlan.lunch ? 'bg-forest text-white' : 'text-muted-light'}`}>
                        {dayPlan.lunch ? 'Lunch' : '-'}
                      </span>
                      <span className={`block py-0.5 rounded font-semibold ${dayPlan.dinner ? 'bg-amber-accent text-white' : 'text-muted-light'}`}>
                        {dayPlan.dinner ? 'Dinner' : '-'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab Navigation for History & Invoices */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-border pb-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-button transition-colors ${
                activeTab === 'overview'
                  ? 'bg-forest text-white'
                  : 'text-muted-text hover:text-charcoal'
              }`}
            >
              Meal Delivery History ({customerMeals.length})
            </button>
            <button
              onClick={() => setActiveTab('invoices')}
              className={`text-xs font-semibold px-3 py-1.5 rounded-button transition-colors ${
                activeTab === 'invoices'
                  ? 'bg-forest text-white'
                  : 'text-muted-text hover:text-charcoal'
              }`}
            >
              Invoices & Statements ({customerInvoices.length})
            </button>
          </div>

          {/* Tab 1: Meal History Audit Trail */}
          {activeTab === 'overview' && (
            <div className="space-y-2">
              {customerMeals.length === 0 ? (
                <div className="text-center py-6 text-xs text-muted-text bg-surface-subtle rounded-card border border-dashed border-border">
                  No meal deliveries logged yet for this billing cycle.
                </div>
              ) : (
                <div className="divide-y divide-border/60 rounded-card border border-border overflow-hidden bg-white max-h-56 overflow-y-auto">
                  {customerMeals.map((meal) => (
                    <div key={meal.id} className="p-3 flex items-center justify-between text-xs">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-charcoal">{meal.date}</span>
                          <span className="text-muted-text capitalize">({meal.mealType})</span>
                          <span className="font-mono font-bold text-forest">{formatINR(meal.price)}</span>
                        </div>
                        {meal.instructions && (
                          <p className="text-[11px] text-muted-text truncate max-w-sm">{meal.instructions}</p>
                        )}
                      </div>
                      <Badge
                        variant={meal.status === 'dispatched' ? 'success' : meal.status === 'cancelled' ? 'error' : 'pending'}
                        size="sm"
                        dot={true}
                      >
                        {meal.status.toUpperCase()}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Customer Invoices */}
          {activeTab === 'invoices' && (
            <div className="space-y-2">
              {customerInvoices.length === 0 ? (
                <div className="text-center py-6 text-xs text-muted-text bg-surface-subtle rounded-card border border-dashed border-border">
                  No invoices generated yet for this customer.
                </div>
              ) : (
                <div className="divide-y divide-border/60 rounded-card border border-border overflow-hidden bg-white">
                  {customerInvoices.map((inv) => (
                    <div key={inv.id} className="p-3 flex items-center justify-between text-xs">
                      <div>
                        <span className="font-mono font-semibold text-charcoal block">{inv.invoiceNumber}</span>
                        <span className="text-[11px] text-muted-text">{inv.period} · {inv.mealCount} meals</span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono font-bold text-charcoal block">{formatINR(inv.totalAmount)}</span>
                        <Badge variant={inv.status === 'paid' ? 'success' : 'pending'} size="sm">
                          {inv.status === 'paid' ? 'Paid' : `Due: ${formatINR(inv.balanceDue)}`}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

      </div>

      {/* Delete Confirmation Dialog */}
      {confirmDelete && (
        <Modal
          isOpen={confirmDelete}
          onClose={() => setConfirmDelete(false)}
          title={`Delete Customer: ${customer.name}`}
          description="Are you sure you want to permanently delete this customer account?"
          footer={
            <>
              <Button
                variant="secondary"
                size="md"
                onClick={() => setConfirmDelete(false)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                iconLeft={Trash2}
                className="bg-rose-600 hover:bg-rose-700 text-white"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete Customer'}
              </Button>
            </>
          }
        >
          <div className="space-y-3 py-1">
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-card text-rose-900 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">Permanent Deletion Warning</p>
                <p className="mt-0.5 text-rose-700">
                  This will permanently delete <strong>{customer.name}</strong> along with all of their dispatch orders, statements, and payment records from the database. This action cannot be reversed.
                </p>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </Modal>
  );
};

export default CustomerProfileModal;
