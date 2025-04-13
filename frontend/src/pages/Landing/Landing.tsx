import { AuthModalType, useAuthModal } from '@/features/Auth';
import { Menu } from '@/widgets/Menu';
import { api } from '@/shared/api';
import { Button, Typography, Layout, Space, Card, Row, Col } from 'antd';
import classes from './Landing.module.scss';

const { Title, Paragraph, Text } = Typography;
const { Content, Footer } = Layout;

export const Landing = () => {
  const { openAuthModal } = useAuthModal();

  const handleClick = () => {
    openAuthModal(AuthModalType.LOGIN);
  };

  return (
    <Layout>
      <Menu />
      <Content>
        <Row
          justify="space-between"
          align="middle"
          style={{ width: '100%' }}
          className={classes.hero}
          gutter={[32, 32]}
        >
          <Col xs={24} md={12}>
            <Space direction="vertical" size="large">
              <Title level={1}>Открой новые горизонты знаний</Title>
              <Paragraph>
                Skill Horizon — это онлайн-платформа для обучения и тестирования
                знаний. Развивай навыки, проходи курсы и проверяй свои знания в
                интерактивном формате.
              </Paragraph>
              <Button type="primary" size="large" onClick={handleClick}>
                Начать обучение
              </Button>
            </Space>
          </Col>
          <Col xs={24} md={12}>
            <div className={classes.heroImage} />
          </Col>
        </Row>

        <section id="features">
          <Title level={2} style={{ textAlign: 'center' }}>
            Особенности
          </Title>
          <Row gutter={[32, 32]} justify="center">
            <Col xs={24} sm={8}>
              <Card hoverable>
                <Title level={3}>Интерактивное обучение</Title>
                <Text>
                  Практические задания и тесты для закрепления знаний.
                </Text>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card hoverable>
                <Title level={3}>Адаптивные курсы</Title>
                <Text>
                  Программа, подстраивающаяся под ваш уровень подготовки.
                </Text>
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card hoverable>
                <Title level={3}>Система достижений</Title>
                <Text>
                  Получай баллы, сертификаты и делись успехами с друзьями.
                </Text>
              </Card>
            </Col>
          </Row>
        </section>

        {/* Курсы */}
        <section id="courses">
          <Title level={2} style={{ textAlign: 'center' }}>
            Популярные курсы
          </Title>
          <Row gutter={[32, 32]} justify="center">
            {['Основы программирования', 'Веб-разработка', 'Анализ данных'].map(
              (course) => (
                <Col xs={24} sm={8} key={course}>
                  <Card
                    hoverable
                    actions={[
                      <Button
                        type="primary"
                        onClick={async () => {
                          try {
                            const response = await api.post(
                              '/certificates/generate',
                              {
                                email: 'test@example.com',
                                courseName: course,
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
                            console.error(
                              'Ошибка при получении сертификата:',
                              error,
                            );
                          }
                        }}
                      >
                        Получить сертификат
                      </Button>,
                    ]}
                  >
                    <Card.Meta title={course} />
                  </Card>
                </Col>
              ),
            )}
          </Row>
        </section>

        {/* Тестирование */}
        <section id="test" style={{ textAlign: 'center' }}>
          <Space direction="vertical" size="large">
            <Title level={2}>Проверь свои знания</Title>
            <Paragraph>
              Пройди тест и получи мгновенную обратную связь по результатам.
            </Paragraph>
            <Button type="primary" size="large">
              Пройти тест
            </Button>
          </Space>
        </section>
      </Content>

      {/* Footer */}
      <Footer style={{ textAlign: 'center' }}>
        <Space direction="vertical" size="small">
          <Text>
            &copy; {new Date().getFullYear()} Skill Horizon. Все права защищены.
          </Text>
          <Space split={<Text type="secondary">|</Text>}>
            <Button type="link" href="#features">
              Особенности
            </Button>
            <Button type="link" href="#courses">
              Курсы
            </Button>
            <Button type="link" href="#test">
              Тестирование
            </Button>
            <Button type="link" href="#contact">
              Контакты
            </Button>
          </Space>
        </Space>
      </Footer>
    </Layout>
  );
};
