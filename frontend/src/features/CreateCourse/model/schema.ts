import { z } from 'zod';

export const TestOptionSchema = z.object({
  id: z.string(),
  text: z.string().min(1, 'Вариант ответа не может быть пустым'),
  isCorrect: z.boolean(),
});

export const TestQuestionSchema = z.object({
  id: z.string(),
  question: z.string().min(1, 'Вопрос не может быть пустым'),
  options: z
    .array(TestOptionSchema)
    .min(2, 'Должно быть минимум 2 варианта ответа')
    .refine(
      (options) => options.some((opt) => opt.isCorrect),
      'Должен быть хотя бы один правильный ответ',
    ),
});

export const TestSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Название теста не может быть пустым'),
  description: z.string().min(1, 'Описание теста не может быть пустым'),
  questions: z
    .array(TestQuestionSchema)
    .min(1, 'Должен быть хотя бы один вопрос')
    .max(20, 'Максимальное количество вопросов - 20'),
  passingScore: z
    .number()
    .min(0, 'Проходной балл не может быть меньше 0')
    .max(100, 'Проходной балл не может быть больше 100'),
});

export const BlockSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Название блока не может быть пустым'),
  content: z.string().min(1, 'Содержимое блока не может быть пустым'),
  order: z.number().optional(),
  test: TestSchema.optional(),
});

export const CourseStep1Schema = z.object({
  title: z
    .string()
    .min(1, 'Название курса не может быть пустым')
    .max(100, 'Название курса не может быть длиннее 100 символов'),
  description: z
    .string()
    .min(1, 'Описание курса не может быть пустым')
    .max(1000, 'Описание курса не может быть длиннее 1000 символов'),
  category: z.enum(['PROGRAMMING', 'DESIGN', 'MARKETING', 'LANGUAGES']),
  level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED']),
  coverImage: z.instanceof(File).optional(),
});

export const CreateCourseSchema = z.object({
  step1: CourseStep1Schema,
  blocks: z
    .array(BlockSchema)
    .min(1, 'Должен быть хотя бы один блок')
    .max(20, 'Максимальное количество блоков - 20'),
});

export type TestOption = z.infer<typeof TestOptionSchema>;
export type TestQuestion = z.infer<typeof TestQuestionSchema>;
export type Test = z.infer<typeof TestSchema>;
export type Block = z.infer<typeof BlockSchema>;
export type CourseStep1 = z.infer<typeof CourseStep1Schema>;
export type FormData = z.infer<typeof CreateCourseSchema>;
