import { get, increment, ref, update } from 'firebase/database';
import { db } from '@services/firebase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserType } from '@store/types';
import { useUserStore } from '@store/useUserStore';
interface LikeDislikeData {
  userId: string;
  playlistId: string;
  action: 'like' | 'dislike';
  currentState: boolean;
}

const updateLikeDislike = async ({ userId, playlistId, action, currentState }: LikeDislikeData) => {
  const userRef = ref(db, `users/${userId}`);

  const updates: { [key: string]: unknown } = {};
  if (action === 'like') {
    updates[`users/${userId}/likedPlaylists/${playlistId}`] = !currentState;
    updates[`playlists/${playlistId}/${action}s`] = increment(currentState ? -1 : 1);
  } else {
    updates[`users/${userId}/dislikedPlaylists/${playlistId}`] = !currentState;
    updates[`playlists/${playlistId}/${action}s`] = increment(currentState ? -1 : 1);
  }
  await update(ref(db), updates);

  console.log((await get(userRef)).val());
  const [userSnapshot] = await Promise.all([get(userRef)]);
  return {
    user: userSnapshot.val() as UserType,
  };
};

export const useLikeDislikeQuery = () => {
  const queryClient = useQueryClient();
  const setUser = useUserStore((state) => state.setUser);
  // console.log(user);
  return useMutation({
    mutationFn: updateLikeDislike,
    onSuccess: ({ user }, { userId, playlistId }) => {
      setUser(user);
      queryClient.setQueryData(['user', userId], user);
      queryClient.invalidateQueries({ queryKey: ['playlist', playlistId] });
    },
    onError: (error) => {
      console.error('Failed to update like/dislike:', error);
    },
  });
};
