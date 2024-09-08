import { useAllPlaylistsQuery } from '@services/reactQuery/usePlaylistsQuery';
import { useUserStore } from '@store/useUserStore';

const useCategory = (category = 'All') => {
  const { data, isLoading, isError, error } = useAllPlaylistsQuery();
  const { user } = useUserStore();

  if (category === 'All') {
    return { data, isLoading, isError, error, user };
  } else if (category === 'Subscribe') {
    const subscribedPlaylists = data?.filter((playlistId) => user?.subscribedPlaylists?.[playlistId] || '');
    return { data: subscribedPlaylists, isLoading, isError, error };
  } else if (category === 'MyPlaylist') {
    const myPlaylists = data?.filter((playlistId) => user?.createdPlaylists?.[playlistId] || '');
    return { data: myPlaylists, isLoading, isError, error };
  } else {
    return { data, isLoading, isError, error, user };
  }
};

export default useCategory;
