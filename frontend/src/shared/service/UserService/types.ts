export const USER_ROLES = {
  USER: 'USER',
  AUTHOR: 'AUTHOR',
  ADMIN: 'ADMIN',
} as const;

export type UserProfile = {
  id: string;
  email: string;
  fullname: string;
  role: keyof typeof USER_ROLES;
  avatar?: string;
};

export type UserUpdateDto = {
  fullname?: string;
  email?: string;
  avatar?: File;
};

export type PasswordChangeDto = {
  currentPassword: string;
  newPassword: string;
};

export type GetAllUsersResponse = {
  status: string,
  data: (UserProfile & {createdAt: string})[]
}
