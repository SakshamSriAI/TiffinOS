import React from 'react';
import { UserPlus, Truck, FileCheck } from 'lucide-react';
import { Badge } from '../common/Badge';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const STEPS = [
  {
    step: '01',
    icon: UserPlus,
    title: 'Add Customers & Schedules',
    tagline: 'Set up in 5 minutes',
    description: 'Enter your regular customers with their custom lunch and dinner prices, delivery addresses, and weekly delivery preferences (Mon–Sat or custom days).',
    detail: 'Supports regular recurring subscriptions and ad-hoc occasional customers.',
  },
  {
    step: '02',
    icon: Truck,
    title: 'Track Daily Dispatches',
    tagline: '1-tap kitchen confirmation',
    description: 'Every morning and evening, your dispatch terminal automatically generates today’s meal orders. As tiffins leave the kitchen, tap "Mark Dispatched".',
    detail: 'Duplicate protection ensures you never mark the same meal twice.',
  },
  {
    step: '03',
    icon: FileCheck,
    title: 'Generate Bills & View Profits',
    tagline: 'End-of-month peace of mind',
    description: 'At month-end, click "Generate Bills". TiffinOS compiles invoices calculated exclusively from dispatched meals, records partial payments, and displays your true net profit.',
    detail: 'Zero disputed bills. Every invoice links directly to its delivery timestamps.',
  },
];

export const HowItWorksSection = () => {
  const [headerRef, headerRevealed] = useScrollReveal();
  const [cardsRef, cardsRevealed] = useScrollReveal();

  return (
    <section id="how-it-works" className="py-24 bg-surface border-b border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading with Scroll Reveal */}
        <div
          ref={headerRef}
          className={`max-w-3xl mx-auto text-center space-y-4 mb-20 reveal-on-scroll ${
            headerRevealed ? 'is-revealed' : ''
          }`}
        >
          <Badge variant="mint" size="sm">Simple 3-Step Operations</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-forest-deep leading-tight">
            How TiffinOS Works in Your Daily Routine
          </h2>
          <p className="text-base text-charcoal/80 leading-relaxed">
            No complicated accounting software. A practical workflow that seamlessly fits your morning kitchen packing and evening deliveries.
          </p>
        </div>

        {/* Step Sequence Timeline with Staggered Scroll Reveal */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 relative"
        >
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            const delayClass = ['delay-100', 'delay-200', 'delay-300'][index];

            return (
              <div
                key={item.step}
                className={`bg-white rounded-card p-6 sm:p-8 border border-border shadow-subtle flex flex-col justify-between relative group hover:border-forest/40 hover:shadow-card hover:-translate-y-1 transition-all duration-200 reveal-on-scroll ${delayClass} ${
                  cardsRevealed ? 'is-revealed' : ''
                }`}
              >
                {/* Step indicator watermark */}
                <div className="flex items-center justify-between pb-6 border-b border-border/80">
                  <div className="w-12 h-12 rounded-xl bg-forest/10 border border-forest/20 flex items-center justify-center text-forest group-hover:bg-forest group-hover:text-white transition-colors duration-200">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-3xl font-bold text-border group-hover:text-forest/30 transition-colors duration-200">
                    {item.step}
                  </span>
                </div>

                {/* Content */}
                <div className="py-6 space-y-3 flex-1">
                  <span className="text-[11px] uppercase font-bold tracking-wider text-forest bg-mint/50 px-2 py-0.5 rounded">
                    {item.tagline}
                  </span>
                  <h3 className="text-lg font-bold text-charcoal">{item.title}</h3>
                  <p className="text-xs text-muted-text leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Footer Micro-note */}
                <div className="pt-4 border-t border-border/60">
                  <p className="text-[11px] text-charcoal/90 font-medium">
                    ✓ {item.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HowItWorksSection;
