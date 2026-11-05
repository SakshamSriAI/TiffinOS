import React from 'react';
import { TrendingDown, Plus, Filter, Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../components/common/Table';
import { formatINR } from '../utils/currency';

export const Expenses = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-charcoal">Expense Management</h1>
          <p className="text-sm text-muted-text mt-0.5">
            Log and categorize kitchen supplies, vegetables, groceries, and operational costs.
          </p>
        </div>
        <Button variant="primary" iconLeft={Plus}>
          Add Expense
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-card border border-border shadow-subtle">
          <p className="text-xs text-muted-text">Total Expenses (Nov)</p>
          <p className="text-xl font-bold text-charcoal font-mono mt-1">{formatINR(14200)}</p>
        </div>
        <div className="bg-white p-4 rounded-card border border-border shadow-subtle">
          <p className="text-xs text-muted-text">Daily Average</p>
          <p className="text-xl font-bold text-forest font-mono mt-1">{formatINR(2840)}</p>
        </div>
        <div className="bg-white p-4 rounded-card border border-border shadow-subtle">
          <p className="text-xs text-muted-text">Transactions</p>
          <p className="text-xl font-bold text-charcoal mt-1">12 entries</p>
        </div>
        <div className="bg-white p-4 rounded-card border border-border shadow-subtle">
          <p className="text-xs text-muted-text">Top Category</p>
          <p className="text-xl font-bold text-amber-dark mt-1">Vegetables</p>
        </div>
      </div>

      <Table>
        <TableHead>
          <TableRow hover={false}>
            <TableHeader>Expense Title</TableHeader>
            <TableHeader>Category</TableHeader>
            <TableHeader>Date</TableHeader>
            <TableHeader>Payment Mode</TableHeader>
            <TableHeader>Vendor</TableHeader>
            <TableHeader align="right">Amount</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className="font-semibold text-charcoal">Fresh Vegetables (Mandi)</TableCell>
            <TableCell><Badge variant="forest">Vegetables</Badge></TableCell>
            <TableCell>05 Nov 2026</TableCell>
            <TableCell>UPI (PhonePe)</TableCell>
            <TableCell>APMC Mandi</TableCell>
            <TableCell align="right" className="font-mono font-bold text-charcoal">{formatINR(2450)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold text-charcoal">Commercial Gas Cylinder</TableCell>
            <TableCell><Badge variant="amber">Gas & Fuel</Badge></TableCell>
            <TableCell>03 Nov 2026</TableCell>
            <TableCell>Cash</TableCell>
            <TableCell>Bharat Gas Agency</TableCell>
            <TableCell align="right" className="font-mono font-bold text-charcoal">{formatINR(1850)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Expenses;
