import { CourseCard } from '@/shared/ui/CourseCard';
import { Loader } from '@/shared/ui/Loader';
import { Empty, message, Row, Space } from 'antd';
import { Typography } from 'antd';
import { useFetchData } from './hooks/useFetchData';
import { useCallback } from 'react';
import { courseService } from '@/shared/service/CourseService';
import { useQueryClient } from '@tanstack/react-query';

export const MyCoursesTab = () => {
  const { courses, isLoading, favoriteCourses } = useFetchData();
  const queryClient = useQueryClient();

  const handleToggleFavorite = useCallback(
    async (courseId: string) => {
      try {
        const isFavorite = favoriteCourses.some(
          (course) => course.id === courseId,
        );
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
    [favoriteCourses, queryClient],
  );

  if (isLoading) {
    return <Loader fullscreen />;
  }

  if (!courses.length) {
    return <Empty description="Вы пока не создали ни одного курса" />;
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Typography.Title level={2}>Мои курсы</Typography.Title>
      <Row gutter={[16, 16]} style={{ gap: '16px' }}>
        {courses.map((course) => (
          <CourseCard
            onToggleFavorite={handleToggleFavorite}
            key={course.id}
            course={course}
            isFavorite={favoriteCourses.some(
              (favCourse) => favCourse.id === course.id,
            )}
          />
        ))}
      </Row>
    </Space>
  );
};
