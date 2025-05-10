import { ICreateCourse } from '@/shared/service/CourseService/types';
import { FormData } from '../model/schema';

export const courseAdapter = (data: FormData): ICreateCourse => {
  return {
    title: data.step1.title,
    description: data.step1.description,
    category: data.step1.category,
    level: data.step1.level,
    coverImage: data.step1.coverImage?.name,
    blocks: data.blocks,
  };
};
