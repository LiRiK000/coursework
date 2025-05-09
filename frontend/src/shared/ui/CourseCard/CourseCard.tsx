import React from 'react';
import { Card, Typography, Button, Space, Tooltip, message } from 'antd';
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
  onDelete?: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onDelete }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const user = useUser();
  const [isFavorite, setIsFavorite] = React.useState(course.isFavorite);
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
      const newFavoriteStatus = await courseService.toggleFavorite(course.id);
      setIsFavorite(newFavoriteStatus);
      message.success(
        newFavoriteStatus
          ? 'Курс добавлен в избранное'
          : 'Курс удален из избранного',
      );
    } catch {
      message.error('Произошла ошибка при обновлении избранного');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await courseService.deleteCourse(course.id);
      message.success('Курс успешно удален');
      onDelete?.();
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
          <Button
            key="delete"
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={handleDelete}
          />
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
          </Space>
        }
      />
    </Card>
  );
};
