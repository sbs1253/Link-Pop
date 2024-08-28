import { db } from '@services/firebase';
import { PlaylistType, UserType } from '@store/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { get, ref, runTransaction } from 'firebase/database';

// hooks.ts
export const useRatePlaylist = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, { playlistId: string; userId: string; isLike: boolean }>(
    async ({ playlistId, userId, isLike }) => {
      const userRef = ref(db, `users/${userId}`);
      const playlistRef = ref(db, `playlists/${playlistId}`);

      const userSnapshot = await get(userRef);
      const playlistSnapshot = await get(playlistRef);

      const user = userSnapshot.val() as UserType;
      const playlist = playlistSnapshot.val() as PlaylistType;

      const likedPlaylists = user.likedPlaylists || [];
      const isAlreadyLiked = likedPlaylists.includes(playlistId);

      if (isLike) {
        if (!isAlreadyLiked) {
          likedPlaylists.push(playlistId);
          playlist.likes++;
        }
      } else {
        if (isAlreadyLiked) {
          const index = likedPlaylists.indexOf(playlistId);
          likedPlaylists.splice(index, 1);
          playlist.likes--;
        }
      }

      // 트랜잭션을 사용하여 동시성 문제 해결
      await runTransaction(db, async (transaction) => {
        transaction.update(userRef, { likedPlaylists });
        transaction.update(playlistRef, { likes: playlist.likes });
      });
    },
    {
      onSuccess: (_, { playlistId, userId }) => {
        queryClient.invalidateQueries(['playlist', playlistId]);
        queryClient.invalidateQueries(['user', userId]);
      },
    }
  );
};
