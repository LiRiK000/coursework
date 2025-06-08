import { AllCoursesTab } from '@/widgets/AllCoursesTab';
import { CreateCourseTab } from '@/widgets/CreateCourseTab';
import {
  BookOutlined,
  HeartFilled,
  ReadOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import { useUser } from '@/entities/User';
import { FavoriteTab } from '@/widgets/FavoriteTab';
import { MyCoursesTab } from '@/widgets/MyCoursesTab';

export const useTabs = () => {
  const { role } = useUser();
  const hasRights = role === 'AUTHOR' || role === 'ADMIN';

  const tabs = [
    {
      key: 'all-courses',
      icon: <BookOutlined />,
      label: 'Все курсы',
    },
    {
      key: 'favorites',
      icon: <HeartFilled />,
      label: 'Избранное',
    },
    ...(hasRights
      ? [
          {
            key: 'my-courses',
            icon: <ReadOutlined />,
            label: 'Мои курсы',
          },
          {
            key: 'create-course',
            icon: <PlusCircleOutlined />,
            label: 'Создать курс',
          },
        ]
      : []),
  ];

  return tabs;
};

export const TAB_COMPONENTS = {
  'all-courses': <AllCoursesTab />,
  favorites: <FavoriteTab />,
  'my-courses': <MyCoursesTab />,
  'create-course': <CreateCourseTab />,
} as const;
