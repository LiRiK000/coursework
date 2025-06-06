import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { authService } from '../service/AuthService';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
  retryCount?: number;
}

export class RateLimitError extends Error {
  retryAfter: number;

  constructor(retryAfter: number) {
    super('Rate limit exceeded');
    this.name = 'RateLimitError';
    this.retryAfter = retryAfter;
  }
}

const API_BASE_URL = 'http://localhost:3001/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Флаг для отслеживания процесса обновления токена
let isRefreshing = false;
// Очередь запросов, ожидающих обновления токена
let failedQueue: Array<{
  resolve: (value: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(null);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config! as CustomAxiosRequestConfig;
    const MAX_RETRY_ATTEMPTS = 1;

    // Обработка Rate Limit (429)
    if (error.response?.status === 429) {
      const retryAfter = error.response.headers['retry-after'];
      const retryAfterSeconds = parseInt(retryAfter || '60', 10);
      return Promise.reject(new RateLimitError(retryAfterSeconds));
    }

    // Обработка ошибок аутентификации
    if (error.response?.status === 403) {
      if (!originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then(() => {
              return api(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        originalRequest.retryCount = (originalRequest.retryCount || 0) + 1;

        if (originalRequest.retryCount <= MAX_RETRY_ATTEMPTS) {
          isRefreshing = true;

          try {
            await authService.checkAuth();
            isRefreshing = false;
            processQueue();
            return api(originalRequest);
          } catch (refreshError) {
            isRefreshing = false;
            processQueue(refreshError);
            return Promise.reject(refreshError);
          }
        }
      }
    }

    return Promise.reject(error);
  },
);
