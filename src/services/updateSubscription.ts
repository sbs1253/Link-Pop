import { fetchUserDataFirebase } from '@services/userService';
import { ref, update } from 'firebase/database';
import { db } from '@src/firebase';
import { SubscribeDataParams } from '@hooks/query/useSubscribedQuery';

export const updateSubscription = async ({ playlistId, subscribed }: SubscribeDataParams, userId: string) => {
  const userRef = ref(db, `users/${userId}/subscribedPlaylists`);
  await update(userRef, { [playlistId]: !subscribed });
  const updatedUserData = await fetchUserDataFirebase(userId);
  return updatedUserData;
};
