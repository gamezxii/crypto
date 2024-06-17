export interface PortfolioAssetInfoResponse {
  assets: Asset[];
  totalAssetValue: number;
}

export interface Asset {
  id: string;
  user_id: string;
  coin: string;
  amount: string;
  average_purchase_price: string;
  created_at: string;
  updated_at: string;
  deleted_at: any;
  currentPrice: number;
  profitOrLoss: number;
  percentProfitOrLoss: number;
  assetValue: number;
}

export interface PortfolioFundPayload {
  coin: string;
  amount: number;
  purchasePrice: number;
}
