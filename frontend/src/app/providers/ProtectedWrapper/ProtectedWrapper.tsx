import { FC, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Loader } from '@/shared/ui/Loader';
import { authService } from '@/shared/service/AuthService';
import { useUser } from '@/entities/User';
import { useShallow } from 'zustand/shallow';

interface ProtectedWrapperProps {
  children: ReactNode;
  requiredRole?: string;
}

export const ProtectedWrapper: FC<ProtectedWrapperProps> = ({
  children,
  requiredRole,
}) => {
  const location = useLocation();
  const setUser = useUser(useShallow((state) => state.setUser));

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

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/not-allowed" state={{ from: location }} replace />;
  }

  setUser(user);

  return <>{children}</>;
};
