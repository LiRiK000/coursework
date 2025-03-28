import * as classes from './NotFound.module.scss';

export const NotFound = () => {
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <h1 className={classes.title}>404</h1>
        <p className={classes.subtitle}>Ой! Такой страницы не существует...</p>
        <a href="/" className={classes.homeLink}>
          Вернуться на главную
        </a>
      </div>
      <div className={classes.animation}>
        <div className={classes.shape}></div>
        <div className={classes.shape}></div>
        <div className={classes.shape}></div>
      </div>
    </div>
  );
};
