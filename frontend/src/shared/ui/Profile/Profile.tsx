import { Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import classes from './Profile.module.scss';
import { Loader } from '../Loader';
import { userService } from '@/shared/service/UserService';
import { UserOutlined } from '@ant-design/icons';

export const Profile = () => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: userService.getProfile,
  });
  if (isLoading) return <Loader />;
  return (
    <Avatar
      className={classes.profile}
      src={user?.avatar}
      alt="user"
      icon={<UserOutlined />}
      onClick={() => navigate('/me')}
    />
  );
};
