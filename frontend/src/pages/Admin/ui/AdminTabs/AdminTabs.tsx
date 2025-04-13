import { Tabs } from 'antd';
import { AuthorshipRequests } from '../AuthorshipRequests/AuthorshipRequests';

export const AdminTabs = () => {
  return (
    <Tabs
      defaultActiveKey="1"
      items={[
        {
          key: '1',
          label: 'Основное',
          children: 'Основной контент',
        },
        {
          key: '2',
          label: 'Заявки на авторство',
          children: <AuthorshipRequests />,
        },
      ]}
    />
  );
};
