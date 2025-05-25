import { useParams, useNavigate } from 'react-router-dom';
import { useFetchCourseData } from './api/useFetchCourseData';
import {
  Typography,
  Card,
  Tag,
  Space,
  Button,
  Alert,
  Row,
  Col,
  Divider,
} from 'antd';
import {
  BookOutlined,
  FileTextOutlined,
  StarOutlined,
  StarFilled,
  HomeOutlined,
} from '@ant-design/icons';
import { Loader } from '@/shared/ui/Loader';
import { courseService } from '@/shared/service/CourseService';
import { useState } from 'react';

const { Title, Text, Paragraph } = Typography;

export const CoursePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, error, isFavorite } = useFetchCourseData(id!);

  const [isFavoritedCourse, setIsFavoritedCourse] = useState(isFavorite);

  const handleFavoriteToggle = async () => {
    await courseService.toggleFavorite(id!);
    setIsFavoritedCourse(!isFavoritedCourse);
  };

  if (isLoading) return <Loader fullscreen />;

  if (error)
    return (
      <Alert
        message="Ошибка"
        description={error.message}
        type="error"
        showIcon
      />
    );

  if (!data)
    return (
      <Alert
        message="Ошибка"
        description="Курс не найден"
        type="error"
        showIcon
      />
    );

  const course = data.course;

  return (
    <div style={{ margin: 'auto', padding: '24px' }}>
      <Space style={{ marginBottom: '16px' }}>
        <Button icon={<HomeOutlined />} onClick={() => navigate('/main')}>
          На главную
        </Button>
      </Space>

      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Title level={2}>{course.title}</Title>
            <Space size="middle" wrap>
              <Tag color="blue" icon={<BookOutlined />}>
                Автор: {course.author.fullname}
              </Tag>
              <Tag color="green">Уровень: {course.level}</Tag>
              <Tag color="purple">Категория: {course.category}</Tag>
            </Space>
            <Paragraph style={{ marginTop: 16 }}>
              {course.description}
            </Paragraph>
          </div>

          <Divider />

          <Row gutter={24}>
            <Col span={16}>
              <Card title="Содержание курса" variant="borderless">
                <Space
                  direction="vertical"
                  size="large"
                  style={{ width: '100%' }}
                >
                  {course.blocks.map((block) => (
                    <Card
                      key={block.id}
                      size="small"
                      style={{ marginBottom: 16 }}
                    >
                      <Title level={4}>{block.title}</Title>
                      <Space direction="vertical" style={{ width: '100%' }}>
                        <Card size="small">
                          <Space>
                            <FileTextOutlined />
                            <Text>Теоретический материал</Text>
                          </Space>
                        </Card>
                        <Card size="small">
                          <Space>
                            <FileTextOutlined />
                            <Text>Тест: {block.test.title}</Text>
                            <Text type="secondary">
                              {block.test.questions.length} вопросов
                            </Text>
                          </Space>
                        </Card>
                      </Space>
                    </Card>
                  ))}
                </Space>
              </Card>
            </Col>

            <Col span={8}>
              <Space direction="vertical" style={{ width: '100%' }}>
                <Card title="Информация о курсе" variant="borderless">
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <Text>
                      Создан: {new Date(course.createdAt).toLocaleDateString()}
                    </Text>
                    <Text>
                      Обновлен:{' '}
                      {new Date(course.updatedAt).toLocaleDateString()}
                    </Text>
                    <Text>Количество блоков: {course.blocks.length}</Text>
                  </Space>
                </Card>

                <Space direction="vertical" style={{ width: '100%' }}>
                  <Button 
                    type="primary" 
                    block 
                    size="large"
                    onClick={() => navigate(`/courses/${id}/learn`)}
                  >
                    Начать обучение
                  </Button>
                  <Button
                    icon={isFavoritedCourse ? <StarFilled /> : <StarOutlined />}
                    block
                    onClick={handleFavoriteToggle}
                  >
                    {isFavoritedCourse
                      ? 'Удалить из избранного'
                      : 'Добавить в избранное'}
                  </Button>
                </Space>
              </Space>
            </Col>
          </Row>
        </Space>
      </Card>
    </div>
  );
};
