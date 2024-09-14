import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { fetchUserDataFirebase } from '@services/userService';

// 파이어베이스 로그인 서비스
export const loginUser = async (email: string, password: string) => {
  const auth = getAuth();
  const userAuth = await signInWithEmailAndPassword(auth, email, password);
  const userId = userAuth.user.uid;
  return await fetchUserDataFirebase(userId);
};
