import React from 'react';
import { 
  FileSpreadsheet, 
  AlertTriangle, 
  FileX, 
  HelpCircle, 
  WalletCards, 
  CheckCircle,
  XCircle,
  ArrowRight
} from 'lucide-react';
import { Badge } from '../common/Badge';

const PROBLEMS = [
  {
    icon: FileSpreadsheet,
    title: 'Paper Registers & Loose Diaries',
    description: 'Messy tick marks in notebooks that get tea stains, torn pages, or lost when you need to calculate month-end dues.',
    tag: 'Manual Chaos',
  },
  {
    icon: AlertTriangle,
    title: 'Missed & Forgotten Dispatches',
    description: 'Customers message on WhatsApp to pause or restart meals, and kitchen helpers cook extra or forget to pack the dabba.',
    tag: 'Communication Gap',
  },
  {
    icon: FileX,
    title: 'Complicated Monthly Billing',
    description: 'Spending entire weekends arguing over how many meals were actually delivered versus how many were paused.',
    tag: 'Disputed Bills',
  },
  {
    icon: HelpCircle,
    title: 'Unorganized Customer Pricing',
    description: 'Different customers pay different lunch/dinner rates. Remembering who agreed to ₹110 vs ₹130 without written records.',
    tag: 'Lost Margins',
  },
  {
    icon: WalletCards,
    title: 'Unclear Kitchen Profits',
    description: 'Money comes into personal UPI, vegetable mandi bills are paid in cash, and at month-end you have no idea what your real profit is.',
    tag: 'Zero Visibility',
  },
];

export const ProblemSection = () => {
  return (
    <section className="py-20 bg-surface-subtle border-y border-border/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <Badge variant="pending" size="sm">The Daily Reality</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-forest-deep leading-tight">
            Running a tiffin business shouldn't mean managing endless paperwork.
          </h2>
          <p className="text-base text-charcoal/80 leading-relaxed">
            Independent tiffin owners spend hours juggling diaries, WhatsApp cancellations, and disputed customer balances instead of focusing on great food.
          </p>
        </div>

        {/* Asymmetrical Layout: Editorial Breakdown on Left, Contrast Card on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: 5 Specific Pain Points in a Structured List */}
          <div className="lg:col-span-7 space-y-4">
            {PROBLEMS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-card p-5 border border-border shadow-subtle hover:border-forest/20 transition-colors flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-rose-50 border border-rose-200 flex-shrink-0 flex items-center justify-center text-status-error">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <h3 className="text-sm font-bold text-charcoal">{item.title}</h3>
                      <span className="text-[10px] uppercase font-semibold text-rose-800 bg-rose-100/70 px-2 py-0.5 rounded">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-xs text-muted-text leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: High-Impact Before & After Card */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white rounded-card border border-border p-6 sm:p-8 shadow-card">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-text">
                  Operational Comparison
                </span>
                <span className="text-xs font-semibold text-forest">Direct Impact</span>
              </div>

              {/* The Old Way */}
              <div className="pt-6 pb-5 space-y-3">
                <div className="flex items-center gap-2">
                  <XCircle className="w-4 h-4 text-status-error flex-shrink-0" />
                  <p className="text-xs font-bold text-charcoal uppercase tracking-wider">The Paper Register Way</p>
                </div>
                <ul className="space-y-2 text-xs text-muted-text pl-6 list-disc">
                  <li>3+ hours every Sunday calculating dues</li>
                  <li>Customer arguments over missed pause dates</li>
                  <li>Cash expenses mixed with household spends</li>
                  <li>Historical pricing forgotten when rates change</li>
                </ul>
              </div>

              {/* Divider */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-white px-3 text-[11px] font-bold text-forest uppercase tracking-widest">
                    Transformed By TiffinOS
                  </span>
                </div>
              </div>

              {/* The TiffinOS Way */}
              <div className="pt-3 space-y-3">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-status-success flex-shrink-0" />
                  <p className="text-xs font-bold text-forest-deep uppercase tracking-wider">The TiffinOS Way</p>
                </div>
                <ul className="space-y-2 text-xs text-charcoal pl-6 list-disc font-medium">
                  <li>Dispatches stamped in seconds right from your phone</li>
                  <li>Invoices auto-compiled strictly from dispatched meals</li>
                  <li>Every customer has locked lunch & dinner price history</li>
                  <li>Clean operating profit calculated automatically</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-border bg-surface-subtle p-4 rounded-card">
              <p className="text-xs text-charcoal font-semibold">
                "No more register reconciliation every Sunday night."
              </p>
              <p className="text-[11px] text-muted-text mt-1">
                Designed for single-owner operations with 20–50 regular customers.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default ProblemSection;
