import { Controller } from 'react-hook-form';
import { Form, Input, Button, Upload, Spin } from 'antd';
import { UserOutlined, MailOutlined, UploadOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useProfileForm } from '../../hooks/useProfileForm';

export const EditProfileForm = () => {
  const {
    control,
    handleSubmit,
    errors,
    loading,
    fileList,
    setFileList,
    onSubmit,
    fetchProfile,
  } = useProfileForm();

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <Form onFinish={handleSubmit(onSubmit)}>
      <Form.Item
        label="Полное имя"
        validateStatus={errors.fullname ? 'error' : ''}
        help={errors.fullname?.message}
      >
        <Controller
          name="fullname"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              prefix={<UserOutlined />}
              placeholder="Введите ваше полное имя"
              allowClear
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Email"
        validateStatus={errors.email ? 'error' : ''}
        help={errors.email?.message}
      >
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              prefix={<MailOutlined />}
              placeholder="Введите ваш email"
              allowClear
            />
          )}
        />
      </Form.Item>

      <Form.Item
        label="Аватар"
        validateStatus={errors.avatar ? 'error' : ''}
        help={errors.avatar?.message}
      >
        <Controller
          name="avatar"
          control={control}
          render={({ field: { onChange, ...field } }) => (
            <Upload
              {...field}
              maxCount={1}
              fileList={fileList}
              onChange={({ fileList, file }) => {
                setFileList(fileList);
                if (file instanceof File) {
                  onChange(file);
                }
              }}
              beforeUpload={(file) => {
                const isImage = file.type.startsWith('image/');
                if (!isImage) {
                  onChange(undefined);
                }
                return false;
              }}
            >
              <Button icon={<UploadOutlined />}>Загрузить аватар</Button>
            </Upload>
          )}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Сохранить изменения
        </Button>
      </Form.Item>
    </Form>
  );
};
