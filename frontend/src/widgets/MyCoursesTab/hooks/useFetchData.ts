import { useUser } from '@/entities/User';
import { courseService } from '@/shared/service/CourseService';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';

export const useFetchData = () => {
  const { id: userId } = useUser();
  const queryClient = useQueryClient();
  const searchValue = queryClient.getQueryData(['searchValue']) as string;

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ['courses', userId],
    queryFn: () => courseService.getCourses(searchValue),
  });

  const { data: favoriteCourses = [] } = useQuery({
    queryKey: ['favoriteCourses'],
    queryFn: courseService.getFavoriteCourses,
  });

  const data = useMemo(() => {
    return courses.filter((course) => course.authorId === userId);
  }, [courses, userId]);

  return { courses: data, isLoading, favoriteCourses };
};
