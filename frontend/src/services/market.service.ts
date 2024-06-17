import { CryptoCurrency } from "../types/market.type";
import axiosInstance from "../utils/axiosInstance";

const marketService = {
  all: async (): Promise<CryptoCurrency[]> => {
    const { data } = await axiosInstance.get("/v1/market");
    return data;
  },
};

export default marketService;
