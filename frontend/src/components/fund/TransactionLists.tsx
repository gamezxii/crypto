import React from "react";

const transactions = [
  {
    date: "Today",
    transactions: [
      {
        name: "Bitcoin",
        amount: "0.0042 BTC",
        value: "99 USD",
        time: "2:15 PM",
      },
    ],
  },
  {
    date: "Today",
    transactions: [
      {
        name: "Bitcoin",
        amount: "0.0042 BTC",
        value: "99 USD",
        time: "2:15 PM",
      },
    ],
  },
  {
    date: "Today",
    transactions: [
      {
        name: "Bitcoin",
        amount: "0.0042 BTC",
        value: "99 USD",
        time: "2:15 PM",
      },
    ],
  },
  {
    date: "8 Oct 2023",
    transactions: [
      {
        name: "Bitcoin",
        amount: "0.0086 BTC",
        value: "199 USD",
        time: "6:30 PM",
      },
    ],
  },
  {
    date: "7 Oct 2023",
    transactions: [
      {
        name: "Bitcoin",
        amount: "0.0077 BTC",
        value: "159 USD",
        time: "5:40 PM",
      },
    ],
  },
];

const TransactionList = () => (
  <div className="bg-[#202130] p-4 rounded-lg shadow-lg text-white">
    <h2 className="text-xl font-bold mb-4">Transactions</h2>
    <div className="space-y-2 max-h-96 overflow-y-auto">
      {transactions.map((transaction) => (
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
                    src={`path/to/icons/${item.name.toLowerCase()}.png`}
                    alt={item.name}
                    className="w-8 h-8"
                  />
                  <span>{item.name}</span>
                </div>
                <div className="text-right">
                  <div>{item.amount}</div>
                  <div className="text-sm text-gray-400">{item.value}</div>
                  <div className="text-sm text-gray-400">{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TransactionList;
