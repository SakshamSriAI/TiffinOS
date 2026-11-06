import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Users, 
  Truck, 
  IndianRupee, 
  Sparkles, 
  ShieldCheck,
  ChevronRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { formatINR } from '../../utils/currency';

export const HeroSection = () => {
  const [activeTab, setActiveTab] = useState('lunch');

  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Editorial & Value Proposition with Staggered Entrance */}
          <div className="lg:col-span-6 space-y-6 lg:pr-4 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="animate-hero-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest/10 border border-forest/15 hover:bg-forest/15 transition-colors">
              <span className="w-2 h-2 rounded-full bg-status-success animate-pulse-gently" />
              <span className="text-xs font-semibold text-forest tracking-wide uppercase">
                Purpose-Built for Indian Tiffin Services
              </span>
            </div>

            {/* Headline */}
            <h1 className="animate-hero-title text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-forest-deep leading-[1.12]">
              Run Your Tiffin Business.{' '}
              <span className="text-forest block sm:inline">Without the Daily Chaos.</span>
            </h1>

            {/* Supporting Copy */}
            <p className="animate-hero-text text-base sm:text-lg text-charcoal/80 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Manage customers, track every meal, generate accurate monthly bills, and understand your business finances — all in one place.
            </p>

            {/* CTA Buttons */}
            <div className="animate-hero-cta flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link to="/login" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto transition-transform hover:-translate-y-0.5" iconRight={ArrowRight}>
                  Get Started
                </Button>
              </Link>
              <a href="#features" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto transition-transform hover:-translate-y-0.5">
                  Explore Features
                </Button>
              </a>
            </div>

            {/* Quick Proof Metrics */}
            <div className="animate-hero-metrics pt-8 border-t border-border grid grid-cols-3 gap-4 text-left">
              <div className="group cursor-default">
                <p className="text-xl sm:text-2xl font-bold text-forest-deep font-mono tracking-tight group-hover:text-forest transition-colors">
                  ₹0 Lost
                </p>
                <p className="text-xs text-muted-text mt-0.5 leading-snug">No unbilled dispatches</p>
              </div>
              <div className="group cursor-default">
                <p className="text-xl sm:text-2xl font-bold text-forest-deep font-mono tracking-tight group-hover:text-forest transition-colors">
                  100%
                </p>
                <p className="text-xs text-muted-text mt-0.5 leading-snug">Dispatched-only billing</p>
              </div>
              <div className="group cursor-default">
                <p className="text-xl sm:text-2xl font-bold text-forest-deep font-mono tracking-tight group-hover:text-forest transition-colors">
                  1-Tap
                </p>
                <p className="text-xs text-muted-text mt-0.5 leading-snug">Mobile meal dispatch</p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Realistic Live Dashboard Preview with Smooth Entrance */}
          <div className="lg:col-span-6 w-full animate-hero-preview">
            <div className="relative mx-auto max-w-xl lg:max-w-none">
              
              {/* Product Frame Window */}
              <div className="bg-white rounded-card shadow-modal border border-border overflow-hidden transition-all duration-300 hover:shadow-dropdown hover:border-forest/30">
                
                {/* Browser/Window Header */}
                <div className="bg-forest-deep text-white px-4 py-3 flex items-center justify-between border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-xs font-medium text-gray-300 ml-2 font-mono">
                      tiffinos.app/dispatch
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] bg-mint/20 text-mint px-2 py-0.5 rounded font-medium">
                      Demo Live View
                    </span>
                  </div>
                </div>

                {/* Sub-header with Business Context */}
                <div className="bg-surface-subtle p-4 border-b border-border flex items-center justify-between">
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-charcoal">
                      Shree Annapurna Tiffins
                    </h2>
                    <p className="text-[11px] text-muted-text">Family Edition · Daily Dispatch Terminal</p>
                  </div>
                  <Badge variant="forest" size="sm">
                    Today (IST)
                  </Badge>
                </div>

                {/* KPI Overview Grid with subtle hover */}
                <div className="grid grid-cols-4 gap-2 p-3 bg-white border-b border-border text-center">
                  <div className="p-2 rounded bg-surface-subtle border border-border/50 hover:bg-surface-subtle/80 transition-colors">
                    <span className="text-[10px] text-muted-text uppercase font-semibold block">Customers</span>
                    <span className="text-base font-bold text-charcoal font-mono">38</span>
                  </div>
                  <div className="p-2 rounded bg-surface-subtle border border-border/50 hover:bg-surface-subtle/80 transition-colors">
                    <span className="text-[10px] text-muted-text uppercase font-semibold block">Expected</span>
                    <span className="text-base font-bold text-charcoal font-mono">64</span>
                  </div>
                  <div className="p-2 rounded bg-mint/40 border border-mint-dark hover:bg-mint/60 transition-colors">
                    <span className="text-[10px] text-forest-deep uppercase font-semibold block">Dispatched</span>
                    <span className="text-base font-bold text-forest-deep font-mono">32</span>
                  </div>
                  <div className="p-2 rounded bg-amber-accent/10 border border-amber-accent/30 hover:bg-amber-accent/20 transition-colors">
                    <span className="text-[10px] text-amber-dark uppercase font-semibold block">Pending</span>
                    <span className="text-base font-bold text-amber-dark font-mono">32</span>
                  </div>
                </div>

                {/* Interactive Service Toggle */}
                <div className="p-4 bg-white space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex rounded-button bg-surface-subtle p-1 border border-border">
                      <button
                        onClick={() => setActiveTab('lunch')}
                        className={`px-3 py-1 text-xs font-semibold rounded-button transition-all duration-150 ${
                          activeTab === 'lunch'
                            ? 'bg-forest text-white shadow-xs'
                            : 'text-muted-text hover:text-charcoal'
                        }`}
                      >
                        Lunch Batch (34)
                      </button>
                      <button
                        onClick={() => setActiveTab('dinner')}
                        className={`px-3 py-1 text-xs font-semibold rounded-button transition-all duration-150 ${
                          activeTab === 'dinner'
                            ? 'bg-forest text-white shadow-xs'
                            : 'text-muted-text hover:text-charcoal'
                        }`}
                      >
                        Dinner Batch (30)
                      </button>
                    </div>

                    <span className="text-xs text-muted-text">
                      {activeTab === 'lunch' ? '32 of 34 Completed' : 'Starts at 7:30 PM'}
                    </span>
                  </div>

                  {/* Progress Indicator */}
                  <div className="w-full bg-surface-subtle rounded-full h-2 overflow-hidden border border-border/60">
                    <div
                      className={`h-2 rounded-full transition-all duration-500 ease-out ${
                        activeTab === 'lunch' ? 'bg-forest w-[94%]' : 'bg-amber-accent w-[0%]'
                      }`}
                    />
                  </div>

                  {/* Sample Orders List */}
                  <div className="space-y-2 pt-1">
                    {activeTab === 'lunch' ? (
                      <>
                        <div className="flex items-center justify-between p-2.5 bg-surface-subtle rounded-button border border-border text-xs hover:border-forest/20 transition-colors">
                          <div className="space-y-0.5">
                            <span className="font-semibold text-charcoal block">Rohan Joshi (Flat 402)</span>
                            <span className="text-muted-text text-[11px]">Regular Lunch · ₹120 · Less spice</span>
                          </div>
                          <Badge variant="success" size="sm" dot={true}>Dispatched</Badge>
                        </div>

                        <div className="flex items-center justify-between p-2.5 bg-surface-subtle rounded-button border border-border text-xs hover:border-forest/20 transition-colors">
                          <div className="space-y-0.5">
                            <span className="font-semibold text-charcoal">Sneha Kulkarni (House 12)</span>
                            <span className="text-muted-text text-[11px]">Regular Lunch · ₹110 · 3 rotis</span>
                          </div>
                          <Badge variant="success" size="sm" dot={true}>Dispatched</Badge>
                        </div>

                        <div className="flex items-center justify-between p-2.5 bg-amber-accent/5 rounded-button border border-amber-accent/30 text-xs hover:border-amber-accent/50 transition-colors">
                          <div className="space-y-0.5">
                            <span className="font-semibold text-charcoal">Pooja Verma (Tower B)</span>
                            <span className="text-muted-text text-[11px]">Ad-hoc Order · ₹140</span>
                          </div>
                          <span className="text-[11px] text-amber-dark font-semibold px-2 py-0.5 bg-amber-accent/15 rounded">
                            Pending Packing
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex items-center justify-between p-2.5 bg-surface-subtle rounded-button border border-border text-xs hover:border-forest/20 transition-colors">
                          <div className="space-y-0.5">
                            <span className="font-semibold text-charcoal">Rajesh Agrawal (Office 101)</span>
                            <span className="text-muted-text text-[11px]">Dinner Regular · ₹130</span>
                          </div>
                          <Badge variant="pending" size="sm" dot={true}>Scheduled 7:30 PM</Badge>
                        </div>

                        <div className="flex items-center justify-between p-2.5 bg-surface-subtle rounded-button border border-border text-xs hover:border-forest/20 transition-colors">
                          <div className="space-y-0.5">
                            <span className="font-semibold text-charcoal">Deepak Patil (Bungalow 7)</span>
                            <span className="text-muted-text text-[11px]">Dinner Regular · ₹125</span>
                          </div>
                          <Badge variant="pending" size="sm" dot={true}>Scheduled 7:45 PM</Badge>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Footer Bar inside Preview */}
                <div className="bg-forest-deep text-white p-3 px-4 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5 text-mint" />
                    <span className="text-muted-light">Recognized Revenue (Nov):</span>
                    <span className="font-bold font-mono text-white">{formatINR(34800)}</span>
                  </div>
                  <Link to="/login" className="text-mint hover:underline font-semibold flex items-center gap-1 group">
                    <span>Open Full System</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>

              </div>

              {/* Decorative Accent Badges */}
              <div className="hidden sm:flex absolute -bottom-4 -left-4 bg-white rounded-card p-3 border border-border shadow-card items-center gap-2.5 z-20 hover:shadow-dropdown transition-all">
                <div className="w-8 h-8 rounded-full bg-forest text-white flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-mint" />
                </div>
                <div>
                  <p className="text-xs font-bold text-charcoal">Zero Billing Errors</p>
                  <p className="text-[10px] text-muted-text">Bills only meals with dispatched stamp</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
