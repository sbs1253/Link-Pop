import { useMutation, useQueryClient } from '@tanstack/react-query';
import { DefaultPlaylistType } from '@store/types';
import { useUserStore } from '@store/useUserStore';
import { addPlaylist } from '@services/addPlaylist';

// 플레이리스트 생성
export const usePlaylistAddQuery = () => {
  const queryClient = useQueryClient();
  const userId = useUserStore((state) => state.user.id);
  const setUser = useUserStore((state) => state.actions.setUser);
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
