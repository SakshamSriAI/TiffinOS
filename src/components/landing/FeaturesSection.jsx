import React, { useState } from 'react';
import { 
  Users, 
  Truck, 
  Receipt, 
  TrendingDown, 
  BarChart3, 
  History, 
  CheckCircle2, 
  Clock, 
  IndianRupee,
  Calendar,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { formatINR } from '../../utils/currency';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const FEATURES = [
  {
    id: 'customers',
    title: '1. Customer Management',
    subtitle: 'Tailored weekly subscriptions & custom pricing',
    description: 'Every customer is unique. Set distinct lunch and dinner prices per customer, define weekly delivery schedules (Mon–Sat or custom days), and easily pause service when a customer travels.',
    icon: Users,
    previewType: 'customers',
  },
  {
    id: 'dispatch',
    title: '2. Daily Meal Dispatch',
    subtitle: 'The kitchen terminal that prevents missed tiffins',
    description: 'Built for the speed of morning and evening packing. Toggle between Lunch and Dinner tabs, view dietary notes, and mark orders dispatched with a single tap. Duplicate orders are prevented automatically.',
    icon: Truck,
    previewType: 'dispatch',
  },
  {
    id: 'billing',
    title: '3. Monthly Billing & Invoices',
    subtitle: 'Bills calculated strictly from delivered meals',
    description: 'Say goodbye to disputed bills. Invoices are compiled automatically based only on meals with a confirmed Dispatched stamp. Includes partial payment tracking and professional print-ready formats.',
    icon: Receipt,
    previewType: 'billing',
  },
  {
    id: 'expenses',
    title: '4. Kitchen Expense Tracking',
    subtitle: 'Categorize mandi, grocery, and fuel costs',
    description: 'Log daily expenses in seconds. Categorize groceries, vegetables, cooking gas, salaries, and packaging materials to maintain an exact daily cost average for your kitchen.',
    icon: TrendingDown,
    previewType: 'expenses',
  },
  {
    id: 'reports',
    title: '5. Business Reports & Margins',
    subtitle: 'Know your true operating profit in INR',
    description: 'Clear financial visibility separating recognized meal revenue from cash collected. Monitor lunch vs. dinner profitability, expense distribution, and outstanding customer balances.',
    icon: BarChart3,
    previewType: 'reports',
  },
  {
    id: 'history',
    title: '6. Meal History & Audit Trail',
    subtitle: 'Timestamped proof for every single tiffin',
    description: 'A tamper-proof chronological log of every meal dispatched, skipped, or cancelled. Whenever a customer asks about a specific date, pull up the exact delivery record in three seconds.',
    icon: History,
    previewType: 'history',
  },
];

export const FeaturesSection = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [headerRef, headerRevealed] = useScrollReveal();
  const [bodyRef, bodyRevealed] = useScrollReveal();

  const feature = FEATURES[activeFeature];
  const Icon = feature.icon;

  return (
    <section id="features" className="py-24 bg-white border-b border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Scroll Reveal */}
        <div
          ref={headerRef}
          className={`max-w-3xl mx-auto text-center space-y-4 mb-16 reveal-on-scroll ${
            headerRevealed ? 'is-revealed' : ''
          }`}
        >
          <Badge variant="forest" size="sm">Core System Capabilities</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-forest-deep leading-tight">
            Everything your tiffin business needs. One platform.
          </h2>
          <p className="text-base text-charcoal/80 leading-relaxed">
            Six cohesive modules designed specifically for the daily workflow of home chefs and independent tiffin services.
          </p>
        </div>

        {/* Interactive Feature Showcase with Tab Selector & Rich Visual Previews */}
        <div
          ref={bodyRef}
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center reveal-on-scroll delay-100 ${
            bodyRevealed ? 'is-revealed' : ''
          }`}
        >
          {/* Feature List (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-2">
            {FEATURES.map((item, index) => {
              const ItemIcon = item.icon;
              const isSelected = activeFeature === index;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveFeature(index)}
                  className={`w-full text-left p-4 rounded-card border transition-all duration-200 flex items-start gap-4 ${
                    isSelected
                      ? 'bg-surface-subtle border-forest/30 shadow-subtle ring-1 ring-forest/20'
                      : 'bg-white border-transparent hover:bg-surface-subtle/50 hover:border-border'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center transition-colors ${
                    isSelected ? 'bg-forest text-white' : 'bg-surface-subtle text-muted-text'
                  }`}>
                    <ItemIcon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-bold truncate ${
                      isSelected ? 'text-forest-deep' : 'text-charcoal'
                    }`}>
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-text mt-0.5 line-clamp-1">
                      {item.subtitle}
                    </p>
                  </div>
                  <ChevronRight className={`w-4 h-4 flex-shrink-0 mt-1 transition-transform ${
                    isSelected ? 'text-forest translate-x-1' : 'text-muted-light'
                  }`} />
                </button>
              );
            })}
          </div>

          {/* Interactive Feature Visual Preview (Right 7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-surface rounded-card border border-border p-6 sm:p-8 shadow-card relative overflow-hidden min-h-[460px] flex flex-col justify-between transition-all duration-300">
              
              {/* Feature Header */}
              <div className="space-y-3 pb-6 border-b border-border/80">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-forest/10 text-forest">
                      <Icon className="w-4 h-4" />
                    </span>
                    <h3 className="text-xl font-bold text-forest-deep">{feature.title}</h3>
                  </div>
                  <Badge variant="mint" size="sm">Active Feature</Badge>
                </div>
                <p className="text-sm text-charcoal/80 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Dynamic UI Preview depending on selected feature */}
              <div key={feature.id} className="py-6 flex-1 flex flex-col justify-center animate-in fade-in duration-300">
                
                {/* 1. Customers Preview */}
                {feature.id === 'customers' && (
                  <div className="bg-white rounded-card border border-border p-4 shadow-subtle space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-border text-xs">
                      <span className="font-bold text-charcoal">Customer Pricing & Schedule Matrix</span>
                      <Badge variant="success" size="sm">Regular</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-2.5 bg-surface-subtle rounded border border-border">
                        <span className="text-muted-text block">Lunch Price</span>
                        <span className="font-bold text-forest text-sm font-mono">{formatINR(120)}</span>
                      </div>
                      <div className="p-2.5 bg-surface-subtle rounded border border-border">
                        <span className="text-muted-text block">Dinner Price</span>
                        <span className="font-bold text-forest text-sm font-mono">{formatINR(135)}</span>
                      </div>
                    </div>
                    <div className="text-[11px] text-muted-text flex items-center justify-between pt-1">
                      <span>Schedule: Mon · Tue · Wed · Thu · Fri · Sat</span>
                      <span className="text-forest font-semibold">Sunday Paused</span>
                    </div>
                  </div>
                )}

                {/* 2. Dispatch Preview */}
                {feature.id === 'dispatch' && (
                  <div className="bg-white rounded-card border border-border p-4 shadow-subtle space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-border text-xs">
                      <span className="font-bold text-charcoal">Daily Kitchen Dispatch Line</span>
                      <span className="text-[11px] font-mono text-muted-text">12:30 PM Batch</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2.5 bg-surface-subtle rounded border border-border text-xs">
                        <div>
                          <p className="font-bold text-charcoal">Dr. Anirudh Sen</p>
                          <p className="text-[11px] text-muted-text">Lunch Dabba · 3 Rotis, No Curd</p>
                        </div>
                        <Badge variant="success" size="sm" dot={true}>Dispatched</Badge>
                      </div>
                      <div className="flex items-center justify-between p-2.5 bg-amber-accent/10 rounded border border-amber-accent/30 text-xs">
                        <div>
                          <p className="font-bold text-charcoal">Preeti Kashyap</p>
                          <p className="text-[11px] text-muted-text">Occasional Order · Extra Dal</p>
                        </div>
                        <button className="px-3 py-1 bg-forest text-white rounded text-xs font-semibold hover:bg-forest-hover transition-colors">
                          Dispatch (₹120)
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Billing Preview */}
                {feature.id === 'billing' && (
                  <div className="bg-white rounded-card border border-border p-4 shadow-subtle space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-border text-xs">
                      <div>
                        <span className="font-bold text-charcoal block">Invoice INV-2026-11-008</span>
                        <span className="text-[11px] text-muted-text">Period: 01 Nov - 30 Nov 2026</span>
                      </div>
                      <Badge variant="pending" size="sm">Partially Paid</Badge>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between text-muted-text">
                        <span>42 Dispatched Lunches @ ₹110</span>
                        <span className="font-mono text-charcoal">{formatINR(4620)}</span>
                      </div>
                      <div className="flex justify-between text-muted-text">
                        <span>18 Dispatched Dinners @ ₹130</span>
                        <span className="font-mono text-charcoal">{formatINR(2340)}</span>
                      </div>
                      <div className="flex justify-between font-bold pt-1.5 border-t border-border text-charcoal">
                        <span>Total Due</span>
                        <span className="font-mono text-forest">{formatINR(6960)}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 4. Expenses Preview */}
                {feature.id === 'expenses' && (
                  <div className="bg-white rounded-card border border-border p-4 shadow-subtle space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-border text-xs">
                      <span className="font-bold text-charcoal">Kitchen Expense Log</span>
                      <span className="text-xs font-bold text-status-error font-mono">{formatINR(14200)} Total</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 bg-surface-subtle rounded border border-border">
                        <span className="text-muted-text text-[11px] block">Vegetables (Mandi)</span>
                        <span className="font-bold text-charcoal font-mono">{formatINR(6450)}</span>
                      </div>
                      <div className="p-2.5 bg-surface-subtle rounded border border-border">
                        <span className="text-muted-text text-[11px] block">Groceries & Spices</span>
                        <span className="font-bold text-charcoal font-mono">{formatINR(4100)}</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-muted-text">Daily Kitchen Burn Average: ₹710/day</p>
                  </div>
                )}

                {/* 5. Reports Preview */}
                {feature.id === 'reports' && (
                  <div className="bg-white rounded-card border border-border p-4 shadow-subtle space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-border text-xs">
                      <span className="font-bold text-charcoal">Operating Margin Analysis</span>
                      <span className="text-[11px] text-status-success font-bold font-mono">59.2% Margin</span>
                    </div>
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-text">Recognized Revenue (290 meals)</span>
                        <span className="font-mono font-bold text-forest">{formatINR(34800)}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-text">Operating Expenses</span>
                        <span className="font-mono font-bold text-charcoal">-{formatINR(14200)}</span>
                      </div>
                      <div className="p-2.5 bg-mint/50 rounded border border-mint-dark flex justify-between font-bold text-forest-deep">
                        <span>Net Operating Profit</span>
                        <span className="font-mono">{formatINR(20600)}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* 6. History Preview */}
                {feature.id === 'history' && (
                  <div className="bg-white rounded-card border border-border p-4 shadow-subtle space-y-2">
                    <div className="flex items-center justify-between pb-2 border-b border-border text-xs">
                      <span className="font-bold text-charcoal">Customer Meal Audit Trail</span>
                      <Badge variant="forest" size="sm">Audit Log</Badge>
                    </div>
                    <div className="space-y-1.5 text-xs font-mono">
                      <div className="flex justify-between p-1.5 bg-surface-subtle rounded text-[11px]">
                        <span>05 Nov 2026, 12:44 PM</span>
                        <span className="text-status-success font-semibold">Dispatched (₹120)</span>
                      </div>
                      <div className="flex justify-between p-1.5 bg-surface-subtle rounded text-[11px]">
                        <span>04 Nov 2026, 12:41 PM</span>
                        <span className="text-status-success font-semibold">Dispatched (₹120)</span>
                      </div>
                      <div className="flex justify-between p-1.5 bg-rose-50 rounded text-[11px]">
                        <span>03 Nov 2026, 10:15 AM</span>
                        <span className="text-status-error font-semibold">Cancelled (WhatsApp)</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Bottom Feature Navigation Hint */}
              <div className="pt-4 border-t border-border/80 flex items-center justify-between text-xs text-muted-text">
                <span>Designed for 20–50 customer family services</span>
                <span className="font-medium text-forest">Click any feature on the left to inspect</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
