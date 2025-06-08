import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { courseService } from '@/shared/service/CourseService';
import { Loader } from '@/shared/ui/Loader';
import { Typography, Card, Button, Alert, Space, Result } from 'antd';
import { HomeOutlined, DownloadOutlined } from '@ant-design/icons';
import { useEffect } from 'react';
import { useCertificateDownload } from '@/pages/CourseCongratulations/hooks/useCertificateDownload';

const { Title, Text } = Typography;

export const CourseCongratulations = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { downloadCertificate } = useCertificateDownload();

  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ['course-progress', id],
    queryFn: () => courseService.getCourseProgress(id!),
    enabled: !!id,
  });

  useEffect(() => {
    if (isSuccess && data && !data.isCompleted) {
      navigate(`/courses/${id}/learn`);
    }
  }, [isSuccess, data, id, navigate]);

  if (isLoading) return <Loader fullscreen />;

  if (error) {
    return (
      <Alert
        message="Ошибка"
        description={error.message}
        type="error"
        showIcon
      />
    );
  }

  return (
    <div style={{ margin: 'auto', padding: '24px', maxWidth: '800px' }}>
      <Card>
        <Result
          status="success"
          title="Поздравляем!"
          subTitle="Вы успешно завершили курс"
          extra={[
            <Space key="buttons" size="large">
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                size="large"
                onClick={() => downloadCertificate(id!)}
              >
                Скачать сертификат
              </Button>
              <Button
                icon={<HomeOutlined />}
                size="large"
                onClick={() => navigate('/main')}
              >
                На главную
              </Button>
            </Space>,
          ]}
        >
          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Title level={4}>Ваш результат</Title>
            <Text>
              Вы успешно прошли все блоки курса и можете получить сертификат о
              его завершении.
            </Text>
          </div>
        </Result>
      </Card>
    </div>
  );
};
