import { AddCommentParams } from '@hooks/query/useCommentAddQuery';
import { db } from '@src/firebase';
import { push, ref } from 'firebase/database';

export const addComment = async ({ playlistId, comment }: AddCommentParams) => {
  const playlistRef = ref(db, `playlists/${playlistId}/comments`);
  await push(playlistRef, comment);
  return playlistId;
};
