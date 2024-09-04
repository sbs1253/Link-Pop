import { usePlaylistsQuery } from '@services/reactQuery/usePlaylistsQuery';
import { useUserStore } from '@store/useUserStore';

const useCategory = (category = 'All') => {
  const { data, isLoading, error } = usePlaylistsQuery();
  const { user } = useUserStore();
  if (category === 'All') {
    return { data, isLoading, error };
  } else if (category === 'Subscribe') {
    const subscribedPlaylists = data?.filter((playlist) => user?.subscribedPlaylists?.[playlist.id] || '');
    return { data: subscribedPlaylists, isLoading, error };
  } else if (category === 'MyPlaylist') {
    const myPlaylists = data?.filter((playlist) => user?.createdPlaylists?.[playlist.id] || '');
    return { data: myPlaylists, isLoading, error };
  } else {
    return { data, isLoading, error, user };
  }
};

export default useCategory;
