import { Button, Layout, Menu, message } from 'antd';
import { useState } from 'react';
import classes from './Profile.module.scss';
import { tabs } from './constants';
import { TabContentSwitcher } from './TabContentSwitcher.tsx';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '@/pages/Profile/hooks/useLogoutMutation';
import { authorshipService } from '@/shared/service/AuthorshipService';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useUser } from '@/entities/User';
import { USER_ROLES } from '@/shared/service/UserService';

const { Content, Sider } = Layout;

export const Profile = () => {
  const [selectedKey, setSelectedKey] = useState('profile');
  const navigate = useNavigate();
  const { role } = useUser();

  const logoutMutation = useLogoutMutation();

  const { data: userRequest } = useQuery({
    queryKey: ['user-request'],
    queryFn: authorshipService.getUserRequest,
  });

  const { mutate: createRequest } = useMutation({
    mutationFn: authorshipService.createRequest,
    onSuccess: () => {
      message.success('Ваша заявка будет рассмотрена');
    },
    onError: () => {
      message.error('Произошла ошибка при отправке заявки');
    },
  });

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
          {role !== USER_ROLES.AUTHOR && (
            <Button
              type="primary"
              onClick={() => createRequest()}
              block
              disabled={!!userRequest}
            >
              {userRequest ? 'Заявка на рассмотрении' : 'Хочу стать автором'}
            </Button>
          )}
          <Button variant="solid" color="danger" block onClick={handleLogout}>
            Выйти
          </Button>
        </div>
      </Sider>
      <Content className={classes.content}>
        <TabContentSwitcher selectedKey={selectedKey} />
      </Content>
    </Layout>
  );
};
