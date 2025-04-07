import { Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api';
import classes from './Profile.module.scss';
import { Loader } from '../Loader';

interface User {
  avatar: string | null;
}

const getProfile = async (): Promise<User> => {
  const response = await api.get('/users/profile');
  return response.data.data.user;
};

export const Profile = () => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useQuery<User>({
    queryKey: ['profile'],
    queryFn: getProfile,
  });
  if (isLoading) return <Loader />;
  return (
    <Avatar
      className={classes.profile}
      src={user?.avatar}
      alt="user"
      onClick={() => navigate('/me')}
    />
  );
};
