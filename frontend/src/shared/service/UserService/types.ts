export type UserProfile = {
  id: string;
  email: string;
  fullname: string;
  role: string;
  avatar?: string;
};

export type UserUpdateDto = {
  fullname?: string;
  email?: string;
};

export type PasswordChangeDto = {
  currentPassword: string;
  newPassword: string;
};
