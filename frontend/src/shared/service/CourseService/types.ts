export interface CourseStep1 {
  title: string;
  description: string;
  category: string;
  level: string;
}

export interface TestOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface TestQuestion {
  id: string;
  question: string;
  options: TestOption[];
}

export interface Test {
  id: string;
  title: string;
  description?: string;
  questions: TestQuestion[];
  passingScore: number;
}

export interface Block {
  id: string;
  title: string;
  content: string;
  test: Test;
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
  category: string;
  level: string;
  author: Author;
  isFavorite: boolean;
  coverImage?: string;
  blocks: Block[];
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CourseResponse {
  course: Course;
}

export interface CoursesResponse {
  courses: Course[];
  total: number;
}

export interface ICreateCourse {
  title: string;
  description: string;
  category: string;
  level: string;
  coverImage?: string;
  blocks: Block[];
}
export interface DownloadCertificateDTO {
  email: string;
  courseName: string;
  courseId: string;
}
