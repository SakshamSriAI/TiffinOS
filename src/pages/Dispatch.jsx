import React from 'react';
import { Truck, Calendar, CheckCircle2, XCircle, Plus, Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Input } from '../components/common/Input';
import { Table, TableHead, TableBody, TableRow, TableHeader, TableCell } from '../components/common/Table';
import { formatINR } from '../utils/currency';
import { formatDateIST } from '../utils/date';

export const Dispatch = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-charcoal">Daily Meal Dispatch</h1>
          <p className="text-sm text-muted-text mt-0.5">
            Mark daily lunches and dinners dispatched. Single source of truth for monthly billing.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="md" iconLeft={Plus}>
            Add One-Time Order
          </Button>
        </div>
      </div>

      {/* Date selector and Service Tabs */}
      <Card>
        <CardContent className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase text-muted-text">Select Date:</span>
            <div className="flex items-center gap-2 bg-surface-subtle px-3 py-1.5 rounded-button border border-border text-xs font-medium">
              <Calendar className="w-3.5 h-3.5 text-forest" />
              <span>{formatDateIST(new Date(), 'full')}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <Button variant="primary" size="sm">
              Lunch Service (34)
            </Button>
            <Button variant="secondary" size="sm">
              Dinner Service (30)
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Dispatch Cards / Table */}
      <Table>
        <TableHead>
          <TableRow hover={false}>
            <TableHeader>Customer & Delivery Address</TableHeader>
            <TableHeader>Meal Details</TableHeader>
            <TableHeader>Rate</TableHeader>
            <TableHeader>Special Notes</TableHeader>
            <TableHeader>Status</TableHeader>
            <TableHeader align="right">Action</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <p className="font-semibold text-charcoal">Rohan Joshi</p>
              <p className="text-xs text-muted-text">Flat 402, Green Valley Apts, Sector 14</p>
            </TableCell>
            <TableCell>
              <Badge variant="forest">Lunch (Regular)</Badge>
            </TableCell>
            <TableCell className="font-mono">{formatINR(120)}</TableCell>
            <TableCell className="text-xs text-muted-text">Less spice, 3 rotis</TableCell>
            <TableCell>
              <Badge variant="success" dot={true}>Dispatched (12:45 PM)</Badge>
            </TableCell>
            <TableCell align="right">
              <Button variant="ghost" size="sm" disabled={true}>
                Done
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <p className="font-semibold text-charcoal">Sneha Kulkarni</p>
              <p className="text-xs text-muted-text">House 12, Lane 3, Model Colony</p>
            </TableCell>
            <TableCell>
              <Badge variant="forest">Lunch (Regular)</Badge>
            </TableCell>
            <TableCell className="font-mono">{formatINR(110)}</TableCell>
            <TableCell className="text-xs text-muted-text">Extra dal</TableCell>
            <TableCell>
              <Badge variant="pending" dot={true}>Kitchen Ready</Badge>
            </TableCell>
            <TableCell align="right">
              <Button variant="primary" size="sm" iconLeft={CheckCircle2}>
                Mark Dispatched
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default Dispatch;
