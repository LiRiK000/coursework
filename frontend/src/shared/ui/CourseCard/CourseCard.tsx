import React from 'react';
import {
  Card,
  Typography,
  Button,
  Space,
  Tooltip,
  Tag,
  Popconfirm,
} from 'antd';
import {
  DeleteOutlined,
  UserOutlined,
  StarOutlined,
  StarFilled,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/Auth';
import { Course } from '@/shared/service/CourseService/types';
import { CoverPlaceholder } from './CoverPlaceholder';
import styles from './CourseCard.module.scss';
import { useUser } from '@/entities/User';

const { Title, Text } = Typography;

interface CourseCardProps {
  course: Course;
  isFavorite: boolean;
  onToggleFavorite: (courseId: string) => Promise<void>;
  onDelete?: (courseId: string) => Promise<void>;
}

export const CourseCard = ({
  course,
  isFavorite,
  onToggleFavorite,
  onDelete,
}: CourseCardProps) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const user = useUser();

  const isAuthor = user?.id === course.authorId;
  const isAdmin = user?.role === 'ADMIN';
  const canDelete = isAuthor || isAdmin;

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      return;
    }
    await onToggleFavorite(course.id);
  };

  console.log(course.coverImage);

  return (
    <Card
      hoverable
      className={styles.card}
      style={{ maxWidth: '300px' }}
      cover={
        <div
          className={styles.coverContainer}
          onClick={() => navigate(`/courses/${course.id}`)}
        >
          {course.coverImage ? (
            <img
              alt={course.title}
              src={`http://localhost:3001${course.coverImage}`}
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
              <StarFilled style={{ color: 'yellow' }} />
            ) : (
              <StarOutlined />
            )
          }
          onClick={handleFavoriteClick}
        />,
        canDelete && onDelete && (
          <Popconfirm
            key="delete"
            title="Удалить курс?"
            description="Это действие нельзя будет отменить"
            onConfirm={() => onDelete(course.id)}
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
