import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useAuth } from './useAuth';

export const useAuthQuery = () => {
  const { login, register } = useAuth();

  const loginMutation = useMutation({
    mutationFn: login,
    onError: (error: AxiosError) => {
      throw {
        message: error.message || 'Ошибка при входе в систему',
      };
    },
  });

  const registerMutation = useMutation({
    mutationFn: register,
    onError: (error: AxiosError) => {
      throw {
        message: error.message || 'Ошибка при попытке регистрации',
      };
    },
  });

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    mutationSuccess: loginMutation.isSuccess || registerMutation.isSuccess, // FIXME
    isLoading: loginMutation.isPending || registerMutation.isPending,
    mutationError: loginMutation.error || registerMutation.error,
  };
};
