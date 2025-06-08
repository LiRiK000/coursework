import { Layout } from 'antd';
import classes from './Admin.module.scss';
import { AdminTabs } from './ui/AdminTabs/AdminTabs';

const { Content } = Layout;

export const Admin = () => {
  return (
    <Layout className={classes.layout}>
      <Content className={classes.content}>
        <h1>Административная панель</h1>
        <AdminTabs />
      </Content>
    </Layout>
  );
};
