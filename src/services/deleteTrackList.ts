import { DeleteTrackListParams } from '@hooks/query/useDeleteTrackQuery';
import { db } from '@src/firebase';
import { ref, remove } from 'firebase/database';

export const deleteTrackList = async ({ playlistId, trackId }: DeleteTrackListParams) => {
  const trackListRef = ref(db, `playlists/${playlistId}/tracks/${trackId}`);
  await remove(trackListRef);
};
