import { RateLimitError } from '@/shared/api/api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { message } from 'antd';
import { ReactNode } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 30 * 60 * 1000,
    },
  },
});

queryClient.setDefaultOptions({
  queries: {
    retry: (failureCount, error: unknown) => {
      if (error instanceof RateLimitError) {
        message.error({
          content: `Слишком много запросов. Попробуйте через ${error.retryAfter} секунд`,
          duration: error.retryAfter,
        });
        return false;
      }
      return failureCount < 3;
    },
  },
  mutations: {
    retry: (failureCount, error: unknown) => {
      if (error instanceof RateLimitError) {
        message.error({
          content: `Слишком много запросов. Попробуйте через ${error.retryAfter} секунд`,
          duration: error.retryAfter,
        });
        return false;
      }
      return failureCount < 3;
    },
  },
});

export const QueryProvider = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
