import { ref, update } from 'firebase/database';
import { db } from '@src/firebase';
import { UpdateCommentParams } from '@hooks/query/useCommentUpdateQuery';
export const updateComment = async ({ playlistId, commentId, comment }: UpdateCommentParams) => {
  const playlistRef = ref(db, `playlists/${playlistId}/comments/${commentId}`);
  await update(playlistRef, comment);
  return playlistId;
};
