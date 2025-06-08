import { AuthDTO, authService } from '@/shared/service/AuthService';
import { isAxiosError } from 'axios';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  checkAuth: () => Promise<void>;
  login: (credentials: AuthDTO) => Promise<void>;
  register: (credentials: AuthDTO) => Promise<void>;
  logout: () => void;
};
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      isLoading: true,
      error: null as string | null,

      checkAuth: async () => {
        set({ isLoading: true, error: null });
        try {
          await authService.checkAuth();
          set({ isAuthenticated: true, isLoading: false });
        } catch (error) {
          const message = isAxiosError(error)
            ? error.response?.data?.message || error.message
            : 'Auth check failed';
          set({ isAuthenticated: false, isLoading: false, error: message });
        }
      },

      register: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          await authService.register(credentials);
          set({ isAuthenticated: true, isLoading: false });
        } catch (error) {
          const message = isAxiosError(error)
            ? error.response?.data?.message || error.message
            : 'Registration failed';
          set({ isAuthenticated: false, isLoading: false, error: message });
          throw error; // Важно: пробрасываем ошибку дальше
        }
      },

      login: async (credentials) => {
        set({ isLoading: true, error: null });
        try {
          await authService.login(credentials);
          set({ isAuthenticated: true, isLoading: false });
        } catch (error) {
          const message = isAxiosError(error)
            ? error.response?.data?.message || error.message
            : 'Login failed';
          set({ isAuthenticated: false, isLoading: false, error: message });
          throw error;
        }
      },

      logout: async () => {
        set({ isLoading: true, error: null });
        try {
          await authService.logout();
          set({ isAuthenticated: false, isLoading: false });
        } catch (error) {
          const message = isAxiosError(error)
            ? error.response?.data?.message || error.message
            : 'Logout failed';
          set({ isAuthenticated: false, isLoading: false, error: message });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        isLoading: state.isLoading,
      }),
    },
  ),
);

export const useAuth = () => {
  return useAuthStore();
};
