import { useMutation } from "@tanstack/react-query";

import {
  AuthCreateResponse,
  AuthCreateUser,
  AuthLogin,
  AuthLoginResponse,
} from "../types/auth.type";
import authService from "../services/auth.service";

export const useAuthLoginMutation = () => {
  return useMutation<AuthLoginResponse, Error, AuthLogin>({
    mutationFn: (payload: AuthLogin) => authService.login(payload),
  });
};

export const useAuthCreateUserMutation = () => {
  return useMutation<AuthCreateResponse, Error, AuthCreateUser>({
    mutationFn: (payload: AuthCreateUser) => authService.signup(payload),
  });
};
