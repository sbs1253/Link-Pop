import { useQuery } from '@tanstack/react-query';
import { ref, get, query, orderByChild, onValue } from 'firebase/database';
import { db } from '@services/firebase';
import { PlaylistType, UserType } from '@store/types';
import { usePlaylistStore } from '@store/usePlaylistStore';
import { useEffect } from 'react';

const fetchPlaylists = async () => {
  return new Promise((resolve) => {
    const playlistsRef = ref(db, 'playlists');
    const queryRef = query(playlistsRef, orderByChild('createdAt'));

    onValue(queryRef, async (snapshot) => {
      const playlistsData = snapshot.val() as { [key: string]: PlaylistType };
      const playlistsArray = await Promise.all(
        Object.entries(playlistsData).map(async ([id, playlist]) => {
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
        })
      );
      resolve(playlistsArray);
    });
  });
};

export const usePlaylistsQuery = () => {
  const setPlaylists = usePlaylistStore((state) => state.setPlaylists);
  const { data, error, isLoading } = useQuery({
    queryKey: ['playlist'],
    queryFn: fetchPlaylists,
  });
  useEffect(() => {
    if (data) {
      setPlaylists(data);
    }
  }, [data, setPlaylists]);

  return { data, error, isLoading };
};
