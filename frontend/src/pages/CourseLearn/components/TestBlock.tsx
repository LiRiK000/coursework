import { useState } from 'react';
import { Card, Typography, Radio, Button, Space, Divider } from 'antd';
import { Test } from '@/shared/service/CourseService/types';

const { Title, Text } = Typography;

interface TestBlockProps {
  test: Test;
  onSubmit: (answers: Array<{questionId: string, optionId: string}>) => void;
  isCompleted: boolean;
}

export const TestBlock = ({ test, onSubmit, isCompleted }: TestBlockProps) => {
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  const handleSingleOptionChange = (questionId: string, optionId: string) => {
    setAnswers({
      ...answers,
      [questionId]: [optionId],
    });
  };

  const handleSubmit = () => {
    const formattedAnswers = Object.entries(answers).map(([questionId, optionIds]) => ({
      questionId,
      optionId: optionIds[0],
    }));

    onSubmit(formattedAnswers);
  };

  const isAllQuestionsAnswered = test.questions.every(
    question => answers[question.id] && answers[question.id].length > 0
  );

  return (
    <Card title={`Тест: ${test.title}`} style={{ marginTop: 16 }}>
      {test.description && <Text>{test.description}</Text>}
      <Divider />
      {test.questions.map((question, index) => (
        <Card key={question.id} style={{ marginBottom: 16 }}>
          <Title level={5}>{index + 1}. {question.question}</Title>

            <Radio.Group
              onChange={(e) => handleSingleOptionChange(question.id, e.target.value)}
              value={answers[question.id]?.[0]}
              disabled={isCompleted}
            >
              <Space direction="vertical">
                {question.options.map(option => (
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
          disabled={!isAllQuestionsAnswered}
        >
          Отправить ответы
        </Button>
      )}

      {isCompleted && (
        <Text type="success">Тест успешно пройден!</Text>
      )}
    </Card>
  );
};
