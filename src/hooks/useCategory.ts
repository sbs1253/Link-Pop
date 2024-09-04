import { usePlaylistsQuery } from '@services/reactQuery/usePlaylistsQuery';
import { useUserStore } from '@store/useUserStore';

const useCategory = (category = 'All') => {
  const { data, isLoading, error } = usePlaylistsQuery();
  const { user } = useUserStore();
  // console.log(user);
  if (category === 'All') {
    return { data, isLoading, error, user };
  } else if (category === 'Subscribe') {
    const subscribedPlaylists = data?.filter((playlist) => user?.subscribedPlaylists?.[playlist.id] || '');
    return { data: subscribedPlaylists, isLoading, error, user };
  } else if (category === 'MyPlaylist') {
    const myPlaylists = data?.filter((playlist) => user?.createdPlaylists?.[playlist.id] || '');
    return { data: myPlaylists, isLoading, error, user };
  } else {
    return { data, isLoading, error, user };
  }
};

export default useCategory;
