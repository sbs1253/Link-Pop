import { ref, push } from 'firebase/database';
import { db } from '@src/firebase';

interface AddTrackParams {
  playlistId: string;
  track: { title: string; url: string };
}

export const addTrack = async ({ playlistId, track }: AddTrackParams) => {
  const playlistRef = ref(db, `playlists/${playlistId}/tracks`);
  await push(playlistRef, track);
  return playlistId;
};
