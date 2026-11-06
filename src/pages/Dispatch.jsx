import React, { useState, useMemo } from 'react';
import { Truck, CheckCircle2, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import DispatchHeader from '../components/dispatch/DispatchHeader';
import DispatchStatsBar from '../components/dispatch/DispatchStatsBar';
import DispatchFilterBar from '../components/dispatch/DispatchFilterBar';
import DispatchOrderCard from '../components/dispatch/DispatchOrderCard';
import DispatchConfirmModal from '../components/dispatch/DispatchConfirmModal';
import DispatchCancelModal from '../components/dispatch/DispatchCancelModal';
import OneTimeOrderModal from '../components/dispatch/OneTimeOrderModal';
import CustomerProfileModal from '../components/customers/CustomerProfileModal';
import { EmptyState } from '../components/common/EmptyState';

export const Dispatch = () => {
  const { 
    mealOrders, 
    selectedDate, 
    markDispatched, 
    cancelMealOrder 
  } = useApp();

  const [activeService, setActiveService] = useState('lunch'); // 'lunch' | 'dinner'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'pending' | 'dispatched' | 'cancelled'
  const [sourceFilter, setSourceFilter] = useState('all'); // 'all' | 'regular' | 'one_time'

  // Modal States
  const [confirmOrder, setConfirmOrder] = useState(null);
  const [cancelOrder, setCancelOrder] = useState(null);
  const [oneTimeModalOpen, setOneTimeModalOpen] = useState(false);
  const [profileCustomerId, setProfileCustomerId] = useState(null);

  // Orders for selected date
  const dateOrders = useMemo(() => {
    return mealOrders.filter((o) => o.date === selectedDate);
  }, [mealOrders, selectedDate]);

  // Counts for the tabs
  const lunchCount = dateOrders.filter((o) => o.mealType === 'lunch').length;
  const dinnerCount = dateOrders.filter((o) => o.mealType === 'dinner').length;

  // Filtered orders for active view
  const displayedOrders = useMemo(() => {
    return dateOrders.filter((o) => {
      // Service filter
      if (o.mealType !== activeService) return false;

      // Status filter
      if (statusFilter !== 'all' && o.status !== statusFilter) return false;

      // Source filter
      if (sourceFilter !== 'all' && o.source !== sourceFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = o.customerName.toLowerCase().includes(q);
        const matchesPhone = o.phone?.includes(q);
        const matchesAddress = o.address?.toLowerCase().includes(q);
        if (!matchesName && !matchesPhone && !matchesAddress) return false;
      }

      return true;
    });
  }, [dateOrders, activeService, statusFilter, sourceFilter, searchQuery]);

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 antialiased">
      {/* 1. Header with Date Selector & Quick Booking */}
      <DispatchHeader onOpenOneTimeOrder={() => setOneTimeModalOpen(true)} />

      {/* 2. Visual Progress & Counts Bar */}
      <DispatchStatsBar
        activeService={activeService}
        orders={dateOrders}
      />

      {/* 3. Service Tabs (Lunch/Dinner), Search & Status Filter Pills */}
      <DispatchFilterBar
        activeService={activeService}
        setActiveService={setActiveService}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sourceFilter={sourceFilter}
        setSourceFilter={setSourceFilter}
        counts={{ lunch: lunchCount, dinner: dinnerCount }}
      />

      {/* 4. Kitchen Packing Line (Mobile-first Order Cards) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-muted-text px-1">
          <span>
            Showing <strong>{displayedOrders.length}</strong> orders for {activeService.toUpperCase()} batch
          </span>
          <span className="font-medium text-forest hidden sm:inline">
            Tap "Mark Dispatched" when packed
          </span>
        </div>

        {displayedOrders.length === 0 ? (
          <EmptyState
            icon={Truck}
            title={`No ${activeService} orders found`}
            description={
              searchQuery || statusFilter !== 'all' || sourceFilter !== 'all'
                ? 'Try adjusting your search or filters to see more orders.'
                : `No meal orders have been scheduled yet for ${activeService} on this date. Click "Check Schedule" in the top bar to auto-generate from weekly customer schedules.`
            }
            actionLabel="Book One-Time Order"
            onAction={() => setOneTimeModalOpen(true)}
          />
        ) : (
          <div className="space-y-3">
            {displayedOrders.map((order) => (
              <DispatchOrderCard
                key={order.id}
                order={order}
                onDispatch={(ord) => setConfirmOrder(ord)}
                onCancel={(ord) => setCancelOrder(ord)}
                onViewCustomer={(cId) => setProfileCustomerId(cId)}
              />
            ))}
          </div>
        )}
      </div>

      {/* 5. Modals */}
      <DispatchConfirmModal
        isOpen={Boolean(confirmOrder)}
        onClose={() => setConfirmOrder(null)}
        order={confirmOrder}
        onConfirm={(orderId) => markDispatched(orderId)}
      />

      <DispatchCancelModal
        isOpen={Boolean(cancelOrder)}
        onClose={() => setCancelOrder(null)}
        order={cancelOrder}
        onConfirm={(orderId, reason) => cancelMealOrder(orderId, reason)}
      />

      <OneTimeOrderModal
        isOpen={oneTimeModalOpen}
        onClose={() => setOneTimeModalOpen(false)}
      />

      <CustomerProfileModal
        isOpen={Boolean(profileCustomerId)}
        onClose={() => setProfileCustomerId(null)}
        customerId={profileCustomerId}
        onEdit={() => {}}
      />
    </div>
  );
};

export default Dispatch;
