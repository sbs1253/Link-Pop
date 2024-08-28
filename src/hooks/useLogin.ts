import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ref, get, set } from 'firebase/database';
import { db } from '@services/firebase';
import { UserType } from '@store/types';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useStore } from '@store/useStore';

interface LoginData {
  email: string;
  password: string;
}

const fetchUserDataFirebase = async (userId: string): Promise<UserType> => {
  const userRef = ref(db, `users/${userId}`);
  const snapshot = await get(userRef);
  console.log(userId);
  const userData = snapshot.val();
  if (!userData) throw new Error('User not found');
  return { ...userData, id: userId }; // Include the userId
};

export const loginUser = async (email: string, password: string): Promise<UserType> => {
  const auth = getAuth();
  const userAuth = await signInWithEmailAndPassword(auth, email, password);
  const userId = userAuth.user.uid;
  return await fetchUserDataFirebase(userId);
};

// export const useLogin = (): UseMutationResult<UserType, Error, LoginData> => {
//   const queryClient = useQueryClient();
//   const setUser = useStore((state) => state.setUser);

//   return useMutation<UserType, Error, LoginData>(
//     async (credentials: LoginData) => {
//       return loginUser(credentials.email, credentials.password);
//     },
//     {
//       onSuccess: (user) => {
//         setUser(user);
//         queryClient.setQueryData(['user', user.id], user);
//       },
//       onError: (error) => {
//         console.error('Login failed:', error);
//         // Handle the error appropriately, such as showing an error message
//       },
//     }
//   );
// };
// export const useLogin = (): UseMutationResult<UserType, Error, LoginData> => {
//   const auth = getAuth();
//   return useMutation({
//     mutationFn: async (loginData: LoginData) => {
//       const userCredential = await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
//       return userCredential.user.providerData;
//     },
//     onSuccess: (user) => {
//       console.log('Login successful', user);
//     },
//     onError: (error) => {
//       console.error('Login failed', error);
//     },
//   });
// };

// 사용자 데이터 복사 함수
export const copyUserData = async (oldUserId: string, newUserId: string) => {
  try {
    // 기존 사용자 데이터의 참조
    const oldUserRef = ref(db, `users/${oldUserId}`);

    // 새 사용자 데이터의 참조
    const newUserRef = ref(db, `users/${newUserId}`);

    // 기존 사용자 데이터 읽기
    const snapshot = await get(oldUserRef);
    const userData = snapshot.val();

    if (userData) {
      // 새 사용자 데이터로 복사
      await set(newUserRef, userData);
      console.log('User data copied successfully.');
    } else {
      console.error('No data found for the given user ID.');
    }
  } catch (error) {
    console.error('Error copying user data:', error);
    throw error;
  }
};
