import { Course } from '@/shared/service/CourseService/types';

export interface DashboardStats {
  totalUsers: number;
  activeAuthors: number;
  publishedCourses: number;
  recentCourses: Course[];
  popularCourses: Course[];
  userGrowth: {
    total: number;
    thisMonth: number;
    lastMonth: number;
  };
}
