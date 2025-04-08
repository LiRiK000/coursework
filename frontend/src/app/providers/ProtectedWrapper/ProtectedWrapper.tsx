import { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Loader } from '@/shared/ui/Loader';
import { authService } from '@/shared/service/AuthService';

interface ProtectedWrapperProps {
  children: ReactNode;
}

export const ProtectedWrapper: FC<ProtectedWrapperProps> = ({ children }) => {
  const location = useLocation();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['user'],
    queryFn: authService.checkAuth,
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
