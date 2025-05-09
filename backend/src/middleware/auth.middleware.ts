import { NextFunction, Request, Response } from 'express';

import { AppError } from './error.middleware';
import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

interface JwtPayload {
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      user: User;
    }
  }
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Получаем токен из куков
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken && !refreshToken) {
      throw new AppError('Не предоставлены токены авторизации', 401);
    }

    try {
      // Пробуем верифицировать access token
      const decoded = jwt.verify(
        accessToken,
        process.env.JWT_SECRET as string,
      ) as { id: string };

      // Проверяем существование пользователя
      const user = await prisma.user.findUnique({
        where: { id: decoded.id },
      });

      if (!user) {
        throw new AppError('Пользователь не найден', 401);
      }

      // Добавляем пользователя в объект запроса
      req.user = user;
      next();
    } catch (error) {
      // Если access token истек или недействителен, пробуем обновить токены
      if (
        error instanceof jwt.TokenExpiredError ||
        error instanceof jwt.JsonWebTokenError
      ) {
        if (!refreshToken) {
          throw new AppError('Не предоставлен refresh token', 401);
        }

        try {
          // Проверяем refresh token
          const decoded = jwt.verify(
            refreshToken,
            process.env.JWT_REFRESH_SECRET as string,
          ) as { id: string };

          // Находим пользователя и проверяем refresh token
          const user = await prisma.user.findUnique({
            where: { id: decoded.id },
          });

          if (!user || user.refreshToken !== refreshToken) {
            throw new AppError('Недействительный refresh token', 401);
          }

          // Генерируем новые токены
          const newAccessToken = jwt.sign(
            { id: user.id },
            process.env.JWT_SECRET as string,
            { expiresIn: '15m' },
          );

          const newRefreshToken = jwt.sign(
            { id: user.id },
            process.env.JWT_REFRESH_SECRET as string,
            { expiresIn: '7d' },
          );

          // Обновляем refresh token в базе данных
          await prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: newRefreshToken },
          });

          // Устанавливаем новые куки
          const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict' as const,
            path: '/',
          };

          res.cookie('accessToken', newAccessToken, {
            ...cookieOptions,
            maxAge: 15 * 60 * 1000, // 15 минут
          });

          res.cookie('refreshToken', newRefreshToken, {
            ...cookieOptions,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
          });

          // Добавляем пользователя в объект запроса
          req.user = user;
          next();
        } catch (refreshError) {
          throw new AppError('Недействительный refresh token', 401);
        }
      } else {
        throw error;
      }
    }
  } catch (error) {
    next(error);
  }
};

export const restrictTo = (...allowedRoles: string[][]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user?.role || '';

    // Проверяем, есть ли у пользователя хотя бы одна из разрешенных ролей
    const hasAccess = allowedRoles.some((roles) =>
      roles.some((role) => role === userRole),
    );

    if (!hasAccess) {
      return next(
        new AppError('У вас нет прав для выполнения этого действия', 403),
      );
    }
    next();
  };
};
