import { useMutation, useQueryClient } from '@tanstack/react-query';
import { db } from '@services/firebase';
import { ref, remove } from 'firebase/database';
import { useUserStore } from '@store/useUserStore';
import { fetchUserDataFirebase } from '@services/api/userService';

const deleteTrackList = async (playlistId: string, trackId: string) => {
  console.log(playlistId);
  const trackListRef = ref(db, `playlists/${playlistId}/tracks/${trackId}`);
  await remove(trackListRef);
};

export const useDeleteTrackQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ playlistId, trackId }: { playlistId: string; trackId: string }) =>
      deleteTrackList(playlistId, trackId),
    onSuccess: (_, { playlistId }) => {
      queryClient.invalidateQueries({ queryKey: ['playlists', playlistId] });
    },
    onError: (error) => {
      console.error('Failed to delete track:', error);
    },
  });
};

const deletePlaylist = async (playlistId: string, userId: string) => {
  const playlistRef = ref(db, `playlists/${playlistId}`);
  await remove(playlistRef);

  const userRef = ref(db, `users/${userId}/createdPlaylists/${playlistId}`);
  await remove(userRef);

  const updatedUserData = await fetchUserDataFirebase(userId);

  return updatedUserData;
};

export const useDeletePlaylistQuery = () => {
  const queryClient = useQueryClient();
  const userId = useUserStore((state) => state.user.id);
  const setUser = useUserStore((state) => state.setUser);
  return useMutation({
    mutationFn: (playlistId: string) => deletePlaylist(playlistId, userId),
    onSuccess: ({ updatedUserData }) => {
      setUser(updatedUserData);
      queryClient.invalidateQueries({ queryKey: ['playlists'] });
      queryClient.setQueryData(['user', userId], updatedUserData);
    },
    onError: (error) => {
      console.error('Failed to delete playlist:', error);
    },
  });
};
