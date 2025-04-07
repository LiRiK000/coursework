import { NextFunction, Request, Response } from 'express';

import { AppError } from '../middleware/error.middleware';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

const signAccessToken = (id: string): string => {
  console.log(process.env.JWT_SECRET);
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '15m', // 15 минут
  });
};

const signRefreshToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: '7d', // 7 дней
  });
};

const createSendTokens = async (
  user: any,
  statusCode: number,
  res: Response,
) => {
  const accessToken = signAccessToken(user.id);
  const refreshToken = signRefreshToken(user.id);

  // Сохраняем refresh token в базе данных
  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  // Настройка куков
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/',
  };

  // Установка куков
  res.cookie('accessToken', accessToken, {
    ...cookieOptions,
    maxAge: 15 * 60 * 1000, // 15 минут
  });

  res.cookie('refreshToken', refreshToken, {
    ...cookieOptions,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
  });

  res.status(statusCode).json({
    status: 'success',
    data: {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    },
  });
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password, fullname } = req.body;

    // Проверяем, существует ли пользователь
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new AppError('Пользователь с таким email уже существует', 400);
    }

    if (!fullname) {
      throw new AppError('Необходимо указать полное имя', 400);
    }

    // Хешируем пароль
    const hashedPassword = await bcrypt.hash(password, 12);

    // Создаем нового пользователя
    const user = await prisma.user.create({
      data: {
        email,
        fullname,
        password: hashedPassword,
      },
    });

    // Генерируем токены и отправляем ответ
    await createSendTokens(user, 201, res);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    // Проверяем, существует ли пользователь
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError('Неверный email или пароль', 401);
    }

    // Проверяем пароль
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new AppError('Неверный email или пароль', 401);
    }

    // Генерируем токены и отправляем ответ
    await createSendTokens(user, 200, res);
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // Получаем ID пользователя из req.user (должен быть установлен middleware)
    const userId = (req as any).user?.id;

    if (userId) {
      // Очищаем refreshToken в базе данных
      await prisma.user.update({
        where: { id: userId },
        data: { refreshToken: null },
      });
    }

    // Очищаем куки
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');

    res.status(200).json({
      status: 'success',
      message: 'Выход выполнен успешно',
    });
  } catch (error) {
    next(error);
  }
};

export const refreshTokens = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      console.log(123);

      throw new AppError('Не предоставлен refresh token', 400);
    }

    // Проверяем валидность refresh token
    const decoded = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET as string,
    ) as { id: string };

    // Находим пользователя и проверяем refresh token
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user || user.refreshToken !== refreshToken) {
      console.log(123);

      throw new AppError('Недействительный refresh token', 400);
    }

    // Генерируем новые токены
    await createSendTokens(user, 200, res);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      next(new AppError('Недействительный refresh token', 400));
    } else {
      next(error);
    }
  }
};

export const getMe = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user?.id },
    });

    if (!user) {
      throw new AppError('Пользователь не найден', 404);
    }

    res.status(200).json({
      status: 'success',
      data: {
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};
