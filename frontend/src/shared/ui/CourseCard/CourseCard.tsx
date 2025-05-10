import React from 'react';
import {
  Card,
  Typography,
  Button,
  Space,
  Tooltip,
  message,
  Tag,
  Popconfirm,
} from 'antd';
import {
  HeartOutlined,
  HeartFilled,
  DeleteOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/Auth';
import { Course } from '@/shared/service/CourseService/types';
import { courseService } from '@/shared/service/CourseService';
import { CoverPlaceholder } from './CoverPlaceholder';
import styles from './CourseCard.module.scss';
import { useUser } from '@/entities/User';

const { Title, Text } = Typography;

interface CourseCardProps {
  course: Course;
  onDelete?: (courseId: string) => void;
  onToggleFavorite?: (courseId: string) => void;
  isFavorite?: boolean;
}

export const CourseCard = ({
  course,
  onDelete,
  onToggleFavorite,
  isFavorite = false,
}: CourseCardProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const user = useUser();
  const [isLoading, setIsLoading] = React.useState(false);

  const isAuthor = user?.id === course.authorId;
  const isAdmin = user?.role === 'ADMIN';
  const canDelete = isAuthor || isAdmin;

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      message.warning(
        'Пожалуйста, войдите в систему, чтобы добавить курс в избранное',
      );
      return;
    }

    try {
      setIsLoading(true);
      onToggleFavorite?.(course.id);
    } catch {
      message.error('Произошла ошибка при обновлении избранного');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await courseService.deleteCourse(course.id);
      message.success('Курс успешно удален');
      onDelete?.(course.id);
    } catch {
      message.error('Ошибка при удалении курса');
    }
  };

  return (
    <Card
      hoverable
      className={styles.courseCard}
      style={{ maxWidth: '300px' }}
      cover={
        <div
          className={styles.coverContainer}
          onClick={() => navigate(`/courses/${course.id}`)}
        >
          {course.coverImage ? (
            <img
              alt={course.title}
              src={course.coverImage}
              className={styles.coverImage}
            />
          ) : (
            <CoverPlaceholder />
          )}
        </div>
      }
      actions={[
        <Button
          key="favorite"
          type="text"
          icon={
            isFavorite ? (
              <HeartFilled style={{ color: '#ff4d4f' }} />
            ) : (
              <HeartOutlined />
            )
          }
          onClick={handleFavoriteClick}
          loading={isLoading}
        />,
        canDelete && (
          <Popconfirm
            key="delete"
            title="Удалить курс?"
            description="Это действие нельзя будет отменить"
            onConfirm={handleDelete}
            okText="Да"
            cancelText="Нет"
          >
            <Button type="text" danger icon={<DeleteOutlined />} />
          </Popconfirm>
        ),
      ].filter(Boolean)}
    >
      <Card.Meta
        title={
          <Title
            level={4}
            className={styles.title}
            onClick={() => navigate(`/courses/${course.id}`)}
          >
            {course.title}
          </Title>
        }
        description={
          <Space direction="vertical" size={4} className={styles.meta}>
            <Tooltip title={course.author.fullname}>
              <Text className={styles.author}>
                <UserOutlined /> {course.author.fullname}
              </Text>
            </Tooltip>
            <Space>
              <Tag color="blue">{course.category}</Tag>
              <Tag color="green">{course.level}</Tag>
            </Space>
          </Space>
        }
      />
    </Card>
  );
};
