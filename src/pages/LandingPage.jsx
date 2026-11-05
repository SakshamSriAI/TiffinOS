import React from 'react';
import LandingNavbar from '../components/layout/LandingNavbar';
import HeroSection from '../components/landing/HeroSection';
import ProblemSection from '../components/landing/ProblemSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import HowItWorksSection from '../components/landing/HowItWorksSection';
import BenefitsSection from '../components/landing/BenefitsSection';
import AboutSection from '../components/landing/AboutSection';
import FinalCtaSection from '../components/landing/FinalCtaSection';
import LandingFooter from '../components/layout/LandingFooter';

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-surface flex flex-col antialiased selection:bg-mint selection:text-forest-deep">
      {/* 1. Sticky Navigation Bar */}
      <LandingNavbar />

      <main className="flex-1">
        {/* 2. Hero Section with Interactive Dashboard Preview */}
        <HeroSection />

        {/* 3. Problem Section (Paper Chaos vs TiffinOS Clarity) */}
        <ProblemSection />

        {/* 4. Six Core Features with Live UI Snippets */}
        <FeaturesSection />

        {/* 5. How It Works (3-Step Daily Operational Timeline) */}
        <HowItWorksSection />

        {/* 6. Benefits Section in Deep Forest Green */}
        <BenefitsSection />

        {/* 7. About & Purpose Story */}
        <AboutSection />

        {/* 8. High-Impact Final Call to Action */}
        <FinalCtaSection />
      </main>

      {/* 9. Comprehensive Public Footer */}
      <LandingFooter />
    </div>
  );
};

export default LandingPage;
