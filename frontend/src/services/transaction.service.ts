import { TransactionAllResponse } from "../types/transaction.type";
import axiosInstance from "../utils/axiosInstance";

const transactionService = {
  transactions: async (id: string): Promise<TransactionAllResponse[]> => {
    const { data } = await axiosInstance.get("/v1/transaction/portfolio/" + id);
    return data;
  },
};

export default transactionService;
