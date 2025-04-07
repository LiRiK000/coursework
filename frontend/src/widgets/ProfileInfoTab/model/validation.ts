import { z } from 'zod';

export const profileSchema = z.object({
  fullname: z
    .string()
    .min(2, 'Имя должно быть не менее 2 символов')
    .max(80, 'Имя должно быть не более 80 символов'),
  email: z
    .string()
    .email('Введите корректный email')
    .min(5, 'Email должен быть не менее 5 символов')
    .max(50, 'Email должен быть не более 50 символов'),
  avatar: z
    .instanceof(File)
    .optional()
    .refine((file) => {
      if (!file) return true;
      return file.type.startsWith('image/');
    }, 'Можно загружать только изображения'),
});

export type ProfileFormData = z.infer<typeof profileSchema>;
