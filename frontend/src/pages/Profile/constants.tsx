import { ProfileInfoTab } from '@/widgets/ProfileInfoTab';
import { SecurityTab } from '@/widgets/SecurityTab';
import { SettingsTab } from '@/widgets/SettingsTab';
import {
  UserOutlined,
  SettingOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';

export const tabs = [
  {
    key: 'profile',
    icon: <UserOutlined />,
    label: 'Профиль',
  },
  {
    key: 'settings',
    icon: <SettingOutlined />,
    label: 'Настройки',
  },
  {
    key: 'security',
    icon: <SafetyCertificateOutlined />,
    label: 'Безопасность',
  },
];

export const TAB_COMPONENTS = {
  profile: <ProfileInfoTab />,
  settings: <SettingsTab />,
  security: <SecurityTab />,
} as const;
