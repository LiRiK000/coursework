// TODO: Подумать над схемой

import { z } from 'zod';

const questionSchema = z.object({
  id: z.string(),
  text: z.string().min(1, 'Вопрос не может быть пустым'),
  type: z.enum(['SINGLE', 'MULTIPLE', 'TEXT']),
  options: z.array(z.string()).optional(),
  correctAnswers: z.array(z.string()),
});

const testSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Название теста не может быть пустым'),
  questions: z
    .array(questionSchema)
    .min(1, 'Тест должен содержать хотя бы один вопрос'),
});

const blockSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Название блока не может быть пустым'),
  content: z
    .string()
    .min(10, 'Контент блока должен содержать минимум 10 символов'),
  documentUrl: z.string().optional(),
  test: testSchema.optional(),
});

export const CreateCourseSchema = z.object({
  step1: z.object({
    title: z.string().min(3, 'Название должно содержать минимум 3 символа'),
    description: z
      .string()
      .min(10, 'Описание должно содержать минимум 10 символов'),
    category: z.enum(['PROGRAMMING', 'DESIGN', 'MARKETING', 'LANGUAGES']),
    level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
    coverImage: z.instanceof(File).optional(),
  }),
  blocks: z
    .array(blockSchema)
    .min(1, 'Курс должен содержать хотя бы один блок'),
});

export type FormData = z.infer<typeof CreateCourseSchema>;
