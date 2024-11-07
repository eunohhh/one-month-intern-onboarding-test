import { create } from 'zustand';
import { IAuthStore } from './types';

export const useAuthStore = create<IAuthStore>((set) => ({
  me: null,
  setMe: (me) => set({ me }),
  logOut: () => {
    localStorage.removeItem('one-month-intern-token');
    set({ me: null });
  },
}));
