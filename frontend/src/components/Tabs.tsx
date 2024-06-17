import { useState } from "react";
import { observer } from "mobx-react-lite";
import assetStore from "../stores/assetStore";
import { addComma } from "../utils/format";
import marketStore from "../stores/marketStore";

const Tabs = observer(() => {
  const [activeTab, setActiveTab] = useState("market");

  return (
    <div className="bg-[#202130] p-4 rounded-lg shadow-lg ">
      <div className="flex border-b">
        <button
          className={`py-2 px-4 ${
            activeTab === "favorite"
              ? "border-b-2 border-green-500 text-green-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("favorite")}
        >
          ★ชื่นชอบ
        </button>
        <button
          className={`py-2 px-4 ${
            activeTab === "market"
              ? "border-b-2 border-green-500 text-green-500"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("market")}
        >
          ตลาด THB
        </button>
      </div>
      <div className="mt-4">
        {activeTab === "market" && (
          <div>
            <MarketTable />
          </div>
        )}
        {activeTab === "favorite" && (
          <div>
            <FavoriteTable />
          </div>
        )}
      </div>
    </div>
  );
});

const MarketTable = observer(() => {
  return (
    <div className="overflow-x-auto">
      <div className="max-h-72 overflow-y-auto">
        <table className=" min-w-full bg-[#202130]">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b"></th>
              <th className="py-2 px-4 border-b">สกุลเงิน</th>
              <th className="py-2 px-4 border-b">ราคาล่าสุด (THB)</th>
            </tr>
          </thead>
          <tbody>
            {marketStore.marketPricesLists.map((x: any, index: number) => (
              <tr key={index} className="text-center">
                <td className="py-2 px-4 border-b text-left">
                  <button onClick={() => assetStore.toggleFavorite(x.name)}>
                    {assetStore.marketPricesFavorite[x.name] ? "★" : "☆"}
                  </button>
                </td>
                <td className="py-2 px-4 border-b ">
                  <span className="inline-flex items-center space-x-2">
                    <img
                      className="w-6 h-6"
                      src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${x.id}.png`}
                      alt=""
                    />
                    <span>{x.symbol}</span>
                  </span>
                </td>
                <td
                  className={`py-2 px-4 border-b ${
                    x.quote.THB.percent_change_24h < 0
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  {addComma(x.quote.THB.price)}(
                  {x.quote.THB.percent_change_24h < 0 ? "▼" : "▲"}
                  {Math.abs(x.quote.THB.percent_change_24h).toFixed(2)}%)
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

const FavoriteTable = observer(() => (
  <div className="overflow-x-auto">
    <div className="max-h-72 overflow-y-auto">
      <table className="min-w-full bg-[#202130]">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b"></th>
            <th className="py-2 px-4 border-b text-nowrap">สกุลเงิน</th>
            <th className="py-2 px-4 border-b text-nowrap">ราคาล่าสุด (THB)</th>
          </tr>
        </thead>
        <tbody>
          {marketStore.marketPricesLists
            .filter((x) => assetStore.marketPricesFavorite[x.name])
            .map((x) => {
              return (
                <tr key={x.name} className="text-center">
                  <td className="py-2 px-4 border-b text-left">
                    <button onClick={() => assetStore.toggleFavorite(x.name)}>
                      {assetStore.marketPricesFavorite[x.name] ? "★" : "☆"}
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b ">
                    <span className="inline-block align-middle">
                      <img
                        className="w-6 h-6"
                        src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${x.id}.png`}
                        alt=""
                      />
                    </span>
                    <span className="inline-block align-middle ml-2">
                      {x.symbol}
                    </span>
                  </td>

                  <td
                    className={`py-2 px-4 border-b ${
                      x.quote.THB.percent_change_24h < 0
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {x.quote.THB.price.toLocaleString("th-TH", {
                      style: "currency",
                      currency: "THB",
                    })}{" "}
                    ({x.quote.THB.percent_change_24h < 0 ? "▼" : "▲"}
                    {Math.abs(x.quote.THB.percent_change_24h).toFixed(2)}%)
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  </div>
));

export default Tabs;
