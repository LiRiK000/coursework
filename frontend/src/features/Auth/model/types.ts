import { authSchema } from './validation';
import { z } from 'zod';

export type AuthFormData = z.infer<ReturnType<typeof authSchema>>;

export enum AuthModalType {
  LOGIN = 'login',
  REGISTRATION = 'registration',
}
