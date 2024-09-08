import { create } from 'zustand';
import { UserType } from '@store/types';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';

interface Store {
  user: UserType;
  isLogin: boolean;
  setUser: (user: UserType) => void;
  setIsLogin: (isLogin: boolean) => void;
  logout: () => void;
}

export const useUserStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        user: {} as UserType,
        isLogin: false,
        logout: () => {
          set({ user: {} as UserType, isLogin: false });
        },
        setUser: (newUser: UserType) => {
          set((state) => ({
            user: { ...state.user, ...newUser },
          }));
        },
        setIsLogin: (state: boolean) => {
          set({ isLogin: state });
        },
      }),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
