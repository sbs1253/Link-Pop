import { create } from 'zustand';
import { UserType } from '@store/types';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';

interface Store {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}

export const useUserStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (user) => set({ user }),
      }),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
