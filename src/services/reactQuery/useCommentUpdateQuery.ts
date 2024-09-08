import { ref, update } from 'firebase/database';
import { db } from '@src/firebase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CommentType } from 'src/store/types';

interface UpdateCommentParams {
  playlistId: string;
  commentId: string;
  comment: CommentType;
}
const updateComment = async ({ playlistId, commentId, comment }: UpdateCommentParams) => {
  const playlistRef = ref(db, `playlists/${playlistId}/comments/${commentId}`);
  await update(playlistRef, comment);
  return playlistId;
};

// 댓글 업데이트 쿼리
export const useCommentUpdateQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateComment,
    onSuccess: (playlistId) => {
      queryClient.invalidateQueries({ queryKey: ['playlists', playlistId] });
    },
    onError: (error) => {
      console.error('Failed to update error:', error);
    },
  });
};
