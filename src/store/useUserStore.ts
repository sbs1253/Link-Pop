import { create } from 'zustand';
import { UserType } from '@store/types';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';

interface Store {
  user: UserType;
  setUser: (user: UserType) => void;
}

export const useUserStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        user: {} as UserType,
        setUser: (newUser: UserType) => {
          set((state) => ({
            user: { ...state.user, ...newUser },
          }));
        },
      }),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
