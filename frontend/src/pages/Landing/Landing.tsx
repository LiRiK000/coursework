import { AuthModalType, useAuthModal } from '@/features/Auth';
import classes from './Landing.module.scss';
import { Menu } from '@/widgets/Menu';
import axios from 'axios';
import { api } from '@/shared/api';

export const Landing = () => {
  const { openAuthModal } = useAuthModal();

  const handleClick = () => {
    openAuthModal(AuthModalType.LOGIN);
  };

  return (
    <div className={classes.container}>
      <Menu />
      {/* Hero Section */}
      <section className={classes.hero}>
        <div className={classes.heroContent}>
          <h1>Открой новые горизонты знаний</h1>
          <p>
            Skill Horizon — это онлайн-платформа для обучения и тестирования
            знаний. Развивай навыки, проходи курсы и проверяй свои знания в
            интерактивном формате.
          </p>
          <button className={classes.getStarted} onClick={handleClick}>
            Начать обучение
          </button>
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

      {/* Курсы убрать потом */}
      <section id="courses" className={classes.courses}>
        <h2>Популярные курсы</h2>
        <div className={classes.courseList}>
          <div className={classes.courseItem}>
            <div>Основы программирования</div>
            <button
              className={classes.getCertificate}
              onClick={async () => {
                try {
                  const response = await axios.post(
                    'http://localhost:3000/api/certificates/generate',
                    {
                      email: 'test@example.com',
                      courseName: 'Основы программирования',
                    },
                    {
                      responseType: 'blob',
                      withCredentials: true,
                    },
                  );

                  const url = window.URL.createObjectURL(
                    new Blob([response.data]),
                  );
                  const link = document.createElement('a');
                  link.href = url;
                  link.setAttribute('download', 'certificate.pdf');
                  document.body.appendChild(link);
                  link.click();
                  link.remove();
                } catch (error) {
                  console.error('Ошибка при получении сертификата:', error);
                  alert('Ошибка при получении сертификата');
                }
              }}
            >
              Получить сертификат
            </button>
          </div>
          <div className={classes.courseItem}>
            <div>Веб-разработка</div>
            <button
              className={classes.getCertificate}
              onClick={async () => {
                try {
                  const response = await axios.post(
                    'http://localhost:3000/api/certificates/generate',
                    {
                      email: 'test@example.com',
                      courseName: 'Веб-разработка',
                    },
                    {
                      responseType: 'blob',
                      withCredentials: true,
                    },
                  );

                  const url = window.URL.createObjectURL(
                    new Blob([response.data]),
                  );
                  const link = document.createElement('a');
                  link.href = url;
                  link.setAttribute('download', 'certificate.pdf');
                  document.body.appendChild(link);
                  link.click();
                  link.remove();
                } catch (error) {
                  console.error('Ошибка при получении сертификата:', error);
                  alert('Ошибка при получении сертификата');
                }
              }}
            >
              Получить сертификат
            </button>
          </div>
          <div className={classes.courseItem}>
            <div>Анализ данных</div>
            <button
              className={classes.getCertificate}
              onClick={async () => {
                try {
                  const response = await api.post(
                    '/certificates/generate',
                    {
                      email: 'test@example.com',
                      courseName: 'Анализ данных',
                    },
                    {
                      responseType: 'blob',
                      withCredentials: true,
                    },
                  );

                  const url = window.URL.createObjectURL(
                    new Blob([response.data]),
                  );
                  const link = document.createElement('a');
                  link.href = url;
                  link.setAttribute('download', 'certificate.pdf');
                  document.body.appendChild(link);
                  link.click();
                  link.remove();
                } catch (error) {
                  console.error('Ошибка при получении сертификата:', error);
                  alert('Ошибка при получении сертификата');
                }
              }}
            >
              Получить сертификат
            </button>
          </div>
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
