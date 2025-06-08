import { Typography, Space, Row, Col, Avatar, Upload, Button } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import { useUser } from '@/entities/User';
import { ProfileBlock } from '@/shared/ui/ProfileBlock';
import { roleMapper } from '@/shared/utils';
import { useUpdateProfile } from './hooks/useUpdateProfile';
import { useUpdateAvatar } from './hooks/useUpdateAvatar';
import type { UploadProps } from 'antd';
import { useEffect } from 'react';

export const ProfileInfoTab = () => {
  const { email, fullname, role, avatar } = useUser();
  const { handleUpdateUser, isUpdating } = useUpdateProfile();
  const { handleAvatarUpload, isUploading, fileList, setFileList } =
    useUpdateAvatar();

  useEffect(() => {
    if (avatar) {
      setFileList([
        {
          uid: '-1',
          name: 'avatar',
          status: 'done',
          url: avatar,
        },
      ]);
    }
  }, [avatar, setFileList]);

  const uploadProps: UploadProps = {
    showUploadList: false,
    beforeUpload: (file) => {
      handleAvatarUpload(file);
      return false;
    },
    fileList,
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Typography.Title level={2}>Информация профиля</Typography.Title>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginBottom: '24px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            marginRight: '24px',
          }}
        >
          <Typography.Title level={5} style={{ margin: 0 }}>
            {fullname}
          </Typography.Title>
          <Typography.Text type="secondary" style={{ marginTop: '4px' }}>
            {email}
          </Typography.Text>
          <Typography.Text type="secondary" style={{ marginTop: '4px' }}>
            Роль: {roleMapper(role)}
          </Typography.Text>
        </div>
        <Upload {...uploadProps}>
          <div style={{ position: 'relative' }}>
            <Avatar
              src={avatar}
              size={100}
              icon={<UserOutlined />}
              style={{ cursor: 'pointer' }}
            />
            <Button
              type="primary"
              icon={<UploadOutlined />}
              size="small"
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                padding: 0,
              }}
              loading={isUploading}
            />
          </div>
        </Upload>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <ProfileBlock
            title="ФИО"
            value={fullname}
            onSave={(v) => handleUpdateUser('fullname', v)}
            disabled={isUpdating}
          />
        </Col>
        <Col xs={24} md={12}>
          <ProfileBlock
            title="email"
            value={email}
            onSave={(v) => handleUpdateUser('email', v)}
            disabled={isUpdating}
          />
        </Col>
      </Row>
    </Space>
  );
};
