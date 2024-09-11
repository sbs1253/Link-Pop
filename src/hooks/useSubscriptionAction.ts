import { useSubscribedQuery } from '@services/reactQuery/useSubscribedQuery';
import { UserType } from '@store/types';

export const useSubscriptionAction = (playlistId: string, user: UserType) => {
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
