import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from '@/shared/api/api';
import { useState } from 'react';
import { message } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import { ProfileFormData, profileSchema } from '../model/validation';

export const useProfileForm = () => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullname: '',
      email: '',
    },
  });

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await api.get('/users/profile');
      const { fullname, email } = response.data.data.user;

      reset({ fullname, email });

      // if (avatarUrl) {
      //   setFileList([
      //     {
      //       uid: '-1',
      //       name: 'avatar',
      //       status: 'done',
      //       url: avatarUrl,
      //     },
      //   ]);
      // }
    } catch (error) {
      message.error('Ошибка при загрузке данных профиля');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append('fullname', data.fullname);
      formData.append('email', data.email);

      if (data.avatar) {
        formData.append('avatar', data.avatar);
      }

      await api.patch('/users/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      message.success('Профиль успешно обновлен');
    } catch (error) {
      message.error('Ошибка при обновлении профиля');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    control,
    handleSubmit,
    errors,
    loading,
    fileList,
    setFileList,
    setValue,
    onSubmit,
    fetchProfile,
  };
};
