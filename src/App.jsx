import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { SecurityProvider } from './context/SecurityContext';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import DesignSystemPreview from './pages/DesignSystemPreview';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/Dashboard';
import Customers from './pages/Customers';
import Dispatch from './pages/Dispatch';
import Billing from './pages/Billing';
import Expenses from './pages/Expenses';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

export function App() {
  return (
    <SecurityProvider>
      <AppProvider>
        <BrowserRouter>
        <Routes>
          {/* Public Marketing Route */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Design System & Token Showcase */}
          <Route path="/design-system" element={<DesignSystemPreview />} />

          {/* Authentication */}
          <Route path="/login" element={<Login />} />

          {/* Private Application Shell */}
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<Navigate to="/app/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="customers" element={<Customers />} />
            <Route path="dispatch" element={<Dispatch />} />
            <Route path="billing" element={<Billing />} />
            <Route path="expenses" element={<Expenses />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </SecurityProvider>
  );
}

export default App;
