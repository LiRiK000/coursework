import { create } from 'zustand';
import { USER_ROLES, UserProfile } from '@/shared/service/UserService';

interface UserState {
  id: string;
  fullname: string;
  email: string;
  role: keyof typeof USER_ROLES;
  avatar?: string;
  setUser: (user: UserProfile) => void;
}

export const useUser = create<UserState>((set) => ({
  id: '',
  fullname: '',
  email: '',
  role: USER_ROLES.USER,
  avatar: undefined,
  setUser: (user) =>
    set({
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    }),
}));
