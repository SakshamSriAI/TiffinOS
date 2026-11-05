import React from 'react';
import { ChefHat, Clock, ShieldCheck } from 'lucide-react';
import { Badge } from '../common/Badge';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export const AboutSection = () => {
  const [headerRef, headerRevealed] = useScrollReveal();
  const [cardsRef, cardsRevealed] = useScrollReveal();

  return (
    <section id="about" className="py-20 bg-surface-subtle border-b border-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div
          ref={headerRef}
          className={`max-w-3xl mx-auto text-center space-y-4 mb-16 reveal-on-scroll ${
            headerRevealed ? 'is-revealed' : ''
          }`}
        >
          <Badge variant="forest" size="sm">Our Story & Purpose</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-forest-deep leading-tight">
            Built from Real Kitchen Mornings.
          </h2>
          <p className="text-base text-charcoal/80 leading-relaxed">
            Why we created TiffinOS – Family Edition for independent home chefs and local meal services.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <div
            className={`bg-white rounded-card p-6 sm:p-8 border border-border shadow-subtle space-y-3 hover:border-forest/30 hover:shadow-card hover:-translate-y-0.5 transition-all duration-200 reveal-on-scroll delay-100 ${
              cardsRevealed ? 'is-revealed' : ''
            }`}
          >
            <div className="w-10 h-10 rounded-lg bg-forest/10 flex items-center justify-center text-forest">
              <ChefHat className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-charcoal">Made for Authentic Food Businesses</h3>
            <p className="text-xs text-muted-text leading-relaxed">
              Most business software is bloated with multi-tier permissions, corporate jargon, and endless dropdowns. TiffinOS strips away complexity to focus strictly on what a tiffin owner does every single morning and evening.
            </p>
          </div>

          <div
            className={`bg-white rounded-card p-6 sm:p-8 border border-border shadow-subtle space-y-3 hover:border-forest/30 hover:shadow-card hover:-translate-y-0.5 transition-all duration-200 reveal-on-scroll delay-200 ${
              cardsRevealed ? 'is-revealed' : ''
            }`}
          >
            <div className="w-10 h-10 rounded-lg bg-mint/40 flex items-center justify-center text-forest-deep">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-charcoal">Indian Business Logic from Day One</h3>
            <p className="text-xs text-muted-text leading-relaxed">
              We understand that customers order Mon–Sat, skip on public holidays, pause via WhatsApp for long weekends, and have different lunch vs. dinner agreements. TiffinOS models these workflows naturally.
            </p>
          </div>

          <div
            className={`bg-white rounded-card p-6 sm:p-8 border border-border shadow-subtle space-y-3 hover:border-forest/30 hover:shadow-card hover:-translate-y-0.5 transition-all duration-200 reveal-on-scroll delay-300 ${
              cardsRevealed ? 'is-revealed' : ''
            }`}
          >
            <div className="w-10 h-10 rounded-lg bg-amber-accent/15 flex items-center justify-center text-amber-dark">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-charcoal">Honest & Tamper-Proof Records</h3>
            <p className="text-xs text-muted-text leading-relaxed">
              Your business integrity matters. Every meal dispatched is permanently logged with its date, time, and customer price. Bills are transparent, verifiable, and easy to reconcile against any physical notebook.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutSection;
