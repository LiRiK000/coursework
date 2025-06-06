import { Layout, Menu } from 'antd';
import { Menu as NavBar } from '@/widgets/Menu';
import { useState } from 'react';
import classes from './Main.module.scss';
import { useTabs } from './constants';
import { TabContentSwitcher } from './TabContentSwitcher';

const { Content, Sider } = Layout;

export const Main = () => {
  const [selectedKey, setSelectedKey] = useState('all-courses');
  const tabs = useTabs();

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
        <NavBar />
        <TabContentSwitcher selectedKey={selectedKey} />
      </Content>
    </Layout>
  );
};
