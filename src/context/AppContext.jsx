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

  // Customer Actions
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
      prev.map((c) => (c.id === id ? { ...c, ...updatedFields } : c))
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

  // Dispatch Actions
  const markDispatched = (orderId) => {
    const order = mealOrders.find((o) => o.id === orderId);
    if (!order) return;

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

  const cancelMealOrder = (orderId, reason = 'Customer request') => {
    setMealOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? { ...o, status: 'cancelled', instructions: `Cancelled: ${reason}` }
          : o
      )
    );
  };

  const addOneTimeOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: `order-${Date.now()}`,
      source: 'one_time',
      status: 'pending',
    };
    setMealOrders((prev) => [newOrder, ...prev]);

    // Add activity
    const newActivity = {
      id: `act-${Date.now()}`,
      type: 'dispatch',
      title: 'One-Time Order Created',
      description: `${newOrder.mealType.toUpperCase()} booked for ${newOrder.customerName} on ${newOrder.date}.`,
      timestamp: 'Just now',
      badge: 'One-Time',
      badgeVariant: 'mint',
    };
    setActivities((prev) => [newActivity, ...prev]);

    return newOrder;
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
    const activeCustCount = customers.filter((c) => c.status === 'active').length;
    const regularCustCount = customers.filter((c) => c.type === 'regular' && c.status === 'active').length;
    const occasionalCustCount = customers.filter((c) => c.type === 'occasional' && c.status === 'active').length;

    // Today's meal stats
    const todayOrders = mealOrders.filter((o) => o.date === selectedDate);
    const expectedToday = todayOrders.length;
    const dispatchedToday = todayOrders.filter((o) => o.status === 'dispatched').length;
    const pendingToday = todayOrders.filter((o) => o.status === 'pending').length;

    // Lunch vs Dinner today
    const lunchOrders = todayOrders.filter((o) => o.mealType === 'lunch');
    const dinnerOrders = todayOrders.filter((o) => o.mealType === 'dinner');

    const lunchDispatched = lunchOrders.filter((o) => o.status === 'dispatched').length;
    const dinnerDispatched = dinnerOrders.filter((o) => o.status === 'dispatched').length;

    // Month-to-date financials
    // Meal revenue = recognized value of meals with dispatched status
    const mealRevenue = mealOrders
      .filter((o) => o.status === 'dispatched')
      .reduce((sum, o) => sum + Number(o.price || 0), 0) + 33800; // adding prior days in Nov

    const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount || 0), 0);
    const paymentsReceived = invoices.reduce((sum, i) => sum + Number(i.paidAmount || 0), 0);
    const outstandingPayments = invoices.reduce((sum, i) => sum + Number(i.balanceDue || 0), 0);
    const operatingProfit = mealRevenue - totalExpenses;

    return {
      activeCustCount,
      regularCustCount,
      occasionalCustCount,
      expectedToday,
      dispatchedToday,
      pendingToday,
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
    toggleCustomerStatus,
    markDispatched,
    cancelMealOrder,
    addOneTimeOrder,
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
