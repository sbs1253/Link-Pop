import { ref, update } from 'firebase/database';
import { db } from '@src/firebase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PlaylistType } from '@store/types';

const updatePlaylist = async (updatedPlaylist: PlaylistType) => {
  const playlistRef = ref(db, `playlists/${updatedPlaylist.id}`);
  await update(playlistRef, updatedPlaylist);
};

// 플레이리스트 업데이트 쿼리
export const usePlaylistUpdateQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updatePlaylist,
    onSuccess: (_, updatedPlaylist) => {
      queryClient.invalidateQueries({ queryKey: ['playlists', updatedPlaylist.id] });
    },
    onError: (error) => {
      console.error('Failed to update playlist:', error);
    },
  });
};
