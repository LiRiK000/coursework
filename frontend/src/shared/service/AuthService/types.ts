export interface AuthDTO {
  email: string;
  password: string;
  confirmPassword?: string;
  fullname?: string;
}

export interface AuthResponse {
  status: string;
  data: {
    user: {
      id: string;
      email: string;
      role: string;
    };
  };
}

export interface GetMeResponse {
  status: string;
  data: {
    user: {
      id: string;
      email: string;
      fullname: string;
      role: string;
    };
  };
}
