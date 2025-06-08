import { AuthModalType, useAuth, useAuthModal } from '@/features/Auth';
import { Menu } from '@/widgets/Menu';
import {
  Button,
  Typography,
  Layout,
  Space,
  Card,
  Row,
  Col,
  Collapse,
} from 'antd';
import classes from './Landing.module.scss';
import { faqItems, features } from './constants';
import { useNavigate } from 'react-router-dom';

const { Title, Paragraph, Text } = Typography;
const { Content } = Layout;
const { Panel } = Collapse;

export const Landing = () => {
  const { openAuthModal } = useAuthModal();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleStartLearning = () => {
    if (isAuthenticated) {
      navigate('/main');
    } else {
      openAuthModal(AuthModalType.LOGIN);
    }
  };

  return (
    <Layout className={classes.layout}>
      <Menu />
      <Content>
        <Row
          justify="space-between"
          align="middle"
          className={classes.hero}
          gutter={[32, 32]}
        >
          <Col xs={24} md={12}>
            <Space
              direction="vertical"
              size="large"
              className={classes.heroContent}
            >
              <Title level={1} className={classes.heroTitle}>
                Открой новые горизонты знаний
              </Title>
              <Paragraph className={classes.heroDescription}>
                Skill Horizon — это инновационная платформа для обучения, где
                каждый урок — это шаг к новым возможностям. Развивайте навыки,
                которые действительно нужны в современном мире.
              </Paragraph>
              <Button
                type="primary"
                size="large"
                onClick={handleStartLearning}
                className={classes.ctaButton}
              >
                {isAuthenticated ? 'На главную' : 'Начать обучение'}
              </Button>
            </Space>
          </Col>
          <Col xs={24} md={12}>
            <div className={classes.heroImage} />
          </Col>
        </Row>

        <section id="features" className={classes.section}>
          <Title level={2} className={classes.sectionTitle}>
            Почему выбирают нас
          </Title>
          <Row gutter={[32, 32]} justify="center">
            {features.map((feature, index) => (
              <Col xs={24} sm={8} key={index}>
                <Card hoverable className={classes.featureCard}>
                  <div className={classes.featureIcon}>{feature.icon}</div>
                  <Title level={3}>{feature.title}</Title>
                  <Text>{feature.description}</Text>
                </Card>
              </Col>
            ))}
          </Row>
        </section>

        <section id="faq" className={classes.section}>
          <Title level={2} className={classes.sectionTitle}>
            Часто задаваемые вопросы
          </Title>
          <Row justify="center">
            <Col xs={24} md={16}>
              <Collapse
                bordered={false}
                className={classes.faqCollapse}
                expandIconPosition="end"
              >
                {faqItems.map((item, index) => (
                  <Panel header={item.question} key={index}>
                    <Paragraph>{item.answer}</Paragraph>
                  </Panel>
                ))}
              </Collapse>
            </Col>
          </Row>
        </section>
      </Content>
    </Layout>
  );
};
