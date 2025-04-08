import { api } from '@/shared/api';
import { AuthData, AuthResponse } from './types';

export class AuthService {
  async login(data: AuthData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(`/auth/login`, data);
    return response.data;
  }
  async register(data: AuthData): Promise<AuthResponse> {
    const response = await api.post(`/auth/register`, data);
    return response.data;
  }

  async logout(): Promise<void> {
    await api.post(`/auth/logout`);
  }
  async checkAuth(): Promise<AuthResponse> {
    const response = await api.get<AuthResponse>(`/auth/me`);
    return response.data;
  }
}
