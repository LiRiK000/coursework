import { Table, Button, message } from 'antd';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authorshipService } from '@/shared/service/AuthorshipService';

export const AuthorshipRequests = () => {
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading } = useQuery({
    queryKey: ['authorship-requests'],
    queryFn: authorshipService.fetchRequests,
  });

  const { mutate: handleRequest } = useMutation({
    mutationFn: authorshipService.processRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authorship-requests'] });
      message.success('Заявка обработана');
    },
    onError: () => {
      message.error('Произошла ошибка при обработке заявки');
    },
  });

  const columns = [
    {
      title: 'Пользователь',
      dataIndex: ['user', 'fullname'],
      key: 'userName',
    },
    {
      title: 'Email',
      dataIndex: ['user', 'email'],
      key: 'userEmail',
    },
    {
      title: 'Дата заявки',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Действия',
      key: 'actions',
      render: (_: unknown, record: { id: string }) => (
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button
            type="primary"
            onClick={() => handleRequest({ id: record.id, status: 'APPROVED' })}
          >
            Принять
          </Button>
          <Button
            danger
            onClick={() => handleRequest({ id: record.id, status: 'REJECTED' })}
          >
            Отклонить
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={requests}
      loading={isLoading}
      rowKey="id"
    />
  );
};
