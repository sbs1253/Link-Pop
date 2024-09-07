import { ref, push, get } from 'firebase/database';
import { db } from '@services/firebase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
interface AddTrackParams {
  playlistId: string;
  track: { title: string; url: string };
}
const addTrack = async ({ playlistId, track }: AddTrackParams) => {
  const playlistRef = ref(db, `playlists/${playlistId}/tracks`);
  await push(playlistRef, track);
  return playlistId;
};

export const useTrackAddQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: AddTrackParams) => addTrack(params),
    onSuccess: (playlistId) => {
      queryClient.invalidateQueries({ queryKey: ['playlists', playlistId] });
    },
    onError: (error) => {
      console.error('Failed to update subscription:', error);
    },
  });
};
