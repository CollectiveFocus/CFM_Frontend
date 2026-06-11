import { create } from 'zustand';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from 'config/firebase';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';
type UserProfileStatus = 'idle' | 'loading' | 'success' | 'error';

const USERS_API_URL = process.env.NEXT_PUBLIC_USERS_API_URL;

export interface AppUserProfile {
  userId: string;
  userType: string;
  username: string;
  email?: string;
  phoneNumber?: string;
  zipcode?: string;
  points?: number;
}

const userProfileCache = new Map<string, AppUserProfile>();
const inFlightProfileRequests = new Map<
  string,
  Promise<AppUserProfile | null>
>();

async function loadUserProfile(user: User): Promise<AppUserProfile | null> {
  if (!USERS_API_URL) {
    console.error('[useAuthStore] NEXT_PUBLIC_USERS_API_URL is not set');
    return null;
  }

  const cachedProfile = userProfileCache.get(user.uid);
  if (cachedProfile) {
    return cachedProfile;
  }

  const existingRequest = inFlightProfileRequests.get(user.uid);
  if (existingRequest) {
    return existingRequest;
  }

  const request = (async () => {
    try {
      const idToken = await user.getIdToken();
      const response = await fetch(`${USERS_API_URL}/v1/users/${user.uid}`, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });

      if (!response.ok) {
        console.error(
          `[useAuthStore] Failed to load user profile ${response.status}: ${response.statusText}`
        );
        return null;
      }

      const data = (await response.json()) as { user?: AppUserProfile };
      if (!data.user) {
        return null;
      }

      userProfileCache.set(user.uid, data.user);
      return data.user;
    } catch (error) {
      console.error('[useAuthStore] Failed to load user profile', error);
      return null;
    } finally {
      inFlightProfileRequests.delete(user.uid);
    }
  })();

  inFlightProfileRequests.set(user.uid, request);
  return request;
}

interface AuthState {
  user: User | null;
  status: AuthStatus;
  userProfile: AppUserProfile | null;
  userProfileStatus: UserProfileStatus;
  fetchUserProfile: (user: User) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  status: 'loading',
  userProfile: null,
  userProfileStatus: 'idle',
  fetchUserProfile: async (user: User) => {
    const cachedProfile = userProfileCache.get(user.uid);
    if (cachedProfile) {
      set({ userProfile: cachedProfile, userProfileStatus: 'success' });
      return;
    }

    set({ userProfileStatus: 'loading' });
    const profile = await loadUserProfile(user);

    if (useAuthStore.getState().user?.uid !== user.uid) {
      return;
    }

    set({
      userProfile: profile,
      userProfileStatus: profile ? 'success' : 'error',
    });
  },
}));

export const initAuthListener = (): (() => void) => {
  return onAuthStateChanged(auth, (user) => {
    if (!user) {
      useAuthStore.setState({
        user: null,
        status: 'unauthenticated',
        userProfile: null,
        userProfileStatus: 'idle',
      });
      return;
    }

    const cachedProfile = userProfileCache.get(user.uid) ?? null;
    useAuthStore.setState({
      user,
      status: 'authenticated',
      userProfile: cachedProfile,
      userProfileStatus: cachedProfile ? 'success' : 'loading',
    });

    void useAuthStore.getState().fetchUserProfile(user);
  });
};
