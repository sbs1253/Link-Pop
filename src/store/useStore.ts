import { create } from 'zustand';
import { UserType } from '@store/types';

interface Store {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}

export const useStore = create<Store>((set) => ({
  user: null,
  setUser: (newUser) =>
    set((state) => ({
      user: { ...state.user, ...newUser },
    })),
}));
