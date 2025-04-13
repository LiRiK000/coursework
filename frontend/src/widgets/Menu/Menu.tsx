import { Profile } from '@/shared/ui/Profile';
import { links } from './constants';
import classes from './Menu.module.scss';
import { Button, Typography } from 'antd';
import { useAuth } from '@/features/Auth/hooks/useAuth';
import { FC } from 'react';
import { AuthModalType, useAuthModal } from '@/features/Auth';

interface MenuProps {
  showMenuItems?: boolean;
}

export const Menu: FC<MenuProps> = ({ showMenuItems = true }) => {
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
      {showMenuItems && (
        <nav>
          {links.map((link) => (
            <Typography.Link
              href={link.href}
              className={classes.linkItem}
              key={link.href}
            >
              {link.label}
            </Typography.Link>
          ))}
        </nav>
      )}
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
