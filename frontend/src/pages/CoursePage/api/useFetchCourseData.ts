import { useQuery } from '@tanstack/react-query';
import { courseService } from '@/shared/service/CourseService';

export const useFetchCourseData = (id: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['course', id],
    queryFn: () => courseService.getCourseById(id),
  });
  const isFavorite = useQuery({
    queryKey: ['isFavorite', id],
    queryFn: async () => {
      const data = await courseService.getFavoriteCourses();
      return data.some((course) => course.id === id);
    },
  });
  return { data, isLoading, error, isFavorite: !isFavorite.data };
};
