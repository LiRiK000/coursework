import { Typography, Space, Button, message, Row, Tooltip } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { courseService } from '@/shared/service/CourseService';
import { Course } from '@/shared/service/CourseService/types';
import { Loader } from '@/shared/ui/Loader';
import { useNavigate } from 'react-router-dom';
import { ArrowRightOutlined, DownloadOutlined } from '@ant-design/icons';
import { AxiosError } from 'axios';
import { CourseCard } from '@/shared/ui/CourseCard';

interface ErrorResponse {
  message: string;
}

export const CompletedCoursesTab = () => {
  const navigate = useNavigate();

  const {
    data: courses,
    isLoading,
    error,
  } = useQuery<Course[], AxiosError<ErrorResponse>>({
    queryKey: ['completed-courses'],
    queryFn: () => courseService.getCompletedCourses(),
    retry: false,
  });

  if (isLoading) return <Loader />;

  if (error) {
    message.error(
      error.response?.data?.message || 'Ошибка при загрузке завершенных курсов',
    );
    return (
      <div>
        <Typography.Title level={2}>Пройденные курсы</Typography.Title>
        <Typography.Text type="danger">
          Не удалось загрузить список завершенных курсов. Пожалуйста, попробуйте
          позже.
        </Typography.Text>
      </div>
    );
  }

  return (
    <div>
      <Typography.Title level={2}>Пройденные курсы</Typography.Title>
      <Space direction="vertical" style={{ width: '100%' }}>
        {!courses || courses.length === 0 ? (
          <Typography.Text type="secondary">
            У вас пока нет пройденных курсов
          </Typography.Text>
        ) : (
          <Row gutter={[24, 24]} style={{ gap: '16px' }}>
            {courses.map((course: Course) => (
              <CourseCard
                key={course.id}
                course={course}
                customActions={[
                  <Tooltip key="certificate-tooltip" title="Скачать сертификат">
                    <Button
                      key="certificate"
                      type="text"
                      onClick={() =>
                        navigate(`/courses/${course.id}/congratulations`)
                      }
                    >
                      <DownloadOutlined />
                    </Button>
                  </Tooltip>,
                  <Tooltip key="view-course-tooltip" title="Просмотреть курс">
                    <Button
                      key="viewCourse"
                      type="text"
                      onClick={() => navigate(`/courses/${course.id}`)}
                    >
                      <ArrowRightOutlined />
                    </Button>
                  </Tooltip>,
                ]}
              />
            ))}
          </Row>
        )}
      </Space>
    </div>
  );
};
