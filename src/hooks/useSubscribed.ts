import { get, ref, update } from 'firebase/database';
import { db } from '@services/firebase';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { UserType } from '@store/types';
import { useStore } from '@store/useStore';

interface SubscribeData {
  userId: string;
  playlistId: string;
  subscribed: boolean;
}

// 구독 상태 업데이트
export const updateSubscription = async (userId: string, playlistId: string, subscribed: boolean) => {
  const userRef = ref(db, `users/${userId}/subscribedPlaylists`);
  await update(userRef, { [playlistId]: !subscribed });
  const userSnapshot = await get(ref(db, `users/${userId}`));
  return userSnapshot.val() as UserType;
};

export const useSubscribe = (): UseMutationResult<UserType, Error, SubscribeData, unknown> => {
  const queryClient = useQueryClient();
  const { setUser } = useStore();
  return useMutation<UserType, Error, SubscribeData>({
    mutationFn: ({ userId, playlistId, subscribed }: SubscribeData) =>
      updateSubscription(userId, playlistId, subscribed),
    onSuccess: (user, { userId }) => {
      setUser(user);
      queryClient.setQueryData(['user', userId], user);
    },
    onError: (error) => {
      console.error('Failed to update subscription:', error);
    },
  });
};
