import { useSubscribedQuery } from '@services/reactQuery/useSubscribedQuery';
import { useLikeDislikeQuery } from '@services/reactQuery/useLikeDislikeQuery';
import { PlaylistType, UserType, PlaylistsType } from '@store/types';

export const usePlaylistSubscriptionActions = (playlist: PlaylistType, user: UserType) => {
  const { mutate: subscribeMutate, isPending, isError, error } = useSubscribedQuery();

  const handleSubscription = (e: React.MouseEvent) => {
    e.stopPropagation();
    subscribeMutate({
      userId: user.id,
      playlistId: playlist.id,
      subscribed: user.subscribedPlaylists?.[playlist.id] || false,
    });
  };

  return { handleSubscription, isPending, isError, error };
};

export const useLikeDislikeActions = (playlist: PlaylistType, user: UserType) => {
  const { mutate, isPending, isError, error } = useLikeDislikeQuery();
  const toggleLikeDislike = (list: PlaylistsType | undefined, action: 'like' | 'dislike') => {
    if (!user) return;
    const currentState = list?.[playlist.id] || false;
    mutate({
      userId: user.id,
      playlistId: playlist.id,
      action,
      currentState,
    });
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLikeDislike(user.likedPlaylists, 'like');
  };

  const handleDislike = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleLikeDislike(user.dislikedPlaylists, 'dislike');
  };
  return { handleLike, handleDislike, isPending, isError, error };
};
