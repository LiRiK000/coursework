import { ProfileInfoTab } from '@/widgets/ProfileInfoTab';
import { SecurityTab } from '@/widgets/SecurityTab';
import { CompletedCoursesTab } from '@/widgets/CompletedCoursesTab';
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
    key: 'completed-courses',
    icon: <SettingOutlined />,
    label: 'Пройденные курсы',
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
  completedCourses: <CompletedCoursesTab />,
  security: <SecurityTab />,
} as const;
