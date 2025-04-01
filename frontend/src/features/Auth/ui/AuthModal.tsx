import { Button, Form, Modal, Typography, notification } from 'antd';

import { AuthModalFormFields } from './AuthModalFormFields/AuthModalFormFields';
import { AuthModalType } from '../model/modalType';
import { useAuthModal } from '../hooks/useAuthModal';
import { useAuthQuery } from '../hooks/useAuthQuery';

const { Text } = Typography;

export const AuthModal = () => {
  const { isOpen, closeAuthModal, ModalType, openAuthModal } = useAuthModal();
  const { handleSubmit, control, errors, isLoading, error } =
    useAuthQuery(ModalType);

  const toggleAuthMode = () => {
    openAuthModal(
      ModalType === AuthModalType.LOGIN
        ? AuthModalType.REGISTRATION
        : AuthModalType.LOGIN,
    );
  };

  if (error) {
    notification.error({
      message: 'Ошибка',
      description: error.message || 'Произошла ошибка при авторизации',
    });
  }

  return (
    <Modal
      open={isOpen}
      onCancel={closeAuthModal}
      title={ModalType === AuthModalType.LOGIN ? 'Войти' : 'Регистрация'}
      footer={[
        <Button
          key="submit"
          type="primary"
          onClick={handleSubmit}
          loading={isLoading}
        >
          {ModalType === AuthModalType.LOGIN ? 'Войти' : 'Зарегистрироваться'}
        </Button>,
        <Button key="cancel" type="default" onClick={closeAuthModal}>
          Отмена
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <AuthModalFormFields
          type={ModalType}
          control={control}
          errors={errors}
        />
      </Form>
      <div style={{ textAlign: 'center', marginTop: '16px' }}>
        <Text type="secondary">
          {ModalType === AuthModalType.LOGIN
            ? 'Еще нет аккаунта? '
            : 'Уже есть аккаунт? '}
          <Button type="link" onClick={toggleAuthMode}>
            {ModalType === AuthModalType.LOGIN ? 'Зарегистрироваться' : 'Войти'}
          </Button>
        </Text>
      </div>
    </Modal>
  );
};
