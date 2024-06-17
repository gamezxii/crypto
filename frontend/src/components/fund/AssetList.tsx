import React, { FC } from "react";
import assetStore from "../../stores/assetStore";
import { observer } from "mobx-react-lite";
import { addComma } from "../../utils/format";

const AssetList: FC = observer(() => {
  return (
    <div className=" p-4 rounded-lg bg-[#202130] shadow-lg text-white">
      <h2 className="text-xl font-bold mb-4">Assets</h2>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {assetStore.assetsInfo.map((asset) => (
          <div
            key={asset.picture}
            className={`flex items-center justify-between p-2 rounded-lg bg-[#2A2B3C] hover:bg-[#3A3B4C] hover:cursor-pointer`}
            onClick={() => assetStore.onSetSelectedAssetId(asset)}
          >
            <div className="flex items-center space-x-4">
              <img src={asset.picture} alt={asset.coin} className="w-8 h-8" />
              <span>{asset.name}</span>
            </div>
            <div className="text-right">
              <div>
                {parseFloat(asset.amount).toFixed(2)} {asset.coin}
              </div>
              <div className="text-sm text-gray-400">
                {addComma(asset.assetValue)} THB
              </div>
            </div>
          </div>
        ))}
        {assetStore.assetsInfo.length <= 0 && (
          <div
            className={`flex items-center justify-center p-2 rounded-lg bg-[#2A2B3C] hover:bg-[#3A3B4C]`}
          >
            Not found
          </div>
        )}
      </div>
    </div>
  );
});

export default AssetList;
