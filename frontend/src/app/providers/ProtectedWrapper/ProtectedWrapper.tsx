import { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api/api';
import { Loader } from '@/shared/ui/Loader';

interface ProtectedWrapperProps {
  children: ReactNode;
}

interface User {
  id: number;
  email: string;
}

const getMe = async (): Promise<User> => {
  const response = await api.get('/auth/me');
  return response.data;
};

export const ProtectedWrapper: FC<ProtectedWrapperProps> = ({ children }) => {
  const location = useLocation();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getMe,
    retry: false,
  });

  if (isLoading) {
    return <Loader fullscreen />;
  }

  if (isError || !user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
