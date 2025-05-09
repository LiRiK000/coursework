import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { userService } from '@/shared/service/UserService';
import { useUser } from '@/entities/User';

type UpdateField = 'fullname' | 'email';

export const useUpdateProfile = () => {
  const { setUser, fullname, email } = useUser();
  const queryClient = useQueryClient();

  const updateUserMutation = useMutation({
    mutationFn: userService.updateUser,
    onSuccess: (updatedUser) => {
      setUser(updatedUser);
      message.success('Профиль успешно обновлен');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: () => {
      message.error('Ошибка при обновлении профиля');
    },
  });

  const handleUpdateUser = (field: UpdateField, value: string) => {
    const currentValue = field === 'fullname' ? fullname : email;

    if (currentValue === value) {
      return;
    }

    updateUserMutation.mutate({ [field]: value });
  };

  return {
    handleUpdateUser,
    isUpdating: updateUserMutation.isPending,
  };
};
