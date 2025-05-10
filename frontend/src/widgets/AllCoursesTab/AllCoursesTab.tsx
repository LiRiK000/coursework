import { courseService } from '@/shared/service/CourseService';
import { CourseCard } from '@/shared/ui/CourseCard';
import { Loader } from '@/shared/ui/Loader';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Typography, Space, Input, Row, Empty, message } from 'antd';
import { useCallback } from 'react';

const { Search } = Input;

export const AllCoursesTab = () => {
  const queryClient = useQueryClient();

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: courseService.getCourses,
  });

  const { data: favoriteCourses = [] } = useQuery({
    queryKey: ['favoriteCourses'],
    queryFn: courseService.getFavoriteCourses,
  });

  const handleDeleteCourse = useCallback(
    async (courseId: string) => {
      try {
        await courseService.deleteCourse(courseId);
        message.success('Курс успешно удален');
        queryClient.invalidateQueries({ queryKey: ['courses'] });
      } catch (e) {
        message.error('Ошибка при удалении курса');
        console.log(e);
      }
    },
    [queryClient],
  );

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
        console.log(e);
      }
    },
    [favoriteCourses, queryClient],
  );

  if (isLoading) {
    return <Loader fullscreen />;
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Typography.Title level={2}>Доступные курсы</Typography.Title>
      <Search
        placeholder="Поиск курсов"
        size="large"
        disabled={!courses.length}
        style={{ width: '100%', marginBottom: '24px' }}
      />

      {courses.length > 0 ? (
        <Row gutter={[16, 16]} style={{ gap: '16px' }}>
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onDelete={handleDeleteCourse}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={favoriteCourses.some(
                (favCourse) => favCourse.id === course.id,
              )}
            />
          ))}
        </Row>
      ) : (
        <Empty
          description="Курсы пока не добавлены"
          style={{ margin: '40px 0' }}
        />
      )}
    </Space>
  );
};
