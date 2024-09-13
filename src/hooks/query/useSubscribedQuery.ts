import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '@store/useUserStore';
import { updateSubscription } from '@services/updateSubscription';

// 구독 상태 업데이트
export const useSubscribedQuery = () => {
  const queryClient = useQueryClient();
  const setUser = useUserStore((state) => state.actions.setUser);
  return useMutation({
    mutationFn: updateSubscription,
    onSuccess: (user, { userId }) => {
      setUser(user);
      queryClient.setQueryData(['user', userId], user);
    },
    onError: (error) => {
      console.error('Failed to update subscription:', error);
    },
  });
};
