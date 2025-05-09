import { FC } from 'react';
import { Result } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import styles from './NotFoundTab.module.css';

export const NotFoundTab: FC = () => {
  return (
    <div className={styles.container}>
      <Result
        icon={<QuestionCircleOutlined />}
        status="404"
        title="Таб не найден"
        subTitle="К сожалению, запрашиваемый таб не существует"
      />
    </div>
  );
};
