import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '@store/useUserStore';
import { loginUser } from '@services/api/authService';

interface LoginData {
  email: string;
  password: string;
}

export const useLoginQuery = () => {
  const queryClient = useQueryClient();
  const setUser = useUserStore((state) => state.setUser);

  return useMutation({
    mutationFn: (credentials: LoginData) => loginUser(credentials.email, credentials.password),
    onSuccess: (user) => {
      setUser(user);
      queryClient.setQueryData(['user', user.id], user);
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });
};
