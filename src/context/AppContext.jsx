import React, { createContext, useContext, useState, useMemo } from 'react';
import { 
  INITIAL_CUSTOMERS, 
  INITIAL_MEAL_ORDERS, 
  INITIAL_EXPENSES, 
  INITIAL_INVOICES, 
  INITIAL_ACTIVITIES 
} from '../data/mockData';
import { getTodayIST, formatDateIST } from '../utils/date';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [mealOrders, setMealOrders] = useState(INITIAL_MEAL_ORDERS);
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [invoices, setInvoices] = useState(INITIAL_INVOICES);
  const [activities, setActivities] = useState(INITIAL_ACTIVITIES);
  const [activeModal, setActiveModal] = useState(null); // 'addCustomer' | 'addOrder' | 'generateBills' | 'addExpense' | null
  const [selectedDate, setSelectedDate] = useState('2026-11-06');

  // Customer Management Actions
  const addCustomer = (customerData) => {
    const newCust = {
      ...customerData,
      id: `cust-${Date.now()}`,
      status: 'active',
      createdAt: getTodayIST(),
    };
    setCustomers((prev) => [newCust, ...prev]);

    // Prepend activity
    const newActivity = {
      id: `act-${Date.now()}`,
      type: 'customer',
      title: 'New Customer Registered',
      description: `${newCust.name} added with Lunch: ₹${newCust.lunchPrice}, Dinner: ₹${newCust.dinnerPrice}.`,
      timestamp: 'Just now',
      badge: 'New',
      badgeVariant: 'forest',
    };
    setActivities((prev) => [newActivity, ...prev]);

    return newCust;
  };

  const updateCustomer = (id, updatedFields) => {
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          // Rule: If price changes, historical dispatches are untouched!
          return { ...c, ...updatedFields };
        }
        return c;
      })
    );

    const cust = customers.find((c) => c.id === id);
    if (cust) {
      const newActivity = {
        id: `act-${Date.now()}`,
        type: 'customer',
        title: 'Customer Profile Updated',
        description: `Updated preferences for ${cust.name}.`,
        timestamp: 'Just now',
        badge: 'Updated',
        badgeVariant: 'neutral',
      };
      setActivities((prev) => [newActivity, ...prev]);
    }
  };

  const pauseCustomer = (id, reason = 'Paused by owner') => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'paused', instructions: `${c.instructions || ''} [Paused: ${reason}]`.trim() } : c))
    );
  };

  const reactivateCustomer = (id) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'active' } : c))
    );
  };

  const archiveCustomer = (id) => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: 'archived' } : c))
    );
  };

  const toggleCustomerStatus = (id) => {
    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const nextStatus = c.status === 'active' ? 'paused' : 'active';
          return { ...c, status: nextStatus };
        }
        return c;
      })
    );
  };

  // Helper to get all details, invoices, and meal history for a specific customer
  const getCustomerProfileData = (customerId) => {
    const customer = customers.find((c) => c.id === customerId);
    if (!customer) return null;

    const customerMeals = mealOrders.filter((m) => m.customerId === customerId);
    const dispatchedMeals = customerMeals.filter((m) => m.status === 'dispatched');
    const customerInvoices = invoices.filter((i) => i.customerId === customerId);

    const totalDispatchedCount = dispatchedMeals.length + (customer.id === 'cust-1' ? 44 : 20); // historical seed offset
    const totalRecognizedBill = customerInvoices.reduce((sum, inv) => sum + Number(inv.totalAmount || 0), 0);
    const totalPaidAmount = customerInvoices.reduce((sum, inv) => sum + Number(inv.paidAmount || 0), 0);
    const totalOutstanding = customerInvoices.reduce((sum, inv) => sum + Number(inv.balanceDue || 0), 0);

    return {
      customer,
      customerMeals,
      dispatchedMeals,
      customerInvoices,
      totalDispatchedCount,
      totalRecognizedBill,
      totalPaidAmount,
      totalOutstanding,
    };
  };

  // DISPATCH MODULE ACTIONS

  // 1. Mark as Dispatched (enforces timestamp, billable eligibility, single dispatch)
  const markDispatched = (orderId) => {
    const order = mealOrders.find((o) => o.id === orderId);
    if (!order) return;
    if (order.status === 'dispatched') return; // Prevent duplicate dispatch

    const timeNow = formatDateIST(new Date(), 'time');

    setMealOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, status: 'dispatched', dispatchedAt: timeNow }
          : o
      )
    );

    // Add activity
    const newActivity = {
      id: `act-${Date.now()}`,
      type: 'dispatch',
      title: 'Tiffin Dispatched',
      description: `${order.mealType.toUpperCase()} dispatched to ${order.customerName} (${order.address}).`,
      timestamp: 'Just now',
      badge: 'Dispatched',
      badgeVariant: 'success',
    };
    setActivities((prev) => [newActivity, ...prev]);
  };

  // 2. Cancel Meal Order (excluded from billing, preserved for audit)
  const cancelMealOrder = (orderId, reason = 'Customer request') => {
    setMealOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, status: 'cancelled', instructions: `Cancelled: ${reason}` }
          : o
      )
    );
  };

  // 3. One-Time Order Creation (with duplicate prevention and multi-slot support)
  const addOneTimeOrder = (orderData) => {
    const slots = Array.isArray(orderData.mealSlots)
      ? orderData.mealSlots
      : [orderData.mealType || 'lunch'];

    const createdOrders = [];
    const duplicates = [];

    slots.forEach((slot) => {
      // Duplicate prevention rule: Customer + Date + MealType must be unique
      const alreadyExists = mealOrders.some(
        (o) =>
          o.customerId === orderData.customerId &&
          o.date === orderData.date &&
          o.mealType === slot
      );

      if (alreadyExists) {
        duplicates.push(slot);
        return;
      }

      const price = slot === 'lunch'
        ? (orderData.lunchPrice || orderData.price)
        : (orderData.dinnerPrice || orderData.price);

      const newOrder = {
        id: `order-ot-${Date.now()}-${slot}`,
        customerId: orderData.customerId,
        customerName: orderData.customerName,
        date: orderData.date,
        mealType: slot,
        price: Number(price),
        source: 'one_time',
        status: 'pending',
        address: orderData.address,
        phone: orderData.phone,
        instructions: orderData.instructions || 'One-time order',
      };
      createdOrders.push(newOrder);
    });

    if (createdOrders.length > 0) {
      setMealOrders((prev) => [...createdOrders, ...prev]);

      const newActivity = {
        id: `act-${Date.now()}`,
        type: 'dispatch',
        title: 'One-Time Order Booked',
        description: `${orderData.customerName} booked ${slots.join(' & ')} for ${orderData.date}.`,
        timestamp: 'Just now',
        badge: 'One-Time',
        badgeVariant: 'mint',
      };
      setActivities((prev) => [newActivity, ...prev]);
    }

    return { created: createdOrders, duplicates };
  };

  // 4. Automatic Scheduled Order Generator (with duplicate check!)
  const generateDailyScheduledOrders = (dateStr) => {
    const d = new Date(dateStr);
    const daysMap = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const dayOfWeek = daysMap[d.getDay()];

    const activeRegulars = customers.filter(
      (c) => c.status === 'active' && c.type === 'regular'
    );
    const newOrders = [];

    activeRegulars.forEach((cust) => {
      const daySchedule = cust.schedule?.[dayOfWeek];
      if (!daySchedule) return;

      // Check lunch
      if (daySchedule.lunch) {
        const alreadyExists = mealOrders.some(
          (o) => o.customerId === cust.id && o.date === dateStr && o.mealType === 'lunch'
        );
        if (!alreadyExists) {
          newOrders.push({
            id: `order-gen-${cust.id}-lunch-${dateStr}`,
            customerId: cust.id,
            customerName: cust.name,
            date: dateStr,
            mealType: 'lunch',
            price: cust.lunchPrice,
            source: 'regular',
            status: 'pending',
            instructions: cust.instructions || '',
            address: cust.address,
            phone: cust.phone,
          });
        }
      }

      // Check dinner
      if (daySchedule.dinner) {
        const alreadyExists = mealOrders.some(
          (o) => o.customerId === cust.id && o.date === dateStr && o.mealType === 'dinner'
        );
        if (!alreadyExists) {
          newOrders.push({
            id: `order-gen-${cust.id}-dinner-${dateStr}`,
            customerId: cust.id,
            customerName: cust.name,
            date: dateStr,
            mealType: 'dinner',
            price: cust.dinnerPrice,
            source: 'regular',
            status: 'pending',
            instructions: cust.instructions || '',
            address: cust.address,
            phone: cust.phone,
          });
        }
      }
    });

    if (newOrders.length > 0) {
      setMealOrders((prev) => [...prev, ...newOrders]);
      return newOrders.length;
    }
    return 0;
  };

  // Expense Actions
  const addExpense = (expenseData) => {
    const newExp = {
      ...expenseData,
      id: `exp-${Date.now()}`,
      date: expenseData.date || getTodayIST(),
    };
    setExpenses((prev) => [newExp, ...prev]);

    // Add activity
    const newActivity = {
      id: `act-${Date.now()}`,
      type: 'expense',
      title: 'Kitchen Expense Recorded',
      description: `${newExp.title} (₹${newExp.amount}) recorded via ${newExp.paymentMethod}.`,
      timestamp: 'Just now',
      amount: newExp.amount,
      badge: 'Expense',
      badgeVariant: 'amber',
    };
    setActivities((prev) => [newActivity, ...prev]);

    return newExp;
  };

  const deleteExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  // Invoicing & Payment Actions
  const recordPayment = (invoiceId, amount, paymentMethod = 'UPI', notes = '') => {
    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === invoiceId) {
          const newPaid = Number(inv.paidAmount) + Number(amount);
          const newBalance = Math.max(0, Number(inv.totalAmount) - newPaid);
          const newStatus = newBalance === 0 ? 'paid' : 'partially_paid';

          return {
            ...inv,
            paidAmount: newPaid,
            balanceDue: newBalance,
            status: newStatus,
          };
        }
        return inv;
      })
    );

    const inv = invoices.find((i) => i.id === invoiceId);
    if (inv) {
      const newActivity = {
        id: `act-${Date.now()}`,
        type: 'payment',
        title: 'Payment Received',
        description: `Received ₹${amount} from ${inv.customerName} via ${paymentMethod}.`,
        timestamp: 'Just now',
        amount: Number(amount),
        badge: 'Payment',
        badgeVariant: 'success',
      };
      setActivities((prev) => [newActivity, ...prev]);
    }
  };

  // Derived Financials & Metrics
  const metrics = useMemo(() => {
    const totalCustCount = customers.length;
    const activeCustCount = customers.filter((c) => c.status === 'active').length;
    const pausedCustCount = customers.filter((c) => c.status === 'paused').length;
    const archivedCustCount = customers.filter((c) => c.status === 'archived').length;
    const regularCustCount = customers.filter((c) => c.type === 'regular' && c.status === 'active').length;
    const occasionalCustCount = customers.filter((c) => c.type === 'occasional' && c.status === 'active').length;

    // Selected date meal stats
    const todayOrders = mealOrders.filter((o) => o.date === selectedDate);
    const expectedToday = todayOrders.length;
    const dispatchedToday = todayOrders.filter((o) => o.status === 'dispatched').length;
    const pendingToday = todayOrders.filter((o) => o.status === 'pending').length;
    const cancelledToday = todayOrders.filter((o) => o.status === 'cancelled').length;

    // Lunch vs Dinner
    const lunchOrders = todayOrders.filter((o) => o.mealType === 'lunch');
    const dinnerOrders = todayOrders.filter((o) => o.mealType === 'dinner');

    const lunchDispatched = lunchOrders.filter((o) => o.status === 'dispatched').length;
    const dinnerDispatched = dinnerOrders.filter((o) => o.status === 'dispatched').length;

    // Month-to-date financials
    const mealRevenue = mealOrders
      .filter((o) => o.status === 'dispatched')
      .reduce((sum, o) => sum + Number(o.price || 0), 0) + 33800;

    const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
    const paymentsReceived = invoices.reduce((sum, i) => sum + Number(i.paidAmount || 0), 0);
    const outstandingPayments = invoices.reduce((sum, i) => sum + Number(i.balanceDue || 0), 0);
    const operatingProfit = mealRevenue - totalExpenses;

    return {
      totalCustCount,
      activeCustCount,
      pausedCustCount,
      archivedCustCount,
      regularCustCount,
      occasionalCustCount,
      expectedToday,
      dispatchedToday,
      pendingToday,
      cancelledToday,
      lunchOrders,
      dinnerOrders,
      lunchDispatched,
      dinnerDispatched,
      mealRevenue,
      totalExpenses,
      paymentsReceived,
      outstandingPayments,
      operatingProfit,
    };
  }, [customers, mealOrders, expenses, invoices, selectedDate]);

  const value = {
    customers,
    mealOrders,
    expenses,
    invoices,
    activities,
    selectedDate,
    setSelectedDate,
    activeModal,
    setActiveModal,
    addCustomer,
    updateCustomer,
    pauseCustomer,
    reactivateCustomer,
    archiveCustomer,
    toggleCustomerStatus,
    getCustomerProfileData,
    markDispatched,
    cancelMealOrder,
    addOneTimeOrder,
    generateDailyScheduledOrders,
    addExpense,
    deleteExpense,
    recordPayment,
    metrics,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;
