import { Empty, message, Space, Spin, Typography } from 'antd';
import { CourseCard } from '@/shared/ui/CourseCard';
import styles from './FavoriteTab.module.scss';
import { useGetFavorites } from './hooks/useGetFavorites';
import { courseService } from '@/shared/service/CourseService';
import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export const FavoriteTab = () => {
  const { data: courses, isLoading } = useGetFavorites();
  const queryClient = useQueryClient();

  const handleToggleFavorite = useCallback(
    async (courseId: string) => {
      try {
        const isFavorite = courses?.some((course) => course.id === courseId);
        await courseService.toggleFavorite(courseId);
        if (isFavorite) {
          message.success('Курс удален из избранного');
        } else {
          message.success('Курс добавлен в избранное');
        }
        queryClient.invalidateQueries({ queryKey: ['favoriteCourses'] });
      } catch (e) {
        message.error('Ошибка при обновлении избранного');
        console.error(e);
      }
    },
    [courses, queryClient],
  );

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
        <CourseCard
          key={course.id}
          course={course}
          isFavorite={true}
          onToggleFavorite={handleToggleFavorite}
        />
      ))}
    </Space>
  );
};
