import { db } from '@src/firebase';
import { ref, remove } from 'firebase/database';
import { fetchUserDataFirebase } from '@services/userService';

export const deletePlaylist = async (playlistId: string, userId: string) => {
  const playlistRef = ref(db, `playlists/${playlistId}`);
  await remove(playlistRef);

  const userRef = ref(db, `users/${userId}/createdPlaylists/${playlistId}`);
  await remove(userRef);

  const updatedUserData = await fetchUserDataFirebase(userId);

  return updatedUserData;
};
