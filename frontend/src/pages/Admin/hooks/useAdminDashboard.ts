import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { courseService } from '@/shared/service/CourseService';
import { userService } from '@/shared/service/UserService';
import { DashboardStats } from '../types';

export const useAdminDashboard = () => {
  const {
    data: stats,
    isLoading,
    error,
  } = useQuery<DashboardStats>({
    queryKey: ['adminDashboard'],
    queryFn: async () => {
      const [usersResponse, courses] = await Promise.all([
        userService.getAllUsers(),
        courseService.getCourses(),
      ]);

      const users = usersResponse;

      const now = dayjs();
      const thisMonth = now.startOf('month');
      const lastMonth = now.subtract(1, 'month').startOf('month');

      const totalUsers = users.length;
      const activeAuthors = users.filter(
        (user) => user.role === 'AUTHOR' || user.role === 'ADMIN',
      ).length;
      const publishedCourses = courses.length;

      const recentCourses = [...courses]
        .sort((a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix())
        .slice(0, 5);

      const popularCourses = [...courses]
        .sort((a, b) => b.blocks.length - a.blocks.length)
        .slice(0, 5);

      const thisMonthUsers = users.filter((user) =>
        dayjs(user.createdAt).isAfter(thisMonth),
      ).length;
      const lastMonthUsers = users.filter(
        (user) =>
          dayjs(user.createdAt).isAfter(lastMonth) &&
          dayjs(user.createdAt).isBefore(thisMonth),
      ).length;

      return {
        totalUsers,
        activeAuthors,
        publishedCourses,
        recentCourses,
        popularCourses,
        userGrowth: {
          total: totalUsers,
          thisMonth: thisMonthUsers,
          lastMonth: lastMonthUsers,
        },
      };
    },
  });

  return {
    stats,
    isLoading,
    error,
  };
};
