import { ProfileInfoTab } from '@/widgets/ProfileInfoTab';
import { SecurityTab } from '@/widgets/SecurityTab';
import { SettingsTab } from '@/widgets/SettingsTab';
import {
  UserOutlined,
  SettingOutlined,
  SafetyCertificateOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { AchievementsTab } from '@/widgets/AchievementsTab';

export const tabs = [
  {
    key: 'profile',
    icon: <UserOutlined />,
    label: 'Профиль',
  },
  {
    key: 'achievements',
    icon: <TrophyOutlined />,
    label: 'Достижения',
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
  achievements: <AchievementsTab />,
  settings: <SettingsTab />,
  security: <SecurityTab />,
} as const;
