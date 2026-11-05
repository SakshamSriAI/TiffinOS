import React, { useState } from 'react';
import { ShieldCheck, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import { Modal } from '../common/Modal';

export const LandingFooter = () => {
  const [modalContent, setModalContent] = useState(null);

  const openLegalModal = (title, content) => {
    setModalContent({ title, content });
  };

  return (
    <footer className="bg-forest-deep text-white border-t border-forest-light py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/10">
          
          {/* Logo & Wordmark + Description (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-forest flex items-center justify-center text-mint border border-mint/20">
                <svg className="w-4 h-4 text-mint" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="7" width="18" height="13" rx="2" />
                  <path d="M16 7V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v3" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white tracking-tight">TiffinOS</span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-forest bg-mint px-1.5 py-0.5 rounded">
                Family Edition
              </span>
            </div>

            <p className="text-xs text-muted-light max-w-sm leading-relaxed">
              TiffinOS is a dedicated business management system engineered for independent tiffin services and family-run kitchens. Replace paper registers, track every dispatched meal, and generate accurate monthly invoices with peace of mind.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-mint">
              <ShieldCheck className="w-4 h-4 text-mint flex-shrink-0" />
              <span>Single-business family edition · Indian Standard Time (IST)</span>
            </div>
          </div>

          {/* Features Column (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-xs font-bold text-mint uppercase tracking-wider">Features</p>
            <ul className="space-y-2 text-xs text-muted-light">
              <li><a href="#features" className="hover:text-white transition-colors">Customer Management</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Daily Meal Dispatch</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Monthly Billing</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Expense Tracking</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Business Reports</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Meal History</a></li>
            </ul>
          </div>

          {/* About & Workflow Column (2 cols) */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-xs font-bold text-mint uppercase tracking-wider">Product</p>
            <ul className="space-y-2 text-xs text-muted-light">
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#benefits" className="hover:text-white transition-colors">Benefits</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About TiffinOS</a></li>
              <li><a href="/design-system" className="hover:text-white transition-colors">Design System</a></li>
            </ul>
          </div>

          {/* Contact & Support (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-bold text-mint uppercase tracking-wider">Contact</p>
            <ul className="space-y-2 text-xs text-muted-light">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-mint" />
                <span>support@tiffinos.app</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-mint" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-mint flex-shrink-0 mt-0.5" />
                <span>Indore, Madhya Pradesh, India</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal, Privacy, and Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-light gap-4">
          <p>© {new Date().getFullYear()} TiffinOS – Family Edition. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <button
              onClick={() => openLegalModal(
                'Privacy Policy',
                'TiffinOS – Family Edition operates as a self-contained business management system for your tiffin service. All customer information, meal schedules, and invoice records are strictly private to the business owner. No data is shared with third parties or advertisers.'
              )}
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => openLegalModal(
                'Terms of Service',
                'TiffinOS – Family Edition is provided for operational management of tiffin preparation, deliveries, and customer accounts. All dispatch records and billing amounts reflect inputs made by the authorized business operator.'
              )}
              className="hover:text-white transition-colors underline-offset-4 hover:underline"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>

      {/* Legal Modal */}
      {modalContent && (
        <Modal
          isOpen={true}
          onClose={() => setModalContent(null)}
          title={modalContent.title}
        >
          <div className="text-sm text-charcoal leading-relaxed space-y-4">
            <p>{modalContent.content}</p>
          </div>
        </Modal>
      )}
    </footer>
  );
};

export default LandingFooter;
