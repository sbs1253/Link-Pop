import { useMutation, useQueryClient } from '@tanstack/react-query';
import { db } from '@services/firebase';
import { ref, remove } from 'firebase/database';

const deleteTrackList = async (playlistId: string, trackId: string) => {
  const trackListRef = ref(db, `playlists/${playlistId}/tracks/${trackId}`);
  await remove(trackListRef);
};

export const useDeleteQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ playlistId, trackId }: { playlistId: string; trackId: string }) =>
      deleteTrackList(playlistId, trackId),
    onSuccess: (_, { playlistId }) => {
      queryClient.invalidateQueries({ queryKey: ['playlist', playlistId] });
    },
    onError: (error) => {
      console.error('Failed to delete track:', error);
    },
  });
};
