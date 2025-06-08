import { Button, Form, Input, Modal, notification, Typography } from 'antd';
import { useAuthModal } from './hooks/useAuthModal';
import { AuthFormData, AuthModalType } from './model/types';
import { useState } from 'react';
import { authSchema } from './model/validation';
import { initialFormState } from './constant';
import { useAuthQuery } from './hooks/useAuthQuery';

const { Text } = Typography;

export const AuthModal = () => {
  const { isOpen, closeAuthModal, ModalType, openAuthModal } = useAuthModal();
  const { mutationSuccess, isLoading, login, register } = useAuthQuery();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [userFormData, setUserFormData] = useState<Partial<AuthFormData>>({});

  const formData = {
    ...initialFormState,
    ...userFormData,
  };

  const handleSubmitForm = () => {
    setIsSubmitted(true);
    const validationErrors = validate(ModalType);

    if (validationErrors) {
      return;
    }

    switch (ModalType) {
      case AuthModalType.LOGIN:
        login(formData);
        break;
      case AuthModalType.REGISTRATION:
        register(formData);
        break;
      default:
        break;
    }
  };

  const validate = (type: AuthModalType) => {
    const res = authSchema(type).safeParse(formData);
    if (res.success) {
      return undefined;
    }
    return res.error.format();
  };

  const toggleAuthMode = () => {
    openAuthModal(
      ModalType === AuthModalType.LOGIN
        ? AuthModalType.REGISTRATION
        : AuthModalType.LOGIN,
    );
  };

  if (isSubmitted && mutationSuccess) {
    notification.success({
      message: 'Успешно',
      description:
        ModalType === AuthModalType.LOGIN
          ? 'Вы успешно авторизовались'
          : 'Вы успешно зарегистрировались',
    });
    setIsSubmitted(false);
  }

  const errors = isSubmitted ? validate(ModalType) : undefined;

  return (
    <Modal
      open={isOpen}
      onCancel={closeAuthModal}
      title={ModalType === AuthModalType.LOGIN ? 'Войти' : 'Регистрация'}
      footer={[
        <Button
          key="submit"
          type="primary"
          onClick={handleSubmitForm}
          loading={isLoading}
          disabled={isLoading}
        >
          {ModalType === AuthModalType.LOGIN ? 'Войти' : 'Зарегистрироваться'}
        </Button>,
        <Button
          key="cancel"
          type="default"
          onClick={closeAuthModal}
          disabled={isLoading}
        >
          Отмена
        </Button>,
      ]}
    >
      <Form layout="vertical">
        {ModalType === AuthModalType.REGISTRATION && (
          <Form.Item
            label={'Введите полное имя'}
            validateStatus={errors?.fullname ? 'error' : undefined}
            help={errors?.fullname && errors?.fullname._errors[0]}
          >
            <Input
              placeholder="Введите полное имя"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={(e) =>
                setUserFormData((l) => ({ ...l, fullname: e.target.value }))
              }
              required
              allowClear
            />
          </Form.Item>
        )}
        <Form.Item
          label={'Введите email'}
          validateStatus={errors?.email ? 'error' : undefined}
          help={errors?.email && errors?.email._errors[0]}
        >
          <Input
            placeholder="Введите email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setUserFormData((l) => ({ ...l, email: e.target.value }))
            }
            required
            allowClear
          />
        </Form.Item>
        <Form.Item
          label="Введите пароль"
          validateStatus={errors?.password ? 'error' : undefined}
          help={errors?.password && errors?.password._errors[0]}
        >
          <Input.Password
            placeholder="Введите пароль"
            id="password"
            name="password"
            value={formData.password}
            onChange={(e) =>
              setUserFormData((l) => ({ ...l, password: e.target.value }))
            }
            required
            allowClear
          />
        </Form.Item>
        {ModalType === AuthModalType.REGISTRATION && (
          <Form.Item
            label={'Введите пароль повторно'}
            validateStatus={errors?.confirmPassword ? 'error' : undefined}
            help={errors?.confirmPassword && errors?.confirmPassword._errors[0]}
          >
            <Input.Password
              placeholder="Введите пароль повторно"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={(e) =>
                setUserFormData((l) => ({
                  ...l,
                  confirmPassword: e.target.value,
                }))
              }
              required
              allowClear
              disabled={isLoading}
            />
          </Form.Item>
        )}
      </Form>
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <Text type="secondary">
          {ModalType === AuthModalType.LOGIN
            ? 'Еще нет аккаунта? '
            : 'Уже есть аккаунт? '}
          <Button type="link" onClick={toggleAuthMode} disabled={isLoading}>
            {ModalType === AuthModalType.LOGIN ? 'Зарегистрироваться' : 'Войти'}
          </Button>
        </Text>
      </div>
    </Modal>
  );
};
