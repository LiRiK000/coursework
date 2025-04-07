import { Request, Response } from 'express';
import { progressService } from '../services/progress.service';
import { CustomError } from '../shared/errors/CustomError';
import { prisma } from '../lib/prisma';

export const progressController = {
  async validateAnswer(req: Request, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
      });

      if (!user) {
        throw new CustomError('Пользователь не найден', 404);
      }

      const isValid = await progressService.validateAnswer(
        req.body.taskId,
        req.body.answer,
      );

      if (isValid) {
        await progressService.updateProgress(req.user.id, req.body.sectionId);
      }

      res.json({ correct: isValid });
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError('Ошибка проверки ответа', 500);
    }
  },

  async getProgress(req: Request, res: Response) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: req.user.id },
      });

      if (!user) {
        throw new CustomError('Пользователь не найден', 404);
      }

      const progress = await progressService.getSectionProgress(
        req.user.id,
        req.params.courseId,
      );
      res.json(progress);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError('Ошибка получения прогресса', 500);
    }
  },
};
