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
import { CreateCourseSchema, FormData } from './model/schema';
import { useCreateCourse } from './hooks/useCreateCourse';
import MDEditor from '@uiw/react-md-editor';
import { v4 as uuidv4 } from 'uuid';
import type { RcFile } from 'antd/es/upload';

const { TextArea } = Input;
const { Title, Text } = Typography;

export const CreateCourse = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const validateStep = (step: number) => {
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

                <Form.Item label="Дополнительные материалы">
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

                <Form.Item label="Дополнительные материалы">
                  <Upload
                    accept=".doc,.docx"
                    maxCount={1}
                    beforeUpload={() => {
                      // TODO: Реализовать загрузку файла
                      const newBlocks = [...(formData.blocks || [])];
                      newBlocks[index] = {
                        ...block,
                        documentUrl: 'url-to-document',
                      };
                      setFormData((prev) => ({ ...prev, blocks: newBlocks }));
                      return false;
                    }}
                  >
                    <Button icon={<UploadOutlined />}>
                      Загрузить документ
                    </Button>
                  </Upload>
                </Form.Item>
              </Form>
            </Card>
          ))}

          <Button
            type="dashed"
            onClick={() => {
              setFormData((prev) => ({
                ...prev,
                blocks: [
                  ...(prev.blocks || []),
                  {
                    id: uuidv4(),
                    title: '',
                    content: '',
                  },
                ],
              }));
            }}
            block
            icon={<PlusOutlined />}
          >
            Добавить блок
          </Button>
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
                <Tag color="blue">{formData.step1?.category}</Tag>
                <Tag color="green">{formData.step1?.level}</Tag>
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
                {block.documentUrl && (
                  <div style={{ marginTop: 16 }}>
                    <Text type="secondary">
                      Дополнительные материалы: {block.documentUrl}
                    </Text>
                  </div>
                )}
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
      message.error('Пожалуйста, заполните все обязательные поля');
      console.log(errors);
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
        console.log(errors);
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
