import { useAuth } from '@/features/Auth';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useLogoutMutation = () => {
  const { logout } = useAuth();
  const mutation = useMutation({
    mutationFn: async () => {
      logout();
    },
    onError: (error: AxiosError) => {
      return {
        message: error.message || 'Ошибка при выходе из системы',
      };
    },
  });

  return mutation;
};
