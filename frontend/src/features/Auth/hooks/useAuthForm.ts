import { AuthFormData } from '../model/types';
import { AuthModalType } from '../model/modalType';
import { authSchema } from '../model/validation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const useAuthForm = (type: AuthModalType) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema(type)),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: type === AuthModalType.REGISTRATION ? '' : undefined,
    },
  });

  const onSubmit = (data: AuthFormData) => {
    console.log('Форма успешно отправлена:', data);
  };

  return { control, handleSubmit, errors, onSubmit, reset };
};
