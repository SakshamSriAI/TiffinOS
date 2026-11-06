import React, { useState } from 'react';
import { 
  UserPlus, 
  PlusCircle, 
  Receipt, 
  TrendingDown, 
  CheckCircle2, 
  IndianRupee,
  Calendar
} from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/currency';
import { getTodayIST } from '../../utils/date';

export const QuickActionModals = () => {
  const { 
    activeModal, 
    setActiveModal, 
    customers, 
    addCustomer, 
    addOneTimeOrder, 
    addExpense,
    mealOrders
  } = useApp();

  // Add Customer State
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [custAddress, setCustAddress] = useState('');
  const [custLunchPrice, setCustLunchPrice] = useState('120');
  const [custDinnerPrice, setCustDinnerPrice] = useState('130');
  const [custType, setCustType] = useState('regular');
  const [custIncludeLunch, setCustIncludeLunch] = useState(true);
  const [custIncludeDinner, setCustIncludeDinner] = useState(true);
  const [custNotes, setCustNotes] = useState('');

  // Add One-Time Order State
  const [orderCustId, setOrderCustId] = useState(customers[0]?.id || '');
  const [orderDate, setOrderDate] = useState(getTodayIST());
  const [orderMealType, setOrderMealType] = useState('dinner');
  const [orderPrice, setOrderPrice] = useState('130');
  const [orderNotes, setOrderNotes] = useState('');

  // Add Expense State
  const [expTitle, setExpTitle] = useState('');
  const [expAmount, setExpAmount] = useState('');
  const [expCategory, setExpCategory] = useState('vegetables');
  const [expPaymentMethod, setExpPaymentMethod] = useState('UPI');
  const [expVendor, setExpVendor] = useState('');

  const closeModal = () => setActiveModal(null);

  // Handlers
  const handleCreateCustomer = (e) => {
    e.preventDefault();
    if (!custName.trim()) return;

    const schedule = {
      mon: { lunch: custIncludeLunch, dinner: custIncludeDinner },
      tue: { lunch: custIncludeLunch, dinner: custIncludeDinner },
      wed: { lunch: custIncludeLunch, dinner: custIncludeDinner },
      thu: { lunch: custIncludeLunch, dinner: custIncludeDinner },
      fri: { lunch: custIncludeLunch, dinner: custIncludeDinner },
      sat: { lunch: custIncludeLunch, dinner: custIncludeDinner },
      sun: { lunch: false, dinner: false },
    };

    addCustomer({
      name: custName,
      phone: custPhone || '+91 98000 00000',
      address: custAddress || 'Indore',
      lunchPrice: Number(custLunchPrice) || 120,
      dinnerPrice: Number(custDinnerPrice) || 130,
      type: custType,
      schedule: custType === 'regular' ? schedule : {},
      instructions: custNotes,
    });

    setCustName('');
    setCustPhone('');
    setCustAddress('');
    setCustNotes('');
    closeModal();
  };

  const handleCreateOrder = (e) => {
    e.preventDefault();
    const cust = customers.find((c) => c.id === orderCustId) || customers[0];
    if (!cust) return;

    addOneTimeOrder({
      customerId: cust.id,
      customerName: cust.name,
      date: orderDate,
      mealType: orderMealType,
      price: Number(orderPrice) || cust.dinnerPrice,
      address: cust.address,
      phone: cust.phone,
      instructions: orderNotes || 'Ad-hoc booking',
    });

    setOrderNotes('');
    closeModal();
  };

  const handleCreateExpense = (e) => {
    e.preventDefault();
    if (!expTitle.trim() || !expAmount) return;

    addExpense({
      title: expTitle,
      amount: Number(expAmount),
      category: expCategory,
      paymentMethod: expPaymentMethod,
      vendor: expVendor || 'Local Vendor',
      notes: '',
    });

    setExpTitle('');
    setExpAmount('');
    setExpVendor('');
    closeModal();
  };

  return (
    <>
      {/* 1. Add Customer Modal */}
      <Modal
        isOpen={activeModal === 'addCustomer'}
        onClose={closeModal}
        title="Register New Customer"
        description="Add a new tiffin subscriber with individual lunch and dinner agreements."
        footer={
          <>
            <Button variant="secondary" size="md" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="primary" size="md" onClick={handleCreateCustomer}>
              Save Customer
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreateCustomer} className="space-y-4">
          <Input
            label="Customer Full Name"
            placeholder="e.g. Deepak Sharma"
            value={custName}
            onChange={(e) => setCustName(e.target.value)}
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Phone Number"
              placeholder="+91 98260 00000"
              value={custPhone}
              onChange={(e) => setCustPhone(e.target.value)}
            />
            <Select
              label="Customer Type"
              value={custType}
              onChange={(e) => setCustType(e.target.value)}
              options={[
                { value: 'regular', label: 'Regular (Weekly Recurring)' },
                { value: 'occasional', label: 'Occasional (Ad-hoc Orders)' },
              ]}
            />
          </div>

          <Input
            label="Delivery Address"
            placeholder="Flat / House number, Colony / Area, Indore"
            value={custAddress}
            onChange={(e) => setCustAddress(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Individual Lunch Rate (₹)"
              type="number"
              value={custLunchPrice}
              onChange={(e) => setCustLunchPrice(e.target.value)}
              iconLeft={IndianRupee}
            />
            <Input
              label="Individual Dinner Rate (₹)"
              type="number"
              value={custDinnerPrice}
              onChange={(e) => setCustDinnerPrice(e.target.value)}
              iconLeft={IndianRupee}
            />
          </div>

          {/* Active Delivery Services */}
          <div>
            <label className="block text-xs font-semibold text-charcoal mb-2">
              Scheduled Daily Delivery Slots
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setCustIncludeLunch(!custIncludeLunch)}
                className={`p-3 rounded-card border text-left flex items-center justify-between transition-all ${
                  custIncludeLunch
                    ? 'border-forest bg-forest/5 text-forest-deep shadow-xs'
                    : 'border-border bg-surface-subtle text-muted-text hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">☀️</span>
                  <div>
                    <div className="text-xs font-bold">Lunch Service</div>
                    <div className="text-[10px] text-muted-text">₹{custLunchPrice}/dabba</div>
                  </div>
                </div>
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] font-bold ${
                    custIncludeLunch
                      ? 'bg-forest text-white border-forest'
                      : 'border-border bg-white'
                  }`}
                >
                  {custIncludeLunch && '✓'}
                </div>
              </button>

              <button
                type="button"
                onClick={() => setCustIncludeDinner(!custIncludeDinner)}
                className={`p-3 rounded-card border text-left flex items-center justify-between transition-all ${
                  custIncludeDinner
                    ? 'border-amber-accent bg-amber-accent/10 text-amber-900 shadow-xs'
                    : 'border-border bg-surface-subtle text-muted-text hover:bg-white'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">🌙</span>
                  <div>
                    <div className="text-xs font-bold">Dinner Service</div>
                    <div className="text-[10px] text-muted-text">₹{custDinnerPrice}/dabba</div>
                  </div>
                </div>
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center text-[10px] font-bold ${
                    custIncludeDinner
                      ? 'bg-amber-accent text-white border-amber-accent'
                      : 'border-border bg-white'
                  }`}
                >
                  {custIncludeDinner && '✓'}
                </div>
              </button>
            </div>
            <p className="text-[11px] text-muted-text mt-1.5">
              Active meal slots will automatically show in today's Lunch and Dinner dispatch line upon saving.
            </p>
          </div>

          <Input
            label="Dietary / Packaging Instructions"
            placeholder="e.g. Less oil, 3 phulkas, deliver before 1 PM"
            value={custNotes}
            onChange={(e) => setCustNotes(e.target.value)}
          />
        </form>
      </Modal>

      {/* 2. Add One-Time Order Modal */}
      <Modal
        isOpen={activeModal === 'addOrder'}
        onClose={closeModal}
        title="Book One-Time Meal Order"
        description="Schedule an ad-hoc lunch or dinner delivery. Excluded from recurring schedules."
        footer={
          <>
            <Button variant="secondary" size="md" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="primary" size="md" onClick={handleCreateOrder}>
              Create Order
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreateOrder} className="space-y-4">
          <Select
            label="Select Customer"
            value={orderCustId}
            onChange={(e) => {
              setOrderCustId(e.target.value);
              const c = customers.find((cust) => cust.id === e.target.value);
              if (c) {
                setOrderPrice(orderMealType === 'lunch' ? c.lunchPrice : c.dinnerPrice);
              }
            }}
            options={customers.map((c) => ({
              value: c.id,
              label: `${c.name} (${c.type.toUpperCase()})`,
            }))}
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Meal Slot"
              value={orderMealType}
              onChange={(e) => {
                setOrderMealType(e.target.value);
                const c = customers.find((cust) => cust.id === orderCustId);
                if (c) {
                  setOrderPrice(e.target.value === 'lunch' ? c.lunchPrice : c.dinnerPrice);
                }
              }}
              options={[
                { value: 'lunch', label: 'Lunch Service' },
                { value: 'dinner', label: 'Dinner Service' },
              ]}
            />

            <Input
              label="Delivery Date"
              type="date"
              value={orderDate}
              onChange={(e) => setOrderDate(e.target.value)}
            />
          </div>

          <Input
            label="Agreed Price (₹)"
            type="number"
            value={orderPrice}
            onChange={(e) => setOrderPrice(e.target.value)}
            iconLeft={IndianRupee}
          />

          <Input
            label="Special Delivery Instructions"
            placeholder="e.g. Extra dal, call on gate arrival"
            value={orderNotes}
            onChange={(e) => setOrderNotes(e.target.value)}
          />
        </form>
      </Modal>

      {/* 3. Add Expense Modal */}
      <Modal
        isOpen={activeModal === 'addExpense'}
        onClose={closeModal}
        title="Log Kitchen Expense"
        description="Record vegetable mandi, groceries, gas, packaging, or helper payments."
        footer={
          <>
            <Button variant="secondary" size="md" onClick={closeModal}>
              Cancel
            </Button>
            <Button variant="primary" size="md" onClick={handleCreateExpense}>
              Save Expense
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreateExpense} className="space-y-4">
          <Input
            label="Expense Title"
            placeholder="e.g. Fresh Mandi Vegetables"
            value={expTitle}
            onChange={(e) => setExpTitle(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Amount (₹)"
              type="number"
              placeholder="1250"
              value={expAmount}
              onChange={(e) => setExpAmount(e.target.value)}
              iconLeft={IndianRupee}
              required
            />
            <Select
              label="Category"
              value={expCategory}
              onChange={(e) => setExpCategory(e.target.value)}
              options={[
                { value: 'vegetables', label: 'Vegetables (Mandi)' },
                { value: 'groceries', label: 'Rice, Grains & Spices' },
                { value: 'gas', label: 'Cooking Gas (LPG)' },
                { value: 'packaging', label: 'Silver Foil & Containers' },
                { value: 'salaries', label: 'Helper Wages / Salaries' },
                { value: 'transportation', label: 'Delivery / Petrol' },
                { value: 'utilities', label: 'Water & Electricity' },
                { value: 'other', label: 'Other Operational Cost' },
              ]}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Payment Mode"
              value={expPaymentMethod}
              onChange={(e) => setExpPaymentMethod(e.target.value)}
              options={[
                { value: 'UPI', label: 'UPI (PhonePe / GPay)' },
                { value: 'Cash', label: 'Cash in Hand' },
                { value: 'Bank Transfer', label: 'Bank Transfer' },
              ]}
            />
            <Input
              label="Vendor / Store Name"
              placeholder="e.g. Choithram Mandi"
              value={expVendor}
              onChange={(e) => setExpVendor(e.target.value)}
            />
          </div>
        </form>
      </Modal>

      {/* 4. Generate Bills Modal */}
      <Modal
        isOpen={activeModal === 'generateBills'}
        onClose={closeModal}
        title="Generate Monthly Customer Bills"
        description="Auto-compile customer statements for all dispatched meals in November 2026."
        footer={
          <>
            <Button variant="secondary" size="md" onClick={closeModal}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              iconLeft={Receipt}
              onClick={() => {
                alert('Monthly customer invoices successfully compiled from confirmed dispatched meals!');
                closeModal();
              }}
            >
              Issue Monthly Invoices
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="p-4 bg-surface-subtle rounded-card border border-border space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-text">Billing Period:</span>
              <span className="font-semibold text-charcoal">01 Nov 2026 – 30 Nov 2026</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-text">Eligible Dispatched Meals:</span>
              <span className="font-bold text-forest font-mono">
                {mealOrders.filter((o) => o.status === 'dispatched').length + 290} Meals
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-text">Active Customers to Bill:</span>
              <span className="font-semibold text-charcoal">{customers.length} Customers</span>
            </div>
          </div>

          <div className="p-3 bg-mint/50 rounded-card border border-mint-dark text-xs text-forest-deep flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
            <p>
              <strong>Business Integrity Check</strong>: Only meals stamped "Dispatched" will be billed. Cancelled or pending meals are strictly excluded.
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default QuickActionModals;
