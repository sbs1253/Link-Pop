import { deleteComment } from '@services/deleteComment';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export interface DeleteCommentParams {
  playlistId: string;
  commentId: string;
}

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
