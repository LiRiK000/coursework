import { courseService } from '@/shared/service/CourseService';
import { CourseCard } from '@/shared/ui/CourseCard';
import { Loader } from '@/shared/ui/Loader';
import { useQuery } from '@tanstack/react-query';
import { Typography, Space, Input, Row, Empty } from 'antd';

const { Search } = Input;

export const AllCoursesTab = () => {
  const { data: courses = [], isLoading } = useQuery({
    queryKey: ['courses'],
    queryFn: courseService.getCourses,
  });

  if (isLoading) {
    return <Loader fullscreen />;
  }
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Typography.Title level={2}>Доступные курсы</Typography.Title>
      <Search
        placeholder="Поиск курсов"
        size="large"
        disabled={!courses.length}
        style={{ width: '100%', marginBottom: '24px' }}
      />

      {courses.length > 0 ? (
        <Row gutter={[16, 16]} style={{ gap: '16px' }}>
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </Row>
      ) : (
        <Empty
          description="Курсы пока не добавлены"
          style={{ margin: '40px 0' }}
        />
      )}
    </Space>
  );
};
