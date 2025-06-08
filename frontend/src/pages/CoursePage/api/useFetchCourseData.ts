import { useQuery } from '@tanstack/react-query';
import { courseService } from '@/shared/service/CourseService';

export const useFetchCourseData = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['course', id],
    queryFn: () => courseService.getCourseById(id),
  });

  const { data: favoriteCourses = [] } = useQuery({
    queryKey: ['favoriteCourses'],
    queryFn: courseService.getFavoriteCourses,
  });

  const isFavorite = favoriteCourses.some((course) => course.id === id);

  return { data, isLoading, error, isFavorite };
};
