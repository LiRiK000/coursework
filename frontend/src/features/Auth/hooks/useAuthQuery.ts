import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useAuth } from './useAuth';
import { notification } from 'antd';
import { AuthFormData } from '../model/types';

interface ErrorResponse {
  message: string;
}

export const useAuthQuery = () => {
  const { login, register } = useAuth();

  const loginMutation = useMutation({
    mutationFn: login,
    onError: (error: AxiosError<ErrorResponse>) => {
      notification.error({
        message: 'Ошибка авторизации',
        description:
          error.response?.data?.message ||
          error.message ||
          'Не удалось войти в систему',
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: register,
    onError: (error: AxiosError<ErrorResponse>) => {
      notification.error({
        message: 'Ошибка регистрации',
        description:
          error.response?.data?.message ||
          error.message ||
          'Не удалось зарегистрироваться',
      });
    },
  });

  const handleLogin = (data: AuthFormData) => {
    loginMutation.mutate(data, {
      onError: () => {
        return false;
      },
    });
  };

  const handleRegister = (data: AuthFormData) => {
    registerMutation.mutate(data, {
      onError: () => {
        return false;
      },
    });
  };

  return {
    login: handleLogin,
    register: handleRegister,
    mutationSuccess: loginMutation.isSuccess || registerMutation.isSuccess,
    isLoading: loginMutation.isPending && registerMutation.isPending,
    mutationError: loginMutation.error || registerMutation.error,
    isError: loginMutation.isError || registerMutation.isError,
  };
};
