import { useMutation } from '@tanstack/react-query';

import { authorshipService } from '@/shared/service/AuthorshipService';
import { useQuery } from '@tanstack/react-query';
import { message } from 'antd';

export const useAuthorship = () => {
  const { data: userRequest } = useQuery({
    queryKey: ['user-request'],
    queryFn: authorshipService.getUserRequest,
  });

  const { mutate: createRequest } = useMutation({
    mutationFn: authorshipService.createRequest,
    onSuccess: () => {
      message.success('Ваша заявка будет рассмотрена');
    },
    onError: () => {
      message.error('Произошла ошибка при отправке заявки');
    },
  });

  return { userRequest, createRequest };
};
