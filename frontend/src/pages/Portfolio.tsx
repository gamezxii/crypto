import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import AssetList from "../components/fund/AssetList";
import TransactionList from "../components/fund/TransactionLists";
import Deposit from "../components/fund/Deposit";

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
  return (
    <div className="p-0">
      <div className="mb-4">
        <Deposit />
      </div>
      <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
        <div className="w-full lg:w-1/3">
          <AssetList />
        </div>
        <div className="w-full lg:w-2/3">
          <TransactionList />
        </div>
      </div>
    </div>
  );
});

export default Portfolio;
