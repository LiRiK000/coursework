import { useMutation } from '@tanstack/react-query';
import { useAuth } from './useAuth';
import { notification } from 'antd';
import { isAxiosError } from 'axios';

export const useAuthQuery = () => {
  const { login, register } = useAuth();

  const loginMutation = useMutation({
    mutationFn: login,
    retry: 0,
    onError: (error: unknown) => {
      let message = 'Login failed';

      if (isAxiosError(error)) {
        message = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      notification.error({
        message: 'Ошибка авторизации',
        description: message,
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: register,
    retry: 0,
    onError: (error: unknown) => {
      let message = 'Registration failed';

      if (isAxiosError(error)) {
        message = error.response?.data?.message || error.message;
      } else if (error instanceof Error) {
        message = error.message;
      }

      notification.error({
        message: 'Ошибка регистрации',
        description: message,
      });
    },
  });

  return {
    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    mutationSuccess: registerMutation.isSuccess || loginMutation.isSuccess,
    isLoading: loginMutation.isPending && registerMutation.isPending,
  };
};
