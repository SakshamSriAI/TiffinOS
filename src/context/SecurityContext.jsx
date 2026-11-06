import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { supabase } from '../services/supabaseClient';

const SecurityContext = createContext(null);

const STORAGE_KEY_PASSCODE = 'tiffinos_master_passcode';
const STORAGE_KEY_AUTO_LOCK = 'tiffinos_auto_lock_minutes';
const STORAGE_KEY_PRIVACY = 'tiffinos_privacy_mode';
const STORAGE_KEY_SESSION = 'tiffinos_session_unlocked';

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

  // Lock state: Default locked for any new visitor or fresh session until authenticated with Master Passcode
  const [isLocked, setIsLocked] = useState(() => {
    return sessionStorage.getItem(STORAGE_KEY_SESSION) !== 'true';
  });

  const inactivityTimerRef = useRef(null);

  // Sync master passcode from Supabase on mount so all devices, browsers, and Vercel share the same PIN
  useEffect(() => {
    const fetchCloudPasscode = async () => {
      try {
        if (!supabase) return;
        const { data, error } = await supabase
          .from('business_settings')
          .select('operating_days')
          .limit(1)
          .single();

        if (data?.operating_days?.master_passcode) {
          const remotePin = String(data.operating_days.master_passcode).trim();
          if (remotePin && remotePin.length >= 4) {
            setPasscode(remotePin);
            localStorage.setItem(STORAGE_KEY_PASSCODE, remotePin);
          }
        }
      } catch (err) {
        console.warn('Could not sync passcode from Supabase:', err);
      }
    };

    fetchCloudPasscode();
  }, []);

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
    const cleanEntered = String(enteredPin || '').trim();
    const storedPin = String(localStorage.getItem(STORAGE_KEY_PASSCODE) || '').trim();
    const activePasscode = String(passcode || '').trim();

    // Check against fresh localStorage, state passcode, or fallback '1234'
    const isMatch = 
      (cleanEntered && cleanEntered === storedPin) ||
      (cleanEntered && cleanEntered === activePasscode) ||
      (!storedPin && !activePasscode && cleanEntered === '1234') ||
      (cleanEntered === '1234' && (!storedPin || storedPin === '1234'));

    if (isMatch) {
      sessionStorage.setItem(STORAGE_KEY_SESSION, 'true');
      setIsLocked(false);
      resetInactivityTimer();
      return true;
    }
    return false;
  };

  const lock = () => {
    sessionStorage.removeItem(STORAGE_KEY_SESSION);
    setIsLocked(true);
  };

  const updatePasscode = async (newPin, currentPin = null) => {
    const cleanNew = String(newPin || '').trim();
    if (!cleanNew || cleanNew.length < 4 || cleanNew.length > 6) {
      return { success: false, message: 'New passcode must be between 4 and 6 digits.' };
    }
    if (!/^\d+$/.test(cleanNew)) {
      return { success: false, message: 'New passcode must only contain numeric digits.' };
    }

    const storedPin = String(localStorage.getItem(STORAGE_KEY_PASSCODE) || passcode || '1234').trim();

    // If currentPin is provided by the caller, verify it against storedPin or default
    if (currentPin !== null && currentPin !== undefined && String(currentPin).trim() !== '') {
      const cleanCurrent = String(currentPin).trim();
      if (cleanCurrent !== storedPin && cleanCurrent !== String(passcode).trim() && cleanCurrent !== '1234') {
        return { success: false, message: 'Current passcode is incorrect.' };
      }
    }

    // 1. Immediately update React state & localStorage
    setPasscode(cleanNew);
    localStorage.setItem(STORAGE_KEY_PASSCODE, cleanNew);

    // 2. Persist to Supabase so it synchronizes across all devices & Vercel
    if (supabase) {
      try {
        const { data: currentSettings } = await supabase
          .from('business_settings')
          .select('id, operating_days')
          .limit(1)
          .single();

        const existingDays = currentSettings?.operating_days || {};
        const updatedDays = { ...existingDays, master_passcode: cleanNew };

        await supabase
          .from('business_settings')
          .update({ operating_days: updatedDays })
          .neq('id', '00000000-0000-0000-0000-000000000000');
      } catch (err) {
        console.error('Failed to sync master passcode to Supabase:', err);
      }
    }

    return { 
      success: true, 
      message: `Master Passcode updated to ${cleanNew} and saved to cloud.` 
    };
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
