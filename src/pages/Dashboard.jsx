import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  Truck, 
  Clock, 
  CheckCircle2, 
  IndianRupee, 
  Receipt, 
  TrendingDown, 
  ArrowRight,
  Plus
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { formatINR } from '../utils/currency';

export const Dashboard = () => {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-charcoal">Namaste, Saksham 👋</h1>
          <p className="text-sm text-muted-text mt-0.5">
            Here is your daily tiffin service overview for Shree Annapurna Tiffins.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <Link to="/app/dispatch">
            <Button variant="primary" size="md" iconLeft={Truck}>
              Open Dispatch
            </Button>
          </Link>
          <Link to="/app/customers">
            <Button variant="secondary" size="md" iconLeft={Plus}>
              Add Customer
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-text">Active Customers</span>
              <div className="w-8 h-8 rounded-lg bg-forest/10 flex items-center justify-center text-forest">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-bold text-charcoal">38</span>
              <p className="text-xs text-muted-text mt-1">32 Regular · 6 Occasional</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-text">Expected Today</span>
              <div className="w-8 h-8 rounded-lg bg-amber-accent/10 flex items-center justify-center text-amber-dark">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-bold text-charcoal">64</span>
              <p className="text-xs text-muted-text mt-1">34 Lunch · 30 Dinner</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-text">Dispatched Today</span>
              <div className="w-8 h-8 rounded-lg bg-status-success/10 flex items-center justify-center text-status-success">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-bold text-charcoal">32</span>
              <p className="text-xs text-status-success font-medium mt-1">Lunch batch completed</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-text">Pending Meals</span>
              <div className="w-8 h-8 rounded-lg bg-surface-subtle flex items-center justify-center text-charcoal">
                <Truck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-bold text-charcoal">32</span>
              <p className="text-xs text-amber-dark font-medium mt-1">Dinner dispatch at 7:30 PM</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Grid: Daily Dispatch Spotlight & Financial Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Daily Dispatch Overview */}
        <div className="lg:col-span-8">
          <Card>
            <CardHeader
              action={
                <Link to="/app/dispatch">
                  <Button variant="ghost" size="sm" iconRight={ArrowRight}>
                    Go to Full Dispatch
                  </Button>
                </Link>
              }
            >
              <CardTitle>Daily Meal Dispatch Overview</CardTitle>
              <CardDescription>Real-time delivery progress for today's tiffins</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Lunch progress bar */}
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-charcoal">Lunch Service</span>
                    <Badge variant="success" size="sm">Completed</Badge>
                  </div>
                  <span className="text-xs text-muted-text font-medium">32 of 34 Delivered (2 Cancelled)</span>
                </div>
                <div className="w-full bg-surface-subtle rounded-full h-2.5 overflow-hidden border border-border/40">
                  <div className="bg-forest h-2.5 rounded-full" style={{ width: '94%' }} />
                </div>
              </div>

              {/* Dinner progress bar */}
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-charcoal">Dinner Service</span>
                    <Badge variant="pending" size="sm">Pending</Badge>
                  </div>
                  <span className="text-xs text-muted-text font-medium">0 of 30 Dispatched (Starts 7:30 PM)</span>
                </div>
                <div className="w-full bg-surface-subtle rounded-full h-2.5 overflow-hidden border border-border/40">
                  <div className="bg-amber-accent h-2.5 rounded-full" style={{ width: '0%' }} />
                </div>
              </div>

              <div className="p-4 bg-surface-subtle rounded-card border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-charcoal">Next Action: Dinner Dispatch</p>
                  <p className="text-xs text-muted-text">30 recurring customers ready for kitchen packing.</p>
                </div>
                <Link to="/app/dispatch">
                  <Button variant="primary" size="sm" iconLeft={Truck}>
                    Start Dinner Packing
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Financial Highlights */}
        <div className="lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Month-to-Date Finances</CardTitle>
              <CardDescription>November 2026 recognized revenue</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3.5 bg-surface-subtle rounded-card border border-border">
                <span className="text-xs text-muted-text block">Recognized Meal Revenue</span>
                <span className="text-xl font-bold text-forest font-mono">{formatINR(34800)}</span>
                <span className="text-[11px] text-muted-text block mt-0.5">Based on 290 dispatched meals</span>
              </div>

              <div className="p-3.5 bg-surface-subtle rounded-card border border-border">
                <span className="text-xs text-muted-text block">Expenses Recorded</span>
                <span className="text-xl font-bold text-charcoal font-mono">{formatINR(14200)}</span>
                <span className="text-[11px] text-muted-text block mt-0.5">Groceries, gas, veggies</span>
              </div>

              <div className="p-3.5 bg-mint/40 rounded-card border border-mint-dark">
                <span className="text-xs text-forest-deep font-semibold block">Operating Margin</span>
                <span className="text-xl font-bold text-forest-deep font-mono">{formatINR(20600)}</span>
                <span className="text-[11px] text-forest/80 block mt-0.5">59.2% operating profit</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
