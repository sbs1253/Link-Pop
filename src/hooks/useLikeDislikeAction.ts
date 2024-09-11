import { useLikeDislikeQuery } from '@services/reactQuery/useLikeDislikeQuery';
import { PlaylistsType, UserType } from '@store/types';

export const useLikeDislikeActions = (playlistId: string, user: UserType) => {
  const { mutate, isPending, isError, error } = useLikeDislikeQuery();
  const handleLikeDislike = (list: PlaylistsType | undefined, action: 'like' | 'dislike') => {
    if (!user) return;
    const currentState = list?.[playlistId] || false;
    mutate({
      userId: user.id,
      playlistId: playlistId,
      action,
      currentState,
    });
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleLikeDislike(user.likedPlaylists, 'like');
  };

  const handleDislike = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleLikeDislike(user.dislikedPlaylists, 'dislike');
  };
  return { handleLike, handleDislike, isPending, isError, error };
};
