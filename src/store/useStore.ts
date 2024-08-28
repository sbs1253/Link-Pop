import { create } from 'zustand';
import { UserType, PlaylistType } from '@store/types';

interface Store {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
  currentPlaylist: PlaylistType | null;
  setCurrentPlaylist: (playlist: PlaylistType | null) => void;
}

export const useStore = create<Store>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  currentPlaylist: null,
  setCurrentPlaylist: (playlist) => set({ currentPlaylist: playlist }),
}));
