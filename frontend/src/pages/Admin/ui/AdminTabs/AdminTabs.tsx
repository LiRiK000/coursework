import { Tabs } from 'antd';
import { AuthorshipRequests } from '../AuthorshipRequests/AuthorshipRequests';
import { AdminDashboard } from '../AdminDashboard/AdminDashboard';

export const AdminTabs = () => {
  return (
    <Tabs
      defaultActiveKey="1"
      items={[
        {
          key: '1',
          label: 'Основное',
          children: <AdminDashboard />,
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
