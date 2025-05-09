import { NotFoundTab } from '@/widgets/NotFoundTab';
import { TAB_COMPONENTS } from './constants';

interface TabContentSwitcherProps {
  selectedKey: string;
}

export const TabContentSwitcher = ({
  selectedKey,
}: TabContentSwitcherProps) => {
  switch (selectedKey) {
    case 'profile':
      return TAB_COMPONENTS.profile;
    case 'achievements':
      return TAB_COMPONENTS.achievements;
    case 'settings':
      return TAB_COMPONENTS.settings;
    case 'security':
      return TAB_COMPONENTS.security;
    default:
      return <NotFoundTab />;
  }
};
