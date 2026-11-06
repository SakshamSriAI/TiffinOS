import React, { useState, useEffect } from 'react';
import { PlusCircle, IndianRupee, AlertCircle, Calendar, ShieldCheck } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { useApp } from '../../context/AppContext';
import { getTodayIST } from '../../utils/date';
import { formatINR } from '../../utils/currency';

export const OneTimeOrderModal = ({ isOpen, onClose }) => {
  const { customers, selectedDate, addOneTimeOrder } = useApp();

  const [customerId, setCustomerId] = useState('');
  const [date, setDate] = useState(selectedDate || getTodayIST());
  const [mealSlotSelection, setMealSlotSelection] = useState('lunch'); // 'lunch' | 'dinner' | 'both'
  const [lunchPrice, setLunchPrice] = useState('120');
  const [dinnerPrice, setDinnerPrice] = useState('130');
  const [instructions, setInstructions] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (customers.length > 0 && !customerId) {
      const defaultCust = customers[0];
      setCustomerId(defaultCust.id);
      setLunchPrice(String(defaultCust.lunchPrice || 120));
      setDinnerPrice(String(defaultCust.dinnerPrice || 130));
    }
  }, [customers, customerId, isOpen]);

  useEffect(() => {
    setDate(selectedDate || getTodayIST());
    setErrorMessage(null);
  }, [selectedDate, isOpen]);

  const handleCustomerChange = (e) => {
    const cid = e.target.value;
    setCustomerId(cid);
    const selectedCust = customers.find((c) => c.id === cid);
    if (selectedCust) {
      setLunchPrice(String(selectedCust.lunchPrice || 120));
      setDinnerPrice(String(selectedCust.dinnerPrice || 130));
    }
    setErrorMessage(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(null);

    const selectedCust = customers.find((c) => c.id === customerId);
    if (!selectedCust) return;

    const slots =
      mealSlotSelection === 'both'
        ? ['lunch', 'dinner']
        : [mealSlotSelection];

    const result = addOneTimeOrder({
      customerId: selectedCust.id,
      customerName: selectedCust.name,
      date,
      mealSlots: slots,
      lunchPrice: Number(lunchPrice) || selectedCust.lunchPrice,
      dinnerPrice: Number(dinnerPrice) || selectedCust.dinnerPrice,
      address: selectedCust.address,
      phone: selectedCust.phone,
      instructions: instructions.trim() || 'One-time ad-hoc order',
    });

    if (result.duplicates && result.duplicates.length > 0) {
      setErrorMessage(
        `Duplicate prevented: ${selectedCust.name} already has an order booked for ${result.duplicates.join(' & ')} on ${date}.`
      );
      if (result.created && result.created.length > 0) {
        // partial success
        setTimeout(() => onClose(), 2000);
      }
      return;
    }

    setInstructions('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Book One-Time Meal Order"
      description="Schedule an ad-hoc meal delivery with duplicate order protection."
      footer={
        <>
          <Button variant="secondary" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="md" iconLeft={PlusCircle} onClick={handleSubmit}>
            Create Order
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-status-error text-xs rounded-card flex items-start gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Customer Selector */}
        <Select
          label="Select Customer"
          value={customerId}
          onChange={handleCustomerChange}
          options={customers.map((c) => ({
            value: c.id,
            label: `${c.name} (${c.type.toUpperCase()} · ${c.status.toUpperCase()})`,
          }))}
          required
        />

        {/* Date and Meal Slot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Delivery Date"
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
              setErrorMessage(null);
            }}
            required
          />

          <Select
            label="Meal Service Slot"
            value={mealSlotSelection}
            onChange={(e) => {
              setMealSlotSelection(e.target.value);
              setErrorMessage(null);
            }}
            options={[
              { value: 'lunch', label: '☀️ Lunch Service Only' },
              { value: 'dinner', label: '🌙 Dinner Service Only' },
              { value: 'both', label: '☀️ + 🌙 Both Lunch & Dinner' },
            ]}
          />
        </div>

        {/* Agreed Rate Fields */}
        <div className="grid grid-cols-2 gap-4 p-3 bg-surface-subtle rounded-card border border-border">
          <Input
            label="Lunch Rate (₹)"
            type="number"
            value={lunchPrice}
            onChange={(e) => setLunchPrice(e.target.value)}
            disabled={mealSlotSelection === 'dinner'}
            iconLeft={IndianRupee}
          />

          <Input
            label="Dinner Rate (₹)"
            type="number"
            value={dinnerPrice}
            onChange={(e) => setDinnerPrice(e.target.value)}
            disabled={mealSlotSelection === 'lunch'}
            iconLeft={IndianRupee}
          />
        </div>

        {/* Instructions */}
        <Input
          label="Dietary or Special Packaging Notes"
          placeholder="e.g. Extra dal, spicy curry, 4 rotis, ring bell twice"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />

        <div className="flex items-center gap-2 text-[11px] text-muted-text pt-1">
          <ShieldCheck className="w-3.5 h-3.5 text-forest flex-shrink-0" />
          <span>
            One-time and recurring orders share the exact same dispatch verification and monthly billing pipeline.
          </span>
        </div>
      </form>
    </Modal>
  );
};

export default OneTimeOrderModal;
