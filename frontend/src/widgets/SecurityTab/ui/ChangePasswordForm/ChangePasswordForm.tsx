import { Button, Input, message } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@/shared/api';
import { PasswordFormData, passwordSchema } from '../../model/validation';

export const ChangePasswordForm = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data: PasswordFormData) => {
    try {
      await api.patch('/users/password', {
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });
      reset();
      message.success('Пароль успешно изменен');
    } catch (error) {
      message.error('Ошибка при изменении пароля');
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}
    >
      <Controller
        name="currentPassword"
        control={control}
        render={({ field }) => (
          <Input.Password placeholder="Повторите текущий пароль" {...field} />
        )}
      />

      <Controller
        name="newPassword"
        control={control}
        render={({ field }) => (
          <Input.Password placeholder="Повторите новый пароль" {...field} />
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        render={({ field }) => (
          <Input.Password placeholder="Повторите новый пароль" {...field} />
        )}
      />

      <Button type="primary" htmlType="submit" loading={isSubmitting} block>
        Изменить пароль
      </Button>
    </form>
  );
};
