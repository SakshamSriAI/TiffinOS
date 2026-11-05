import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';

export const LandingFooter = () => {
  return (
    <footer className="bg-forest-deep text-white border-t border-forest-light py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          {/* Brand col */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-forest flex items-center justify-center text-mint border border-mint/20">
                <svg className="w-4 h-4 text-mint" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="7" width="18" height="13" rx="2" />
                  <path d="M16 7V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v3" />
                </svg>
              </div>
              <span className="text-base font-bold text-white tracking-tight">TiffinOS</span>
              <span className="text-[10px] font-semibold text-mint bg-forest px-1.5 py-0.5 rounded">
                Family Edition
              </span>
            </div>
            <p className="text-xs text-muted-light max-w-sm leading-relaxed">
              The purpose-built business management system for independent tiffin services. Replace paper registers, track every meal dispatched, and generate accurate monthly invoices with peace of mind.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-mint uppercase tracking-wider">Product</p>
            <ul className="space-y-1.5 text-xs text-muted-light">
              <li><a href="#features" className="hover:text-white transition-colors">Customer Management</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Daily Meal Dispatch</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Monthly Invoicing</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Expense Tracking</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Business Reports</a></li>
            </ul>
          </div>

          {/* Business & Regional Standards */}
          <div className="space-y-2">
            <p className="text-xs font-semibold text-mint uppercase tracking-wider">Business Standard</p>
            <ul className="space-y-1.5 text-xs text-muted-light">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-mint" />
                Single Business Edition
              </li>
              <li>Indian Rupee (INR ₹) Support</li>
              <li>IST Timezone (Asia/Kolkata)</li>
              <li>Decimal-Safe Ledger</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-light gap-3">
          <p>© {new Date().getFullYear()} TiffinOS – Family Edition. Crafted for authentic family culinary businesses.</p>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Reliable and practical</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandingFooter;
