import { deleteTrackList } from '@services/deleteTrackList';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface DeleteTrackListParams {
  playlistId: string;
  trackId: string;
}

// 트랙 삭제 쿼리
export const useDeleteTrackQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTrackList,
    onSuccess: (_, { playlistId }) => {
      queryClient.invalidateQueries({ queryKey: ['playlists', playlistId] });
    },
    onError: (error) => {
      console.error('Failed to delete track:', error);
    },
  });
};
