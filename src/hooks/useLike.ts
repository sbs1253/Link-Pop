import { get, ref, update } from 'firebase/database';
import { db } from '@services/firebase';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { UserType } from '@store/types';
import { useStore } from '@store/useStore';

interface SubscribeData {
  userId: string;
  playlistId: string;
  likedPlaylists: boolean;
}

// 구독 상태 업데이트
export const updateSubscription = async (userId: string, playlistId: string, likedPlaylists: boolean) => {
  const playlistRef = ref(db, `playlists/${playlistId}`);
  const userLikedRef = ref(db, `users/${userId}/likedPlaylists/${playlistId}`);
  const userLikedSnapshot = await get(userLikedRef);
  const playlistSnapshot = await get(playlistRef);
  const playlist = playlistSnapshot.val();
  console.log(playlist.likes, userLikedSnapshot.val());

  if (!likedPlaylists) {
    await update(playlistRef, { likes: playlist.likes + 1 });
  } else {
    await update(playlistRef, { likes: playlist.likes - 1 });
  }
  const userSnapshot = await get(ref(db, `users/${userId}`));
  return userSnapshot.val() as UserType;
};

export const useLike = (): UseMutationResult<UserType, Error, SubscribeData, unknown> => {
  // const queryClient = useQueryClient();
  const { setUser } = useStore();
  return useMutation<UserType, Error, SubscribeData>({
    mutationFn: ({ userId, playlistId, likedPlaylists }: SubscribeData) =>
      updateSubscription(userId, playlistId, likedPlaylists),
    onSuccess: (user, { playlistId }) => {
      setUser(user);
      // queryClient.setQueryData(['user', userId], user);
    },
    onError: (error) => {
      console.error('Failed to update subscription:', error);
    },
  });
};
