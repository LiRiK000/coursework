import { api } from '@/shared/api';
import { Course } from './types';

export class CourseService {
  async fetchCourses(): Promise<Course[]> {
    const response = await api.get('/courses');
    return response.data;
  }
}
