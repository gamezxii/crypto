import {
  AuthCreateResponse,
  AuthCreateUser,
  AuthLogin,
  AuthLoginResponse,
} from "../types/auth.type";
import axiosInstance from "../utils/axiosInstance";

const authService = {
  login: async (payload: AuthLogin): Promise<AuthLoginResponse> => {
    const { data } = await axiosInstance.post("/v1/auth/signin", payload);
    return data;
  },
  signup: async (payload: AuthCreateUser): Promise<AuthCreateResponse> => {
    const { data } = await axiosInstance.post("/v1/auth/signup", payload);
    return data;
  },
};

export default authService;
