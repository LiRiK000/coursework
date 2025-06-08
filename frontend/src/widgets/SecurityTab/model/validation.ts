import { z } from 'zod';

export const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, 'Введите текущий пароль'),
    newPassword: z.string().min(6, 'Пароль должен быть не менее 6 символов'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type PasswordFormData = z.infer<typeof passwordSchema>;
