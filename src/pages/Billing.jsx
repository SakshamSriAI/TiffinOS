import React from 'react';
import { Receipt, Download, Printer, Plus, Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../components/common/Table';
import { formatINR } from '../utils/currency';

export const Billing = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-charcoal">Monthly Billing & Invoices</h1>
          <p className="text-sm text-muted-text mt-0.5">
            Auto-generate customer invoices from recorded dispatches. Record payments and partial balances.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="primary" iconLeft={Plus}>
            Generate Month Bills
          </Button>
        </div>
      </div>

      {/* Financial KPI bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-card border border-border shadow-subtle">
          <p className="text-xs text-muted-text">Total Billed</p>
          <p className="text-xl font-bold text-forest font-mono mt-1">{formatINR(72400)}</p>
        </div>
        <div className="bg-white p-4 rounded-card border border-border shadow-subtle">
          <p className="text-xs text-muted-text">Collected</p>
          <p className="text-xl font-bold text-status-success font-mono mt-1">{formatINR(58200)}</p>
        </div>
        <div className="bg-white p-4 rounded-card border border-border shadow-subtle">
          <p className="text-xs text-muted-text">Outstanding</p>
          <p className="text-xl font-bold text-amber-dark font-mono mt-1">{formatINR(14200)}</p>
        </div>
        <div className="bg-white p-4 rounded-card border border-border shadow-subtle">
          <p className="text-xs text-muted-text">Invoices Issued</p>
          <p className="text-xl font-bold text-charcoal mt-1">36</p>
        </div>
      </div>

      <Table>
        <TableHead>
          <TableRow hover={false}>
            <TableHeader>Invoice #</TableHeader>
            <TableHeader>Customer</TableHeader>
            <TableHeader>Period</TableHeader>
            <TableHeader>Dispatched Meals</TableHeader>
            <TableHeader>Total Amount</TableHeader>
            <TableHeader>Paid</TableHeader>
            <TableHeader>Balance Due</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader align="right">Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className="font-mono text-xs font-semibold">INV-2026-11-001</TableCell>
            <TableCell className="font-semibold text-charcoal">Rajesh Agrawal</TableCell>
            <TableCell className="text-xs">Nov 2026</TableCell>
            <TableCell>48 meals</TableCell>
            <TableCell className="font-mono font-medium">{formatINR(6000)}</TableCell>
            <TableCell className="font-mono text-status-success">{formatINR(6000)}</TableCell>
            <TableCell className="font-mono text-muted-text">₹0</TableCell>
            <TableCell><Badge variant="success" dot={true}>Paid</Badge></TableCell>
            <TableCell align="right">
              <div className="flex items-center justify-end gap-1">
                <Button variant="ghost" size="sm" iconLeft={Printer}>Print</Button>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-mono text-xs font-semibold">INV-2026-11-002</TableCell>
            <TableCell className="font-semibold text-charcoal">Ananya Mehta</TableCell>
            <TableCell className="text-xs">Nov 2026</TableCell>
            <TableCell>24 meals</TableCell>
            <TableCell className="font-mono font-medium">{formatINR(2640)}</TableCell>
            <TableCell className="font-mono text-status-success">{formatINR(1500)}</TableCell>
            <TableCell className="font-mono text-amber-dark font-semibold">{formatINR(1140)}</TableCell>
            <TableCell><Badge variant="pending" dot={true}>Partially Paid</Badge></TableCell>
            <TableCell align="right">
              <div className="flex items-center justify-end gap-1">
                <Button variant="ghost" size="sm" iconLeft={Printer}>Print</Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Billing;
