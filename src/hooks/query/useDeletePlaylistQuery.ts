import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '@store/useUserStore';
import { deletePlaylist } from '@services/deletePlaylist';

// 플레이리스트 삭제 쿼리
export const useDeletePlaylistQuery = () => {
  const queryClient = useQueryClient();
  const userId = useUserStore((state) => state.user.id);
  const setUser = useUserStore((state) => state.actions.setUser);
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
