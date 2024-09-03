import { get, increment, ref, update } from 'firebase/database';
import { db } from '@services/firebase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PlaylistType, UserType } from '@store/types';
import { useUserStore } from '@store/useUserStore';
import { usePlaylistStore } from '@store/usePlaylistStore';
interface LikeDislikeData {
  userId: string;
  playlistId: string;
  action: 'like' | 'dislike';
  currentState: boolean;
}

const updateLikeDislike = async ({ userId, playlistId, action, currentState }: LikeDislikeData) => {
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

export const useLikeDislikeQuery = () => {
  const queryClient = useQueryClient();
  const { setUser } = useUserStore();
  const { updatePlaylist } = usePlaylistStore();

  return useMutation({
    mutationFn: updateLikeDislike,
    onSuccess: ({ user, playlist }, { playlistId }) => {
      setUser(user);
      updatePlaylist(playlistId, playlist);
      queryClient.invalidateQueries({ queryKey: ['playlist'] });
    },
    onError: (error) => {
      console.error('Failed to update like/dislike:', error);
    },
  });
};
