import {
  Card,
  Row,
  Col,
  Statistic,
  List,
  Typography,
  Progress,
  message,
} from 'antd';
import {
  UserOutlined,
  FileTextOutlined,
  TeamOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import { useAdminDashboard } from '../../hooks/useAdminDashboard';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import styles from './AdminDashboard.module.scss';
import { calculateUserGrowthPercentage } from '../../utils/calculateGrowthPercentage';

dayjs.locale('ru');

const { Text, Link } = Typography;

export const AdminDashboard = () => {
  const { stats, isLoading, error } = useAdminDashboard();
  const navigate = useNavigate();

  if (error) {
    message.error('Ошибка при загрузке статистики');
  }

  const userGrowthPercentage = calculateUserGrowthPercentage(stats);

  return (
    <div className={styles.container}>
      <Row justify="end" style={{ marginBottom: '16px', marginRight: '16px' }}>
        <Col>
          <Link onClick={() => navigate('/main')} className={styles.link}>
            <HomeOutlined style={{ marginRight: '4px' }} />
            На главную
          </Link>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className={styles.statsRow}>
        <Col span={8}>
          <Card loading={isLoading} className={styles.statsCard}>
            <Statistic
              title="Всего пользователей"
              value={stats?.totalUsers ?? 0}
              prefix={<UserOutlined />}
            />
            <div className={styles.growthText}>
              <Text type="secondary">Рост за месяц: </Text>
              <Text
                strong
                style={{
                  color: userGrowthPercentage >= 0 ? '#52c41a' : '#ff4d4f',
                }}
              >
                {userGrowthPercentage >= 0 ? '+' : ''}
                {userGrowthPercentage.toFixed(1)}%
              </Text>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card loading={isLoading} className={styles.statsCard}>
            <Statistic
              title="Активных авторов"
              value={stats?.activeAuthors ?? 0}
              prefix={<TeamOutlined />}
            />
            <Progress
              percent={
                stats ? (stats.activeAuthors / stats.totalUsers) * 100 : 0
              }
              size="small"
              className={styles.progress}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card loading={isLoading} className={styles.statsCard}>
            <Statistic
              title="Опубликованных курсов"
              value={stats?.publishedCourses ?? 0}
              prefix={<FileTextOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className={styles.coursesRow}>
        <Col span={12}>
          <Card title="Последние добавленные курсы" loading={isLoading}>
            <List
              dataSource={stats?.recentCourses ?? []}
              renderItem={(course) => (
                <List.Item>
                  <List.Item.Meta
                    title={course.title}
                    description={`Добавлен: ${dayjs(course.createdAt).format(
                      'D MMMM YYYY',
                    )}`}
                  />
                  <Text type="secondary">
                    кол-во блоков - {course.blocks.length}
                  </Text>
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card title="Популярные курсы" loading={isLoading}>
            <List
              dataSource={stats?.popularCourses ?? []}
              renderItem={(course) => (
                <List.Item>
                  <List.Item.Meta
                    title={course.title}
                    description={`кол-во блоков - ${course.blocks.length}`}
                  />
                  <Progress
                    percent={
                      stats
                        ? (course.blocks.length / stats.totalUsers) * 100
                        : 0
                    }
                    size="small"
                    className={styles.courseProgress}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};
