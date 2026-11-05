import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Button } from '../common/Button';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export const FinalCtaSection = () => {
  const [containerRef, containerRevealed] = useScrollReveal();

  return (
    <section className="py-24 bg-surface relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={containerRef}
          className={`bg-white rounded-card border border-border p-8 sm:p-14 shadow-card text-center relative overflow-hidden reveal-on-scroll ${
            containerRevealed ? 'is-revealed' : ''
          }`}
        >
          <div className="max-w-2xl mx-auto space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest/10 border border-forest/15">
              <ShieldCheck className="w-3.5 h-3.5 text-forest" />
              <span className="text-xs font-semibold text-forest uppercase tracking-wider">
                Start Today
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-forest-deep leading-tight">
              Spend Less Time Managing Records. More Time Growing Your Business.
            </h2>

            <p className="text-base sm:text-lg text-charcoal/80 leading-relaxed font-normal">
              Bring your tiffin business operations together with TiffinOS.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link to="/app/dashboard" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto hover:-translate-y-0.5 transition-transform" iconRight={ArrowRight}>
                  Get Started
                </Button>
              </Link>
              <Link to="/login" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto hover:-translate-y-0.5 transition-transform">
                  Owner Sign In
                </Button>
              </Link>
            </div>

            <p className="text-xs text-muted-text pt-2">
              Single-business application · Preloaded with realistic demo data · Instant access
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCtaSection;
