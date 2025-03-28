import { links } from './constants';
import * as classes from './Menu.module.scss';
import { Typography } from 'antd';

export const Menu = () => {
  // TODO useAuth
  return (
    <header className={classes.header}>
      <div>
        <Typography.Text className={classes.logo}>
          Skill Horizon
        </Typography.Text>
      </div>
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
      <button className={classes.signIn}>Войти</button>
    </header>
  );
};
