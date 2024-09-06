import { ref, push } from 'firebase/database';
import { db } from '@services/firebase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DefaultPlaylistType } from '@store/types';

const addPlaylist = async (newPlaylist: DefaultPlaylistType) => {
  const playlistRef = ref(db, `playlists`);
  await push(playlistRef, newPlaylist);
};

export const usePlaylistAddQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: DefaultPlaylistType) => addPlaylist(params),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playlists'] });
    },
    onError: (error) => {
      console.error('Failed to add playlist:', error);
    },
  });
};
