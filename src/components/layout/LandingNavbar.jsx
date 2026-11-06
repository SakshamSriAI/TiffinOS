import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '../common/Button';

export const LandingNavbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-subtle border-b border-border/80 py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* LEFT: Logo & Wordmark */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-forest flex items-center justify-center text-white border border-mint/20 shadow-sm transition-transform group-hover:scale-105">
              <svg className="w-5 h-5 text-mint" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="7" width="18" height="13" rx="2" />
                <path d="M16 7V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v3" />
                <line x1="12" y1="12" x2="12" y2="12.01" />
              </svg>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-lg font-bold tracking-tight text-forest-deep">TiffinOS</span>
                <span className="text-[10px] uppercase font-bold tracking-wider text-forest bg-mint px-1.5 py-0.5 rounded">
                  Family Edition
                </span>
              </div>
            </div>
          </Link>

          {/* MIDDLE: Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8">
            <a href="#features" className="text-sm font-medium text-charcoal/80 hover:text-forest transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-charcoal/80 hover:text-forest transition-colors">
              How It Works
            </a>
            <a href="#benefits" className="text-sm font-medium text-charcoal/80 hover:text-forest transition-colors">
              Benefits
            </a>
            <a href="#about" className="text-sm font-medium text-charcoal/80 hover:text-forest transition-colors">
              About
            </a>
          </nav>

          {/* RIGHT: Login & Get Started CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Login
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="primary" size="sm" iconRight={ArrowRight}>
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-button text-charcoal hover:bg-surface-subtle transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Responsive Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-border px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-1">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-charcoal hover:bg-surface-subtle rounded-button"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-charcoal hover:bg-surface-subtle rounded-button"
            >
              How It Works
            </a>
            <a
              href="#benefits"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-charcoal hover:bg-surface-subtle rounded-button"
            >
              Benefits
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-sm font-medium text-charcoal hover:bg-surface-subtle rounded-button"
            >
              About
            </a>
          </nav>

          <div className="pt-3 border-t border-border flex flex-col gap-2">
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="secondary" size="md" className="w-full">
                Login
              </Button>
            </Link>
            <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="primary" size="md" className="w-full" iconRight={ArrowRight}>
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default LandingNavbar;
