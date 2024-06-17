import {
  PortfolioFundPayload,
  PortfolioAssetInfoResponse,
} from "../types/portfolio.type";
import axiosInstance from "../utils/axiosInstance";

const portfolioService = {
  assets: async (): Promise<PortfolioAssetInfoResponse> => {
    const { data } = await axiosInstance.get("/v1/portfolio/asset-info");
    return data;
  },
  fund: async (payload: PortfolioFundPayload): Promise<void> => {
    const { data } = await axiosInstance.post("/v1/portfolio", payload);
    return data;
  },
};

export default portfolioService;
