import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '@store/useUserStore';
import { updateSubscription } from '@services/updateSubscription';
export interface SubscribeDataParams {
  playlistId: string;
  subscribed: boolean;
}
// 구독 상태 업데이트
export const useSubscribedQuery = () => {
  const queryClient = useQueryClient();
  const setUser = useUserStore((state) => state.actions.setUser);
  const userId = useUserStore((state) => state.user.id);

  return useMutation({
    mutationFn: (parms: SubscribeDataParams) => updateSubscription(parms, userId),
    onSuccess: (user) => {
      setUser(user);
      queryClient.setQueryData(['user', userId], user);
    },
    onError: (error) => {
      console.error('Failed to update subscription:', error);
    },
  });
};
