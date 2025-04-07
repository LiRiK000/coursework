import { useThemeStore } from '@/shared/lib/theme/store/useThemeStore';
import { Typography, Switch } from 'antd';

export const SettingsTab = () => {
  const { mode, toggleTheme } = useThemeStore();

  return (
    <div>
      <Typography.Title level={4}>Настройки</Typography.Title>

      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Typography.Text>Темная тема</Typography.Text>
        <Switch
          checked={mode === 'dark'}
          onChange={toggleTheme}
          checkedChildren="Вкл"
          unCheckedChildren="Выкл"
        />
      </div>
    </div>
  );
};
