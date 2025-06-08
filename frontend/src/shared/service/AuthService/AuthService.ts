import { api } from '@/shared/api';
import { AuthDTO, AuthResponse, GetMeResponse } from './types';
import { isAxiosError } from 'axios';

export class AuthService {
  async login(data: AuthDTO): Promise<AuthResponse['data']['user']> {
    try {
      const response = await api.post<AuthResponse>(`/auth/login`, data);
      console.log(await api.post<AuthResponse>(`/auth/login`, data));
      return response.data.data.user;
    } catch (error) {
      if (isAxiosError(error)) {
        throw error;
      }
      throw new Error('Unknown error during login');
    }
    // throw new Error('Тестовая ошибка авторизации');
  }

  async register(data: AuthDTO): Promise<AuthResponse['data']['user']> {
    try {
      const response = await api.post<AuthResponse>(`/auth/register`, data);
      return response.data.data.user;
    } catch (error) {
      if (isAxiosError(error)) {
        throw error;
      }
      throw new Error('Unknown error during registration');
    }
  }

  async logout(): Promise<void> {
    try {
      await api.post(`/auth/logout`);
    } catch (error) {
      if (isAxiosError(error)) {
        throw error;
      }
      throw new Error('Unknown error during logout');
    }
  }

  async checkAuth(): Promise<GetMeResponse['data']['user']> {
    try {
      const response = await api.get<GetMeResponse>(`/auth/me`);
      return response.data.data.user;
    } catch (error) {
      if (isAxiosError(error)) {
        throw error;
      }
      throw new Error('Unknown error during auth check');
    }
  }
}
