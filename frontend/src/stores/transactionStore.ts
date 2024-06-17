import { makeAutoObservable } from "mobx";
import { ITransactionStore } from "../types/transaction.type";

class TransactionStore {
  seletedPortfolioId: number | null = null;
  transactionLists: ITransactionStore[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setTransactions(data: ITransactionStore[]) {
    this.transactionLists = data;
  }
}

const transactionStore = new TransactionStore();
export default transactionStore;
