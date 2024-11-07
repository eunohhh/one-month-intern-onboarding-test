import { create } from 'zustand';
import { AuthStore } from './types';

export const useAuthStore = create<AuthStore>((set) => ({
  me: null,
  setMe: (me) => set({ me }),
  logOut: () => {
    localStorage.removeItem('one-month-intern-token');
    set({ me: null });
  },
}));
