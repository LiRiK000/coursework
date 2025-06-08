import { NextFunction, Request, Response } from 'express';
import { PDFService } from '../services/pdf.service';
import { AppError } from '../middleware/error.middleware';
import { prisma } from '../lib/prisma';

export const generateCertificate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { courseId } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      throw new AppError('Пользователь не авторизован', 401);
    }

    // Проверяем, завершил ли пользователь курс
    const completionStatus = await prisma.completionStatus.findFirst({
      where: {
        userId,
        courseId,
        blockId: null,
        taskId: null,
        isCompleted: true,
      },
    });

    if (!completionStatus) {
      throw new AppError('Курс не завершен', 400);
    }

    // Получаем информацию о курсе и пользователе
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!course || !user) {
      throw new AppError('Курс или пользователь не найден', 404);
    }

    const certificateData = {
      email: user.email,
      courseName: course.title,
      fullname: user.fullname,
      completionDate: new Date(),
    };

    await PDFService.generateCertificate(res, certificateData);
  } catch (error) {
    next(error);
  }
};
