import { create } from 'zustand';
import { theme } from 'antd';
import { persist } from 'zustand/middleware';

type ThemeMode = 'light' | 'dark';

interface ThemeState {
  mode: ThemeMode;
  algorithm: typeof theme.defaultAlgorithm | typeof theme.darkAlgorithm;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'light',
      algorithm: theme.defaultAlgorithm,
      toggleTheme: () => {
        set((state) => ({
          mode: state.mode === 'light' ? 'dark' : 'light',
          algorithm:
            state.mode === 'light'
              ? theme.darkAlgorithm
              : theme.defaultAlgorithm,
        }));
      },
    }),
    {
      name: 'theme-storage',
    },
  ),
);
