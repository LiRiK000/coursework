import { create } from 'zustand';
import { AuthModalType } from '../model/types';

type State = {
  isOpen: boolean;
  ModalType: AuthModalType;
};

type Action = {
  openAuthModal: (type: AuthModalType) => void;
  closeAuthModal: () => void;
};

export const useAuthModal = create<State & Action>((set) => ({
  isOpen: false,
  ModalType: AuthModalType.LOGIN,
  openAuthModal: (type: AuthModalType) =>
    set({ isOpen: true, ModalType: type }),
  closeAuthModal: () => set({ isOpen: false }),
}));
