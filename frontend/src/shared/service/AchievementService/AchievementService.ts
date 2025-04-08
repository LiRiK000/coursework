import { api } from '@/shared/api';
import { Achievement } from './types';

export class AchievementService {
  async getAchievements(): Promise<Achievement[]> {
    const response = await api.get<Achievement[]>('/achievements');
    return response.data;
  }
}
