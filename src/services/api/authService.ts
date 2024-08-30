import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { fetchUserDataFirebase } from '@services/api/userService';
import { UserType } from '@store/types';

export const loginUser = async (email: string, password: string): Promise<UserType> => {
  const auth = getAuth();
  const userAuth = await signInWithEmailAndPassword(auth, email, password);
  const userId = userAuth.user.uid;
  return await fetchUserDataFirebase(userId);
};
