import { ref, push } from 'firebase/database';
import { db } from '@src/firebase';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CommentType } from 'src/store/types';

interface AddCommentParams {
  playlistId: string;
  comment: CommentType;
}
const addComment = async ({ playlistId, comment }: AddCommentParams) => {
  const playlistRef = ref(db, `playlists/${playlistId}/comments`);
  await push(playlistRef, comment);
  return playlistId;
};

// 댓글 추가 쿼리
export const useCommentAddQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: AddCommentParams) => addComment(params),
    onSuccess: (playlistId) => {
      queryClient.invalidateQueries({ queryKey: ['playlists', playlistId] });
    },
    onError: (error) => {
      console.error('Failed to update error:', error);
    },
  });
};
