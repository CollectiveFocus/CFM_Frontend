'use client';

import { useState } from 'react';
import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from 'firebase/auth';
import { auth } from 'config/firebase';
import { registerNewUser } from '../utils/registerNewUser';

type EmailStatus = 'idle' | 'loading' | 'success' | 'error';

type ConfirmResult = 'success' | 'needs-email' | 'error';

interface UseEmailAuthReturn {
  sendSignInLink: (email: string) => Promise<void>;
  confirmSignIn: (emailOverride?: string) => Promise<ConfirmResult>;
  reset: () => void;
  status: EmailStatus;
  error: string | null;
}

const SIGN_IN_EMAIL_KEY = 'ff-signin-email';

export function useEmailAuth(): UseEmailAuthReturn {
  const [status, setStatus] = useState<EmailStatus>('idle');
  const [error, setError] = useState<string | null>(null);

  const sendSignInLink = async (email: string): Promise<void> => {
    setStatus('loading');
    setError(null);
    try {
      const actionCodeSettings = {
        url: `${window.location.origin}/auth/callback`,
        handleCodeInApp: true,
      };
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem(SIGN_IN_EMAIL_KEY, email);
      setStatus('success');
    } catch (err) {
      setError(getAuthErrorMessage(err));
      setStatus('error');
    }
  };

  const confirmSignIn = async (
    emailOverride?: string
  ): Promise<ConfirmResult> => {
    if (!isSignInWithEmailLink(auth, window.location.href))
      return 'needs-email';

    const email =
      emailOverride ?? window.localStorage.getItem(SIGN_IN_EMAIL_KEY);
    if (!email) return 'needs-email';
    setStatus('loading');
    setError(null);
    try {
      const credential = await signInWithEmailLink(
        auth,
        email,
        window.location.href
      );
      await registerNewUser(credential);
      window.localStorage.removeItem(SIGN_IN_EMAIL_KEY);
      setStatus('success');
      return 'success';
    } catch (err) {
      setError(getAuthErrorMessage(err));
      setStatus('error');
      return 'error';
    }
  };

  const reset = () => {
    setStatus('idle');
    setError(null);
  };

  return { sendSignInLink, confirmSignIn, reset, status, error };
}

function getAuthErrorMessage(err: unknown): string {
  if (err instanceof Error) {
    const code = (err as { code?: string }).code;
    switch (code) {
      case 'auth/invalid-email':
        return 'Invalid email address.';
      case 'auth/invalid-action-code':
        return 'This sign-in link is invalid or has already been used.';
      case 'auth/expired-action-code':
        return 'This sign-in link has expired. Please request a new one.';
      default:
        return err.message;
    }
  }
  return 'An unexpected error occurred.';
}
