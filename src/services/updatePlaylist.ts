import { ref, update } from 'firebase/database';
import { db } from '@src/firebase';
import { PlaylistType } from '@store/types';

export const updatePlaylist = async (updatedPlaylist: PlaylistType) => {
  const playlistRef = ref(db, `playlists/${updatedPlaylist.id}`);
  await update(playlistRef, updatedPlaylist);
};
