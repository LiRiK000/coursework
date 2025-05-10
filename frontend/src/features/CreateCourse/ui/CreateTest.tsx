import { useState } from 'react';
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Space,
  Typography,
  Modal,
  Divider,
  Tooltip,
  Steps,
} from 'antd';
import {
  DeleteOutlined,
  PlusOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { Test, TestQuestion } from '../model/schema';
import { v4 as uuidv4 } from 'uuid';
import styles from './CreateTest.module.scss';

const { Title, Text } = Typography;

interface CreateTestModalProps {
  open: boolean;
  onClose: () => void;
  test: Test;
  onSave: (test: Test) => void;
}

export const CreateTestModal = ({
  open,
  onClose,
  test,
  onSave,
}: CreateTestModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [localTest, setLocalTest] = useState<Test>(test);

  const handleQuestionChange = (
    questionId: string,
    updatedQuestion: TestQuestion,
  ) => {
    const updatedQuestions = localTest.questions.map((q) =>
      q.id === questionId ? updatedQuestion : q,
    );
    setLocalTest({ ...localTest, questions: updatedQuestions });
  };

  const handleAddQuestion = () => {
    const newQuestion: TestQuestion = {
      id: uuidv4(),
      question: '',
      options: [
        { id: uuidv4(), text: '', isCorrect: true },
        { id: uuidv4(), text: '', isCorrect: false },
      ],
    };
    setLocalTest({
      ...localTest,
      questions: [...localTest.questions, newQuestion],
    });
  };

  const handleDeleteQuestion = (questionId: string) => {
    const updatedQuestions = localTest.questions.filter(
      (q) => q.id !== questionId,
    );
    setLocalTest({ ...localTest, questions: updatedQuestions });
  };

  const handleOptionChange = (
    questionId: string,
    optionId: string,
    field: 'text' | 'isCorrect',
    value: string | boolean,
  ) => {
    const updatedQuestions = localTest.questions.map((q) => {
      if (q.id === questionId) {
        const updatedOptions = q.options.map((opt) =>
          opt.id === optionId ? { ...opt, [field]: value } : opt,
        );
        return { ...q, options: updatedOptions };
      }
      return q;
    });
    setLocalTest({ ...localTest, questions: updatedQuestions });
  };

  const handleAddOption = (questionId: string) => {
    const updatedQuestions = localTest.questions.map((q) => {
      if (q.id === questionId) {
        return {
          ...q,
          options: [...q.options, { id: uuidv4(), text: '', isCorrect: false }],
        };
      }
      return q;
    });
    setLocalTest({ ...localTest, questions: updatedQuestions });
  };

  const handleDeleteOption = (questionId: string, optionId: string) => {
    const updatedQuestions = localTest.questions.map((q) => {
      if (q.id === questionId) {
        const updatedOptions = q.options.filter((opt) => opt.id !== optionId);
        return { ...q, options: updatedOptions };
      }
      return q;
    });
    setLocalTest({ ...localTest, questions: updatedQuestions });
  };

  const handleSave = () => {
    onSave(localTest);
    onClose();
  };

  const hasValidTest =
    localTest.title && localTest.description && localTest.questions.length > 0;
  const hasValidQuestions = localTest.questions.every(
    (q) =>
      q.question &&
      q.options.length >= 2 &&
      q.options.every((opt) => opt.text) &&
      q.options.some((opt) => opt.isCorrect),
  );

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return localTest.title && localTest.description;
      case 1:
        return localTest.questions.length > 0;
      default:
        return true;
    }
  };

  const steps = [
    {
      title: 'Основная информация',
      content: (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Form layout="vertical">
            <Form.Item
              label="Название теста"
              validateStatus={!localTest.title ? 'error' : undefined}
              help={
                !localTest.title
                  ? 'Название теста не может быть пустым'
                  : undefined
              }
            >
              <Input
                placeholder="Введите название теста"
                value={localTest.title}
                onChange={(e) =>
                  setLocalTest({ ...localTest, title: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item
              label="Описание теста"
              validateStatus={!localTest.description ? 'error' : undefined}
              help={
                !localTest.description
                  ? 'Описание теста не может быть пустым'
                  : undefined
              }
            >
              <Input.TextArea
                value={localTest.description}
                onChange={(e) =>
                  setLocalTest({ ...localTest, description: e.target.value })
                }
                rows={4}
                placeholder="Опишите, что будет проверять этот тест"
              />
            </Form.Item>

            <Form.Item
              label={
                <Space>
                  <Text>Проходной балл (%)</Text>
                  <Tooltip title="Минимальный процент правильных ответов для прохождения теста">
                    <InfoCircleOutlined />
                  </Tooltip>
                </Space>
              }
            >
              <InputNumber
                min={0}
                max={100}
                value={localTest.passingScore}
                onChange={(value) =>
                  setLocalTest({ ...localTest, passingScore: value || 0 })
                }
                style={{ width: 100 }}
              />
            </Form.Item>
          </Form>
        </Space>
      ),
    },
    {
      title: 'Вопросы',
      content: (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Space style={{ width: '100%', justifyContent: 'space-between' }}>
            <Title level={4} style={{ margin: 0 }}>
              Вопросы теста
            </Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddQuestion}
              disabled={localTest.questions.length >= 20}
            >
              Добавить вопрос
            </Button>
          </Space>

          {localTest.questions.map((question, index) => (
            <Card
              key={question.id}
              className={styles.questionCard}
              title={
                <Space
                  style={{ width: '100%', justifyContent: 'space-between' }}
                >
                  <Text>Вопрос {index + 1}</Text>
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteQuestion(question.id)}
                  />
                </Space>
              }
            >
              <Space direction="vertical" style={{ width: '100%' }}>
                <Input
                  placeholder="Введите вопрос"
                  value={question.question}
                  onChange={(e) =>
                    handleQuestionChange(question.id, {
                      ...question,
                      question: e.target.value,
                    })
                  }
                  status={!question.question ? 'error' : undefined}
                />
                <Divider style={{ margin: '12px 0' }} />
                {question.options.map((option, optionIndex) => (
                  <Space
                    key={option.id}
                    align="baseline"
                    style={{ width: '100%' }}
                  >
                    <Text>Вариант {optionIndex + 1}:</Text>
                    <Input
                      placeholder="Введите вариант ответа"
                      value={option.text}
                      onChange={(e) =>
                        handleOptionChange(
                          question.id,
                          option.id,
                          'text',
                          e.target.value,
                        )
                      }
                      status={!option.text ? 'error' : undefined}
                    />
                    <Button
                      type={option.isCorrect ? 'primary' : 'default'}
                      icon={
                        option.isCorrect ? (
                          <CheckCircleOutlined />
                        ) : (
                          <CloseCircleOutlined />
                        )
                      }
                      onClick={() =>
                        handleOptionChange(
                          question.id,
                          option.id,
                          'isCorrect',
                          !option.isCorrect,
                        )
                      }
                    >
                      {option.isCorrect ? 'Правильный' : 'Неправильный'}
                    </Button>
                    {question.options.length > 2 && (
                      <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() =>
                          handleDeleteOption(question.id, option.id)
                        }
                      />
                    )}
                  </Space>
                ))}
                {question.options.length < 6 && (
                  <Button
                    type="dashed"
                    icon={<PlusOutlined />}
                    onClick={() => handleAddOption(question.id)}
                    style={{ marginTop: 8 }}
                  >
                    Добавить вариант ответа
                  </Button>
                )}
              </Space>
            </Card>
          ))}
        </Space>
      ),
    },
  ];

  return (
    <Modal
      title="Создание теста"
      open={open}
      onCancel={onClose}
      width={1000}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Отмена
        </Button>,
        <Button
          key="back"
          onClick={() => setCurrentStep((prev) => prev - 1)}
          disabled={currentStep === 0}
        >
          Назад
        </Button>,
        <Button
          key="next"
          type="primary"
          onClick={() => setCurrentStep((prev) => prev + 1)}
          disabled={!canProceed() || currentStep === steps.length - 1}
        >
          Далее
        </Button>,
        <Button
          key="save"
          type="primary"
          onClick={handleSave}
          disabled={!hasValidTest || !hasValidQuestions}
        >
          Сохранить
        </Button>,
      ]}
    >
      <Steps
        current={currentStep}
        items={steps.map((step) => ({ title: step.title }))}
        style={{ marginBottom: 24 }}
      />
      <div className={styles.stepsContent}>{steps[currentStep].content}</div>
    </Modal>
  );
};
