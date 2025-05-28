import { api } from '@/shared/api';
import { GetAllUsersResponse, PasswordChangeDto, UserProfile, UserUpdateDto } from './types';
import { ApiResponse } from '../types';

export class UserService {
  async getProfile(): Promise<UserProfile> {
    const response =
      await api.get<ApiResponse<{ user: UserProfile }>>('/users/profile');
    return response.data.data.user;
  }

  async updateUser(updateData: UserUpdateDto): Promise<UserProfile> {
    const response = await api.patch<ApiResponse<{ user: UserProfile }>>(
      '/users/profile',
      updateData,
    );
    return response.data.data.user;
  }

  async changePassword(passwordData: PasswordChangeDto): Promise<void> {
    await api.patch('/users/password', passwordData);
  }

  async uploadAvatar(image: File): Promise<string> {
    const formData = new FormData();
    formData.append('avatar', image);

    const response = await api.patch<ApiResponse<{ avatar: string }>>(
      '/users/profile',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data.data.avatar;
  }

  async deleteAccount(): Promise<void> {
    await api.delete('/users');
  }

  async getAllUsers(): Promise<GetAllUsersResponse['data']> {
    const response = await api.get('/users');
    return response.data.data.users;
  }
}
