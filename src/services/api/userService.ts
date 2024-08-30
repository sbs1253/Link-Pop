import { UserType } from '@store/types';
import { ref, get } from 'firebase/database';
import { db } from '@services/firebase';

export const fetchUserDataFirebase = async (userId: string): Promise<UserType> => {
  const userRef = ref(db, `users/${userId}`);
  const snapshot = await get(userRef);
  const userData = snapshot.val();
  if (!userData) throw new Error('User not found');
  return { ...userData, id: userId }; // Include the userId
};
