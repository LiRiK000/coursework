import { useState } from 'react';
import {
  Button,
  Form,
  Input,
  Select,
  Upload,
  Card,
  Steps,
  Space,
  message,
  Typography,
  Descriptions,
  Tag,
  Image,
} from 'antd';
import {
  UploadOutlined,
  PlusOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';
import { CreateCourseSchema, FormData, Test, Block } from './model/schema';
import { useCreateCourse } from './hooks/useCreateCourse';
import MDEditor from '@uiw/react-md-editor';
import { v4 as uuidv4 } from 'uuid';
import type { RcFile } from 'antd/es/upload';
import { CreateTestModal } from './ui/CreateTest';
import { levelMapper } from '@/shared/utils/levelMapper';
import { categoryMapper } from '@/shared/utils/categoryMapper';

const { TextArea } = Input;
const { Title, Text } = Typography;

export const CreateCourse = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<FormData>>({
    step1: {
      title: '',
      description: '',
      category: 'PROGRAMMING',
      level: 'BEGINNER',
    },
    blocks: [],
  });

  const { createCourse, isLoading } = useCreateCourse();

  const handleAddTestToBlock = (blockId: string) => {
    setSelectedBlockId(blockId);
    setIsTestModalOpen(true);
  };

  const handleTestModalClose = () => {
    setSelectedBlockId(null);
    setIsTestModalOpen(false);
  };

  const handleTestSave = (test: Test) => {
    if (selectedBlockId) {
      const newBlocks = formData.blocks?.map((block) =>
        block.id === selectedBlockId ? { ...block, test: { ...test } } : block,
      );
      setFormData((prev) => ({ ...prev, blocks: newBlocks }));
    }
  };

  const getEmptyTest = () => ({
    id: uuidv4(),
    title: '',
    description: '',
    questions: [],
    passingScore: 70,
  });

  const handleAddBlock = () => {
    const newBlock: Block = {
      id: uuidv4(),
      title: '',
      content: '',
      test: undefined,
    };
    setFormData((prev) => ({
      ...prev,
      blocks: [...(prev.blocks || []), newBlock],
    }));
  };

  const validateStep = (step: number) => {
    if (step === 1) {
      const hasAllTests = formData.blocks?.every((block) => block.test);
      if (!hasAllTests) return false;
    }

    const partialSchema = CreateCourseSchema.pick({
      step1: step === 0 ? true : undefined,
      blocks: step === 1 ? true : undefined,
    });

    const result = partialSchema.safeParse(formData);
    return result.success;
  };

  const getStepStatus = (step: number) => {
    if (currentStep > step) {
      return validateStep(step) ? 'finish' : 'error';
    }
    if (currentStep === step) {
      return 'process';
    }
    return 'wait';
  };

  const getStepErrors = (step: number) => {
    const partialSchema = CreateCourseSchema.pick({
      step1: step === 0 ? true : undefined,
      blocks: step === 1 ? true : undefined,
    });

    const result = partialSchema.safeParse(formData);
    if (!result.success) {
      return result.error.format();
    }
    return null;
  };

  const errors = isSubmitted ? getStepErrors(currentStep) : undefined;

  const steps = [
    {
      title: 'Основная информация',
      content: (
        <Form layout="vertical">
          <Form.Item
            label="Название курса"
            validateStatus={errors?.step1?.title ? 'error' : undefined}
            help={errors?.step1?.title && errors?.step1?.title._errors[0]}
          >
            <Input
              placeholder="Введите название курса"
              value={formData.step1?.title}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  step1: { ...prev.step1!, title: e.target.value },
                }))
              }
            />
          </Form.Item>

          <Form.Item
            label="Описание"
            validateStatus={errors?.step1?.description ? 'error' : undefined}
            help={
              errors?.step1?.description &&
              errors?.step1?.description._errors[0]
            }
          >
            <TextArea
              placeholder="Введите описание курса"
              value={formData.step1?.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  step1: { ...prev.step1!, description: e.target.value },
                }))
              }
              rows={4}
            />
          </Form.Item>

          <Form.Item label="Категория">
            <Select
              value={formData.step1?.category}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  step1: { ...prev.step1!, category: value },
                }))
              }
              options={[
                { value: 'PROGRAMMING', label: 'Программирование' },
                { value: 'DESIGN', label: 'Дизайн' },
                { value: 'MARKETING', label: 'Маркетинг' },
                { value: 'LANGUAGES', label: 'Языки' },
              ]}
            />
          </Form.Item>

          <Form.Item label="Уровень сложности">
            <Select
              value={formData.step1?.level}
              onChange={(value) =>
                setFormData((prev) => ({
                  ...prev,
                  step1: { ...prev.step1!, level: value },
                }))
              }
              options={[
                { value: 'BEGINNER', label: 'Начальный' },
                { value: 'INTERMEDIATE', label: 'Средний' },
                { value: 'ADVANCED', label: 'Продвинутый' },
              ]}
            />
          </Form.Item>

          <Form.Item label="Обложка курса">
            <Upload
              accept="image/*"
              maxCount={1}
              beforeUpload={(file: RcFile) => {
                setFormData((prev) => ({
                  ...prev,
                  step1: { ...prev.step1!, coverImage: file },
                }));
                return false;
              }}
            >
              <Button icon={<UploadOutlined />}>Загрузить обложку</Button>
            </Upload>
          </Form.Item>
        </Form>
      ),
    },
    {
      title: 'Блоки курса',
      content: (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          {formData.blocks?.map((block, index) => (
            <Card
              key={block.id}
              title={`Блок ${index + 1}`}
              extra={
                <Space>
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => handleAddTestToBlock(block.id)}
                  >
                    {block.test ? 'Редактировать тест' : 'Добавить тест'}
                  </Button>

                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => {
                      const newBlocks = [...(formData.blocks || [])];
                      newBlocks.splice(index, 1);
                      setFormData((prev) => ({ ...prev, blocks: newBlocks }));
                    }}
                  />
                </Space>
              }
            >
              <Form layout="vertical">
                <Form.Item
                  label="Название блока"
                  validateStatus={
                    isSubmitted && !block.title ? 'error' : undefined
                  }
                  help={
                    isSubmitted && !block.title
                      ? 'Введите название блока'
                      : undefined
                  }
                >
                  <Input
                    placeholder="Введите название блока"
                    value={block.title}
                    onChange={(e) => {
                      const newBlocks = [...(formData.blocks || [])];
                      newBlocks[index] = { ...block, title: e.target.value };
                      setFormData((prev) => ({ ...prev, blocks: newBlocks }));
                    }}
                  />
                </Form.Item>

                <Form.Item
                  label="Содержимое блока"
                  validateStatus={
                    errors?.blocks?.[index]?.content ? 'error' : undefined
                  }
                  help={
                    errors?.blocks?.[index]?.content &&
                    errors?.blocks?.[index]?.content._errors[0]
                  }
                >
                  <MDEditor
                    value={block.content}
                    onChange={(value) => {
                      const newBlocks = [...(formData.blocks || [])];
                      newBlocks[index] = { ...block, content: value || '' };
                      setFormData((prev) => ({ ...prev, blocks: newBlocks }));
                    }}
                    preview="edit"
                    height={400}
                  />
                </Form.Item>

                <Form.Item label="Теоретический материал">
                  <Upload
                    accept=".docx"
                    maxCount={1}
                    beforeUpload={(file: RcFile) => {
                      const newBlocks = [...(formData.blocks || [])];
                      newBlocks[index] = {
                        ...block,
                        theoreticalMaterial: file,
                      };
                      setFormData((prev) => ({ ...prev, blocks: newBlocks }));
                      return false;
                    }}
                  >
                    <Button icon={<UploadOutlined />}>
                      Загрузить материал
                    </Button>
                  </Upload>
                  {block.theoreticalMaterial && (
                    <Text style={{ marginLeft: 8 }}>
                      {block.theoreticalMaterial.name}
                    </Text>
                  )}
                </Form.Item>

                {block.test && block.test.title.length > 0 && (
                  <Form.Item label="Тест">
                    <Card size="small">
                      <Title level={3} style={{ marginTop: 0 }}>
                        {block.test.title}
                      </Title>
                      <Text>{block.test.description}</Text>
                      <div style={{ marginTop: 8 }}>
                        <Tag color="blue">
                          Вопросов: {block.test.questions.length}
                        </Tag>
                        <Tag color="green">
                          Проходной балл: {block.test.passingScore}%
                        </Tag>
                      </div>
                    </Card>
                  </Form.Item>
                )}
              </Form>
            </Card>
          ))}

          <Button
            type="dashed"
            onClick={handleAddBlock}
            block
            icon={<PlusOutlined />}
          >
            Добавить блок
          </Button>

          <CreateTestModal
            open={isTestModalOpen}
            onClose={handleTestModalClose}
            test={
              formData.blocks?.find((b) => b.id === selectedBlockId)?.test ||
              getEmptyTest()
            }
            onSave={handleTestSave}
          />
        </Space>
      ),
    },
    {
      title: 'Предпросмотр',
      content: (
        <Card>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Title level={3}>{formData.step1?.title}</Title>
              <Space>
                <Tag color="blue">
                  {categoryMapper(formData.step1?.category || '')}
                </Tag>
                <Tag color="green">
                  {levelMapper(formData.step1?.level || '')}
                </Tag>
              </Space>
            </div>

            <Descriptions title="Основная информация" bordered>
              <Descriptions.Item label="Описание" span={3}>
                {formData.step1?.description}
              </Descriptions.Item>
              <Descriptions.Item label="Обложка" span={3}>
                {formData.step1?.coverImage ? (
                  <Image
                    src={URL.createObjectURL(formData.step1.coverImage)}
                    alt="Обложка курса"
                    style={{ maxWidth: 200 }}
                  />
                ) : (
                  <Text type="secondary">Обложка не загружена</Text>
                )}
              </Descriptions.Item>
            </Descriptions>

            <Title level={4}>Блоки курса</Title>
            {formData.blocks?.map((block, index) => (
              <Card key={block.id} title={`Блок ${index + 1}: ${block.title}`}>
                <div dangerouslySetInnerHTML={{ __html: block.content }} />
              </Card>
            ))}

            <div style={{ marginTop: 24 }}>
              <Space>
                {validateStep(0) ? (
                  <Tag icon={<CheckCircleOutlined />} color="success">
                    Основная информация заполнена
                  </Tag>
                ) : (
                  <Tag icon={<CloseCircleOutlined />} color="error">
                    Основная информация не заполнена
                  </Tag>
                )}
                {validateStep(1) ? (
                  <Tag icon={<CheckCircleOutlined />} color="success">
                    Блоки курса заполнены
                  </Tag>
                ) : (
                  <Tag icon={<CloseCircleOutlined />} color="error">
                    Блоки курса не заполнены
                  </Tag>
                )}
              </Space>
            </div>
          </Space>
        </Card>
      ),
    },
  ];

  const validate = () => {
    const res = CreateCourseSchema.safeParse(formData);
    if (res.success) {
      return undefined;
    }
    return res.error.format();
  };

  const handleSubmit = async () => {
    setIsSubmitted(true);
    const errors = validate();

    if (errors) {
      message.error(
        'Пожалуйста, заполните все обязательные поля и добавьте тесты ко всем блокам',
      );
      console.error(errors);
      return;
    }

    // Проверяем наличие тестов в блоках перед отправкой
    const hasAllTests = formData.blocks?.every((block) => block.test);
    if (!hasAllTests) {
      message.error('Пожалуйста, добавьте тесты ко всем блокам');
      return;
    }

    createCourse(formData as FormData, {
      onSuccess: () => {
        setFormData({
          step1: {
            title: '',
            description: '',
            category: 'PROGRAMMING',
            level: 'BEGINNER',
          },
          blocks: [],
        });
        setCurrentStep(0);
        setIsSubmitted(false);
      },
    });
  };

  const next = () => {
    if (!validateStep(currentStep)) {
      setIsSubmitted(true);
      const errors = getStepErrors(currentStep);
      if (errors) {
        message.error('Пожалуйста, заполните все обязательные поля');
        console.error(errors);
      }
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div>
      <Steps
        current={currentStep}
        items={steps.map((item, index) => ({
          title: item.title,
          status: getStepStatus(index),
        }))}
        style={{ marginBottom: 24 }}
      />
      <div className="steps-content">{steps[currentStep].content}</div>
      <div
        style={{
          marginTop: 24,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {currentStep > 0 && <Button onClick={prev}>Назад</Button>}
        {currentStep < steps.length - 1 ? (
          <Button type="primary" onClick={next}>
            Дальше
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={handleSubmit}
            disabled={!validateStep(0) || !validateStep(1) || isLoading}
            loading={isLoading}
          >
            Создать курс
          </Button>
        )}
      </div>
    </div>
  );
};
