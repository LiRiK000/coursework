import { api } from '@/shared/api';

interface AuthData {
  email: string;
  password: string;
  confirmPassword?: string;
  fullname?: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export const authApi = {
  login: async (data: AuthData): Promise<AuthResponse> => {
    const response = await api.post(`/auth/login`, data);
    return response.data;
  },

  register: async (data: AuthData): Promise<AuthResponse> => {
    const response = await api.post(`/auth/register`, data);
    return response.data;
  },
};
