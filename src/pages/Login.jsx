import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, ShieldCheck, ArrowRight, AlertCircle, KeyRound, MessageCircle, Phone } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card, CardContent } from '../components/common/Card';
import { useSecurity } from '../context/SecurityContext';
import { useApp } from '../context/AppContext';

export const Login = () => {
  const { unlock } = useSecurity();
  const { settings } = useApp();
  const [pin, setPin] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!pin.trim()) {
      setErrorMessage('Please enter your Master Passcode.');
      return;
    }

    const success = unlock(pin.trim());
    if (success) {
      setErrorMessage('');
      navigate('/app/dashboard');
    } else {
      setErrorMessage('Access Denied: Incorrect Master Passcode.');
      setPin('');
    }
  };

  const businessPhone = settings?.phone || '+91 98260 55432';
  const whatsappNum = settings?.whatsappNumber || businessPhone;
  const cleanWhatsapp = whatsappNum.replace(/[^0-9]/g, '');

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center items-center p-4 antialiased">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-forest flex items-center justify-center text-white border border-mint/20 shadow-sm">
              <svg className="w-6 h-6 text-mint" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="7" width="18" height="13" rx="2" />
                <path d="M16 7V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v3" />
                <line x1="12" y1="12" x2="12" y2="12.01" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-forest-deep">TiffinOS</span>
          </Link>
          <h1 className="text-xl font-bold text-charcoal">Owner Access Portal</h1>
          <p className="text-xs text-muted-text">Authorized business management authentication</p>
        </div>

        <Card className="shadow-card border-border">
          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                label="Master Passcode (PIN)"
                type="password"
                placeholder="Enter 4-digit Master Passcode"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setErrorMessage('');
                }}
                iconLeft={KeyRound}
                required={true}
                autoFocus
              />

              {errorMessage && (
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-button text-xs text-status-error flex items-center gap-2 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                size="md"
                className="w-full mt-2"
                iconRight={ArrowRight}
              >
                Unlock Business Dashboard
              </Button>
            </form>

            <div className="mt-5 pt-4 border-t border-border/60 text-center space-y-1">
              <p className="text-xs text-muted-text">
                Protected by TiffinOS Passcode Encryption
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Public Customer Subscription Box */}
        <div className="p-4 bg-white rounded-card border border-border shadow-subtle text-center space-y-2">
          <p className="text-xs font-semibold text-charcoal">
            Looking to order delicious home-cooked tiffins?
          </p>
          <p className="text-[11px] text-muted-text">
            Subscribe or order daily lunch & dinner directly with our kitchen:
          </p>
          <div className="flex items-center justify-center gap-2 pt-1 flex-wrap">
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=Namaste!%20I%20would%20like%20to%20subscribe%20to%20your%20tiffin%20service.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-button text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              WhatsApp Kitchen
            </a>
            <a
              href={`tel:${businessPhone}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-button text-xs font-semibold text-charcoal bg-surface-subtle hover:bg-white border border-border transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-forest" />
              Call {businessPhone}
            </a>
          </div>
        </div>

        <div className="text-center">
          <Link to="/" className="text-xs text-forest font-semibold hover:underline">
            ← Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
