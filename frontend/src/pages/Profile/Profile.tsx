import { Layout, Menu, message } from 'antd';
import { useState } from 'react';
import classes from './Profile.module.scss';
import { tabs } from './constants';
import { TabContentSwitcher } from './TabContentSwitcher.tsx';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '@/pages/Profile/hooks/useLogoutMutation';
import { useUser } from '@/entities/User';
import { useAuthorship } from './hooks/useAuthorship.ts';
import { SiderFooter } from './components/SiderFooter/SiderFooter.tsx';

const { Content, Sider } = Layout;

export const Profile = () => {
  const [selectedKey, setSelectedKey] = useState('profile');
  const navigate = useNavigate();
  const { role } = useUser();

  const logoutMutation = useLogoutMutation();
  const { userRequest, createRequest } = useAuthorship();
  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      navigate('/');
    } catch (error) {
      message.error('Ошибка при выходе из системы');
      console.error(error);
    }
  };

  return (
    <Layout className={classes.layout}>
      <Sider className={classes.sider} width={200}>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={tabs}
          onClick={({ key }) => setSelectedKey(key)}
          className={classes.menu}
        />
        <SiderFooter
          role={role}
          userRequest={userRequest}
          createRequest={createRequest}
          onLogout={handleLogout}
        />
      </Sider>
      <Content className={classes.content}>
        <TabContentSwitcher selectedKey={selectedKey} />
      </Content>
    </Layout>
  );
};
