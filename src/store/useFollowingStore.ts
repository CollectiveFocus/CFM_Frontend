import { create } from 'zustand';
import { UserFridgeNotification, AppStatus } from 'types/domain';
import { getAllUserNotifications } from 'features/fridge-notifications/utils/fridgeNotificationsApi';
import { useAuthStore } from './useAuthStore';

interface FollowingState {
  notifications: UserFridgeNotification[];
  status: AppStatus;
  lastUpdated: number | null;

  fetch: () => Promise<void>;
  invalidate: () => void;
}

const FOLLOWING_CACHE_TTL_MS = 1 * 60 * 1000; // 1 minute

let isFetching = false;

export const useFollowingStore = create<FollowingState>((set, get) => ({
  notifications: [],
  status: 'idle',
  lastUpdated: null,

  fetch: async () => {
    const { notifications, lastUpdated } = get();

    // TTL guard: skip if we have fresh data
    if (
      notifications.length > 0 &&
      lastUpdated !== null &&
      Date.now() - lastUpdated < FOLLOWING_CACHE_TTL_MS
    ) {
      return;
    }

    // In-flight guard: deduplicate concurrent calls
    if (isFetching) return;
    isFetching = true;

    const user = useAuthStore.getState().user;
    if (!user) {
      isFetching = false;
      return;
    }

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
}));
