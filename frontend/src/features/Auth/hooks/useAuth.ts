import { AuthDTO, authService } from '@/shared/service/AuthService';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type AuthState = {
  isAuthenticated: boolean;
  isLoading: boolean;
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

      checkAuth: async () => {
        try {
          await authService.checkAuth();
          set({ isAuthenticated: true, isLoading: false });
        } catch {
          set({ isAuthenticated: false, isLoading: false });
        }
      },

      register: async (credentials) => {
        try {
          await authService.register(credentials);
          set({ isAuthenticated: true, isLoading: false });
        } catch {
          set({ isAuthenticated: false, isLoading: false });
        }
      },

      login: async (credentials) => {
        try {
          await authService.login(credentials);
          set({ isAuthenticated: true, isLoading: false });
        } catch {
          set({ isAuthenticated: false, isLoading: false });
        }
      },

      logout: async () => {
        try {
          await authService.logout();
          set({ isAuthenticated: false, isLoading: false });
        } catch {
          set({ isAuthenticated: false, isLoading: false });
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
  const { isAuthenticated, isLoading, checkAuth, login, register, logout } =
    useAuthStore();
  return { isAuthenticated, isLoading, checkAuth, login, register, logout };
};
