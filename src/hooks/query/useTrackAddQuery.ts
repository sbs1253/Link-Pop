import { addTrack } from '@services/addTrack';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// 트랙 추가 쿼리
export const useTrackAddQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addTrack,
    onSuccess: (playlistId) => {
      queryClient.invalidateQueries({ queryKey: ['playlists', playlistId] });
    },
    onError: (error) => {
      console.error('Failed to update error:', error);
    },
  });
};
