import { courseService } from '@/shared/service/CourseService';
import { CourseCard } from '@/shared/ui/CourseCard';
import { Loader } from '@/shared/ui/Loader';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Typography, Space, Row, Empty, message } from 'antd';
import { useCallback, useState } from 'react';
import { SearchCourses } from '@/features/SearchCourses';

export const AllCoursesTab = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);

  const queryClient = useQueryClient();

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchValue(e.target.value);
    },
    [],
  );

  const handleSearch = useCallback(() => {
    const finalQuery = searchValue || undefined;
    setSearchQuery(finalQuery);
  }, [searchValue]);

  const handleClearSearch = useCallback(() => {
    setSearchValue('');
    setSearchQuery(undefined);
  }, []);

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ['courses', searchQuery],
    queryFn: () => courseService.getCourses(searchQuery),
    enabled: true,
    refetchOnMount: true,
  });

  const { data: favoriteCourses = [] } = useQuery({
    queryKey: ['favoriteCourses'],
    queryFn: courseService.getFavoriteCourses,
    refetchOnMount: true,
  });

  const handleDeleteCourse = useCallback(
    async (courseId: string) => {
      try {
        await courseService.deleteCourse(courseId);
        message.success('Курс успешно удален');
        queryClient.invalidateQueries({ queryKey: ['courses'] });
      } catch (e) {
        message.error('Ошибка при удалении курса');
        console.error(e);
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
        console.error(e);
      }
    },
    [favoriteCourses, queryClient],
  );

  if (isLoading) {
    return <Loader fullscreen />;
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Typography.Title level={2}>Все курсы</Typography.Title>
      <SearchCourses
        disabled={isLoading}
        value={searchValue}
        onChange={handleInputChange}
        onSearch={handleSearch}
        onClear={handleClearSearch}
      />
      {courses.length === 0 ? (
        <Empty description="Курсы не найдены" />
      ) : (
        <Row gutter={[24, 24]} style={{ gap: '16px' }}>
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onDelete={handleDeleteCourse}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={favoriteCourses.some((c) => c.id === course.id)}
            />
          ))}
        </Row>
      )}
    </Space>
  );
};
