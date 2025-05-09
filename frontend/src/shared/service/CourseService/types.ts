export interface ICourseBlock {
  id: string;
  title: string;
  content: string; // Markdown content
  documentUrl?: string; // URL загруженного документа
  test?: ITest;
}

export interface ITest {
  id: string;
  title: string;
  questions: IQuestion[];
}

export interface IQuestion {
  id: string;
  text: string;
  type: 'SINGLE' | 'MULTIPLE' | 'TEXT';
  options?: string[]; // Для вопросов с вариантами ответов
  correctAnswers: string[]; // Для SINGLE/MULTIPLE - индексы правильных ответов, для TEXT - правильный текст
}

export interface ICreateCourse {
  title: string;
  description: string;
  category: 'PROGRAMMING' | 'DESIGN' | 'MARKETING' | 'LANGUAGES';
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  coverImage?: File;
  blocks: ICourseBlock[];
}
export interface ToggleFavoriteResponse {
  status: string;
  data: {
    isFavorite: boolean;
  };
}

export interface Author {
  id: string;
  fullname: string;
  email: string;
  role: string;
  avatar: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: 'PROGRAMMING' | 'DESIGN' | 'MARKETING' | 'LANGUAGES';
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  coverImage?: string;
  blocks: ICourseBlock[];
  isFavorite: boolean;
  authorId: string;
  author: Author;
}
