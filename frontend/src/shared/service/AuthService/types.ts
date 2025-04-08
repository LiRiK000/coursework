export interface AuthData {
  email: string;
  password: string;
  confirmPassword?: string;
  fullname?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}
