import { useQuery } from '@tanstack/react-query';
import { courseService } from '@/shared/service/CourseService';

export const useGetFavorites = () => {
  return useQuery({
    queryKey: ['favorites'],
    queryFn: () => courseService.getFavoriteCourses(),
  });
};
