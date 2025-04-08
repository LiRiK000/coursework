import { authService } from '@/shared/service/AuthService';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useLogoutMutation = () => {
  const mutation = useMutation({
    mutationFn: authService.logout,
    onError: (error: AxiosError) => {
      return {
        message: error.message || 'Ошибка при выходе из системы',
      };
    },
  });

  return mutation;
};
