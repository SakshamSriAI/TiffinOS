import React, { useState, useEffect } from 'react';
import {
  Settings as SettingsIcon,
  Save,
  CheckCircle2,
  Store,
  Clock,
  IndianRupee,
  ShieldCheck,
  Calendar,
  Phone,
  MapPin,
  Download,
  RotateCcw,
  AlertCircle,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Badge } from '../components/common/Badge';
import { useApp } from '../context/AppContext';

export const Settings = () => {
  const { settings, updateSettings, customers, mealOrders, expenses, invoices } = useApp();

  // Local form state initialized from context
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    phone: '',
    whatsappNumber: '',
    upiId: '',
    address: '',
    defaultLunchPrice: 110,
    defaultDinnerPrice: 120,
    lunchCutoff: '11:00 AM',
    dinnerCutoff: '06:30 PM',
    operatingDays: {
      mon: true,
      tue: true,
      wed: true,
      thu: true,
      fri: true,
      sat: true,
      sun: false,
    },
  });

  const [savedNotification, setSavedNotification] = useState(false);

  useEffect(() => {
    if (settings) {
      setFormData({
        businessName: settings.businessName || 'Shree Annapurna Tiffin Service',
        ownerName: settings.ownerName || 'Saksham Srivastava',
        phone: settings.phone || '+91 98260 55432',
        whatsappNumber: settings.whatsappNumber || '+91 98260 55432',
        upiId: settings.upiId || 'annapurnatiffin@okaxis',
        address: settings.address || 'Plot 44, Kailash Nagar, Indore, Madhya Pradesh 452001',
        defaultLunchPrice: settings.defaultLunchPrice || 110,
        defaultDinnerPrice: settings.defaultDinnerPrice || 120,
        lunchCutoff: settings.lunchCutoff || '11:00 AM',
        dinnerCutoff: settings.dinnerCutoff || '06:30 PM',
        operatingDays: settings.operatingDays || {
          mon: true,
          tue: true,
          wed: true,
          thu: true,
          fri: true,
          sat: true,
          sun: false,
        },
      });
    }
  }, [settings]);

  const handleDayToggle = (day) => {
    setFormData((prev) => ({
      ...prev,
      operatingDays: {
        ...prev.operatingDays,
        [day]: !prev.operatingDays[day],
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateSettings(formData);
    setSavedNotification(true);
    setTimeout(() => setSavedNotification(false), 4000);
  };

  const handleExportBackup = () => {
    const backupData = {
      exportedAt: new Date().toISOString(),
      business: formData,
      customers,
      mealOrders,
      expenses,
      invoices,
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(backupData, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `tiffinos-backup-${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const daysList = [
    { key: 'mon', label: 'Mon' },
    { key: 'tue', label: 'Tue' },
    { key: 'wed', label: 'Wed' },
    { key: 'thu', label: 'Thu' },
    { key: 'fri', label: 'Fri' },
    { key: 'sat', label: 'Sat' },
    { key: 'sun', label: 'Sun' },
  ];

  return (
    <div className="space-y-6 max-w-4xl pb-10">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-charcoal">
            Business Settings & Configuration
          </h1>
          <p className="text-sm text-muted-text mt-0.5">
            Configure kitchen identity, customer invoice information, cutoff timings, and operating days.
          </p>
        </div>
      </div>

      {/* Success Notification Alert */}
      {savedNotification && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 text-status-success text-sm rounded-card font-medium flex items-center gap-2.5 shadow-subtle animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>Business settings saved successfully. Updated details are now active across invoices and dispatches.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* 1. Official Business Profile */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Store className="w-4 h-4 text-forest" />
              <CardTitle>Business Profile & Invoicing Identity</CardTitle>
            </div>
            <CardDescription>
              Details displayed on customer monthly invoices, printed statements, and dispatch receipts.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Tiffin Business Name *
              </label>
              <Input
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Owner / Proprietor Name *
              </label>
              <Input
                value={formData.ownerName}
                onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Primary Contact Phone *
              </label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                iconLeft={Phone}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                UPI ID for Customer Payments *
              </label>
              <Input
                value={formData.upiId}
                onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                placeholder="e.g. annapurnatiffin@okaxis"
                required
              />
              <p className="text-[11px] text-muted-text mt-1">
                Printed prominently on monthly bills for UPI QR & app payments.
              </p>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Kitchen & Delivery Center Address *
              </label>
              <Input
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                iconLeft={MapPin}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* 2. Kitchen Schedule & Operating Cutoffs */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-forest" />
              <CardTitle>Kitchen Operating Days & Cutoff Rules</CardTitle>
            </div>
            <CardDescription>
              Service days and preparation cutoff thresholds for lunch and dinner dispatches.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            
            {/* Operating Days Selector */}
            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-2">
                Active Weekly Service Days
              </label>
              <div className="flex flex-wrap gap-2">
                {daysList.map((day) => {
                  const isActive = formData.operatingDays[day.key];
                  return (
                    <button
                      key={day.key}
                      type="button"
                      onClick={() => handleDayToggle(day.key)}
                      className={`px-4 py-2 text-xs font-bold rounded-button border transition-colors ${
                        isActive
                          ? 'bg-forest text-white border-forest shadow-xs'
                          : 'bg-white text-muted-text border-border hover:border-charcoal'
                      }`}
                    >
                      {day.label}
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-muted-text mt-1.5">
                Highlighted days are active for recurring meal deliveries.
              </p>
            </div>

            {/* Cutoff Timings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border">
              <div>
                <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                  Lunch Order Cutoff Time
                </label>
                <Input
                  value={formData.lunchCutoff}
                  onChange={(e) => setFormData({ ...formData, lunchCutoff: e.target.value })}
                  placeholder="e.g. 11:00 AM"
                />
                <p className="text-[11px] text-muted-text mt-1">
                  Ad-hoc orders after this time are moved to next day or rejected.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                  Dinner Order Cutoff Time
                </label>
                <Input
                  value={formData.dinnerCutoff}
                  onChange={(e) => setFormData({ ...formData, dinnerCutoff: e.target.value })}
                  placeholder="e.g. 06:30 PM"
                />
                <p className="text-[11px] text-muted-text mt-1">
                  Cutoff for evening dinner preparation.
                </p>
              </div>
            </div>

          </CardContent>
        </Card>

        {/* 3. Default Pricing */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <IndianRupee className="w-4 h-4 text-forest" />
              <CardTitle>Default Meal Rates</CardTitle>
            </div>
            <CardDescription>
              Standard initial prices pre-filled when registering a new customer.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Default Lunch Price (₹)
              </label>
              <Input
                type="number"
                min="0"
                value={formData.defaultLunchPrice}
                onChange={(e) => setFormData({ ...formData, defaultLunchPrice: Number(e.target.value) })}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider mb-1.5">
                Default Dinner Price (₹)
              </label>
              <Input
                type="number"
                min="0"
                value={formData.defaultDinnerPrice}
                onChange={(e) => setFormData({ ...formData, defaultDinnerPrice: Number(e.target.value) })}
                required
              />
            </div>

            <div className="sm:col-span-2">
              <p className="text-xs text-muted-text italic">
                * Note: Changing default prices does not alter existing customers or past dispatched meal historical billing rates.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* 4. Regional & Currency Standards */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-forest" />
              <CardTitle>Regional Standards & Compliance</CardTitle>
            </div>
            <CardDescription>
              Locked to Indian business standards (Asia/Kolkata timezone & INR currency).
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-surface-subtle rounded border border-border">
              <span className="text-xs font-semibold text-muted-text uppercase block">Currency Standard</span>
              <p className="font-semibold text-charcoal mt-1">Indian Rupee (INR ₹)</p>
              <Badge variant="mint" className="mt-2">Active</Badge>
            </div>
            <div className="p-3 bg-surface-subtle rounded border border-border">
              <span className="text-xs font-semibold text-muted-text uppercase block">Local Timezone</span>
              <p className="font-semibold text-charcoal mt-1">Asia/Kolkata (IST +5:30)</p>
              <Badge variant="mint" className="mt-2">Active</Badge>
            </div>
            <div className="p-3 bg-surface-subtle rounded border border-border">
              <span className="text-xs font-semibold text-muted-text uppercase block">Date Format</span>
              <p className="font-semibold text-charcoal mt-1">DD/MM/YYYY (Indian Standard)</p>
              <Badge variant="mint" className="mt-2">Active</Badge>
            </div>
          </CardContent>
        </Card>

        {/* 5. Data Management & Local Backup */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-forest" />
              <CardTitle>Data Management & System Backup</CardTitle>
            </div>
            <CardDescription>
              Export full state or review live record tallies.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-surface-subtle rounded border border-border">
                <span className="text-xs text-muted-text block">Customers</span>
                <span className="text-lg font-bold text-charcoal font-mono">{customers.length}</span>
              </div>
              <div className="p-3 bg-surface-subtle rounded border border-border">
                <span className="text-xs text-muted-text block">Meal Dispatches</span>
                <span className="text-lg font-bold text-charcoal font-mono">{mealOrders.length}</span>
              </div>
              <div className="p-3 bg-surface-subtle rounded border border-border">
                <span className="text-xs text-muted-text block">Expenses</span>
                <span className="text-lg font-bold text-charcoal font-mono">{expenses.length}</span>
              </div>
              <div className="p-3 bg-surface-subtle rounded border border-border">
                <span className="text-xs text-muted-text block">Invoices</span>
                <span className="text-lg font-bold text-charcoal font-mono">{invoices.length}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-charcoal">Complete Business Backup</p>
                <p className="text-[11px] text-muted-text">Download all customers, dispatch history, expenses, and invoices as a JSON file.</p>
              </div>
              <Button
                type="button"
                variant="secondary"
                size="sm"
                iconLeft={Download}
                onClick={handleExportBackup}
              >
                Download JSON Backup
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sticky Save Bar */}
        <div className="sticky bottom-4 z-10 bg-white/95 backdrop-blur p-4 rounded-card border border-border shadow-modal flex items-center justify-between">
          <span className="text-xs text-muted-text">
            Ensure business phone and UPI ID are kept up to date for customer payments.
          </span>
          <Button
            type="submit"
            variant="primary"
            iconLeft={Save}
          >
            Save All Settings
          </Button>
        </div>

      </form>
    </div>
  );
};

export default Settings;
