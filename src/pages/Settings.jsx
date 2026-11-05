import React from 'react';
import { Settings as SettingsIcon, Save, ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';

export const Settings = () => {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-charcoal">Business Settings</h1>
        <p className="text-sm text-muted-text mt-0.5">
          Configure business details, default meal timings, cutoff rules, and regional defaults.
        </p>
      </div>

      {/* Business Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Business Profile</CardTitle>
          <CardDescription>Official details displayed on invoices and receipts</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Business Name" defaultValue="Shree Annapurna Tiffin Service" />
          <Input label="Owner Name" defaultValue="Saksham Srivastava" />
          <Input label="Contact Phone" defaultValue="+91 98765 43210" />
          <Input label="UPI ID for Payments" defaultValue="annapurnatiffin@upi" />
          <div className="sm:col-span-2">
            <Input label="Kitchen Address" defaultValue="Plot 44, Kailash Nagar, Indore, Madhya Pradesh 452001" />
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="primary" size="sm" iconLeft={Save}>
            Save Business Details
          </Button>
        </CardFooter>
      </Card>

      {/* Regional & Currency Standards */}
      <Card>
        <CardHeader>
          <CardTitle>Regional Standards & Timezone</CardTitle>
          <CardDescription>Locked to Indian business defaults</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-xs font-semibold text-muted-text uppercase">Currency</span>
            <p className="font-semibold text-charcoal mt-1">Indian Rupee (INR ₹)</p>
          </div>
          <div>
            <span className="text-xs font-semibold text-muted-text uppercase">Timezone</span>
            <p className="font-semibold text-charcoal mt-1">Asia/Kolkata (IST +5:30)</p>
          </div>
          <div>
            <span className="text-xs font-semibold text-muted-text uppercase">Date Format</span>
            <p className="font-semibold text-charcoal mt-1">DD/MM/YYYY</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
