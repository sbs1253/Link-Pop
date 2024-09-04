import { get, ref, push } from 'firebase/database';
import { db } from '@services/firebase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserType } from '@store/types';
import { useUserStore } from '@store/useUserStore';

const addPlaylist = async (playlistId, newData) => {
  const playlistRef = ref(db, `playlists/${playlistId}/tracks`);
  console.log(playlistId, newData);
  push(playlistRef, newData);
};

export const usePlaylistAddQuery = () => {
  const queryClient = useQueryClient();
  const { setUser } = useUserStore();
  return useMutation({
    mutationFn: addPlaylist,
    onSuccess: (user, { userId }) => {
      queryClient.setQueryData(['user', userId], user);
      queryClient.invalidateQueries({ queryKey: ['playlist'] });
    },
    onError: (error) => {
      console.error('Failed to update subscription:', error);
    },
  });
};
