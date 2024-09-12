import { ref, update } from 'firebase/database';
import { db } from '@src/firebase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '@store/useUserStore';
import { fetchUserDataFirebase } from '@services/api/userService';

interface SubscribeDataParams {
  userId: string;
  playlistId: string;
  subscribed: boolean;
}

const updateSubscription = async ({ userId, playlistId, subscribed }: SubscribeDataParams) => {
  const userRef = ref(db, `users/${userId}/subscribedPlaylists`);
  await update(userRef, { [playlistId]: !subscribed });
  const updatedUserData = await fetchUserDataFirebase(userId);
  return updatedUserData;
};

// 구독 상태 업데이트
export const useSubscribedQuery = () => {
  const queryClient = useQueryClient();
  const setUser = useUserStore((state) => state.actions.setUser);
  return useMutation({
    mutationFn: updateSubscription,
    onSuccess: (user, { userId }) => {
      setUser(user);
      queryClient.setQueryData(['user', userId], user);
    },
    onError: (error) => {
      console.error('Failed to update subscription:', error);
    },
  });
};
