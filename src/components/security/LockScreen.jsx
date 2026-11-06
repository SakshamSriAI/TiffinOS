import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Unlock, Shield, AlertCircle, Delete, Eye, EyeOff } from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';

export const LockScreen = () => {
  const { unlock, passcode } = useSecurity();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPin, setShowPin] = useState(false);

  const targetLength = Math.max(4, String(passcode || '1234').length);

  // Handle keyboard typing
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (/^[0-9]$/.test(e.key)) {
        if (pin.length < 6) {
          setPin((prev) => prev + e.key);
          setError(false);
        }
      } else if (e.key === 'Backspace') {
        setPin((prev) => prev.slice(0, -1));
        setError(false);
      } else if (e.key === 'Enter') {
        handleUnlockAttempt(pin);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin]);

  // Auto-attempt unlock when typed pin matches passcode or reaches target length
  useEffect(() => {
    if (!pin) return;
    const cleanEntered = pin.trim();
    const storedPasscode = String(passcode || localStorage.getItem('tiffinos_master_passcode') || '1234').trim();

    if (cleanEntered === storedPasscode) {
      handleUnlockAttempt(cleanEntered);
    } else if (cleanEntered.length >= targetLength) {
      handleUnlockAttempt(cleanEntered);
    }
  }, [pin, passcode, targetLength]);

  const handleUnlockAttempt = (enteredPin) => {
    const success = unlock(enteredPin);
    if (!success) {
      setError(true);
      setErrorMessage('Incorrect passcode. Please try again.');
      setTimeout(() => {
        setPin('');
      }, 500);
    } else {
      setPin('');
      setError(false);
    }
  };

  const handleNumberClick = (num) => {
    if (pin.length < 6) {
      setPin((prev) => prev + num);
      setError(false);
    }
  };

  const handleBackspace = () => {
    setPin((prev) => prev.slice(0, -1));
    setError(false);
  };

  const handleClear = () => {
    setPin('');
    setError(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-forest-deep flex flex-col items-center justify-center p-4 select-none">
      <div className="w-full max-w-sm flex flex-col items-center text-center space-y-6">
        
        {/* App Logo & Lock Shield */}
        <div className="w-16 h-16 rounded-2xl bg-forest flex items-center justify-center text-white border-2 border-mint/20 shadow-modal">
          <Lock className="w-8 h-8 text-mint" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">TiffinOS Business Lock</h2>
          <p className="text-xs text-mint/80 mt-1">Enter your Master Passcode to access records</p>
        </div>

        {/* PIN Dot Indicators & Show Digits option */}
        <div className="flex flex-col items-center gap-2">
          <div className={`flex items-center gap-3 py-2 ${error ? 'animate-bounce' : ''}`}>
            {Array.from({ length: targetLength }).map((_, index) => {
              const isFilled = pin.length > index;
              return (
                <div
                  key={index}
                  className={`w-4 h-4 rounded-full transition-all duration-150 ${
                    isFilled
                      ? 'bg-mint scale-110 shadow-sm'
                      : 'bg-white/20 border border-white/30'
                  }`}
                />
              );
            })}
          </div>

          {/* Reveal entered numbers toggle */}
          <button
            type="button"
            onClick={() => setShowPin(!showPin)}
            className="text-[11px] text-mint/80 hover:text-white inline-flex items-center gap-1 transition-colors mt-1"
          >
            {showPin ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showPin ? (pin || 'Empty') : 'View Digits'}</span>
          </button>
        </div>

        {/* Error message */}
        {error && (
          <p className="text-xs text-status-error font-medium flex items-center gap-1.5 animate-in fade-in">
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            {errorMessage}
          </p>
        )}

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-3 w-64 pt-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleNumberClick(String(num))}
              className="h-14 rounded-xl bg-white/10 hover:bg-white/20 active:bg-mint active:text-forest text-xl font-semibold text-white transition-all duration-100 flex items-center justify-center shadow-subtle"
            >
              {num}
            </button>
          ))}
          
          {/* Bottom row: Clear, 0, Backspace */}
          <button
            type="button"
            onClick={handleClear}
            className="h-14 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-muted-light transition-all flex items-center justify-center uppercase tracking-wider"
          >
            Clear
          </button>

          <button
            type="button"
            onClick={() => handleNumberClick('0')}
            className="h-14 rounded-xl bg-white/10 hover:bg-white/20 active:bg-mint active:text-forest text-xl font-semibold text-white transition-all flex items-center justify-center shadow-subtle"
          >
            0
          </button>

          <button
            type="button"
            onClick={handleBackspace}
            className="h-14 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-all flex items-center justify-center"
            title="Backspace"
          >
            <Delete className="w-5 h-5 text-gray-300" />
          </button>
        </div>

        {/* Manual Unlock Submit button if auto-attempt hasn't fired */}
        {pin.length >= 4 && (
          <button
            type="button"
            onClick={() => handleUnlockAttempt(pin)}
            className="w-64 py-2.5 px-4 rounded-xl bg-mint hover:bg-mint/90 active:scale-95 text-forest font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 animate-in fade-in"
          >
            <Unlock className="w-4 h-4" />
            <span>Unlock Dashboard</span>
          </button>
        )}

        {/* Public Website Link and Security Notice */}
        <div className="pt-3 text-center space-y-2">
          <p className="text-[11px] text-mint/80">
            Authorized Owner Access Only · Single Business Security
          </p>
          <div>
            <Link to="/" className="text-xs text-mint font-semibold hover:underline inline-flex items-center gap-1">
              ← Return to Public Website
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LockScreen;
