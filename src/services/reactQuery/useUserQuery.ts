import { useQuery } from '@tanstack/react-query';
import { fetchUserDataFirebase } from './../api/userService';

// 유저 정보 가져오기
export const useUserQuery = (userId: string) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUserDataFirebase(userId),
    select: (data) => ({ img: data.img, username: data.username }),
  });
};
