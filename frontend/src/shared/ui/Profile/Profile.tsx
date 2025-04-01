import { Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';
import classes from './Profile.module.scss';

export const Profile = () => {
  const navigate = useNavigate();
  return (
    <Avatar
      className={classes.profile}
      alt="user"
      onClick={() => navigate('/me')}
      icon
    />
  );
};
