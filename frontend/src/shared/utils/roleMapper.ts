import { USER_ROLES } from '@/shared/service/UserService';

export const roleMapper = (role: keyof typeof USER_ROLES) => {
  const roleMap = {
    USER: 'Пользователь',
    AUTHOR: 'Автор',
    ADMIN: 'Администратор',
  };

  return roleMap[role as keyof typeof roleMap];
};
