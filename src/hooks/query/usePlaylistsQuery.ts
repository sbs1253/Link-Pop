import { useQuery } from '@tanstack/react-query';
import { useUserStore } from '@store/useUserStore';
import { fetchAllPlaylists, fetchPlaylistDetails } from '@services/fetchPlaylist';

// 전체 플레이리스트 목록을 가져오는 쿼리
export const useAllPlaylistsQuery = (category: string) => {
  const user = useUserStore((state) => state.user);
  return useQuery({
    queryKey: ['playlists'],
    queryFn: fetchAllPlaylists,
    select: (data) => {
      switch (category) {
        case 'all':
          return data;
        case 'subscribe':
          return data.filter((playlistId) => user.subscribedPlaylists?.[playlistId] || '');
        case 'myPlaylist':
          return data.filter((playlistId) => user.createdPlaylists?.[playlistId] || '');
        default:
          return data;
      }
    },
  });
};

// 개별 플레이리스트 상세 정보를 가져오는 쿼리
export const usePlaylistDetailsQuery = (playlistId: string) => {
  return useQuery({
    queryKey: ['playlists', playlistId],
    queryFn: () => fetchPlaylistDetails(playlistId),
  });
};
