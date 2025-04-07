import { UserOutlined, SettingOutlined, HeartFilled } from '@ant-design/icons';

export const tabs = [
  {
    key: 'profile',
    icon: <UserOutlined />,
    label: 'Все курсы',
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: 'Настройки',
  },
  {
    key: 'security',
    icon: <HeartFilled />,
    label: 'Избранное',
  },
];

export const TAB_COMPONENTS = {
  profile: <></>,
  settings: <></>,
  security: <></>,
} as const;
