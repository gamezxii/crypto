export interface AuthLogin {
  username: string;
  password: string;
}

export interface AuthLoginResponse {
  token: string;
  first_name: string;
  last_name: string;
}

export interface AuthCreateUser {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface AuthCreateResponse {
  message: string;
}
