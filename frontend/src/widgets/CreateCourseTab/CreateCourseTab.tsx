import { Typography, Space } from 'antd';
import { CreateCourse } from '@/features/CreateCourse';

export const CreateCourseTab = () => {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Typography.Title level={2}>Создание курса</Typography.Title>
      <CreateCourse />
    </Space>
  );
};
