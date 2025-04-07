import { notification } from 'antd';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
  retryCount?: number;
}

const API_BASE_URL = 'http://localhost:3001/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

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
    const originalRequest = error.config as CustomAxiosRequestConfig;
    const MAX_RETRY_ATTEMPTS = 2;

    if (
      error.response?.status === 401 &&
      (!originalRequest._retry || originalRequest.retryCount === undefined)
    ) {
      originalRequest._retry = true;
      originalRequest.retryCount = (originalRequest.retryCount || 0) + 1;

      if (originalRequest.retryCount <= MAX_RETRY_ATTEMPTS) {
        try {
          await api.post('/auth/refresh');
          return api(originalRequest);
        } catch (refreshError) {
          notification.error({
            message: 'Ошибка',
            description: 'Произошла ошибка при выполнении запроса',
          });
          setTimeout(() => {
            window.location.href = '/';
          }, 1500);
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  },
);
