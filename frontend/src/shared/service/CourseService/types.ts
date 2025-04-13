export interface Author {
  id: string;
  email: string;
  fullname: string;
}

export interface Section {
  id: string;
  title: string;
  courseId: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  authorId: string;
  author: Author;
  sections: Section[];
}
