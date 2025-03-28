import * as classes from './Landing.module.scss';

export const Landing = () => {
  return (
    <div className={classes.container}>
      {/* Header */}
      <header className={classes.header}>
        <div className={classes.logo}>Skill Horizon</div>
        <nav className={classes.nav}>
          <a href="#features">Особенности</a>
          <a href="#courses">Курсы</a>
          <a href="#test">Тестирование</a>
          <a href="#contact">Контакты</a>
        </nav>
        <button className={classes.signIn}>Войти</button>
      </header>

      {/* Hero Section */}
      <section className={classes.hero}>
        <div className={classes.heroContent}>
          <h1>Открой новые горизонты знаний</h1>
          <p>
            Skill Horizon — это онлайн-платформа для обучения и тестирования
            знаний. Развивай навыки, проходи курсы и проверяй свои знания в
            интерактивном формате.
          </p>
          <button className={classes.getStarted}>Начать обучение</button>
        </div>
        <div className={classes.heroImage}>
          {/* Можно вставить изображение или иллюстрацию */}
        </div>
      </section>

      {/* Особенности */}
      <section id="features" className={classes.features}>
        <h2>Особенности</h2>
        <div className={classes.featureList}>
          <div className={classes.featureItem}>
            <h3>Интерактивное обучение</h3>
            <p>Практические задания и тесты для закрепления знаний.</p>
          </div>
          <div className={classes.featureItem}>
            <h3>Адаптивные курсы</h3>
            <p>Программа, подстраивающаяся под ваш уровень подготовки.</p>
          </div>
          <div className={classes.featureItem}>
            <h3>Система достижений</h3>
            <p>Получай баллы, сертификаты и делись успехами с друзьями.</p>
          </div>
        </div>
      </section>

      {/* Курсы */}
      <section id="courses" className={classes.courses}>
        <h2>Популярные курсы</h2>
        <div className={classes.courseList}>
          <div className={classes.courseItem}>Основы программирования</div>
          <div className={classes.courseItem}>Веб-разработка</div>
          <div className={classes.courseItem}>Анализ данных</div>
        </div>
      </section>

      {/* Тестирование */}
      <section id="test" className={classes.test}>
        <h2>Проверь свои знания</h2>
        <p>Пройди тест и получи мгновенную обратную связь по результатам.</p>
        <button className={classes.startTest}>Пройти тест</button>
      </section>

      {/* Footer */}
      <footer id="contact" className={classes.footer}>
        <p>
          &copy; {new Date().getFullYear()} Skill Horizon. Все права защищены.
        </p>
        <div className={classes.footerNav}>
          <a href="#features">Особенности</a>
          <a href="#courses">Курсы</a>
          <a href="#test">Тестирование</a>
          <a href="#contact">Контакты</a>
        </div>
      </footer>
    </div>
  );
};
