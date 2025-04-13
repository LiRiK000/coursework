import { FC } from 'react';
import { Layout, Menu } from 'antd';
import { Menu as NavBar } from '@/widgets/Menu';
import { useState } from 'react';
import classes from './MainLayout.module.scss';
import { tabs } from './constants';

const { Content, Sider } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const [selectedKey, setSelectedKey] = useState('profile');

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
      </Sider>
      <Content className={classes.content}>
        {/* <TabContentSwitcher selectedKey={selectedKey} /> */}
        <NavBar showMenuItems={false} />
        {children}
      </Content>
    </Layout>
  );
};
