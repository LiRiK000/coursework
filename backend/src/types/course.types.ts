import { Course, User, Block, Question, Option } from '@prisma/client';

export interface CreateCourseDto {
  title: string;
  description: string;
  category: string;
  level: string;
  blocks?: {
    title: string;
    content: string;
    order?: number;
    test?: {
      title: string;
      description: string;
      passingScore: number;
      questions: {
        question: string;
        options: {
          text: string;
          isCorrect: boolean;
        }[];
      }[];
    };
  }[];
}

export interface UpdateCourseDto extends Partial<CreateCourseDto> {}

export interface CourseWithAuthor extends Course {
  author: Pick<User, 'id' | 'email' | 'fullname'>;
}

export interface Task {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface SectionWithTasks {
  id: string;
  title: string;
  description: string | null;
  order: number;
  tasks: Task[];
}

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface TestQuestion {
  id: string;
  question: string;
  options: QuestionOption[];
}

export interface Test {
  id: string;
  title: string;
  description: string | null;
  passingScore: number;
  questions: TestQuestion[];
}

export interface BlockWithTest {
  id: string;
  title: string;
  content: string;
  order: number;
  test?: Test;
}

export interface CourseWithDetails extends CourseWithAuthor {
  sections: SectionWithTasks[];
  blocks: BlockWithTest[];
}
