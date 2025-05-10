import { Empty, Space, Spin, Typography } from 'antd';
import { CourseCard } from '@/shared/ui/CourseCard';
import styles from './FavoriteTab.module.scss';
import { useGetFavorites } from './hooks/useGetFavorites';

export const FavoriteTab = () => {
  const { data: courses, isLoading } = useGetFavorites();

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Spin size="large" />
      </div>
    );
  }

  if (!courses?.length) {
    return (
      <Empty
        description="У вас пока нет избранных курсов"
        className={styles.empty}
      />
    );
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Typography.Title level={2}>Избранные курсы</Typography.Title>
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} isFavorite={true} />
      ))}
    </Space>
  );
};
