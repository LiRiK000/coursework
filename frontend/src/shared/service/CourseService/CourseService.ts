import { api } from '@/shared/api';
import { Course } from './types';
import { ApiResponse } from '../types';

export class CourseService {
  async fetchCourses(): Promise<Course[]> {
    const response = await api.get<ApiResponse<Course[]>>('/courses');
    return response.data.data;
  }

  async getCourseById(id: string): Promise<Course> {
    const response = await api.get<ApiResponse<Course>>(`/courses/${id}`);
    return response.data.data;
  }
}
