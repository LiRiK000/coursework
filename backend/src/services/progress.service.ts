import { PrismaClient } from '@prisma/client';
import { CustomError } from '../shared/errors/CustomError';

const prisma = new PrismaClient();

export const progressService = {
  async validateAnswer(taskId: string, answer: string) {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
      select: { correctAnswer: true, sectionId: true },
    });

    if (!task) throw new CustomError('Задание не найдено', 404);
    return task.correctAnswer === answer;
  },

  async updateProgress(userId: string, sectionId: string) {
    const [progress, section] = await Promise.all([
      prisma.progressTracking.findUnique({
        where: { userId_sectionId: { userId, sectionId } },
      }),
      prisma.section.findUnique({
        where: { id: sectionId },
        include: { tasks: true },
      }),
    ]);

    if (!section) throw new CustomError('Раздел не найден', 404);

    const totalTasks = section.tasks.length;
    const newCompletion = Math.min(
      (progress?.completionStatus || 0) + 100 / totalTasks,
      100,
    );

    const updatedProgress = await prisma.progressTracking.upsert({
      where: { userId_sectionId: { userId, sectionId } },
      create: {
        userId,
        sectionId,
        completionStatus: newCompletion,
        completedAt: newCompletion >= 100 ? new Date() : null,
      },
      update: {
        completionStatus: newCompletion,
        completedAt: newCompletion >= 100 ? new Date() : null,
      },
    });

    return updatedProgress;
  },

  async getSectionProgress(userId: string, courseId: string) {
    return prisma.progressTracking.findMany({
      where: {
        section: { courseId },
        userId,
      },
      include: { section: true },
    });
  },
};
