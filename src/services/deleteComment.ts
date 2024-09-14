import { ref, remove } from 'firebase/database';
import { db } from '@src/firebase';
import { DeleteCommentParams } from '@hooks/query/useCommentDeleteQuery';
export const deleteComment = async ({ playlistId, commentId }: DeleteCommentParams) => {
  const playlistRef = ref(db, `playlists/${playlistId}/comments/${commentId}`);
  await remove(playlistRef);
  return playlistId;
};
