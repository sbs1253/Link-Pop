import { fetchUserDataFirebase } from '@services/userService';
import { ref, update } from 'firebase/database';
import { db } from '@src/firebase';

interface SubscribeDataParams {
  userId: string;
  playlistId: string;
  subscribed: boolean;
}

export const updateSubscription = async ({ userId, playlistId, subscribed }: SubscribeDataParams) => {
  const userRef = ref(db, `users/${userId}/subscribedPlaylists`);
  await update(userRef, { [playlistId]: !subscribed });
  const updatedUserData = await fetchUserDataFirebase(userId);
  return updatedUserData;
};
