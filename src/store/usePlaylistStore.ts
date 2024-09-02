import { PlaylistType } from '@store/types';
import { create } from 'zustand';

interface PlaylistStore {
  playlists: PlaylistType[];
  setPlaylists: (playlists: PlaylistType[]) => void;
  updatePlaylist: (id: string, updatedPlaylist: PlaylistType) => void;
  getPlaylist: (id: string) => PlaylistType | undefined;
}

export const usePlaylistStore = create<PlaylistStore>((set, get) => ({
  playlists: [],
  setPlaylists: (playlists) => set({ playlists }),
  updatePlaylist: (id, updatedPlaylist) =>
    set((state) => ({
      playlists: state.playlists.map((playlist) =>
        playlist.id === id ? { ...playlist, ...updatedPlaylist } : playlist
      ),
    })),
  getPlaylist: (id) => get().playlists.find((playlist) => playlist.id === id),
}));
