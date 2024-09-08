import { ref, push, set } from 'firebase/database';
import { db } from '@src/firebase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DefaultPlaylistType } from '@store/types';

import { useUserStore } from '@store/useUserStore';
import { fetchUserDataFirebase } from '@services/api/userService';

const addPlaylist = async (newPlaylist: DefaultPlaylistType, userId: string) => {
  const playlistRef = ref(db, `playlists`);
  const newPlaylistRef = await push(playlistRef, newPlaylist);
  const playlistId = newPlaylistRef.key;
  const userRef = ref(db, `users/${userId}/createdPlaylists/${playlistId}`);
  await set(userRef, true);

  const updatedUserData = await fetchUserDataFirebase(userId);

  return { playlistId, updatedUserData };
};

// 플레이리스트 생성
export const usePlaylistAddQuery = () => {
  const queryClient = useQueryClient();
  const userId = useUserStore((state) => state.user.id);
  const setUser = useUserStore((state) => state.setUser);
  return useMutation({
    mutationFn: (newPlaylist: DefaultPlaylistType) => addPlaylist(newPlaylist, userId),
    onSuccess: ({ playlistId, updatedUserData }) => {
      setUser(updatedUserData);
      queryClient.invalidateQueries({ queryKey: ['playlists'] });
      queryClient.invalidateQueries({ queryKey: ['playlists', playlistId] });
      queryClient.setQueryData(['user', userId], updatedUserData);
    },
    onError: (error) => {
      console.error('Failed to add playlist:', error);
    },
  });
};
