import { AxiosError } from 'axios';
import { api } from '@/shared/api';
import { useMutation } from '@tanstack/react-query';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}

interface AuthData {
  email: string;
  password: string;
  confirmPassword?: string;
}

const authApi = {
  login: async (data: AuthData): Promise<AuthResponse> => {
    const response = await api.post(`/auth/login`, data);
    return response.data;
  },

  register: async (data: AuthData): Promise<AuthResponse> => {
    const response = await api.post(`/auth/register`, data);
    return response.data;
  },

  refresh: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await api.post(`/auth/refresh`, {
      refreshToken,
    });
    return response.data;
  },
};

export const useAuth = () => {
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${data.accessToken}`;
    },
    onError: (error: AxiosError) => {
      return {
        message: error.message || 'Ошибка при входе в систему',
      };
    },
  });

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${data.accessToken}`;
    },
  });

  const refreshMutation = useMutation({
    mutationFn: authApi.refresh,
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${data.accessToken}`;
    },
  });

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    delete api.defaults.headers.common['Authorization'];
  };

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    refresh: refreshMutation.mutate,
    logout,
    isLoading:
      loginMutation.isPending ||
      registerMutation.isPending ||
      refreshMutation.isPending,
    error:
      loginMutation.error || registerMutation.error || refreshMutation.error,
  };
};
