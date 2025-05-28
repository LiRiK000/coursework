import { useMutation, useQueryClient } from '@tanstack/react-query';
import { FormData } from '../model/schema';
import { courseAdapter } from '../utils/courseAdapter';
import { message } from 'antd';
import { courseService } from '@/shared/service/CourseService';

export const useCreateCourse = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (formData: FormData) => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      const submissionData = courseAdapter(formData);
      return courseService.createCourse(submissionData);
    },
    onSuccess: () => {
      message.success('Курс успешно создан');
    },
    onError: (error) => {
      message.error('Ошибка при создании курса');
      console.error(error);
    },
  });

  return {
    createCourse: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    reset: mutation.reset,
  };
};
