import { useQuery } from "@tanstack/react-query";

import marketService from "../services/market.service";
import { CryptoCurrency } from "../types/market.type";

export const useMarketAll = () => {
  return useQuery<CryptoCurrency[], Error>({
    queryKey: ["market-all"],
    queryFn: marketService.all,
  });
};
