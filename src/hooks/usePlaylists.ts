import { useQuery } from '@tanstack/react-query';
import { ref, get } from 'firebase/database';
import { db } from '@services/firebase';
import { PlaylistType, UserType } from '@store/types';

const playlists = async (): Promise<PlaylistType[]> => {
  const playlistsRef = ref(db, 'playlists');
  const snapshot = await get(playlistsRef);
  const playlistsArray = snapshot.val() as PlaylistType[];
  const playlistsData = Object.entries(playlistsArray).map(async ([id, playlist]) => {
    const userRef = ref(db, `users/${playlist.creatorId}`);
    const userSnapshot = await get(userRef);
    const userData = userSnapshot.val() as UserType;
    return {
      ...playlist,
      id,
      creator: {
        id: playlist.creatorId,
        username: userData.username,
        img: userData.img,
      },
    };
  });
  const playlists = await Promise.all(playlistsData);
  playlists.sort((a, b) => a.createdAt - b.createdAt);

  return playlists;
};
export const usePlaylist = () => {
  return useQuery<PlaylistType[], Error>({
    queryKey: ['playlist'],
    queryFn: playlists,
  });
};
