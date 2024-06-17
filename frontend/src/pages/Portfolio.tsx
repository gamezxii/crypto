import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import AssetList from "../components/fund/AssetList";
import TransactionList from "../components/fund/TransactionLists";
import Deposit from "../components/fund/Deposit";
import { usePortfolio } from "../hooks/usePortfolio";
import assetStore from "../stores/assetStore";

export interface CryptoPrice {
  symbol: string;
  quote: {
    THB: {
      price: number;
    };
  };
  logo: string;
}

const Portfolio: React.FC = observer(() => {
  const { data, error, isLoading, refetch } = usePortfolio();

  useEffect(() => {
    if (data) {
      const { assets, totalAssetValue } = data;
      assetStore.setAssets(assets, totalAssetValue);
    }
    return () => {
      assetStore.setAssets([], 0);
    };
  }, [data]);

  return (
    <div className="p-0">
      <div className="mb-4">
        <Deposit onSuccess={refetch} />
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
        <div className="w-full lg:w-1/3">
          <AssetList />
        </div>
        <div className="w-full lg:w-2/3">
          {assetStore.selectedAsset && (
            <TransactionList selectedAsset={assetStore.selectedAsset} />
          )}
        </div>
      </div>
    </div>
  );
});

export default Portfolio;
