import { AuthorshipRequest } from '@/shared/service/AuthorshipService/types.ts';
import { USER_ROLES } from '@/shared/service/UserService';
import classes from './SiderFooter.module.scss';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

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
  const onBack = () => {
    navigate(-1);
  };
  return (
    <div className={classes.siderFooter}>
      <Button variant="solid" color="primary" block onClick={onBack}>
        Назад
      </Button>

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
      <Button variant="solid" color="danger" block onClick={onLogout}>
        Выйти
      </Button>
    </div>
  );
};
