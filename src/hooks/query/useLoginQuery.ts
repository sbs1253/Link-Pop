import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '@store/useUserStore';
import { loginUser } from '@services/authService';

interface LoginDataParams {
  email: string;
  password: string;
}

// 로그인 쿼리
export const useLoginQuery = () => {
  const queryClient = useQueryClient();
  const setUser = useUserStore((state) => state.actions.setUser);

  return useMutation({
    mutationFn: (credentials: LoginDataParams) => loginUser(credentials.email, credentials.password),
    onSuccess: (user) => {
      setUser(user);
      queryClient.setQueryData(['user', user.id], user);
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
};
