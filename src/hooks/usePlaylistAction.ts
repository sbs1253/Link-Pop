import { useSubscribedQuery } from '@services/reactQuery/useSubscribedQuery';
import { useLikeDislikeQuery } from '@services/reactQuery/useLikeDislikeQuery';
import { UserType, PlaylistsType } from '@store/types';

export const usePlaylistSubscriptionActions = (playlistId: string, user: UserType) => {
  const {
    mutate: subscribeMutate,
    isPending: subscribeIsPending,
    isError: subscribeIsError,
    error: subscribeError,
  } = useSubscribedQuery();

  const subscribePlaylist = (e: React.MouseEvent) => {
    e.stopPropagation();
    subscribeMutate({
      userId: user.id,
      playlistId: playlistId,
      subscribed: user.subscribedPlaylists?.[playlistId] || false,
    });
  };

  return { subscribePlaylist, subscribeIsPending, subscribeIsError, subscribeError };
};

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
