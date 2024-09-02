import { useQuery } from '@tanstack/react-query';
import { ref, get, query, orderByChild } from 'firebase/database';
import { db } from '@services/firebase';
import { PlaylistType, UserType } from '@store/types';
import { usePlaylistStore } from '@store/usePlaylistStore';
import { useEffect } from 'react';

const playlists = async () => {
  const playlistsRef = ref(db, 'playlists');
  const queryRef = query(playlistsRef, orderByChild('createdAt'));
  const snapshot = await get(queryRef);
  const playlistsData = snapshot.val() as { [key: string]: PlaylistType };
  const playlistsArray = Object.entries(playlistsData).map(async ([id, playlist]) => {
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
  const playlists = await Promise.all(playlistsArray);
  return playlists;
};

export const usePlaylists = () => {
  const setPlaylists = usePlaylistStore((state) => state.setPlaylists);
  const { data, error, isLoading } = useQuery<PlaylistType[], Error>({
    queryKey: ['playlist'],
    queryFn: playlists,
  });
  useEffect(() => {
    if (data) {
      setPlaylists(data); // Zustand 스토어에 플레이리스트 저장
    }
  }, [data, setPlaylists]);

  return { data, error, isLoading };
};
