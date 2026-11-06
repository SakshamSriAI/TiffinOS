import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const SecurityContext = createContext(null);

const STORAGE_KEY_PASSCODE = 'tiffinos_master_passcode';
const STORAGE_KEY_AUTO_LOCK = 'tiffinos_auto_lock_minutes';
const STORAGE_KEY_PRIVACY = 'tiffinos_privacy_mode';

export const SecurityProvider = ({ children }) => {
  // Stored Master PIN (default: '1234')
  const [passcode, setPasscode] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_PASSCODE) || '1234';
  });

  // Auto-lock threshold in minutes (default: 15 mins)
  const [autoLockMinutes, setAutoLockMinutes] = useState(() => {
    return parseInt(localStorage.getItem(STORAGE_KEY_AUTO_LOCK) || '15', 10);
  });

  // Privacy Mode (masks phone numbers & revenues when showing screen to others)
  const [isPrivacyMode, setIsPrivacyMode] = useState(() => {
    return localStorage.getItem(STORAGE_KEY_PRIVACY) === 'true';
  });

  // Lock state
  const [isLocked, setIsLocked] = useState(false);

  const inactivityTimerRef = useRef(null);

  // Helper to reset inactivity timer
  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) {
      clearTimeout(inactivityTimerRef.current);
    }
    if (autoLockMinutes > 0 && !isLocked) {
      inactivityTimerRef.current = setTimeout(() => {
        setIsLocked(true);
      }, autoLockMinutes * 60 * 1000);
    }
  };

  useEffect(() => {
    const handleUserActivity = () => resetInactivityTimer();

    window.addEventListener('mousedown', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);
    window.addEventListener('touchstart', handleUserActivity);
    window.addEventListener('scroll', handleUserActivity);

    resetInactivityTimer();

    return () => {
      window.removeEventListener('mousedown', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('touchstart', handleUserActivity);
      window.removeEventListener('scroll', handleUserActivity);
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [autoLockMinutes, isLocked]);

  const unlock = (enteredPin) => {
    if (enteredPin === passcode) {
      setIsLocked(false);
      resetInactivityTimer();
      return true;
    }
    return false;
  };

  const lock = () => {
    setIsLocked(true);
  };

  const updatePasscode = (currentPin, newPin) => {
    if (currentPin !== passcode) {
      return { success: false, message: 'Current passcode is incorrect.' };
    }
    if (!newPin || newPin.length < 4) {
      return { success: false, message: 'New passcode must be at least 4 digits.' };
    }

    setPasscode(newPin);
    localStorage.setItem(STORAGE_KEY_PASSCODE, newPin);
    return { success: true, message: 'Passcode successfully updated.' };
  };

  const updateAutoLockMinutes = (minutes) => {
    const val = parseInt(minutes, 10);
    setAutoLockMinutes(val);
    localStorage.setItem(STORAGE_KEY_AUTO_LOCK, String(val));
    resetInactivityTimer();
  };

  const togglePrivacyMode = () => {
    setIsPrivacyMode((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY_PRIVACY, String(next));
      return next;
    });
  };

  /**
   * Helper to mask sensitive phone numbers when Privacy Mode is active.
   * e.g. "+91 98260 11422" becomes "+91 98260 •••••"
   */
  const maskPhone = (phone) => {
    if (!isPrivacyMode || !phone) return phone;
    const parts = phone.trim().split(' ');
    if (parts.length > 2) {
      return `${parts[0]} ${parts[1]} •••••`;
    }
    return `${phone.slice(0, 7)} •••••`;
  };

  /**
   * Helper to mask financial amounts when Privacy Mode is active.
   * e.g. "₹24,500" becomes "₹••••"
   */
  const maskAmount = (amountStr) => {
    if (!isPrivacyMode) return amountStr;
    return '₹••••';
  };

  const value = {
    isLocked,
    lock,
    unlock,
    passcode,
    updatePasscode,
    autoLockMinutes,
    updateAutoLockMinutes,
    isPrivacyMode,
    togglePrivacyMode,
    maskPhone,
    maskAmount,
  };

  return <SecurityContext.Provider value={value}>{children}</SecurityContext.Provider>;
};

export const useSecurity = () => {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be used within a SecurityProvider');
  }
  return context;
};

export default SecurityContext;
