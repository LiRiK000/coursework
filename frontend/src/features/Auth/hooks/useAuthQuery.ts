import { AuthModalType } from '../model/modalType';
import { useAuth } from '../api/auth';
import { useAuthForm } from './useAuthForm';
import { useAuthModal } from './useAuthModal';

export const useAuthQuery = (type: AuthModalType) => {
  const { closeAuthModal } = useAuthModal();
  const { login, register, isLoading, error } = useAuth();
  const { control, handleSubmit, errors, reset } = useAuthForm(type);

  const onSubmit = async (data: {
    email: string;
    password: string;
    confirmPassword?: string;
  }) => {
    try {
      if (type === AuthModalType.LOGIN) {
        login({ email: data.email, password: data.password });
      } else {
        register(data);
      }
      reset();
      closeAuthModal();
    } catch (error) {
      console.error('Ошибка авторизации:', error);
    }
  };

  return {
    control,
    handleSubmit: handleSubmit((data) => onSubmit(data)),
    errors,
    isLoading,
    error,
  };
};
