import { FC } from "react";
import { useTransactionAll } from "../../hooks/useTransaction";
import transactionStore from "../../stores/transactionStore";
import dayjs from "dayjs";
import _ from "lodash";
import { ITransactionStore } from "../../types/transaction.type";
import { Asset } from "../../types/portfolio.type";
import { addComma } from "../../utils/format";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import assetStore from "../../stores/assetStore";
dayjs.extend(utc);
dayjs.extend(timezone);
interface ITransactionListProps {
  selectedAsset: Asset | null;
}

const TransactionList: FC<ITransactionListProps> = ({ selectedAsset }) => {
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const { data } = useTransactionAll(assetStore.selectedAsset?.id!);

  if (data) {
    const formattedTransactions = data.map((transaction) => {
      const { created_at } = transaction;
      const date = dayjs(created_at);
      const formattedDate = date.isSame(dayjs(), "day")
        ? "Today"
        : date.format("DD MMM YY");

      return {
        date: formattedDate,
        transaction: {
          ...transaction,
        },
      };
    });

    const groupedTransactions: ITransactionStore[] = _(formattedTransactions)
      .groupBy("date")
      .map((value, key) => ({
        date: key,
        transactions: value.map((v) => v.transaction),
      }))
      .orderBy(["date"], ["desc"])
      .value();

    transactionStore.setTransactions(groupedTransactions);
    console.log(groupedTransactions);
  }

  return (
    <div className="bg-[#202130] p-4 rounded-lg shadow-lg text-white">
      <h2 className="text-xl font-bold mb-4">Transactions</h2>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {transactionStore.transactionLists.map((transaction) => (
          <div key={transaction.date} className="mb-4">
            <h3 className="mb-2 text-lg font-semibold">{transaction.date}</h3>
            <div className="space-y-2">
              {transaction.transactions.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 rounded bg-[#2A2B3C] hover:bg-[#3A3B4C]"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={selectedAsset?.picture}
                      alt={item.coin}
                      className="w-8 h-8"
                    />
                    <span>{selectedAsset?.name}</span>
                  </div>
                  <div className="text-right">
                    <div>
                      {parseFloat(item.amount).toFixed(2)} {item.coin}
                    </div>
                    <div className="text-sm text-gray-400">
                      {addComma(parseFloat(item.price))} THB
                    </div>
                    <div className="text-sm text-gray-400">
                      {/* {item.created_at} */}
                      {dayjs(item.created_at)
                        .tz(userTimezone)
                        .format("YYYY-MM-DD HH:mm")}{" "}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
