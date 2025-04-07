import { Control, FieldErrors } from 'react-hook-form';

import { authSchema } from './validation';
import { z } from 'zod';

export type AuthFormData = z.infer<ReturnType<typeof authSchema>>;

export type FieldErrorType = FieldErrors<{
  email: string;
  fullname?: string;
  password: string;
  confirmPassword?: string | undefined;
}>;

export type ControlType = Control<
  {
    email: string;
    fullname?: string;
    password: string;
    confirmPassword?: string | undefined;
  },
  // Здесь это допустимо, т.к. это поле -- контекст формы. Таким образом, unknown здесь — это просто универсальный тип для отсутствующего контекста.
  unknown,
  {
    email: string;
    fullname?: string;
    password: string;
    confirmPassword?: string | undefined;
  }
>;
