import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Users, Receipt, Sparkles } from 'lucide-react';
import { LandingNavbar } from '../components/layout/LandingNavbar';
import { LandingFooter } from '../components/layout/LandingFooter';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Card, CardContent } from '../components/common/Card';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-surface flex flex-col antialiased">
      <LandingNavbar />

      {/* Hero preview foundation */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2">
              <Badge variant="forest" size="md" icon={ShieldCheck}>
                TiffinOS – Family Edition
              </Badge>
              <span className="text-xs text-muted-text font-medium">Built for Authentic Tiffin Services</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-forest-deep leading-[1.15]">
              Run Your Tiffin Business. <br />
              <span className="text-forest">Without the Daily Chaos.</span>
            </h1>

            <p className="text-base sm:text-lg text-charcoal/80 max-w-xl leading-relaxed">
              Manage customers, track every meal, generate accurate monthly bills, and understand your business finances — all in one place.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link to="/app/dashboard">
                <Button variant="primary" size="lg" iconRight={ArrowRight}>
                  Open App Dashboard
                </Button>
              </Link>
              <Link to="/design-system">
                <Button variant="secondary" size="lg" iconLeft={Sparkles}>
                  View Design Tokens & Components
                </Button>
              </Link>
            </div>

            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-border/80">
              <div>
                <p className="text-2xl font-bold text-forest-deep font-mono">100%</p>
                <p className="text-xs text-muted-text mt-0.5">Accurate Dispatched Billing</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-forest-deep font-mono">0</p>
                <p className="text-xs text-muted-text mt-0.5">Paper Register Clutter</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-forest-deep font-mono">INR ₹</p>
                <p className="text-xs text-muted-text mt-0.5">Native Currency Ledger</p>
              </div>
            </div>
          </div>

          {/* Quick interactive foundation card */}
          <div className="lg:col-span-5">
            <Card className="p-6 bg-white shadow-card border-forest/15 relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-status-success animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-charcoal">Live Dispatch Status</span>
                </div>
                <Badge variant="mint" size="sm">Today (IST)</Badge>
              </div>

              <div className="py-6 space-y-4">
                <div className="flex items-center justify-between p-3.5 bg-surface-subtle rounded-card border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-forest/10 flex items-center justify-center text-forest">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-charcoal">Lunch Batch</p>
                      <p className="text-[11px] text-muted-text">32 of 34 Delivered</p>
                    </div>
                  </div>
                  <Badge variant="success" size="sm" dot={true}>94% Done</Badge>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-surface-subtle rounded-card border border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-accent/10 flex items-center justify-center text-amber-dark">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-charcoal">Dinner Batch</p>
                      <p className="text-[11px] text-muted-text">Starts at 7:30 PM</p>
                    </div>
                  </div>
                  <Badge variant="pending" size="sm" dot={true}>Scheduled</Badge>
                </div>
              </div>

              <div className="pt-2">
                <Link to="/app/dispatch" className="block">
                  <Button variant="primary" size="md" className="w-full">
                    Enter Daily Dispatch Terminal
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
};

export default LandingPage;
