import { Typography, Card, Space } from 'antd';
import { EditProfileForm } from './ui/EditProfileForm/EditProfileForm';

export const ProfileInfoTab = () => {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Typography.Title level={4}>Информация профиля</Typography.Title>

      <Card title="Редактирование профиля">
        <EditProfileForm />
      </Card>
    </Space>
  );
};
