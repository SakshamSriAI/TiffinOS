import React, { useState } from 'react';
import { Shield, Lock, Eye, EyeOff, KeyRound, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../common/Card';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { useSecurity } from '../../context/SecurityContext';

export const SecuritySettingsCard = () => {
  const {
    lock,
    passcode,
    updatePasscode,
    autoLockMinutes,
    updateAutoLockMinutes,
    isPrivacyMode,
    togglePrivacyMode,
  } = useSecurity();

  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [statusMessage, setStatusMessage] = useState(null);
  const [isChangingPin, setIsChangingPin] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPins, setShowPins] = useState(false);

  const handlePinSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage(null);

    const cleanNew = newPin.trim();
    const cleanConfirm = confirmPin.trim();

    if (cleanNew !== cleanConfirm) {
      setStatusMessage({ type: 'error', text: 'New passcodes do not match. Please verify both fields.' });
      return;
    }

    if (cleanNew.length < 4 || cleanNew.length > 6) {
      setStatusMessage({ type: 'error', text: 'Passcode must be between 4 and 6 numeric digits.' });
      return;
    }

    if (!/^\d+$/.test(cleanNew)) {
      setStatusMessage({ type: 'error', text: 'Passcode must only contain digits (0-9).' });
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await updatePasscode(cleanNew, currentPin.trim() || null);
      if (result.success) {
        setStatusMessage({ type: 'success', text: result.message });
        setCurrentPin('');
        setNewPin('');
        setConfirmPin('');
        setTimeout(() => {
          setIsChangingPin(false);
        }, 1500);
      } else {
        setStatusMessage({ type: 'error', text: result.message });
      }
    } catch (err) {
      setStatusMessage({ type: 'error', text: 'Failed to update passcode. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const autoLockOptions = [
    { value: '5', label: 'Lock after 5 minutes of inactivity' },
    { value: '15', label: 'Lock after 15 minutes of inactivity (Recommended)' },
    { value: '30', label: 'Lock after 30 minutes of inactivity' },
    { value: '60', label: 'Lock after 1 hour' },
    { value: '0', label: 'Never auto-lock (Manual lock only)' },
  ];

  return (
    <Card className="border-forest/20">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-forest" />
            <CardTitle>Security, Passcode & Privacy Controls</CardTitle>
          </div>
          <Button
            variant="secondary"
            size="sm"
            iconLeft={Lock}
            onClick={lock}
          >
            Lock TiffinOS Now
          </Button>
        </div>
        <CardDescription>
          Master business passcode, auto-lock timers, and customer data privacy masking.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        
        {/* Privacy Masking Feature */}
        <div className="p-4 bg-surface-subtle rounded-card border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-charcoal">Anti-Shoulder Surfing (Privacy Mode)</span>
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded uppercase ${isPrivacyMode ? 'bg-forest text-white' : 'bg-border text-muted-text'}`}>
                {isPrivacyMode ? 'Active' : 'Disabled'}
              </span>
            </div>
            <p className="text-xs text-muted-text">
              Masks customer phone numbers (<code className="font-mono text-charcoal">+91 98260 •••••</code>) and business revenues when showing packing orders to delivery boys or customers.
            </p>
          </div>
          <Button
            variant={isPrivacyMode ? 'primary' : 'secondary'}
            size="sm"
            iconLeft={isPrivacyMode ? EyeOff : Eye}
            onClick={togglePrivacyMode}
          >
            {isPrivacyMode ? 'Turn Off Privacy Mask' : 'Enable Privacy Mask'}
          </Button>
        </div>

        {/* Auto-Lock Inactivity Threshold */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-charcoal uppercase tracking-wider">
            Auto-Lock On Inactivity
          </label>
          <div className="max-w-md">
            <Select
              value={String(autoLockMinutes)}
              onChange={(e) => updateAutoLockMinutes(e.target.value)}
              options={autoLockOptions}
            />
          </div>
          <p className="text-[11px] text-muted-text">
            Automatically secures TiffinOS if your kitchen device is left unattended.
          </p>
        </div>

        {/* Change Master Passcode */}
        <div className="pt-3 border-t border-border">
          {!isChangingPin ? (
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="text-xs font-semibold text-charcoal">Master Business Passcode</p>
                  <span className="text-[10px] font-bold px-1.5 py-0.2 rounded uppercase bg-emerald-100 text-status-success">
                    Cloud Synced
                  </span>
                </div>
                <p className="text-[11px] text-muted-text mt-0.5">
                  Protects your business records across all devices, mobile screens, and the Owner Portal.
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconLeft={KeyRound}
                onClick={() => {
                  setIsChangingPin(true);
                  setStatusMessage(null);
                }}
              >
                Change Passcode
              </Button>
            </div>
          ) : (
            <form onSubmit={handlePinSubmit} className="space-y-3 p-4 bg-surface-subtle rounded-card border border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <KeyRound className="w-4 h-4 text-forest" />
                  <p className="text-xs font-bold text-charcoal">Update Master Passcode</p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowPins(!showPins)}
                  className="text-xs text-forest hover:underline inline-flex items-center gap-1 font-medium"
                >
                  {showPins ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  {showPins ? 'Hide Digits' : 'Show Digits'}
                </button>
              </div>

              {statusMessage && (
                <div className={`p-2.5 rounded text-xs flex items-center gap-2 ${
                  statusMessage.type === 'success' ? 'bg-emerald-50 text-status-success border border-emerald-200' : 'bg-red-50 text-status-error border border-red-200'
                }`}>
                  {statusMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> : <AlertCircle className="w-4 h-4 flex-shrink-0" />}
                  <span>{statusMessage.text}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Input
                  type={showPins ? "text" : "password"}
                  placeholder="Current PIN (Default: 1234)"
                  maxLength={6}
                  value={currentPin}
                  onChange={(e) => setCurrentPin(e.target.value)}
                  autoComplete="current-password"
                />
                <Input
                  type={showPins ? "text" : "password"}
                  placeholder="New PIN (4-6 digits)"
                  maxLength={6}
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  required
                  autoComplete="new-password"
                />
                <Input
                  type={showPins ? "text" : "password"}
                  placeholder="Confirm New PIN"
                  maxLength={6}
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-[11px] text-muted-text">
                  Must be 4–6 digits. Immediately syncs with your database & lock screens.
                </p>
                <div className="flex items-center gap-2">
                  <Button type="button" variant="ghost" size="sm" onClick={() => setIsChangingPin(false)} disabled={isSubmitting}>
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary" size="sm" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save Passcode'}
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>

      </CardContent>
    </Card>
  );
};

export default SecuritySettingsCard;
