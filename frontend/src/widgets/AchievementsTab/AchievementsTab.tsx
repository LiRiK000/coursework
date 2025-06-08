import { Loader } from '@/shared/ui/Loader';
import { BadgeList } from '@/shared/ui/BadgeList';
import { useGetAchievements } from './hooks/useGetAchievements';
import { Typography } from 'antd';
import { Space } from 'antd';

export const AchievementsTab = () => {
  const { achievements, isLoading } = useGetAchievements();
  if (isLoading) return <Loader fullscreen />;

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Typography.Title level={2}>Достижения</Typography.Title>
      <BadgeList achievements={achievements} />
    </Space>
  );
};
