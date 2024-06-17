import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Pie } from "react-chartjs-2";
import "chart.js/auto";
import { generateColors, addComma } from "../utils/format";
import { usePortfolio } from "../hooks/usePortfolio";
import assetStore from "../stores/assetStore";

const Portfolio: React.FC = observer(() => {
  const labels = assetStore.assetsInfo.map((x) => x.coin);
  const colors = generateColors(labels.length);

  const dataChart = {
    labels: labels,
    datasets: [
      {
        data: assetStore.assetsInfo.map((x) => x.assetValue),
        backgroundColor: colors,
        hoverBackgroundColor: colors,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed !== null) {
              label += context.parsed + " THB";
            }
            return label;
          },
        },
      },
    },
  };

  const { data, error, isLoading } = usePortfolio();

  useEffect(() => {
    if (data) {
      const { assets, totalAssetValue } = data;
      assetStore.setAssets(assets, totalAssetValue);
    }
    return () => {
      assetStore.setAssets([], 0);
    };
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Err Something wentwrong...</div>;
  }

  return (
    <div className="p-6 bg-[#202130] rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-green-500 mb-4">พอร์ตโฟลิโอ</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="col-span-1 lg:w-52 lg:h-auto w-full">
          <h3 className="text-lg font-bold text-white">มูลค่าทั้งหมด</h3>
          <p className="text-4xl font-bold text-white">
            {addComma(
              assetStore.assetsInfo.reduce(
                (acc, curr) => acc + curr.assetValue,
                0
              )
            )}{" "}
            THB
          </p>
          <Pie data={dataChart} options={options} />
        </div>
        <div className="col-span-2 max-h-96 overflow-y-auto">
          <div>
            <h3 className="text-lg font-bold text-white">เหรียญ</h3>
            <table className="min-w-full bg-[#202130] text-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b text-nowrap">สกุลเงิน</th>
                  <th className="py-2 px-4 border-b text-nowrap">จำนวนถือ</th>
                  <th className="py-2 px-4 border-b text-nowrap">
                    มูลค่า (THB)
                  </th>
                  <th className="py-2 px-4 border-b text-nowrap">กำไร (THB)</th>
                  <th className="py-2 px-4 border-b text-nowrap">
                    การเปลี่ยนแปลง
                  </th>
                </tr>
              </thead>
              <tbody>
                {assetStore.assetsInfo.map((asset) => (
                  <tr key={asset.coin}>
                    <td className="py-2 px-4 border-b flex items-center space-x-2">
                      <span>{asset.coin}</span>
                    </td>
                    <td className="py-2 px-4 border-b text-nowrap">
                      {parseFloat(asset.amount).toFixed(8)} {asset.coin}
                    </td>
                    <td className="py-2 px-4 border-b text-nowrap">
                      {addComma(asset.assetValue)}
                    </td>
                    <td
                      className={`py-2 px-4 border-b ${
                        asset.percentProfitOrLoss >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      } text-nowrap`}
                    >
                      {addComma(asset.profitOrLoss)}
                    </td>
                    <td
                      className={`py-2 px-4 border-b ${
                        asset.percentProfitOrLoss >= 0
                          ? "text-green-500"
                          : "text-red-500"
                      } text-nowrap`}
                    >
                      {asset.percentProfitOrLoss >= 0 ? `▲` : `▼`}{" "}
                      {Math.abs(asset.percentProfitOrLoss).toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Portfolio;
