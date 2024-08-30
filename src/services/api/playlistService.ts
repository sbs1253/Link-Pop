import { ref, get, query, orderByChild } from 'firebase/database';
import { PlaylistType, UserType } from '@store/types';
import { db } from '@services/firebase';

export const fetchPlaylists = async (): Promise<PlaylistType[]> => {
  const playlistsRef = ref(db, 'playlists');
  const playlistsQuery = query(playlistsRef, orderByChild('createdAt'));
  const snapshot = await get(playlistsQuery);

  if (snapshot.exists()) {
    return Object.values(snapshot.val()) as PlaylistType[];
  } else {
    return [];
  }
};

export const fetchUserById = async (userId: string): Promise<UserType> => {
  const userRef = ref(db, `users/${userId}`);
  const snapshot = await get(userRef);

  if (snapshot.exists()) {
    return snapshot.val() as UserType;
  } else {
    throw new Error('User not found');
  }
};
