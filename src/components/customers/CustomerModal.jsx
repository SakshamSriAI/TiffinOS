import React, { useState, useEffect } from 'react';
import { IndianRupee, ShieldCheck, AlertCircle } from 'lucide-react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { CustomerScheduleEditor } from './CustomerScheduleEditor';
import { useApp } from '../../context/AppContext';

export const CustomerModal = ({ isOpen, onClose, customer = null }) => {
  const { addCustomer, updateCustomer } = useApp();

  const isEdit = Boolean(customer);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [lunchPrice, setLunchPrice] = useState('120');
  const [dinnerPrice, setDinnerPrice] = useState('130');
  const [type, setType] = useState('regular');
  const [status, setStatus] = useState('active');
  const [instructions, setInstructions] = useState('');
  const [schedule, setSchedule] = useState({
    mon: { lunch: true, dinner: true },
    tue: { lunch: true, dinner: true },
    wed: { lunch: true, dinner: true },
    thu: { lunch: true, dinner: true },
    fri: { lunch: true, dinner: true },
    sat: { lunch: true, dinner: true },
    sun: { lunch: false, dinner: false },
  });

  useEffect(() => {
    if (customer) {
      setName(customer.name || '');
      setPhone(customer.phone || '');
      setAddress(customer.address || '');
      setLunchPrice(String(customer.lunchPrice || 120));
      setDinnerPrice(String(customer.dinnerPrice || 130));
      setType(customer.type || 'regular');
      setStatus(customer.status || 'active');
      setInstructions(customer.instructions || '');
      if (customer.schedule) {
        setSchedule(customer.schedule);
      }
    } else {
      setName('');
      setPhone('');
      setAddress('');
      setLunchPrice('120');
      setDinnerPrice('130');
      setType('regular');
      setStatus('active');
      setInstructions('');
      setSchedule({
        mon: { lunch: true, dinner: true },
        tue: { lunch: true, dinner: true },
        wed: { lunch: true, dinner: true },
        thu: { lunch: true, dinner: true },
        fri: { lunch: true, dinner: true },
        sat: { lunch: true, dinner: true },
        sun: { lunch: false, dinner: false },
      });
    }
  }, [customer, isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const payload = {
      name: name.trim(),
      phone: phone.trim() || '+91 98000 00000',
      address: address.trim() || 'Indore',
      lunchPrice: Number(lunchPrice) || 120,
      dinnerPrice: Number(dinnerPrice) || 130,
      type,
      status,
      instructions: instructions.trim(),
      schedule: type === 'regular' ? schedule : {},
    };

    if (isEdit) {
      updateCustomer(customer.id, payload);
    } else {
      addCustomer(payload);
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      title={isEdit ? `Edit Customer: ${customer.name}` : 'Register New Customer'}
      description={
        isEdit
          ? 'Update individual lunch/dinner rates or weekly delivery matrix.'
          : 'Add a new regular or occasional tiffin subscriber.'
      }
      footer={
        <>
          <Button variant="secondary" size="md" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" size="md" onClick={handleSubmit}>
            {isEdit ? 'Save Changes' : 'Register Customer'}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name & Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Customer Full Name"
            placeholder="e.g. Deepak Sharma"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            label="Phone Number (WhatsApp)"
            placeholder="+91 98260 00000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* Delivery Address */}
        <Input
          label="Full Delivery Address"
          placeholder="Flat / House number, Apartment / Colony, Indore"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />

        {/* Subscription Type & Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            label="Subscription Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            options={[
              { value: 'regular', label: 'Regular (Weekly Recurring)' },
              { value: 'occasional', label: 'Occasional (Ad-hoc Orders Only)' },
            ]}
          />

          <Select
            label="Account Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            options={[
              { value: 'active', label: 'Active (Receiving Meals)' },
              { value: 'paused', label: 'Paused (Temporarily on hold)' },
              { value: 'archived', label: 'Archived (Discontinued)' },
            ]}
          />
        </div>

        {/* Custom Individual Pricing */}
        <div className="p-4 bg-surface-subtle rounded-card border border-border space-y-2">
          <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider">
            Custom Individual Pricing (INR ₹)
          </label>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Lunch Unit Price"
              type="number"
              value={lunchPrice}
              onChange={(e) => setLunchPrice(e.target.value)}
              iconLeft={IndianRupee}
              required
            />
            <Input
              label="Dinner Unit Price"
              type="number"
              value={dinnerPrice}
              onChange={(e) => setDinnerPrice(e.target.value)}
              iconLeft={IndianRupee}
              required
            />
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-text pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-forest flex-shrink-0" />
            <span>Pricing changes apply only to future meals. Historical dispatches preserve their stamped price.</span>
          </div>
        </div>

        {/* Weekly Recurring Matrix (only for regular) */}
        {type === 'regular' && (
          <div className="p-4 bg-white rounded-card border border-border">
            <CustomerScheduleEditor schedule={schedule} onChange={setSchedule} />
          </div>
        )}

        {/* Instructions */}
        <Input
          label="Dietary & Packaging Instructions"
          placeholder="e.g. Mild spices, 3 thin phulkas, deliver before 12:45 PM"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
      </form>
    </Modal>
  );
};

export default CustomerModal;
