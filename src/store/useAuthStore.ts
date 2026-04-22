import { create } from 'zustand';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from 'config/firebase';

type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

interface AuthState {
  user: User | null;
  status: AuthStatus;
}

export const useAuthStore = create<AuthState>(() => ({
  user: null,
  status: 'loading',
}));

export const initAuthListener = (): (() => void) => {
  return onAuthStateChanged(auth, (user) => {
    useAuthStore.setState({
      user,
      status: user ? 'authenticated' : 'unauthenticated',
    });
  });
};
