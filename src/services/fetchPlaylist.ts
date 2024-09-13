import { ref, get, query, orderByChild } from 'firebase/database';
import { db } from '@src/firebase';
import { PlaylistType, UserType } from '@store/types';

const fetchAllPlaylists = async () => {
  const playlistsRef = ref(db, 'playlists');
  const queryRef = query(playlistsRef, orderByChild('createdAt'));
  const snapshot = await get(queryRef);
  const playlistsData = snapshot.val() as { [key: string]: PlaylistType };

  const sortedPlaylists = Object.entries(playlistsData)
    .map(([id, playlist]) => ({ ...playlist, id }))
    .sort((a, b) => b.createdAt - a.createdAt);

  return sortedPlaylists.map((playlist) => playlist.id);
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
export { fetchAllPlaylists, fetchPlaylistDetails };
