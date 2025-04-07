import { Typography, Card, Space } from 'antd';
import { ChangePasswordForm } from './ui/ChangePasswordForm/ChangePasswordForm';

export const SecurityTab = () => {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Typography.Title level={4}>Информация профиля</Typography.Title>

      <Card title="Изменение пароля">
        <ChangePasswordForm />
      </Card>
    </Space>
  );
};
