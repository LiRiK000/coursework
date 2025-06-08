import { prisma } from '../lib/prisma';
import { ApiError } from '../lib/ApiError';
import { Prisma } from '@prisma/client';
import {
  CreateCourseDto,
  CourseWithDetails,
  CourseBlock,
} from '../types/course.types';
import { achievementService } from './achievement.service';

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

  async getCourseForLearning(courseId: string, userId: string) {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        author: {
          select: {
            id: true,
            fullname: true,
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
                    options: {
                      select: {
                        id: true,
                        text: true,
                      },
                    },
                  },
                },
              },
            },
            CompletionStatus: {
              where: {
                userId,
              },
            },
          },
        },
        CompletionStatus: {
          where: {
            userId,
          },
        },
      },
    });

    if (!course) {
      throw ApiError.NotFound('Курс не найден');
    }

    const courseStarted = course.CompletionStatus.length > 0;

    if (!courseStarted) {
      await this.startCourse(courseId, userId);
    }

    return {
      ...course,
      blocks: course.blocks.map((block) => ({
        ...block,
        isCompleted:
          block.CompletionStatus.length > 0 &&
          block.CompletionStatus[0].isCompleted,
        isAvailable: this.isBlockAvailable(block, course.blocks, userId),
        CompletionStatus: undefined,
      })),
      CompletionStatus: undefined,
    };
  }

  private isBlockAvailable(
    currentBlock: any,
    allBlocks: any[],
    userId: string,
  ): boolean {
    if (currentBlock.order === 0) return true;

    const prevBlock = allBlocks.find((b) => b.order === currentBlock.order - 1);

    if (!prevBlock) return true;

    return (
      prevBlock.CompletionStatus.length > 0 &&
      prevBlock.CompletionStatus[0].isCompleted
    );
  }

  async startCourse(courseId: string, userId: string) {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    if (!course) {
      throw ApiError.NotFound('Курс не найден');
    }

    await prisma.completionStatus.create({
      data: {
        userId,
        courseId,
        isCompleted: false,
      },
    });

    return { message: 'Курс начат' };
  }

  async completeBlock(blockId: string, userId: string) {
    const block = await prisma.block.findUnique({
      where: { id: blockId },
      include: {
        course: true,
        test: true,
      },
    });

    if (!block) {
      throw ApiError.NotFound('Блок не найден');
    }

    if (block.test) {
      const testCompleted = await prisma.completionStatus.findFirst({
        where: {
          userId,
          blockId,
          isCompleted: true,
        },
      });

      if (!testCompleted) {
        throw ApiError.BadRequest(
          'Необходимо пройти тест для завершения блока',
        );
      }
    }

    const existingStatus = await prisma.completionStatus.findFirst({
      where: {
        userId,
        courseId: block.courseId,
        blockId,
        taskId: null,
      },
    });

    if (existingStatus) {
      await prisma.completionStatus.update({
        where: { id: existingStatus.id },
        data: { isCompleted: true },
      });
    } else {
      await prisma.completionStatus.create({
        data: {
          userId,
          courseId: block.courseId,
          blockId,
          taskId: null,
          isCompleted: true,
        },
      });
    }

    const completionResult = await this.checkCourseCompletion(
      block.courseId,
      userId,
    );

    return {
      message: 'Блок завершен',
      courseCompleted: completionResult?.isCompleted || false,
    };
  }

  async submitTest(
    testId: string,
    answers: Array<{ questionId: string; optionId: string }>,
    userId: string,
  ) {
    const test = await prisma.test.findUnique({
      where: { id: testId },
      include: {
        block: true,
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    if (!test) {
      throw ApiError.NotFound('Тест не найден');
    }

    let correctAnswers = 0;
    const totalQuestions = test.questions.length;
    const results = [];

    for (const answer of answers) {
      const question = test.questions.find((q) => q.id === answer.questionId);
      if (!question) continue;

      const selectedOption = question.options.find(
        (o) => o.id === answer.optionId,
      );
      if (!selectedOption) continue;

      const isCorrect = selectedOption.isCorrect;
      if (isCorrect) correctAnswers++;

      results.push({
        questionId: question.id,
        isCorrect,
        correctOption: question.options.find((o) => o.isCorrect)?.id,
      });
    }

    const percentage = (correctAnswers / totalQuestions) * 100;
    const isPassed = percentage >= test.passingScore;

    if (isPassed) {
      const existingStatus = await prisma.completionStatus.findFirst({
        where: {
          userId,
          courseId: test.block.courseId,
          blockId: test.block.id,
          taskId: null,
        },
      });

      if (existingStatus) {
        await prisma.completionStatus.update({
          where: { id: existingStatus.id },
          data: { isCompleted: true },
        });
      } else {
        await prisma.completionStatus.create({
          data: {
            userId,
            courseId: test.block.courseId,
            blockId: test.block.id,
            taskId: null,
            isCompleted: true,
          },
        });
      }

      if (correctAnswers === totalQuestions) {
        await achievementService.awardAchievement(userId, 'COURSE_COMPLETION');
      }
    }

    return {
      isPassed,
      score: percentage,
      correctAnswers,
      totalQuestions,
      passingScore: test.passingScore,
      results,
    };
  }

  async getCourseProgress(courseId: string, userId: string) {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        blocks: {
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    if (!course) {
      throw ApiError.NotFound('Курс не найден');
    }

    const completionStatuses = await prisma.completionStatus.findMany({
      where: {
        userId,
        courseId,
      },
    });

    const totalBlocks = course.blocks.length;
    const completedBlocks = completionStatuses.filter(
      (status) => status.blockId && status.isCompleted,
    );

    const percentage =
      totalBlocks > 0 ? (completedBlocks.length / totalBlocks) * 100 : 0;

    return {
      courseId,
      totalBlocks,
      completedBlocks,
      percentage,
      isCompleted: completionStatuses.some(
        (status) =>
          (status.blockId === '' || status.blockId === null) &&
          (status.taskId === '' || status.taskId === null) &&
          status.isCompleted,
      ),
    };
  }

  private async checkCourseCompletion(courseId: string, userId: string) {
    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        blocks: true,
      },
    });

    if (!course) return null;

    const blockCompletionStatuses = await prisma.completionStatus.findMany({
      where: {
        userId,
        courseId,
        blockId: { not: null },
        isCompleted: true,
      },
    });

    const allBlocksCompleted = course.blocks.every((block) =>
      blockCompletionStatuses.some((status) => status.blockId === block.id),
    );

    if (allBlocksCompleted) {
      await prisma.completionStatus.deleteMany({
        where: {
          userId,
          courseId,
          blockId: null,
          taskId: null,
        },
      });

      await prisma.completionStatus.create({
        data: {
          userId,
          courseId,
          blockId: null,
          taskId: null,
          isCompleted: true,
        },
      });

      return {
        isCompleted: true,
        certificateUrl: `/api/certificates/${courseId}`,
        message: 'Поздравляем! Вы успешно завершили курс!',
      };
    }

    return {
      isCompleted: false,
      message: 'Продолжайте обучение!',
    };
  }

  async getCompletedCourses(userId: string) {
    try {
      const completedCourses = await prisma.course.findMany({
        where: {
          CompletionStatus: {
            some: {
              userId,
              blockId: null,
              taskId: null,
              isCompleted: true,
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
        },
        orderBy: {
          updatedAt: 'desc',
        },
      });

      return completedCourses;
    } catch (error) {
      console.error('Error in getCompletedCourses:', error);
      throw ApiError.Internal('Ошибка при получении списка завершенных курсов');
    }
  }
}

export const courseService = new CourseService();
