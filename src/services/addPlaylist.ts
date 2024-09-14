import { ref, push, set } from 'firebase/database';
import { db } from '@src/firebase';
import { fetchUserDataFirebase } from '@services/userService';
import { DefaultPlaylistType } from '@store/types';

export const addPlaylist = async (newPlaylist: DefaultPlaylistType, userId: string) => {
  const playlistRef = ref(db, `playlists`);
  const newPlaylistRef = await push(playlistRef, newPlaylist);
  const playlistId = newPlaylistRef.key;
  const userRef = ref(db, `users/${userId}/createdPlaylists/${playlistId}`);
  await set(userRef, true);

  const updatedUserData = await fetchUserDataFirebase(userId);

  return { playlistId, updatedUserData };
};
