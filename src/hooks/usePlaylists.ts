import { useQuery } from '@tanstack/react-query';
import { ref, get } from 'firebase/database';
import { db } from '@services/firebase';
import { PlaylistType } from '@store/types';

const playlists = async (): Promise<PlaylistType[]> => {
  const snapshot = await get(ref(db, 'playlists'));
  return snapshot.val() as PlaylistType[];
};
export const usePlaylist = () => {
  return useQuery<PlaylistType[], Error>({
    queryKey: ['playlist'],
    queryFn: playlists,
  });
};
