import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { api } from '@/shared/api';

const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const useLogoutMutation = () => {
  const mutation = useMutation({
    mutationFn: logout,
    onError: (error: AxiosError) => {
      return {
        message: error.message || 'Ошибка при выходе из системы',
      };
    },
  });

  return mutation;
};
