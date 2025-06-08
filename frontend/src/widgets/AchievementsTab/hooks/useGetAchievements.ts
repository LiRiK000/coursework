import {
  Achievement,
  achievementService,
} from '@/shared/service/AchievementService';
import { useQuery } from '@tanstack/react-query';

export const useGetAchievements = () => {
  const { data, isLoading } = useQuery<Achievement[]>({
    queryKey: ['achievements'],
    queryFn: achievementService.getAchievements,
  });
  return {
    achievements: data,
    isLoading,
  };
};
