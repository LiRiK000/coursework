import { useQuery, useQueryClient } from '@tanstack/react-query';
import { courseService } from '@/shared/service/CourseService';

export const useFetchData = () => {
  const queryClient = useQueryClient();
  const searchValue = queryClient.getQueryData(['searchValue']) as string;

  const { data: courses = [], isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: () => courseService.getCourses(searchValue),
  });

  const { data: favoriteCourses = [] } = useQuery({
    queryKey: ['favoriteCourses'],
    queryFn: courseService.getFavoriteCourses,
  });

  return { courses, isLoading, favoriteCourses };
};
