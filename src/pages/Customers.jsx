import React from 'react';
import { Users, Plus, Search, Filter } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Input } from '../components/common/Input';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../components/common/Table';
import { formatINR } from '../utils/currency';

export const Customers = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-charcoal">Customer Management</h1>
          <p className="text-sm text-muted-text mt-0.5">
            Manage your tiffin subscriptions, weekly schedules, and custom pricing.
          </p>
        </div>
        <Button variant="primary" iconLeft={Plus}>
          Add Customer
        </Button>
      </div>

      {/* Customer stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-card border border-border shadow-subtle">
          <p className="text-xs text-muted-text">Total Customers</p>
          <p className="text-xl font-bold text-charcoal mt-1">38</p>
        </div>
        <div className="bg-white p-4 rounded-card border border-border shadow-subtle">
          <p className="text-xs text-muted-text">Active Subscriptions</p>
          <p className="text-xl font-bold text-status-success mt-1">35</p>
        </div>
        <div className="bg-white p-4 rounded-card border border-border shadow-subtle">
          <p className="text-xs text-muted-text">Regular Weekly</p>
          <p className="text-xl font-bold text-forest mt-1">32</p>
        </div>
        <div className="bg-white p-4 rounded-card border border-border shadow-subtle">
          <p className="text-xs text-muted-text">Occasional / Ad-hoc</p>
          <p className="text-xl font-bold text-amber-dark mt-1">6</p>
        </div>
      </div>

      {/* Search and filters */}
      <Card>
        <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:max-w-xs">
            <Input
              placeholder="Search customer by name or phone..."
              iconLeft={Search}
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="secondary" size="sm" iconLeft={Filter}>
              Filter by Status
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Sample Table Preview */}
      <Table>
        <TableHead>
          <TableRow hover={false}>
            <TableHeader>Customer Name</TableHeader>
            <TableHeader>Phone</TableHeader>
            <TableHeader>Plan Type</TableHeader>
            <TableHeader>Lunch Rate</TableHeader>
            <TableHeader>Dinner Rate</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader align="right">Actions</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className="font-semibold text-charcoal">Rajesh Agrawal</TableCell>
            <TableCell>+91 98231 44512</TableCell>
            <TableCell><Badge variant="forest">Mon - Sat (Both)</Badge></TableCell>
            <TableCell className="font-mono">{formatINR(120)}</TableCell>
            <TableCell className="font-mono">{formatINR(130)}</TableCell>
            <TableCell><Badge variant="success" dot={true}>Active</Badge></TableCell>
            <TableCell align="right">
              <Button variant="ghost" size="sm">Manage</Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-semibold text-charcoal">Ananya Mehta</TableCell>
            <TableCell>+91 98450 11234</TableCell>
            <TableCell><Badge variant="mint">Lunch Only</Badge></TableCell>
            <TableCell className="font-mono">{formatINR(110)}</TableCell>
            <TableCell className="font-mono text-muted-text">-</TableCell>
            <TableCell><Badge variant="success" dot={true}>Active</Badge></TableCell>
            <TableCell align="right">
              <Button variant="ghost" size="sm">Manage</Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Customers;
