import React, { useState, useEffect } from 'react';
import { Lock, Unlock, Shield, AlertCircle, Delete, Eye, EyeOff } from 'lucide-react';
import { useSecurity } from '../../context/SecurityContext';

export const LockScreen = () => {
  const { unlock } = useSecurity();
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showPin, setShowPin] = useState(false);

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

  // Auto-attempt unlock when 4 digits are entered
  useEffect(() => {
    if (pin.length >= 4) {
      handleUnlockAttempt(pin);
    }
  }, [pin]);

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

        {/* PIN Dot Indicators */}
        <div className={`flex items-center gap-3 py-3 ${error ? 'animate-bounce' : ''}`}>
          {[0, 1, 2, 3].map((index) => {
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

        {/* Default Passcode Hint for Owner */}
        <div className="pt-4 text-center">
          <p className="text-[11px] text-muted-light">
            Default initial passcode: <span className="font-mono text-mint font-bold">1234</span>
          </p>
          <p className="text-[10px] text-muted-light/60 mt-0.5">
            You can customize your passcode anytime in Business Settings.
          </p>
        </div>

      </div>
    </div>
  );
};

export default LockScreen;
