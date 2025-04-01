import { ControlType, FieldErrorType } from '../../model/types';
import { Form, Input } from 'antd';

import { AuthModalType } from '../../model/modalType';
import { Controller } from 'react-hook-form';
import { FC } from 'react';

interface AuthModalFormFieldsProps {
  type: AuthModalType;
  control: ControlType;
  errors: FieldErrorType;
}

export const AuthModalFormFields: FC<AuthModalFormFieldsProps> = ({
  type,
  control,
  errors,
}) => {
  return (
    <>
      <Form.Item
        label="Email"
        validateStatus={errors.email ? 'error' : ''}
        help={errors.email?.message}
      >
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input placeholder="Введите email" {...field} allowClear />
          )}
        />
      </Form.Item>
      <Form.Item
        label="Пароль"
        validateStatus={errors.password ? 'error' : ''}
        help={errors.password?.message}
      >
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Input.Password placeholder="Введите пароль" {...field} />
          )}
        />
      </Form.Item>
      {type === AuthModalType.REGISTRATION && (
        <Form.Item
          label="Пароль"
          validateStatus={errors.confirmPassword ? 'error' : ''}
          help={errors.confirmPassword?.message}
        >
          <Controller
            name="confirmPassword"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Input.Password placeholder="Повторите пароль" {...field} />
            )}
          />
        </Form.Item>
      )}
    </>
  );
};
