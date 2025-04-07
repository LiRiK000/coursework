import { Button, Layout, Menu, message } from 'antd';
import { useState } from 'react';
import classes from './Profile.module.scss';
import { tabs } from './constants';
import { TabContentSwitcher } from './TabContentSwitcher';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '@/pages/Profile/hooks/useLogoutMutation';

const { Content, Sider } = Layout;

export const Profile = () => {
  const [selectedKey, setSelectedKey] = useState('profile');
  const navigate = useNavigate();

  const logoutMutation = useLogoutMutation();

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
        <div className={classes.siderFooter}>
          <Button type="primary" block onClick={handleLogout}>
            Выйти
          </Button>
          <Button type="default" block>
            Хочу стать автором
          </Button>
        </div>
      </Sider>
      <Content className={classes.content}>
        <TabContentSwitcher selectedKey={selectedKey} />
      </Content>
    </Layout>
  );
};
