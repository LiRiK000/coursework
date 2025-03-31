import { z } from 'zod';
import { authSchema } from './validation';
import { Control, FieldErrors } from 'react-hook-form';

export type AuthFormData = z.infer<ReturnType<typeof authSchema>>;

export type FieldErrorType = FieldErrors<{
  username: string;
  password: string;
  confirmPassword?: string | undefined;
}>;

export type ControlType = Control<
  {
    username: string;
    password: string;
    confirmPassword?: string | undefined;
  },
  // Здесь это допустимо, т.к. это поле -- контекст формы. Таким образом, unknown здесь — это просто универсальный тип для отсутствующего контекста.
  unknown,
  {
    username: string;
    password: string;
    confirmPassword?: string | undefined;
  }
>;
