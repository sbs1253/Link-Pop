import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CommentType } from 'src/store/types';
import { addComment } from '@services/addComment';

export interface AddCommentParams {
  playlistId: string;
  comment: CommentType;
}
// 댓글 추가 쿼리
export const useCommentAddQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addComment,
    onSuccess: (playlistId) => {
      queryClient.invalidateQueries({ queryKey: ['playlists', playlistId] });
    },
    onError: (error) => {
      console.error('Failed to update error:', error);
    },
  });
};
