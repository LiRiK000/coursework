import React from 'react';
import { Space, Typography } from 'antd';
import { PictureOutlined } from '@ant-design/icons';
import styles from './CourseCard.module.scss';

const { Text } = Typography;

export const CoverPlaceholder: React.FC = () => (
  <div className={styles.coverPlaceholder}>
    <Space direction="vertical" align="center">
      <PictureOutlined style={{ fontSize: 32 }} />
      <Text type="secondary">Нет изображения</Text>
    </Space>
  </div>
);
