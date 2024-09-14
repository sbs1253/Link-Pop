import { updatePlaylist } from '@services/updatePlaylist';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
