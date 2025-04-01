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
      user?: User;
    }
  }
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Получаем токен из заголовка
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer')) {
      throw new AppError('Не предоставлен токен авторизации', 401);
    }

    const token = authHeader.split(' ')[1];

    // Верифицируем токен
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;

    // Проверяем существование пользователя
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });
    if (!user) {
      throw new AppError('Пользователь с данным токеном не найден', 401);
    }

    // Добавляем пользователя в объект запроса
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      next(new AppError('Срок действия токена истек', 401));
    } else if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError('Недействительный токен', 401));
    } else {
      next(error);
    }
  }
};

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || '')) {
      return next(
        new AppError('У вас нет прав для выполнения этого действия', 403),
      );
    }
    next();
  };
};
