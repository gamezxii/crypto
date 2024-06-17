import React from "react";

const assets = [
  {
    name: "Bitcoin",
    amount: "0.32 BTC",
    value: "8,230.8 USD",
    icon: "bitcoin.png",
  },
  {
    name: "Ethereum",
    amount: "3.20 ETH",
    value: "6,023.87 USD",
    icon: "ethereum.png",
  },
  {
    name: "Binance coin",
    amount: "685.26 BNB",
    value: "205.79 USD",
    icon: "binance.png",
  },
  {
    name: "Cardano",
    amount: "10,390.96 ADA",
    value: "6,304 USD",
    icon: "cardano.png",
  },
  {
    name: "Solana",
    amount: "3,795.28 SOL",
    value: "18.87 USD",
    icon: "solana.png",
  },
  {
    name: "Tron",
    amount: "7,800.18 TRX",
    value: "4,075 USD",
    icon: "tron.png",
  },
  {
    name: "Tron",
    amount: "7,800.18 TRX",
    value: "4,075 USD",
    icon: "tron.png",
  },
  {
    name: "Tron",
    amount: "7,800.18 TRX",
    value: "4,075 USD",
    icon: "tron.png",
  },
  {
    name: "Tron",
    amount: "7,800.18 TRX",
    value: "4,075 USD",
    icon: "tron.png",
  },
  {
    name: "Tron",
    amount: "7,800.18 TRX",
    value: "4,075 USD",
    icon: "tron.png",
  },
  // Add more assets as needed
];

const AssetList = () => (
  <div className=" p-4 rounded-lg bg-[#202130] shadow-lg text-white">
    <h2 className="text-xl font-bold mb-4">Assets</h2>
    <div className="space-y-2 max-h-96 overflow-y-auto">
      {assets.map((asset) => (
        <div
          key={asset.name}
          className={`flex items-center justify-between p-2 rounded-lg bg-[#2A2B3C] hover:bg-[#3A3B4C]`}
        >
          <div className="flex items-center space-x-4">
            <img
              src={`path/to/icons/${asset.icon}`}
              alt={asset.name}
              className="w-8 h-8"
            />
            <span>{asset.name}</span>
          </div>
          <div className="text-right">
            <div>{asset.amount}</div>
            <div className="text-sm text-gray-400">{asset.value}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default AssetList;
