import { Button, Modal, Form } from 'antd';
import { FC } from 'react';
import { useAuthModal } from '../hooks/useAuthModal';
import { AuthModalType } from '../model/modalType';
import { AuthModalFormFields } from './AuthModalFormFields/AuthModalFormFields';
import { useAuthForm } from '../hooks/useAuthForm';

interface AuthModalProps {
  type: AuthModalType;
}

export const AuthModal: FC<AuthModalProps> = ({ type }) => {
  const { isOpen, closeAuthModal } = useAuthModal();
  const { handleSubmit, control, errors } = useAuthForm(type);

  const onSubmit = (data: { username: string; password: string }) => {
    console.log('Отправка данных формы', data);
    closeAuthModal();
  };

  return (
    <Modal
      open={isOpen}
      onCancel={closeAuthModal}
      title="Авторизация"
      footer={[
        <Button key="submit" type="primary" onClick={handleSubmit(onSubmit)}>
          Отправить
        </Button>,
        <Button key="cancel" type="default" onClick={closeAuthModal}>
          Отмена
        </Button>,
      ]}
    >
      <Form layout="vertical">
        <AuthModalFormFields type={type} control={control} errors={errors} />
      </Form>
    </Modal>
  );
};
