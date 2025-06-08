import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import classes from './NotAllowed.module.scss';

export const NotAllowed: FC = () => {
  const navigate = useNavigate();

  const handleBackToMain = () => {
    navigate('/');
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Доступ запрещен</h1>
      <p className={classes.description}>
        У вас недостаточно прав для доступа к этой странице
      </p>
      <button onClick={handleBackToMain} className={classes.button}>
        Вернуться на главную
      </button>
    </div>
  );
};
