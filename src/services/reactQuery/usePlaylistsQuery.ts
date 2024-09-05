import { useQuery } from '@tanstack/react-query';
import { ref, get, query, orderByChild } from 'firebase/database';
import { db } from '@services/firebase';
import { PlaylistType, UserType } from '@store/types';

const fetchAllPlaylists = async () => {
  const playlistsRef = ref(db, 'playlists');
  const queryRef = query(playlistsRef, orderByChild('createdAt'));
  const snapshot = await get(queryRef);
  const playlistsData = snapshot.val() as { [key: string]: PlaylistType };

  return Object.keys(playlistsData).map((id) => id);
};

const fetchPlaylistDetails = async (playlistId: string) => {
  const playlistRef = ref(db, `playlists/${playlistId}`);
  const snapshot = await get(playlistRef);
  const playlist = snapshot.val() as PlaylistType;

  const userRef = ref(db, `users/${playlist.creatorId}`);
  const userSnapshot = await get(userRef);
  const userData = userSnapshot.val() as UserType;

  return {
    ...playlist,
    id: playlistId,
    creator: {
      id: playlist.creatorId,
      username: userData.username,
      img: userData.img,
    },
  };
};

// 전체 플레이리스트 목록을 가져오는 쿼리 훅
export const useAllPlaylistsQuery = () => {
  return useQuery({
    queryKey: ['playlists'],
    queryFn: fetchAllPlaylists,
  });
};

// 개별 플레이리스트 상세 정보를 가져오는 쿼리 훅
export const usePlaylistDetailsQuery = (playlistId: string) => {
  return useQuery({
    queryKey: ['playlist', playlistId],
    queryFn: () => fetchPlaylistDetails(playlistId),
    enabled: !!playlistId,
  });
};
