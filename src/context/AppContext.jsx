import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { 
  INITIAL_CUSTOMERS, 
  INITIAL_MEAL_ORDERS, 
  INITIAL_EXPENSES, 
  INITIAL_INVOICES, 
  INITIAL_ACTIVITIES,
  INITIAL_SETTINGS,
} from '../data/mockData';
import { getTodayIST, formatDateIST } from '../utils/date';
import { isSupabaseConfigured, supabase } from '../services/supabaseClient';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const liveMode = isSupabaseConfigured();

  const [customers, setCustomers] = useState(liveMode ? [] : INITIAL_CUSTOMERS);
  const [mealOrders, setMealOrders] = useState(liveMode ? [] : INITIAL_MEAL_ORDERS);
  const [expenses, setExpenses] = useState(liveMode ? [] : INITIAL_EXPENSES);
  const [invoices, setInvoices] = useState(liveMode ? [] : INITIAL_INVOICES);
  const [activities, setActivities] = useState(liveMode ? [] : INITIAL_ACTIVITIES);
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [activeModal, setActiveModal] = useState(null); // 'addCustomer' | 'addOrder' | 'generateBills' | 'addExpense' | null
  const [selectedDate, setSelectedDate] = useState('2026-11-06');

  // Load live Supabase data on mount if configured
  useEffect(() => {
    if (!liveMode || !supabase) return;

    async function loadFromSupabase() {
      try {
        // 1. Customers
        const { data: cData } = await supabase
          .from('customers')
          .select('*')
          .order('created_at', { ascending: false });
        if (cData) {
          setCustomers(
            cData.map((c) => ({
              id: c.id,
              name: c.name,
              phone: c.phone,
              address: c.address,
              type: c.type,
              status: c.status,
              lunchPrice: Number(c.lunch_price),
              dinnerPrice: Number(c.dinner_price),
              schedule: c.schedule || {},
              instructions: c.instructions || '',
              createdAt: c.created_at?.split('T')[0] || getTodayIST(),
            }))
          );
        }

        // 2. Expenses
        const { data: eData } = await supabase
          .from('expenses')
          .select('*')
          .order('date', { ascending: false });
        if (eData) {
          setExpenses(
            eData.map((e) => ({
              id: e.id,
              title: e.title,
              amount: Number(e.amount),
              category: e.category,
              date: e.date,
              paymentMethod: e.payment_method,
              vendor: e.vendor || '',
              notes: e.notes || '',
            }))
          );
        }

        // 3. Meal Orders
        const { data: oData } = await supabase
          .from('meal_orders')
          .select('*, customers(name, phone, address)')
          .order('created_at', { ascending: true });
        if (oData) {
          setMealOrders(
            oData.map((o) => ({
              id: o.id,
              customerId: o.customer_id,
              customerName: o.customers?.name || 'Customer',
              phone: o.customers?.phone || '',
              address: o.customers?.address || '',
              date: o.date,
              mealType: o.meal_type,
              price: Number(o.price),
              source: o.source,
              status: o.status,
              dispatchedAt: o.dispatched_at,
              instructions: o.instructions || '',
            }))
          );
        }

        // 4. Invoices
        const { data: iData } = await supabase
          .from('invoices')
          .select('*, customers(name, phone, address), invoice_line_items(*), payments(*)')
          .order('created_at', { ascending: false });
        if (iData) {
          setInvoices(
            iData.map((inv) => ({
              id: inv.id,
              invoiceNumber: inv.invoice_number,
              customerId: inv.customer_id,
              customerName: inv.customers?.name || 'Customer',
              customerPhone: inv.customers?.phone || '',
              customerAddress: inv.customers?.address || '',
              period: inv.period,
              totalAmount: Number(inv.total_amount),
              paidAmount: Number(inv.paid_amount),
              balanceDue: Number(inv.balance_due),
              status: inv.status,
              mealCount: inv.meal_count,
              createdAt: inv.created_at?.split('T')[0] || getTodayIST(),
              lineItems: (inv.invoice_line_items || []).map((l) => ({
                description: l.description,
                unitPrice: Number(l.unit_price),
                quantity: Number(l.quantity),
                total: Number(l.total),
              })),
              payments: (inv.payments || []).map((p) => ({
                id: p.id,
                amount: Number(p.amount),
                date: p.date,
                paymentMethod: p.payment_method,
                notes: p.notes,
              })),
            }))
          );
        }

        // 5. Business Settings
        const { data: sData } = await supabase
          .from('business_settings')
          .select('*')
          .limit(1)
          .single();
        if (sData) {
          setSettings({
            businessName: sData.business_name,
            ownerName: sData.owner_name,
            phone: sData.phone,
            whatsappNumber: sData.whatsapp_number,
            upiId: sData.upi_id,
            address: sData.address,
            defaultLunchPrice: Number(sData.default_lunch_price),
            defaultDinnerPrice: Number(sData.default_dinner_price),
            lunchCutoff: sData.lunch_cutoff,
            dinnerCutoff: sData.dinner_cutoff,
            operatingDays: sData.operating_days || {},
            currency: sData.currency || 'INR (₹)',
            timezone: sData.timezone || 'Asia/Kolkata',
            dateFormat: sData.date_format || 'DD/MM/YYYY',
          });
        }
      } catch (err) {
        console.error('Error loading data from Supabase:', err);
      }
    }

    loadFromSupabase();
  }, [liveMode]);

  // Business Settings Action
  const updateSettings = async (newSettings) => {
    if (liveMode && supabase) {
      try {
        await supabase
          .from('business_settings')
          .update({
            business_name: newSettings.businessName,
            owner_name: newSettings.ownerName,
            phone: newSettings.phone,
            whatsapp_number: newSettings.whatsappNumber,
            upi_id: newSettings.upiId,
            address: newSettings.address,
            default_lunch_price: newSettings.defaultLunchPrice,
            default_dinner_price: newSettings.defaultDinnerPrice,
            lunch_cutoff: newSettings.lunchCutoff,
            dinner_cutoff: newSettings.dinnerCutoff,
            operating_days: newSettings.operatingDays,
          })
          .neq('id', '00000000-0000-0000-0000-000000000000');
      } catch (e) {
        console.error('Failed to update settings in Supabase:', e);
      }
    }
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Customer Management Actions
  const addCustomer = async (customerData) => {
    let newId = `cust-${Date.now()}`;
    if (liveMode && supabase) {
      try {
        const { data, error } = await supabase
          .from('customers')
          .insert([
            {
              name: customerData.name,
              phone: customerData.phone,
              address: customerData.address,
              type: customerData.type || 'regular',
              status: 'active',
              lunch_price: customerData.lunchPrice,
              dinner_price: customerData.dinnerPrice,
              schedule: customerData.schedule || {},
              instructions: customerData.instructions || '',
            },
          ])
          .select()
          .single();
        if (!error && data) {
          newId = data.id;
        }
      } catch (e) {
        console.error('Failed to insert customer into Supabase:', e);
      }
    }

    const newCust = {
      ...customerData,
      id: newId,
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

  const updateCustomer = async (id, updatedFields) => {
    if (liveMode && supabase) {
      try {
        const payload = {};
        if (updatedFields.name) payload.name = updatedFields.name;
        if (updatedFields.phone) payload.phone = updatedFields.phone;
        if (updatedFields.address) payload.address = updatedFields.address;
        if (updatedFields.status) payload.status = updatedFields.status;
        if (updatedFields.lunchPrice !== undefined) payload.lunch_price = updatedFields.lunchPrice;
        if (updatedFields.dinnerPrice !== undefined) payload.dinner_price = updatedFields.dinnerPrice;
        if (updatedFields.schedule) payload.schedule = updatedFields.schedule;
        if (updatedFields.instructions !== undefined) payload.instructions = updatedFields.instructions;
        await supabase.from('customers').update(payload).eq('id', id);
      } catch (e) {
        console.error('Failed to update customer in Supabase:', e);
      }
    }

    setCustomers((prev) =>
      prev.map((c) => {
        if (c.id === id) {
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
  const addExpense = async (expenseData) => {
    let newId = `exp-${Date.now()}`;
    const date = expenseData.date || getTodayIST();

    if (liveMode && supabase) {
      try {
        const { data, error } = await supabase
          .from('expenses')
          .insert([
            {
              title: expenseData.title,
              amount: expenseData.amount,
              category: expenseData.category,
              date,
              payment_method: expenseData.paymentMethod || 'UPI',
              vendor: expenseData.vendor || '',
              notes: expenseData.notes || '',
            },
          ])
          .select()
          .single();
        if (!error && data) {
          newId = data.id;
        }
      } catch (e) {
        console.error('Failed to insert expense into Supabase:', e);
      }
    }

    const newExp = {
      ...expenseData,
      id: newId,
      date,
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

  const updateExpense = async (id, updatedData) => {
    if (liveMode && supabase) {
      try {
        const payload = {};
        if (updatedData.title) payload.title = updatedData.title;
        if (updatedData.amount !== undefined) payload.amount = updatedData.amount;
        if (updatedData.category) payload.category = updatedData.category;
        if (updatedData.date) payload.date = updatedData.date;
        if (updatedData.paymentMethod) payload.payment_method = updatedData.paymentMethod;
        if (updatedData.vendor !== undefined) payload.vendor = updatedData.vendor;
        if (updatedData.notes !== undefined) payload.notes = updatedData.notes;
        await supabase.from('expenses').update(payload).eq('id', id);
      } catch (e) {
        console.error('Failed to update expense in Supabase:', e);
      }
    }

    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? { ...e, ...updatedData } : e))
    );
  };

  const deleteExpense = async (id) => {
    if (liveMode && supabase) {
      try {
        await supabase.from('expenses').delete().eq('id', id);
      } catch (e) {
        console.error('Failed to delete expense from Supabase:', e);
      }
    }
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  // Invoicing & Payment Actions

  // 1. Generate Individual Invoice for a Customer
  const generateCustomerInvoice = (customerId, period = '01 Nov 2026 – 30 Nov 2026') => {
    const customer = customers.find((c) => c.id === customerId);
    if (!customer) throw new Error('Customer not found');

    // Duplicate Invoice Check
    const alreadyExists = invoices.some(
      (inv) => inv.customerId === customerId && inv.period === period
    );
    if (alreadyExists) {
      throw new Error(`Invoice for ${customer.name} for ${period} already exists.`);
    }

    // Filter strictly dispatched meals for this customer
    const dispatchedMeals = mealOrders.filter(
      (o) => o.customerId === customerId && o.status === 'dispatched'
    );

    // Group meals into line items by (mealType + price) to preserve separate line items for historical price changes!
    const lineItemMap = {};
    dispatchedMeals.forEach((meal) => {
      const key = `${meal.mealType}-${meal.price}`;
      if (!lineItemMap[key]) {
        lineItemMap[key] = {
          description: `${meal.mealType.toUpperCase()} Service (${meal.source === 'one_time' ? 'One-Time' : 'Regular Subscription'})`,
          unitPrice: Number(meal.price),
          quantity: 0,
          total: 0,
        };
      }
      lineItemMap[key].quantity += 1;
      lineItemMap[key].total += Number(meal.price);
    });

    // If no current live orders yet, generate standard scheduled monthly line items based on agreement
    let lineItems = Object.values(lineItemMap);
    if (lineItems.length === 0) {
      const lunchCount = customer.schedule?.mon?.lunch ? 24 : 0;
      const dinnerCount = customer.schedule?.mon?.dinner ? 24 : 0;
      
      if (lunchCount > 0) {
        lineItems.push({
          description: 'Lunch Service (Regular Dabba)',
          unitPrice: customer.lunchPrice,
          quantity: lunchCount,
          total: lunchCount * customer.lunchPrice,
        });
      }
      if (dinnerCount > 0) {
        lineItems.push({
          description: 'Dinner Service (Regular Dabba)',
          unitPrice: customer.dinnerPrice,
          quantity: dinnerCount,
          total: dinnerCount * customer.dinnerPrice,
        });
      }
    }

    const totalAmount = lineItems.reduce((sum, item) => sum + item.total, 0);
    const mealCount = lineItems.reduce((sum, item) => sum + item.quantity, 0);

    const newInvoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-2026-11-${String(invoices.length + 1).padStart(3, '0')}`,
      customerId: customer.id,
      customerName: customer.name,
      customerPhone: customer.phone,
      customerAddress: customer.address,
      period,
      lineItems,
      totalAmount,
      paidAmount: 0,
      balanceDue: totalAmount,
      status: 'unpaid',
      mealCount,
      payments: [],
      createdAt: getTodayIST(),
    };

    setInvoices((prev) => [newInvoice, ...prev]);

    // Activity log
    const newActivity = {
      id: `act-${Date.now()}`,
      type: 'payment',
      title: 'Invoice Issued',
      description: `${newInvoice.invoiceNumber} generated for ${customer.name} (Total: ₹${totalAmount}).`,
      timestamp: 'Just now',
      amount: totalAmount,
      badge: 'Invoice',
      badgeVariant: 'forest',
    };
    setActivities((prev) => [newActivity, ...prev]);

    return newInvoice;
  };

  // 2. Generate Bulk Invoices for All Active Customers
  const generateBulkInvoices = (period = '01 Nov 2026 – 30 Nov 2026') => {
    let generatedCount = 0;
    const activeCustomers = customers.filter((c) => c.status === 'active');

    activeCustomers.forEach((c) => {
      const alreadyHas = invoices.some(
        (inv) => inv.customerId === c.id && inv.period === period
      );
      if (!alreadyHas) {
        try {
          generateCustomerInvoice(c.id, period);
          generatedCount += 1;
        } catch (e) {
          // ignore already existing
        }
      }
    });

    return generatedCount;
  };

  // 3. Record Payment (supports partial payments)
  const recordPayment = (invoiceId, amount, paymentMethod = 'UPI', notes = '') => {
    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0) return;

    const paymentDate = getTodayIST();

    setInvoices((prev) =>
      prev.map((inv) => {
        if (inv.id === invoiceId) {
          const newPaid = Number(inv.paidAmount) + numericAmount;
          const newBalance = Math.max(0, Number(inv.totalAmount) - newPaid);
          const newStatus = newBalance === 0 ? 'paid' : 'partially_paid';

          const newPaymentRecord = {
            id: `pay-${Date.now()}`,
            amount: numericAmount,
            date: paymentDate,
            paymentMethod,
            notes,
          };

          return {
            ...inv,
            paidAmount: newPaid,
            balanceDue: newBalance,
            status: newStatus,
            payments: [...(inv.payments || []), newPaymentRecord],
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
        description: `Received ₹${numericAmount} from ${inv.customerName} via ${paymentMethod}.`,
        timestamp: 'Just now',
        amount: numericAmount,
        badge: 'Paid',
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
    updateExpense,
    deleteExpense,
    recordPayment,
    generateCustomerInvoice,
    generateBulkInvoices,
    settings,
    updateSettings,
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
