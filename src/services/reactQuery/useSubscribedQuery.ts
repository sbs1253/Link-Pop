import { get, ref, update } from 'firebase/database';
import { db } from '@services/firebase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserType } from '@store/types';
import { useUserStore } from '@store/useUserStore';

interface SubscribeData {
  userId: string;
  playlistId: string;
  subscribed: boolean;
}

// 구독 상태 업데이트
const updateSubscription = async ({ userId, playlistId, subscribed }: SubscribeData) => {
  const userRef = ref(db, `users/${userId}/subscribedPlaylists`);
  await update(userRef, { [playlistId]: !subscribed });
  const userSnapshot = await get(ref(db, `users/${userId}`));
  return userSnapshot.val() as UserType;
};

export const useSubscribedQuery = () => {
  const queryClient = useQueryClient();
  const { setUser } = useUserStore();
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
