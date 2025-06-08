import { RequestHandler } from 'express';
import { prisma } from '../lib/prisma';
import { CustomError } from '../shared/errors/CustomError';

class FavoriteController {
  toggleFavorite: RequestHandler = async (req, res) => {
    const { courseId } = req.params;
    const userId = req.user.id;

    try {
      const existingFavorite = await prisma.favoriteCourse.findUnique({
        where: {
          userId_courseId: {
            userId,
            courseId,
          },
        },
      });

      if (existingFavorite) {
        await prisma.favoriteCourse.delete({
          where: {
            userId_courseId: {
              userId,
              courseId,
            },
          },
        });
        res.json({ status: 'success', data: { isFavorite: false } });
        return;
      }

      await prisma.favoriteCourse.create({
        data: {
          userId,
          courseId,
        },
      });

      res.json({ status: 'success', data: { isFavorite: true } });
    } catch (error) {
      throw new CustomError('Ошибка при обновлении избранного', 500);
    }
  };

  getFavoriteCourses: RequestHandler = async (req, res) => {
    const userId = req.user.id;

    try {
      const favoriteCourses = await prisma.course.findMany({
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
            select: {
              id: true,
              title: true,
              courseId: true,
            },
          },
        },
      });

      const coursesWithFavoriteStatus = favoriteCourses.map((course) => ({
        ...course,
        isFavorite: true,
      }));

      res.json({ status: 'success', data: coursesWithFavoriteStatus });
    } catch (error) {
      throw new CustomError('Ошибка при получении избранных курсов', 500);
    }
  };
}

export const favoriteController = new FavoriteController();
