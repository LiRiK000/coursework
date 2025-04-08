import { FC } from 'react';
import { Card, Empty, Row, Col, Typography, Input } from 'antd';
import { useQuery } from '@tanstack/react-query';
import { Loader } from '@/shared/ui/Loader';
import { MainLayout } from './MainLayout';
import { courseService } from '@/shared/service/CourseService';

const { Search } = Input;

export const Main: FC = () => {
  const { data: courses = [], isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: courseService.fetchCourses,
  });

  if (isLoading) {
    return <Loader fullscreen />;
  }

  return (
    <MainLayout>
      <div style={{ marginBottom: 24 }}>
        <Typography.Title level={2} style={{ marginBottom: '24px' }}>
          Доступные курсы
        </Typography.Title>
        <Search
          placeholder="Поиск курсов"
          size="large"
          style={{ maxWidth: 400, marginBottom: '24px' }}
        />
        {courses.length > 0 ? (
          <Row gutter={[16, 16]}>
            {courses.map((course) => (
              <Col xs={24} sm={12} md={8} lg={6} key={course.id}>
                <Card hoverable title={course.title} style={{ height: '100%' }}>
                  <p>{course.description}</p>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <Empty
            description="Курсы пока не добавлены"
            style={{ margin: '40px 0' }}
          />
        )}
      </div>
    </MainLayout>
  );
};
