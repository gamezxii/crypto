import { useQuery, useMutation } from "@tanstack/react-query";
import portfolioService from "../services/portfolio.service";
import {
  PortfolioAssetInfoResponse,
  PortfolioFundPayload,
} from "../types/portfolio.type";

export const usePortfolio = () => {
  return useQuery<PortfolioAssetInfoResponse, Error>({
    queryKey: ["asset-info"],
    queryFn: portfolioService.assets,
  });
};

export const usePortfolioFundMutation = () => {
  return useMutation<void, Error, PortfolioFundPayload>({
    mutationFn: (payload: PortfolioFundPayload) =>
      portfolioService.fund(payload),
  });
};
