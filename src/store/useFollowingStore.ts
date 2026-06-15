import { create } from 'zustand';
import { UserFridgeNotification, AppStatus } from 'types/domain';
import { getAllUserNotifications } from 'features/fridge-notifications/utils/fridgeNotificationsApi';
import { useAuthStore } from './useAuthStore';

interface FollowingState {
  notifications: UserFridgeNotification[];
  status: AppStatus;
  lastUpdated: number | null;
  ownerUserId: string | null;

  fetch: () => Promise<void>;
  invalidate: () => void;
  reset: () => void;
}

const FOLLOWING_CACHE_TTL_MS = 1 * 60 * 1000; // 1 minute

let isFetching = false;

export const useFollowingStore = create<FollowingState>((set, get) => ({
  notifications: [],
  status: 'idle',
  lastUpdated: null,
  ownerUserId: null,

  fetch: async () => {
    const { ownerUserId } = get();

    const user = useAuthStore.getState().user;
    if (!user) {
      set({
        notifications: [],
        status: 'idle',
        lastUpdated: null,
        ownerUserId: null,
      });
      isFetching = false;
      return;
    }

    if (ownerUserId !== null && ownerUserId !== user.uid) {
      set({
        notifications: [],
        status: 'idle',
        lastUpdated: null,
        ownerUserId: user.uid,
      });
    }

    const {
      notifications,
      lastUpdated,
      ownerUserId: currentOwnerUserId,
    } = get();

    // TTL guard: skip if we have fresh data
    if (
      currentOwnerUserId === user.uid &&
      notifications.length > 0 &&
      lastUpdated !== null &&
      Date.now() - lastUpdated < FOLLOWING_CACHE_TTL_MS
    ) {
      return;
    }

    // In-flight guard: deduplicate concurrent calls
    if (isFetching) return;
    isFetching = true;

    if (notifications.length === 0) {
      set({ status: 'loading' });
    }

    try {
      const idToken = await user.getIdToken();
      const data = await getAllUserNotifications(user.uid, idToken);
      set({
        notifications: data,
        status: data.length > 0 ? 'success' : 'empty',
        lastUpdated: Date.now(),
        ownerUserId: user.uid,
      });
    } catch {
      if (get().notifications.length === 0) {
        set({ status: 'error' });
      }
    } finally {
      isFetching = false;
    }
  },

  invalidate: () => set({ lastUpdated: null }),
  reset: () =>
    set({
      notifications: [],
      status: 'idle',
      lastUpdated: null,
      ownerUserId: null,
    }),
}));
