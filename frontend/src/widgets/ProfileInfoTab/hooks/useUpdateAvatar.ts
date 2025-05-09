import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { UserProfile, userService } from '@/shared/service/UserService';
import { useUser } from '@/entities/User';
import type { UploadFile } from 'antd/es/upload/interface';
import { useState } from 'react';

export const useUpdateAvatar = () => {
  const { setUser, email, fullname, id, role } = useUser();
  const queryClient = useQueryClient();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const uploadAvatarMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('avatar', file);

      const response = await userService.uploadAvatar(file);
      return response;
    },
    onSuccess: (avatarUrl: string) => {
      const newUserData: UserProfile = {
        email,
        fullname,
        id,
        role,
        avatar: avatarUrl,
      };
      setUser(newUserData);
      setFileList([
        {
          uid: '-1',
          name: 'avatar',
          status: 'done',
          url: avatarUrl,
        },
      ]);
      message.success('Аватар успешно обновлен');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: () => {
      message.error('Ошибка при загрузке аватара');
    },
  });

  const handleAvatarUpload = (file: File) => {
    if (!file.type.startsWith('image/')) {
      message.error('Пожалуйста, загрузите изображение');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      message.error('Размер файла не должен превышать 5MB');
      return;
    }

    uploadAvatarMutation.mutate(file);
  };

  return {
    handleAvatarUpload,
    isUploading: uploadAvatarMutation.isPending,
    fileList,
    setFileList,
  };
};
