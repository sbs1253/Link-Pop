import { UserType } from '@store/types';
import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';
import { useStore } from '@store/useStore';
import { loginUser } from '@services/api/authService';

interface LoginData {
  email: string;
  password: string;
}

export const useLogin = (): UseMutationResult<UserType, Error, LoginData, unknown> => {
  const queryClient = useQueryClient();
  const setUser = useStore((state) => state.setUser);

  return useMutation<UserType, Error, LoginData>({
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
