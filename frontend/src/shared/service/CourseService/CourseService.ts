import { api } from '@/shared/api';
import { Course, DownloadCertificateDTO } from './types';

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

  async getCompletedCourses(): Promise<Course[]> {
    const response = await api.get<{ courses: Course[]; total: number }>(
      '/courses/completed',
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

  async getCourseForLearning(id: string): Promise<{ course: Course }> {
    const response = await api.get<{ course: Course }>(`/courses/${id}/learn`);
    return response.data;
  }

  async startCourse(id: string): Promise<void> {
    await api.post(`/courses/${id}/start`);
  }

  async completeBlock(blockId: string) {
    const response = await api.post<{
      message: string;
      courseCompleted?: boolean;
      redirectTo?: string;
    }>(`/courses/blocks/${blockId}/complete`);
    return response.data;
  }

  async submitTest(
    testId: string,
    data: { answers: Array<{ questionId: string; optionId: string }> },
  ): Promise<{ isPassed: boolean; score: number }> {
    const response = await api.post<{ isPassed: boolean; score: number }>(
      `/courses/tests/${testId}/submit`,
      data,
    );
    return response.data;
  }

  async getCourseProgress(
    id: string,
  ): Promise<{ completedBlocks: { blockId: string }[]; isCompleted: boolean }> {
    const response = await api.get<{
      progress: {
        completedBlocks: { blockId: string }[];
        isCompleted: boolean;
      };
    }>(`/courses/${id}/progress`);
    return response.data.progress;
  }

  async downloadCertificate({
    email,
    courseName,
    courseId,
  }: DownloadCertificateDTO): Promise<Blob> {
    const response = await api.post(
      `/certificates/${courseId}`,
      {
        email,
        courseName,
      },
      {
        responseType: 'blob',
      },
    );
    return response.data;
  }
}
