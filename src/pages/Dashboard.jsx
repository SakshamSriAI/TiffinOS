import React from 'react';
import DashboardHeader from '../components/dashboard/DashboardHeader';
import QuickActionToolbar from '../components/dashboard/QuickActionToolbar';
import DashboardKpiCards from '../components/dashboard/DashboardKpiCards';
import DailyDispatchWidget from '../components/dashboard/DailyDispatchWidget';
import FinancialOverviewWidget from '../components/dashboard/FinancialOverviewWidget';
import RecentActivityFeed from '../components/dashboard/RecentActivityFeed';
import QuickActionModals from '../components/dashboard/QuickActionModals';

export const Dashboard = () => {
  return (
    <div className="space-y-6 sm:space-y-8 pb-12 antialiased">
      {/* 1. Greeting, Context & Date Header */}
      <DashboardHeader />

      {/* 2. Quick Action Toolbar */}
      <QuickActionToolbar />

      {/* 3. Four Core Business KPI Cards */}
      <DashboardKpiCards />

      {/* 4. Core Operational Grid: Daily Dispatch Spotlight & Financial Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Most prominent component: Daily Dispatch Terminal (8 cols) */}
        <div className="lg:col-span-8">
          <DailyDispatchWidget />
        </div>

        {/* Monthly Financial Health Widget (4 cols) */}
        <div className="lg:col-span-4">
          <FinancialOverviewWidget />
        </div>
      </div>

      {/* 5. Recent Activity Feed (Dispatches, Payments, Expenses) */}
      <RecentActivityFeed />

      {/* 6. Quick Action Modals */}
      <QuickActionModals />
    </div>
  );
};

export default Dashboard;
