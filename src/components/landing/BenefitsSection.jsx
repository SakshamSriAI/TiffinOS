import React from 'react';
import { 
  FileCheck2, 
  Receipt, 
  CalendarCheck, 
  TrendingUp, 
  HeartHandshake,
  CheckCircle2
} from 'lucide-react';
import { Badge } from '../common/Badge';

const BENEFITS = [
  {
    icon: FileCheck2,
    title: 'Drastically Less Paperwork',
    description: 'No more lost notebooks, ink smudges, or searching through piles of registers. Your entire customer ledger lives securely on your phone or laptop.',
  },
  {
    icon: Receipt,
    title: '100% Accurate Dispatched Billing',
    description: 'Customers only pay for meals they actually received. Zero disputes over skipped meals, cancellations, or holiday breaks.',
  },
  {
    icon: CalendarCheck,
    title: 'Better Daily Kitchen Organization',
    description: 'Know exactly how many lunch and dinner boxes to prepare each morning. Dietary preferences and delivery instructions are always right in front of you.',
  },
  {
    icon: TrendingUp,
    title: 'True Financial Visibility in INR',
    description: 'Separate meal revenue from recorded expenses. Know your exact daily food cost and net monthly operating profit with zero guesswork.',
  },
  {
    icon: HeartHandshake,
    title: 'More Time for Food Quality & Growth',
    description: 'Reclaim 10+ hours every month previously wasted on manual calculations. Spend that time cooking great food, nurturing relationships, and expanding.',
  },
];

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="py-24 bg-forest-deep text-white border-b border-forest-light relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-20">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest text-mint text-xs font-bold uppercase tracking-wider border border-mint/20">
            Real Business Impact
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
            Designed to Give You Your Sundays Back.
          </h2>
          <p className="text-base text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Built specifically to solve the headaches of running an authentic family tiffin business. Here is how TiffinOS transforms your day-to-day operations:
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white/5 rounded-card p-6 sm:p-8 border border-white/10 hover:border-mint/30 hover:bg-white/[0.07] transition-all duration-200 space-y-4"
              >
                <div className="w-10 h-10 rounded-lg bg-mint/10 border border-mint/20 flex items-center justify-center text-mint">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">{item.title}</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}

          {/* Impact Summary Card */}
          <div className="bg-forest rounded-card p-6 sm:p-8 border border-mint/30 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <span className="text-xs uppercase font-bold tracking-wider text-mint">Family First</span>
              <h3 className="text-lg font-bold text-white">Focus on Food, Not Registers</h3>
              <p className="text-xs text-gray-200 leading-relaxed">
                A simple, dependable tool your whole family can understand and use without any tech headaches.
              </p>
            </div>
            <div className="pt-4 border-t border-white/10 flex items-center gap-2 text-xs text-mint font-semibold">
              <CheckCircle2 className="w-4 h-4 text-mint flex-shrink-0" />
              <span>Ready for daily kitchen use</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default BenefitsSection;
