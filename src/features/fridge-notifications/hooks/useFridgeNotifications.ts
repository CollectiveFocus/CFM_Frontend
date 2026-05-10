import { useState, useEffect } from 'react';
import { useAuthStore } from 'store/useAuthStore';
import {
  UserFridgeNotification,
  ContactTypePreferences,
  AppStatus,
} from 'types/domain';
import {
  getFridgeNotifications,
  saveFridgeNotifications,
  deleteFridgeNotifications,
} from '../utils/fridgeNotificationsApi';

interface UseFridgeNotificationsResult {
  status: AppStatus;
  isInitializing: boolean;
  isFollowing: boolean;
  savedPreferences: UserFridgeNotification | null;
  error: string | null;
  save: (preferences: ContactTypePreferences) => Promise<boolean>;
  unfollow: () => Promise<boolean>;
}

export function useFridgeNotifications(
  fridgeId: string
): UseFridgeNotificationsResult {
  const user = useAuthStore((s) => s.user);
  const [status, setStatus] = useState<AppStatus>('loading');
  const [isInitializing, setIsInitializing] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [savedPreferences, setSavedPreferences] =
    useState<UserFridgeNotification | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setStatus('idle');
      setIsFollowing(false);
      setSavedPreferences(null);
      setIsInitializing(false);
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        setIsInitializing(true);
        setStatus('loading');
        const idToken = await user!.getIdToken();
        const prefs = await getFridgeNotifications(
          user!.uid,
          fridgeId,
          idToken
        );
        if (cancelled) return;
        setIsFollowing(prefs !== null);
        setSavedPreferences(prefs);
        setStatus('idle');
      } catch (err) {
        if (cancelled) return;
        setError(
          err instanceof Error ? err.message : 'Failed to load notifications'
        );
        setStatus('error');
      } finally {
        if (!cancelled) setIsInitializing(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [user, fridgeId]);

  async function save(preferences: ContactTypePreferences): Promise<boolean> {
    if (!user) {
      setError('You must be signed in to save notifications');
      return false;
    }
    try {
      setStatus('loading');
      setError(null);
      const idToken = await user.getIdToken();
      const method = isFollowing ? 'PATCH' : 'POST';
      await saveFridgeNotifications(
        user.uid,
        fridgeId,
        idToken,
        preferences,
        method
      );
      setIsFollowing(true);
      setSavedPreferences({
        userId: user.uid,
        fridgeId,
        contactTypePreferences: preferences,
      });
      setStatus('success');
      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to save notifications'
      );
      setStatus('error');
      return false;
    }
  }

  async function unfollow(): Promise<boolean> {
    if (!user) {
      setError('You must be signed in to unfollow');
      return false;
    }
    try {
      setStatus('loading');
      setError(null);
      const idToken = await user.getIdToken();
      await deleteFridgeNotifications(user.uid, fridgeId, idToken);
      setIsFollowing(false);
      setSavedPreferences(null);
      setStatus('idle');
      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to unfollow fridge'
      );
      setStatus('error');
      return false;
    }
  }

  return {
    status,
    isInitializing,
    isFollowing,
    savedPreferences,
    error,
    save,
    unfollow,
  };
}
