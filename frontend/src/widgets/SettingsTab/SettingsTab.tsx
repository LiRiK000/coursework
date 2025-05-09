import { Typography, Switch } from 'antd';

export const SettingsTab = () => {
  return (
    <div>
      <Typography.Title level={2}>Настройки</Typography.Title>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Typography.Text>Темная тема</Typography.Text>
        <Switch checkedChildren="Вкл" unCheckedChildren="Выкл" />
      </div>
    </div>
  );
};
