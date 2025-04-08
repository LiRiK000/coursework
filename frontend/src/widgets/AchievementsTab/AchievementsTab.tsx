import { Loader } from '@/shared/ui/Loader';
import { BadgeList } from '@/shared/ui/BadgeList';
import { useGetAchievements } from './hooks/useGetAchievements';

export const AchievementsTab = () => {
  const { achievements, isLoading } = useGetAchievements();
  if (isLoading) return <Loader fullscreen />;

  return <BadgeList achievements={achievements} />;
};
