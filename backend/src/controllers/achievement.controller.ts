import { Request, Response } from 'express';
import { achievementService } from '../services/achievement.service';
import { CustomError } from '../shared/errors/CustomError';

export const achievementController = {
  async getAchievements(req: Request, res: Response) {
    try {
      const achievements = await achievementService.getUserAchievements(
        req.user.id,
      );
      res.json(achievements);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError('Ошибка получения достижений', 500);
    }
  },

  async checkAchievements(req: Request, res: Response) {
    try {
      const { courseId } = req.body;

      if (
        await achievementService.checkCourseCompletion(req.user.id, courseId)
      ) {
        await achievementService.awardAchievement(
          req.user.id,
          'COURSE_COMPLETION',
        );
      }

      const achievements = await achievementService.getUserAchievements(
        req.user.id,
      );
      res.json(achievements);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw new CustomError('Ошибка проверки достижений', 500);
    }
  },
};
