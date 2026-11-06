import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Lock, 
  ShieldCheck, 
  ArrowRight, 
  AlertCircle, 
  KeyRound, 
  MessageCircle, 
  Phone, 
  Utensils, 
  Sparkles,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Card, CardContent } from '../components/common/Card';
import { useSecurity } from '../context/SecurityContext';

export const Login = () => {
  const { unlock } = useSecurity();
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const cleanPin = pin.trim();
    if (!cleanPin) {
      setErrorMessage('Please enter your Master Passcode.');
      return;
    }

    const success = unlock(cleanPin);
    if (success) {
      setErrorMessage('');
      navigate('/app/dashboard');
    } else {
      setErrorMessage('Access Denied: Incorrect Master Passcode.');
      setPin('');
    }
  };

  const foodOrderNumber = '+91 99350 99476';
  const foodOrderClean = '919935099476';

  const systemInquiryNumber = '+91 63885 38365';
  const systemInquiryClean = '916388538365';

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
              <div className="relative">
                <Input
                  label="Master Passcode (PIN)"
                  type={showPin ? "text" : "password"}
                  placeholder="Enter Master Passcode (4-6 digits)"
                  value={pin}
                  maxLength={6}
                  onChange={(e) => {
                    setPin(e.target.value);
                    setErrorMessage('');
                  }}
                  iconLeft={KeyRound}
                  required={true}
                  autoFocus
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-8 text-muted-text hover:text-charcoal transition-colors p-1"
                  title={showPin ? "Hide passcode" : "Show passcode"}
                >
                  {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

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

        {/* Public Visitor & Business Inquiries */}
        <div className="space-y-3">
          {/* Option 1: Order Food / Tiffin Service */}
          <div className="p-4 bg-white rounded-card border border-border shadow-subtle space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0 border border-emerald-200">
                <Utensils className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-forest-deep leading-tight">
                  Want to Order Food / Daily Tiffins?
                </p>
                <p className="text-[11px] text-muted-text">
                  Subscribe to fresh, hot lunch & dinner delivery
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-0.5 flex-wrap">
              <a
                href={`https://wa.me/${foodOrderClean}?text=Namaste!%20I%20would%20like%20to%20order%20food%20/%20subscribe%20to%20daily%20tiffin%20service.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-button text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp: {foodOrderNumber}
              </a>
              <a
                href={`tel:${foodOrderClean}`}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-button text-xs font-semibold text-charcoal bg-surface-subtle hover:bg-white border border-border transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-forest" />
                Call {foodOrderNumber}
              </a>
            </div>
          </div>

          {/* Option 2: Get TiffinOS Management System for Your Business */}
          <div className="p-4 bg-gradient-to-br from-white via-white to-mint/15 rounded-card border border-mint/40 shadow-subtle space-y-2.5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-forest/10 text-forest flex items-center justify-center flex-shrink-0 border border-forest/20">
                <Sparkles className="w-4 h-4 text-forest" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-forest-deep leading-tight">
                  Want a System Like This for Your Business?
                </p>
                <p className="text-[11px] text-muted-text">
                  Get your own custom management system for orders, billing & dispatches
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-0.5 flex-wrap">
              <a
                href={`https://wa.me/${systemInquiryClean}?text=Hello!%20I%20am%20interested%20in%20getting%20a%20business%20management%20system%20like%20TiffinOS%20for%20my%20business.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-button text-xs font-bold text-white bg-forest hover:bg-forest-deep transition-colors shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5 text-mint" />
                WhatsApp: {systemInquiryNumber}
              </a>
              <a
                href={`tel:${systemInquiryClean}`}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-button text-xs font-semibold text-charcoal bg-white hover:bg-surface-subtle border border-border transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-forest" />
                Call {systemInquiryNumber}
              </a>
            </div>
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
