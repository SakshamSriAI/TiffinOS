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

  const handlePinSubmit = (e) => {
    e.preventDefault();
    setStatusMessage(null);

    if (newPin !== confirmPin) {
      setStatusMessage({ type: 'error', text: 'New passcodes do not match.' });
      return;
    }

    const result = updatePasscode(currentPin, newPin);
    if (result.success) {
      setStatusMessage({ type: 'success', text: result.message });
      setCurrentPin('');
      setNewPin('');
      setConfirmPin('');
      setIsChangingPin(false);
    } else {
      setStatusMessage({ type: 'error', text: result.message });
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
                <p className="text-xs font-semibold text-charcoal">Master Business Passcode</p>
                <p className="text-[11px] text-muted-text">Used to unlock TiffinOS on mobile or desktop.</p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconLeft={KeyRound}
                onClick={() => setIsChangingPin(true)}
              >
                Change Passcode
              </Button>
            </div>
          ) : (
            <form onSubmit={handlePinSubmit} className="space-y-3 p-4 bg-surface-subtle rounded-card border border-border">
              <p className="text-xs font-bold text-charcoal">Update Master Passcode</p>

              {statusMessage && (
                <div className={`p-2.5 rounded text-xs flex items-center gap-2 ${
                  statusMessage.type === 'success' ? 'bg-emerald-50 text-status-success border border-emerald-200' : 'bg-red-50 text-status-error border border-red-200'
                }`}>
                  {statusMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                  <span>{statusMessage.text}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Input
                  type="password"
                  placeholder="Current PIN"
                  maxLength={6}
                  value={currentPin}
                  onChange={(e) => setCurrentPin(e.target.value)}
                  required
                />
                <Input
                  type="password"
                  placeholder="New PIN (4-6 digits)"
                  maxLength={6}
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value)}
                  required
                />
                <Input
                  type="password"
                  placeholder="Confirm New PIN"
                  maxLength={6}
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value)}
                  required
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" size="sm" onClick={() => setIsChangingPin(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm">
                  Save Passcode
                </Button>
              </div>
            </form>
          )}
        </div>

      </CardContent>
    </Card>
  );
};

export default SecuritySettingsCard;
