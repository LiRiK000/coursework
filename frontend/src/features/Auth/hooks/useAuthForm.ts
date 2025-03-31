import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthFormData } from '../model/types';
import { authSchema } from '../model/validation';
import { AuthModalType } from '../model/modalType';

export const useAuthForm = (type: AuthModalType) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema(type)),
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: type === AuthModalType.REGISTRATION ? '' : undefined,
    },
  });

  const onSubmit = (data: AuthFormData) => {
    console.log('Форма успешно отправлена:', data);
  };

  return { control, handleSubmit, errors, onSubmit };
};
