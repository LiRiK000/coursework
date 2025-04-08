import { authService } from '@/shared/service/AuthService';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export const useAuthQuery = () => {
  const loginMutation = useMutation({
    mutationFn: authService.login,
    onError: (error: AxiosError) => {
      return {
        message: error.message || 'Ошибка при входе в систему',
      };
    },
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
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
