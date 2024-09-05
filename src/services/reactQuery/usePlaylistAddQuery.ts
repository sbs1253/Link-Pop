import { ref, push, get } from 'firebase/database';
import { db } from '@services/firebase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePlaylistStore } from '@store/usePlaylistStore';
interface AddPlaylistParams {
  userId: string;
  playlistId: string;
  track: { title: string; url: string };
}
const addPlaylist = async ({ userId, playlistId, track }: AddPlaylistParams) => {
  const playlistRef = ref(db, `playlists/${playlistId}/tracks`);
  await push(playlistRef, track);
  return (await get(ref(db, `playlists/${playlistId}`))).val();
};

export const usePlaylistAddQuery = () => {
  const queryClient = useQueryClient();
  const updatePlaylist = usePlaylistStore((state) => state.updatePlaylist);

  return useMutation({
    mutationFn: (params: AddPlaylistParams) => addPlaylist(params),
    onSuccess: (playlist, { playlistId }) => {
      queryClient.invalidateQueries({ queryKey: ['playlist '] });
      updatePlaylist(playlistId, playlist);
    },
    onError: (error) => {
      console.error('Failed to update subscription:', error);
    },
  });
};
