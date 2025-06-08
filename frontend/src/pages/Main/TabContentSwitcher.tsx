import { NotFoundTab } from '@/widgets/NotFoundTab';
import { TAB_COMPONENTS } from './constants';

interface TabContentSwitcherProps {
  selectedKey: string;
}

export const TabContentSwitcher = ({
  selectedKey,
}: TabContentSwitcherProps) => {
  switch (selectedKey) {
    case 'all-courses':
      return TAB_COMPONENTS['all-courses'];
    case 'favorites':
      return TAB_COMPONENTS.favorites;
    case 'my-courses':
      return TAB_COMPONENTS['my-courses'];
    case 'create-course':
      return TAB_COMPONENTS['create-course'];
    default:
      return <NotFoundTab />;
  }
};
