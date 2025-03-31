import { z } from 'zod';
import { AuthModalType } from './modalType';

export const authSchema = (type: AuthModalType) =>
  z
    .object({
      username: z
        .string()
        .min(3, 'Имя пользователя должно быть не менее 3 символов'),
      password: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
      confirmPassword:
        type === AuthModalType.REGISTRATION
          ? z.string().min(6, 'Пароль должен быть не менее 6 символов')
          : z.literal('').optional(),
    })
    .refine(
      (data) =>
        data.password === data.confirmPassword || type === AuthModalType.LOGIN,
      {
        message: 'Пароли не совпадают',
        path: ['confirmPassword'],
      },
    );
