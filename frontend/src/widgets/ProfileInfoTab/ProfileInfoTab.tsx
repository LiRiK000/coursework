// TODO: улучшить дизайн этого таба, вернуть логику сохранения обновленных данных
import { Typography, Space, Row, Col, Avatar } from 'antd';
import { useUser } from '@/entities/User';
import { ProfileBlock } from '@/shared/ui/ProfileBlock';

export const ProfileInfoTab = () => {
  const { email, fullname, role, avatar } = useUser();
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Typography.Title level={4}>Информация профиля</Typography.Title>

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
            Роль: {role}
          </Typography.Text>
        </div>
        {/* TODO: Пустой аватар с возможностью загрузки */}
        {avatar ? <Avatar src={avatar} size={100} /> : <></>}
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <ProfileBlock
            title="ФИО"
            value={fullname}
            onSave={(v) => console.log('Name updated:', v)}
          />
        </Col>
        <Col xs={24} md={12}>
          <ProfileBlock
            title="email"
            value={email}
            onSave={(v) => console.log('Email updated:', v)}
          />
        </Col>
      </Row>
    </Space>
  );
};
