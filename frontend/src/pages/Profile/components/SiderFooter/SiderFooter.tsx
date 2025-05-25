import { AuthorshipRequest } from '@/shared/service/AuthorshipService/types.ts';
import { USER_ROLES } from '@/shared/service/UserService';
import classes from './SiderFooter.module.scss';
import { Button, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';

export const SiderFooter = ({
  role,
  userRequest,
  createRequest,
  onLogout,
}: {
  role: string;
  userRequest?: AuthorshipRequest;
  createRequest: () => void;
  onLogout: () => void;
}) => {
  const navigate = useNavigate();

  return (
    <div className={classes.siderFooter}>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Button
          variant="solid"
          color="primary"
          icon={<HomeOutlined />}
          onClick={() => navigate('/main')}
          block
        >
          На главную
        </Button>

        {role === USER_ROLES.ADMIN ? (
          <Button
            variant="solid"
            color="primary"
            onClick={() => navigate('/admin')}
            block
          >
            Админ панель
          </Button>
        ) : (
          role !== USER_ROLES.AUTHOR && (
            <Button
              onClick={() => createRequest()}
              block
              disabled={!!userRequest}
            >
              {userRequest ? 'Заявка на рассмотрении' : 'Хочу стать автором'}
            </Button>
          )
        )}

        <Button variant="solid" color="danger" block onClick={onLogout}>
          Выйти
        </Button>
      </Space>
    </div>
  );
};
