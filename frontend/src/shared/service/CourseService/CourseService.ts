import { api } from '@/shared/api';
import { Course, ICreateCourse } from './types';

export class CourseService {
  async getCourses(): Promise<Course[]> {
    const response = await api.get<{ total: number; courses: Course[] }>(
      '/courses',
    );
    return response.data.courses;
  }

  async getCourseById(id: string): Promise<Course> {
    const response = await api.get<{ status: string; data: Course }>(
      `/courses/${id}`,
    );
    return response.data.data;
  }

  async createCourse(courseData: ICreateCourse): Promise<Course> {
    const response = await api.post('/courses', courseData);
    return response.data;
  }

  async updateCourse(id: string, courseData: FormData): Promise<Course> {
    const response = await api.patch<{ status: string; data: Course }>(
      `/courses/${id}`,
      courseData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data.data;
  }

  async deleteCourse(id: string): Promise<void> {
    await api.delete(`/courses/${id}`);
  }

  async toggleFavorite(courseId: string): Promise<boolean> {
    const response = await api.post<{ status: string; data: boolean }>(
      `/favorites/${courseId}`,
    );
    return response.data.data;
  }

  async getFavoriteCourses(): Promise<Course[]> {
    const response = await api.get<{ status: string; data: Course[] }>(
      '/favorites',
    );
    return response.data.data;
  }
}
