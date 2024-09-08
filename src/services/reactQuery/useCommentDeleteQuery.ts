import { ref, remove } from 'firebase/database';
import { db } from '@src/firebase';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteCommentParams {
  playlistId: string;
  commentId: string;
}
const deleteComment = async ({ playlistId, commentId }: DeleteCommentParams) => {
  const playlistRef = ref(db, `playlists/${playlistId}/comments/${commentId}`);
  await remove(playlistRef);
  return playlistId;
};

// 댓글 업데이트 쿼리
export const useCommentDeleteQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteComment,
    onSuccess: (playlistId) => {
      queryClient.invalidateQueries({ queryKey: ['playlists', playlistId] });
    },
    onError: (error) => {
      console.error('Failed to delete error:', error);
    },
  });
};
