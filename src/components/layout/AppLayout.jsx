import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Truck, 
  Receipt, 
  TrendingDown, 
  BarChart3, 
  Settings, 
  Menu, 
  X, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Calendar,
  Lock,
  Eye,
  EyeOff,
} from 'lucide-react';
import { formatDateIST } from '../../utils/date';
import { useSecurity } from '../../context/SecurityContext';
import { useApp } from '../../context/AppContext';
import { LockScreen } from '../security/LockScreen';

const NAV_ITEMS = [
  { name: 'Dashboard', path: '/app/dashboard', icon: LayoutDashboard },
  { name: 'Customers', path: '/app/customers', icon: Users },
  { name: 'Dispatch', path: '/app/dispatch', icon: Truck, highlight: true },
  { name: 'Billing', path: '/app/billing', icon: Receipt },
  { name: 'Expenses', path: '/app/expenses', icon: TrendingDown },
  { name: 'Reports', path: '/app/reports', icon: BarChart3 },
  { name: 'Settings', path: '/app/settings', icon: Settings },
];

export const AppLayout = () => {
  const { isLocked, lock, isPrivacyMode, togglePrivacyMode } = useSecurity();
  const { settings } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  if (isLocked) {
    return <LockScreen />;
  }

  const businessName = settings?.businessName || 'Shree Annapurna Tiffins';
  const ownerName = settings?.ownerName || 'Saksham';
  const ownerInitials = ownerName
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'SO';

  const currentNav = NAV_ITEMS.find((item) => location.pathname.startsWith(item.path)) || NAV_ITEMS[0];
  const todayFormatted = formatDateIST(new Date(), 'full');

  return (
    <div className="min-h-screen bg-surface flex flex-col md:flex-row antialiased">
      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex flex-col w-64 bg-forest-deep text-white border-r border-forest-light flex-shrink-0 min-h-screen sticky top-0 h-screen">
        {/* Brand header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-forest flex items-center justify-center border border-mint/20 shadow-sm">
              <svg className="w-5 h-5 text-mint" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="7" width="18" height="13" rx="2" />
                <path d="M16 7V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v3" />
                <line x1="12" y1="12" x2="12" y2="12.01" />
              </svg>
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-white block">TiffinOS</span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-mint/80 bg-mint/10 px-1.5 py-0.5 rounded">
                Family Edition
              </span>
            </div>
          </div>
        </div>

        {/* Business quick info */}
        <div className="px-6 py-4 bg-white/5 border-b border-white/5">
          <p className="text-xs font-semibold text-mint/90 truncate">{businessName}</p>
          <div className="flex items-center gap-1.5 mt-0.5 text-[11px] text-muted-light">
            <ShieldCheck className="w-3.5 h-3.5 text-mint" />
            <span>Single Business Mode (INR)</span>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isHighlight = item.highlight;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  group flex items-center justify-between px-3.5 py-2.5 rounded-button text-sm font-medium transition-all duration-150
                  ${isActive
                    ? 'bg-forest text-white shadow-sm font-semibold'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-colors ${
                    isHighlight ? 'text-amber-accent' : 'text-current'
                  }`} />
                  <span>{item.name}</span>
                </div>
                {isHighlight && (
                  <span className="text-[10px] bg-amber-accent/20 text-amber-accent font-semibold px-1.5 py-0.5 rounded">
                    Daily
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 bg-white/5 space-y-1">
          <button
            type="button"
            onClick={lock}
            className="w-full flex items-center justify-between text-xs text-rose-300 hover:text-white hover:bg-white/10 rounded px-2 py-1.5 transition-colors"
            title="Lock Session & Require Passcode"
          >
            <span className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5" />
              Lock Session
            </span>
          </button>
          <NavLink
            to="/"
            className="flex items-center justify-between text-xs text-muted-light hover:text-white transition-colors px-2 py-1.5"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              Public Website
            </span>
          </NavLink>
        </div>
      </aside>

      {/* MOBILE TOP BAR */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-forest-deep text-white sticky top-0 z-40 border-b border-forest-light">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-forest flex items-center justify-center border border-mint/20">
            <svg className="w-4 h-4 text-mint" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="7" width="18" height="13" rx="2" />
              <path d="M16 7V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v3" />
            </svg>
          </div>
          <div>
            <h1 className="text-sm font-bold leading-tight">TiffinOS</h1>
            <p className="text-[10px] text-mint/80">Family Edition</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={togglePrivacyMode}
            title={isPrivacyMode ? 'Disable Privacy Mask' : 'Enable Privacy Mask'}
            className={`p-2 rounded-button text-xs transition-colors ${
              isPrivacyMode ? 'bg-mint text-forest font-bold' : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            {isPrivacyMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
          <button
            type="button"
            onClick={lock}
            title="Lock TiffinOS"
            className="p-2 rounded-button bg-white/10 text-white hover:bg-red-500 transition-colors"
          >
            <Lock className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-button bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-charcoal/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-forest-deep text-white h-full flex flex-col z-10 shadow-xl">
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <span className="font-bold text-sm tracking-wide">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 rounded text-muted-light hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) => `
                      flex items-center justify-between px-3 py-3 rounded-button text-sm font-medium
                      ${isActive ? 'bg-forest text-white' : 'text-gray-300 hover:bg-white/10'}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </div>
                  </NavLink>
                );
              })}
            </nav>

            <div className="p-4 border-t border-white/10">
              <NavLink
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs text-mint hover:underline flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Go to Landing Page
              </NavLink>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 pb-16 md:pb-0">
        {/* DESKTOP TOP HEADER */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-white border-b border-border sticky top-0 z-30 shadow-subtle">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted-text">TiffinOS</span>
            <ChevronRight className="w-3.5 h-3.5 text-muted-light" />
            <span className="font-semibold text-charcoal">{currentNav.name}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Privacy Mode Toggle */}
            <button
              type="button"
              onClick={togglePrivacyMode}
              title={isPrivacyMode ? 'Disable Privacy Mask' : 'Enable Privacy Mask (Hides customer phones & revenue)'}
              className={`px-2.5 py-1.5 rounded-button border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                isPrivacyMode
                  ? 'bg-forest text-white border-forest shadow-xs'
                  : 'bg-surface-subtle text-muted-text border-border hover:text-charcoal hover:bg-white'
              }`}
            >
              {isPrivacyMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span className="hidden lg:inline">{isPrivacyMode ? 'Privacy On' : 'Privacy Mode'}</span>
            </button>

            {/* Quick Lock Button */}
            <button
              type="button"
              onClick={lock}
              title="Lock TiffinOS (Requires Passcode to unlock)"
              className="px-2.5 py-1.5 rounded-button bg-surface-subtle border border-border text-muted-text hover:text-status-error hover:border-status-error/30 hover:bg-red-50 transition-colors flex items-center gap-1.5"
            >
              <Lock className="w-3.5 h-3.5" />
              <span className="hidden lg:inline text-xs font-medium">Lock</span>
            </button>

            <div className="flex items-center gap-2 text-xs font-medium text-muted-text bg-surface-subtle border border-border px-3 py-1.5 rounded-button">
              <Calendar className="w-3.5 h-3.5 text-forest" />
              <span>{todayFormatted}</span>
            </div>
            <div className="flex items-center gap-2 pl-2 border-l border-border">
              <div className="w-8 h-8 rounded-full bg-forest text-white flex items-center justify-center text-xs font-bold">
                {ownerInitials}
              </div>
              <div className="text-left">
                <span className="text-xs font-semibold text-charcoal block leading-none">{ownerName}</span>
                <span className="text-[10px] text-muted-text">Business Owner</span>
              </div>
            </div>
          </div>
        </header>

        {/* CONTENT VIEWPORT */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* MOBILE BOTTOM NAVIGATION BAR FOR ONE-HANDED ACCESS */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-border z-30 flex items-center justify-around py-1.5 px-2 shadow-card">
        {NAV_ITEMS.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isHighlight = item.highlight;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex flex-col items-center justify-center py-1 px-2.5 rounded-lg text-[10px] font-medium transition-colors
                ${isActive
                  ? isHighlight ? 'text-forest font-bold' : 'text-forest font-bold'
                  : 'text-muted-text hover:text-charcoal'
                }
              `}
            >
              <div className={`p-1 rounded-md ${isHighlight ? 'bg-amber-accent/15 text-amber-dark' : ''}`}>
                <Icon className="w-4 h-4" />
              </div>
              <span className="mt-0.5">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default AppLayout;
