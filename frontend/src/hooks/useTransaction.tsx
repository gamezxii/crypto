import { useQuery } from "@tanstack/react-query";

import { TransactionAllResponse } from "../types/transaction.type";
import transactionService from "../services/transaction.service";

export const useTransactionAll = (id: string) => {
  return useQuery<TransactionAllResponse[], Error>({
    queryKey: ["transaction-by-id", id],
    queryFn: () => {
      return transactionService.transactions(id);
    },
    enabled: id !== null,
  });
};
