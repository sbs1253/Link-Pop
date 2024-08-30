import { get, increment, ref, update } from 'firebase/database';
import { db } from '@services/firebase';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { PlaylistType, UserType } from '@store/types';
import { useStore } from '@store/useStore';
interface LikeDislikeData {
  userId: string;
  playlistId: string;
  action: 'like' | 'dislike';
  currentState: boolean;
}

export const updateLikeDislike = async (
  userId: string,
  playlistId: string,
  action: 'like' | 'dislike',
  currentState: boolean
) => {
  const userRef = ref(db, `users/${userId}`);
  const playlistRef = ref(db, `playlists/${playlistId}`);

  const updates: { [key: string]: unknown } = {};
  if (action === 'like') {
    updates[`users/${userId}/likedPlaylists/${playlistId}`] = !currentState;
    updates[`playlists/${playlistId}/${action}s`] = increment(currentState ? -1 : 1);
  } else {
    updates[`users/${userId}/dislikedPlaylists/${playlistId}`] = !currentState;
    updates[`playlists/${playlistId}/${action}s`] = increment(currentState ? -1 : 1);
  }
  await update(ref(db), updates);

  const [userSnapshot, playlistSnapshot] = await Promise.all([get(userRef), get(playlistRef)]);
  return {
    user: userSnapshot.val() as UserType,
    playlist: playlistSnapshot.val() as PlaylistType,
  };
};

export const useLikeDislike = (): UseMutationResult<
  { user: UserType; playlist: PlaylistType },
  Error,
  LikeDislikeData,
  unknown
> => {
  const queryClient = useQueryClient();
  const { setUser } = useStore();

  return useMutation<{ user: UserType; playlist: PlaylistType }, Error, LikeDislikeData>({
    mutationFn: ({ userId, playlistId, action, currentState }: LikeDislikeData) =>
      updateLikeDislike(userId, playlistId, action, currentState),
    onSuccess: ({ user, playlist }, { userId, playlistId }) => {
      setUser(user);
      queryClient.setQueryData(['user', userId], user);
      queryClient.invalidateQueries({ queryKey: ['playlist'] });
    },
    onError: (error) => {
      console.error('Failed to update like/dislike:', error);
    },
  });
};
