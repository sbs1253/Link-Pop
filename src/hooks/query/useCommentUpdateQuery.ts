import { updateComment } from '@services/updateComment';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CommentType } from 'src/store/types';

export interface UpdateCommentParams {
  playlistId: string;
  commentId: string;
  comment: CommentType;
}

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
