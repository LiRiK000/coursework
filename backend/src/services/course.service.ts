import { prisma } from '../lib/prisma';
import { ApiError } from '../lib/ApiError';
import { Prisma } from '@prisma/client';
import {
  CreateCourseDto,
  CourseWithDetails,
  CourseBlock,
} from '../types/course.types';

export class CourseService {
  async createCourse(courseData: CreateCourseDto, authorId: string) {
    const { blocks, coverImagePath, ...restData } = courseData;

    return prisma.course.create({
      data: {
        ...restData,
        authorId,
        coverImage: coverImagePath,
        blocks: {
          create: blocks?.map((block: CourseBlock, index: number) => ({
            title: block.title,
            content: block.content,
            order: block.order ?? index,
            theoreticalMaterial: block.theoreticalMaterialPath,
            test: block.test
              ? {
                  create: {
                    title: block.test.title,
                    description: block.test.description,
                    passingScore: Number(block.test.passingScore),
                    questions: {
                      create: block.test.questions.map((question) => ({
                        question: question.question,
                        options: {
                          create: question.options.map((option) => ({
                            text: option.text,
                            isCorrect: option.isCorrect === 'true',
                          })),
                        },
                      })),
                    },
                  },
                }
              : undefined,
          })),
        },
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            fullname: true,
          },
        },
        sections: {
          orderBy: {
            order: 'asc',
          },
          select: {
            id: true,
            title: true,
            description: true,
            order: true,
          },
        },
        blocks: {
          orderBy: {
            order: 'asc',
          },
          include: {
            test: {
              include: {
                questions: {
                  include: {
                    options: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async getAllCourses(search?: string) {
    const whereClause: Prisma.CourseWhereInput | undefined = search
      ? {
          title: {
            contains: search,
            mode: 'insensitive' as const,
          },
        }
      : undefined;

    return prisma.course.findMany({
      where: whereClause,
      include: {
        author: {
          select: {
            id: true,
            email: true,
            fullname: true,
          },
        },
        blocks: {
          orderBy: {
            order: 'asc',
          },
          include: {
            course: false,
            test: {
              include: {
                questions: {
                  include: {
                    options: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getCourseById(id: string): Promise<CourseWithDetails | null> {
    const course = await prisma.course.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            fullname: true,
          },
        },
        sections: {
          orderBy: {
            order: 'asc',
          },
          select: {
            id: true,
            title: true,
            description: true,
            order: true,
            tasks: {
              select: {
                id: true,
                question: true,
                options: true,
                correctAnswer: true,
              },
            },
          },
        },
        blocks: {
          orderBy: {
            order: 'asc',
          },
          select: {
            id: true,
            title: true,
            content: true,
            order: true,
            test: {
              select: {
                id: true,
                title: true,
                description: true,
                passingScore: true,
                questions: {
                  select: {
                    id: true,
                    question: true,
                    options: {
                      select: {
                        id: true,
                        text: true,
                        isCorrect: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return course as CourseWithDetails | null;
  }

  async deleteCourse(id: string, userId: string) {
    const course = await prisma.course.findUnique({
      where: { id },
    });

    if (!course) {
      throw ApiError.NotFound('Курс не найден');
    }

    if (course.authorId !== userId) {
      throw ApiError.Forbidden('Нет прав для удаления этого курса');
    }

    await prisma.course.delete({
      where: { id },
    });
  }

  async getFavoriteCourses(userId: string) {
    return prisma.course.findMany({
      where: {
        favoritedBy: {
          some: {
            userId,
          },
        },
      },
      include: {
        author: {
          select: {
            id: true,
            email: true,
            fullname: true,
          },
        },
        sections: {
          orderBy: {
            order: 'asc',
          },
          select: {
            id: true,
            title: true,
            description: true,
            order: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async addToFavorites(courseId: string, userId: string) {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw ApiError.NotFound('Курс не найден');
    }

    await prisma.favoriteCourse.create({
      data: {
        courseId,
        userId,
      },
    });
  }

  async removeFromFavorites(courseId: string, userId: string) {
    const favorite = await prisma.favoriteCourse.findFirst({
      where: {
        courseId,
        userId,
      },
    });

    if (!favorite) {
      throw ApiError.NotFound('Курс не найден в избранном');
    }

    await prisma.favoriteCourse.delete({
      where: {
        userId_courseId: {
          userId,
          courseId,
        },
      },
    });
  }
}
