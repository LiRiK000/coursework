import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { courseService } from '@/shared/service/CourseService';
import { Loader } from '@/shared/ui/Loader';
import {
  Typography,
  Card,
  Button,
  Alert,
  Space,
  Progress,
  Divider,
  message,
} from 'antd';
import { HomeOutlined, ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { TheoryBlock } from './components/TheoryBlock';
import { TestBlock } from './components/TestBlock'
import { isAxiosError } from 'axios';

const { Title, Text } = Typography;

export const CourseLearn = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [completedBlocks, setCompletedBlocks] = useState<string[]>([]);
  const [testSubmitted, setTestSubmitted] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['course-learn', id],
    queryFn: () => courseService.getCourseForLearning(id!),
  });

  const { data: progressData, isLoading: isProgressLoading } = useQuery({
    queryKey: ['course-progress', id],
    queryFn: () => courseService.getCourseProgress(id!),
    enabled: !!id,
  });

  useEffect(() => {
    const startCourse = async () => {
      if (id && !isLoading && data) {
        try {
          await courseService.startCourse(id);
          queryClient.invalidateQueries({ queryKey: ['course-progress', id] });
        } catch (error) {
          console.error('Ошибка при начале курса:', error);
        }
      }
    };

    startCourse();
  }, [id, isLoading, data, queryClient]);

  useEffect(() => {
    if (progressData && Array.isArray(progressData.completedBlocks)) {
      const completed = progressData.completedBlocks.map(block => block.blockId);
      console.log(completed)
      setCompletedBlocks(completed);
    } else {
      setCompletedBlocks([]);
    }
  }, [progressData]);

  if (isLoading || isProgressLoading) return <Loader fullscreen />;

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

  if (!data) {
    return (
      <Alert
        message="Ошибка"
        description="Курс не найден"
        type="error"
        showIcon
      />
    );
  }

  const course = data.course;
  const blocks = course.blocks;
  const currentBlock = blocks[currentBlockIndex];
  const progress = progressData ? Math.round((completedBlocks?.length / blocks.length) * 100) : 0;

  const handlePrevBlock = () => {
    if (currentBlockIndex > 0) {
      setCurrentBlockIndex(currentBlockIndex - 1);
    }
  };

  const handleNextBlock = () => {
    if (currentBlockIndex < blocks.length - 1) {
      setCurrentBlockIndex(currentBlockIndex + 1);
    }
  };

  const handleCompleteBlock = async () => {
    try {
      await courseService.completeBlock(currentBlock.id);
      message.success('Блок успешно завершен');

      queryClient.invalidateQueries({ queryKey: ['course-progress', id] });

      if (!completedBlocks?.includes(currentBlock.id)) {
        setCompletedBlocks([...completedBlocks, currentBlock.id]);
      }

      if (currentBlockIndex < blocks.length - 1) {
        setCurrentBlockIndex(currentBlockIndex + 1);
      }
    } catch (error) {
      if(isAxiosError(error)) {
        message.error(error?.response?.data?.message);
        return
      }
      message.error('Ошибка при завершении блока');
      console.error(error);
    }
  };

  const handleSubmitTest = async (answers: Array<{questionId: string, optionId: string}>) => {
    if (testSubmitted) return;
    try {
      const result = await courseService.submitTest(currentBlock.test.id, { answers });
      if (result.isPassed) {
        setTestSubmitted(true);
        message.success(`Тест пройден! Ваш результат: ${result.score}%`);
        queryClient.invalidateQueries({ queryKey: ['course-progress', id] });
        if (!completedBlocks?.includes(currentBlock.id)) {
          setCompletedBlocks([...completedBlocks, currentBlock.id]);
        }
        if (currentBlockIndex < blocks.length - 1) {
          setCurrentBlockIndex(currentBlockIndex + 1);
        }
      } else {
        message.error(`Тест не пройден. Ваш результат: ${result.score}%. Необходимо набрать минимум ${currentBlock.test.passingScore}%`);
      }
    } catch (error) {
      if(isAxiosError(error)) {
        message.error(error?.response?.data?.message);
        return;
      }
      console.error(error);
    }
  };

  return (
    <div style={{ margin: 'auto', padding: '24px' }}>
      <Space style={{ marginBottom: '16px' }}>
        <Button icon={<HomeOutlined />} onClick={() => navigate('/main')}>
          На главную
        </Button>
        <Button onClick={() => navigate(`/courses/${id}`)}>
          Вернуться к описанию курса
        </Button>
      </Space>

      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Title level={2}>{course.title}</Title>
            <Progress percent={progress} status="active" />
            <Text>Прогресс: {completedBlocks?.length} из {blocks.length} блоков</Text>
          </div>

          <Divider />

          <Card title={`Блок ${currentBlockIndex + 1}: ${currentBlock.title}`}>
            {currentBlock.content && (
              <TheoryBlock content={currentBlock.content} />
            )}

            {currentBlock.test && (
              <TestBlock
                test={currentBlock.test}
                onSubmit={handleSubmitTest}
                isCompleted={completedBlocks?.includes(currentBlock.id)}
              />
            )}
          </Card>

          <Space>
            <Button
              icon={<ArrowLeftOutlined />}
              onClick={handlePrevBlock}
              disabled={currentBlockIndex === 0}
            >
              Предыдущий блок
            </Button>

              <Button
                type="primary"
                onClick={handleCompleteBlock}
              >
                Завершить блок
              </Button>

            <Button
              icon={<ArrowRightOutlined />}
              onClick={handleNextBlock}
              disabled={currentBlockIndex === blocks.length - 1}
            >
              Следующий блок
            </Button>
          </Space>
        </Space>
      </Card>
    </div>
  );
};
