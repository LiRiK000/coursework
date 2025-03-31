import { create } from 'zustand';

type State = {
  isOpen: boolean;
};

type Action = {
  openAuthModal: () => void;
  closeAuthModal: () => void;
};

export const useAuthModal = create<State & Action>((set) => ({
  isOpen: false,
  openAuthModal: () => set({ isOpen: true }),
  closeAuthModal: () => set({ isOpen: false }),
}));
