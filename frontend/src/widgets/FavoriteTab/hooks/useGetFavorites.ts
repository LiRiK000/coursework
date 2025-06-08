import { useQuery } from '@tanstack/react-query';
import { courseService } from '@/shared/service/CourseService';

export const useGetFavorites = () => {
  return useQuery({
    queryKey: ['favoriteCourses'],
    queryFn: () => courseService.getFavoriteCourses(),
  });
};
