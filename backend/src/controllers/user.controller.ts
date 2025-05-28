import { NextFunction, Request, Response } from 'express';
import { AppError } from '../middleware/error.middleware';
import bcrypt from 'bcryptjs';
import { prisma } from '../lib/prisma';

interface RequestWithUser extends Request {
  file?: Express.Multer.File;
}

export const getProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      throw new AppError('Пользователь не авторизован', 401);
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        fullname: true,
        role: true,
        avatar: true,
      },
    });

    if (user && user.avatar && !user.avatar.startsWith('http')) {
      const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001';
      user.avatar = `${SERVER_URL}${user.avatar}`;
    }

    if (!user) {
      throw new AppError('Пользователь не найден', 404);
    }

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateAvatar = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      throw new AppError('Пользователь не авторизован', 401);
    }

    if (!req.file) {
      throw new AppError('Файл аватара не предоставлен', 400);
    }

    const avatarUrl = `/uploads/avatars/${req.file.filename}`;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { avatar: avatarUrl },
      select: {
        id: true,
        email: true,
        fullname: true,
        role: true,
        avatar: true,
      },
    });

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const resetAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      throw new AppError('Пользователь не авторизован', 401);
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { avatar: null },
      select: {
        id: true,
        email: true,
        fullname: true,
        role: true,
        avatar: true,
      },
    });

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { fullname, email } = req.body;

    if (!fullname && !email && !req.file) {
      throw new AppError('Нет данных для обновления', 400);
    }

    const userId = req.user?.id;

    if (!userId) {
      throw new AppError('Пользователь не авторизован', 401);
    }

    // Проверяем, не занят ли email другим пользователем
    if (email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          email,
          id: { not: userId },
        },
      });

      if (existingUser) {
        throw new AppError('Этот email уже используется', 400);
      }
    }

    // Подготавливаем данные для обновления
    const updateData: any = {};
    const SERVER_URL = process.env.SERVER_URL;
    if (fullname) updateData.fullname = fullname;
    if (email) updateData.email = email;
    if (req.file) {
      //FIXME: При обновлении SERVER URL все сломается
      const avatarUrl = `${SERVER_URL}/uploads/avatars/${req.file.filename}`;
      updateData.avatar = avatarUrl;
    }

    // Обновляем профиль пользователя
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        fullname: true,
        role: true,
      },
    });

    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updatePassword = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      throw new AppError('Пользователь не авторизован', 401);
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
      throw new AppError('Неверный текущий пароль', 400);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedPassword,
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'Пароль успешно обновлен',
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        fullname: true,
        role: true,
        avatar: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    // Добавляем полный URL для аватаров
    const SERVER_URL = process.env.SERVER_URL || 'http://localhost:3001';
    const usersWithFullAvatarUrl = users.map(user => ({
      ...user,
      avatar: user.avatar && !user.avatar.startsWith('http')
        ? `${SERVER_URL}${user.avatar}`
        : user.avatar,
    }));

    res.status(200).json({
      status: 'success',
      data: {
        users: usersWithFullAvatarUrl,
      },
    });
  } catch (error) {
    next(error);
  }
};
