import axios, { AxiosError, AxiosRequestConfig } from 'axios';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
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

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await api.post('/auth/refresh');
        return api(originalRequest);
      } catch (refreshError) {
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
