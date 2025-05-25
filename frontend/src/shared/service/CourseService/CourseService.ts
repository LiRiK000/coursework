import { api } from '@/shared/api';
import { Course } from './types';

export class CourseService {
  async getCourses(search?: string): Promise<Course[]> {
    const response = await api.get<{ total: number; courses: Course[] }>(
      '/courses',
      {
        params: {
          search: search || undefined,
        },
      },
    );
    return response.data.courses;
  }

  async getCourseById(id: string): Promise<{ course: Course }> {
    const response = await api.get<{ course: Course }>(`/courses/${id}`);
    return response.data;
  }

  async createCourse(courseData: FormData): Promise<Course> {
    const response = await api.post<{ course: Course }>(
      '/courses',
      courseData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data.course;
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
