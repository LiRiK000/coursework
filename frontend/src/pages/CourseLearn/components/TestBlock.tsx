import { useState, useEffect } from 'react';
import { Card, Typography, Radio, Button, Space, Divider, message } from 'antd';
import { Test } from '@/shared/service/CourseService/types';

const { Title, Text } = Typography;

interface TestBlockProps {
  test: Test;
  onSubmit: (answers: Array<{ questionId: string; optionId: string }>) => void;
  isCompleted: boolean;
  hasFailedAttempt: boolean;
}

export const TestBlock = ({
  test,
  onSubmit,
  isCompleted,
  hasFailedAttempt,
}: TestBlockProps) => {
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setSelectedAnswers({});
    setIsSubmitting(false);
  }, [test.id, isCompleted]);

  const handleAnswerSelect = (questionId: string, optionId: string) => {
    if (isCompleted || isSubmitting || hasFailedAttempt) return;

    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const isAllQuestionsAnswered =
    test.questions.length === Object.keys(selectedAnswers).length;

  const handleSubmit = async () => {
    if (isSubmitting || isCompleted || hasFailedAttempt) return;

    try {
      setIsSubmitting(true);
      const answers = Object.entries(selectedAnswers).map(
        ([questionId, optionId]) => ({
          questionId,
          optionId,
        }),
      );
      await onSubmit(answers);
    } catch (error) {
      message.error('Произошла ошибка при отправке теста');
      console.error(error, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card title={`Тест: ${test.title}`} style={{ marginTop: 16 }}>
      {test.description && <Text>{test.description}</Text>}
      <Divider />
      {test.questions.map((question, index) => (
        <Card key={question.id} style={{ marginBottom: 16 }}>
          <Title level={5}>
            {index + 1}. {question.question}
          </Title>

          <Radio.Group
            value={selectedAnswers[question.id]}
            onChange={(e) => handleAnswerSelect(question.id, e.target.value)}
            disabled={isCompleted || isSubmitting || hasFailedAttempt}
          >
            <Space direction="vertical">
              {question.options.map((option) => (
                <Radio key={option.id} value={option.id}>
                  {option.text}
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </Card>
      ))}

      {!isCompleted && (
        <Button
          type="primary"
          onClick={handleSubmit}
          disabled={!isAllQuestionsAnswered || isSubmitting || hasFailedAttempt}
          loading={isSubmitting}
        >
          {isSubmitting ? 'Отправка...' : 'Отправить ответы'}
        </Button>
      )}

      {isCompleted && <Text type="success">Тест успешно пройден!</Text>}
      {hasFailedAttempt && !isCompleted && (
        <Text type="danger" style={{ display: 'block', marginTop: 16 }}>
          Тест не пройден. Для повторной попытки необходимо перезагрузить
          страницу.
        </Text>
      )}
    </Card>
  );
};
