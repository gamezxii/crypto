export interface TransactionAllResponse extends Transaction {}

export interface ITransactionStore {
  date: string;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  user_id: string;
  coin: string;
  transaction_type: string;
  amount: string;
  price: string;
  created_at: string;
}
