import { ref, remove } from 'firebase/database';
import { db } from '@services/firebase';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteCommentProps {
  playlistId: string;
  commentId: string;
}
const deleteComment = async ({ playlistId, commentId }: DeleteCommentProps) => {
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
