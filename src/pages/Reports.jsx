import React from 'react';
import { BarChart3, Download, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { formatINR } from '../utils/currency';

export const Reports = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-charcoal">Business Reports & Analytics</h1>
          <p className="text-sm text-muted-text mt-0.5">
            Recognized meal revenue, operational expenses, operating margins, and customer analytics.
          </p>
        </div>
        <Button variant="secondary" iconLeft={Download}>
          Export CSV Summary
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recognized Meal Revenue</CardTitle>
            <CardDescription>Value of all dispatched meals</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-forest font-mono">{formatINR(34800)}</p>
            <p className="text-xs text-muted-text mt-1">290 dispatched tiffins in current billing cycle</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recorded Expenses</CardTitle>
            <CardDescription>Operating costs</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-charcoal font-mono">{formatINR(14200)}</p>
            <p className="text-xs text-muted-text mt-1">Groceries, vegetables, packaging, gas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Operating Profit</CardTitle>
            <CardDescription>Revenue minus expenses</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-status-success font-mono">{formatINR(20600)}</p>
            <p className="text-xs text-status-success font-medium mt-1">59.2% operating margin</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
