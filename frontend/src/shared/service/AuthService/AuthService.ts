import { api } from '@/shared/api';
import { AuthDTO, AuthResponse, GetMeResponse } from './types';

export class AuthService {
  async login(data: AuthDTO): Promise<AuthResponse['data']['user']> {
    const response = await api.post<AuthResponse>(`/auth/login`, data);
    return response.data.data.user;
  }
  async register(data: AuthDTO): Promise<AuthResponse['data']['user']> {
    const response = await api.post<AuthResponse>(`/auth/register`, data);
    return response.data.data.user;
  }

  async logout(): Promise<void> {
    await api.post(`/auth/logout`);
  }
  async checkAuth(): Promise<GetMeResponse['data']['user']> {
    const response = await api.get<GetMeResponse>(`/auth/me`);
    return response.data.data.user;
  }
}
