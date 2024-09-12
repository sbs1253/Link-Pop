import { create } from 'zustand';
import { UserType } from '@store/types';
import { persist, devtools, createJSONStorage } from 'zustand/middleware';

interface Store {
  user: UserType;
  isLogin: boolean;
}
interface Action {
  actions: {
    setUser: (user: UserType) => void;
    setIsLogin: (isLogin: boolean) => void;
    logout: () => void;
  };
}
const initialState: Store = {
  user: {} as UserType,
  isLogin: false,
};
export const useUserStore = create<Store & Action>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        actions: {
          setUser: (newUser: UserType) => {
            set((state: Store) => ({
              user: { ...state.user, ...newUser },
            }));
          },
          setIsLogin: (isLogin: boolean) => set({ isLogin }),
          logout: () => set(initialState),
        },
      }),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => sessionStorage),
      }
    )
  )
);
