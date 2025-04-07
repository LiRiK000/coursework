import { AuthModalType } from '../Auth';
import { AuthFormData } from './model/types';

export const initialFormState: AuthFormData = {
  email: '',
  password: '',
  fullname: AuthModalType.REGISTRATION ? '' : undefined,
  confirmPassword: AuthModalType.REGISTRATION ? '' : undefined,
};
