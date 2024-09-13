import { ref, get } from 'firebase/database';
import { db } from '@src/firebase';

// 유저 정보를 가져오는 함수
export const fetchUserDataFirebase = async (userId: string) => {
  const userRef = ref(db, `users/${userId}`);
  const snapshot = await get(userRef);
  const userData = snapshot.val();
  if (!userData) throw new Error('User not found');
  return { ...userData, id: userId };
};
