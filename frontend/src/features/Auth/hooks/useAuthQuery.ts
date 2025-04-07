import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import { AxiosError } from 'axios';

export const useAuthQuery = () => {
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onError: (error: AxiosError) => {
      return {
        message: error.message || 'Ошибка при входе в систему',
      };
    },
  });

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onError: (error: AxiosError) => {
      return {
        message: error.message || 'Ошибка при попытке регистрации',
      };
    },
  });

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    mutationSuccess: loginMutation.isSuccess || registerMutation.isSuccess,
    isLoading: loginMutation.isPending || registerMutation.isPending,
    mutationError: loginMutation.error || registerMutation.error,
  };
};
