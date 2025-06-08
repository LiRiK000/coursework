import { Profile } from '@/shared/ui/Profile';
import classes from './Menu.module.scss';
import { Button, Typography } from 'antd';
import { useAuth } from '@/features/Auth/hooks/useAuth';
import { FC } from 'react';
import { AuthModalType, useAuthModal } from '@/features/Auth';

export const Menu: FC = () => {
  const { isAuthenticated } = useAuth();
  const { openAuthModal } = useAuthModal();

  const handleClick = () => {
    openAuthModal(AuthModalType.LOGIN);
  };

  return (
    <header className={classes.header}>
      <div>
        <Typography.Link className={classes.logo} href="/">
          Skill Horizon
        </Typography.Link>
      </div>
      {!isAuthenticated ? (
        <Button type="primary" onClick={handleClick}>
          Войти
        </Button>
      ) : (
        <Profile />
      )}
    </header>
  );
};
