import { z } from 'zod';
import { AuthModalType } from './types';

export const authSchema = (type: AuthModalType) =>
  z
    .object({
      email: z
        .string()
        .email('Введите корректный email')
        .min(5, 'Email должен быть не менее 5 символов'),
      fullname:
        type === AuthModalType.REGISTRATION
          ? z.string().min(8, 'Имя должно быть не менее 8 символов')
          : z.literal('').optional(),
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
