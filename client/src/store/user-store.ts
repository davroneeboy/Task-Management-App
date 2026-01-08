import { create } from 'zustand';
import { User, UserRole } from '../types/user.types';

interface UserStore {
  currentUser: User | null;
  setCurrentUser: (user: User) => void;
  clearUser: () => void;
  isManager: () => boolean;
}

/**
 * Zustand store for user management.
 */
export const useUserStore = create<UserStore>((set, get) => ({
  currentUser: null,
  setCurrentUser: (user: User): void => {
    set({ currentUser: user });
  },
  clearUser: (): void => {
    set({ currentUser: null });
  },
  isManager: (): boolean => {
    const user = get().currentUser;
    return user?.role === UserRole.MANAGER;
  },
}));
