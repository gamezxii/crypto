import { makeAutoObservable } from "mobx";
import { CryptoCurrency } from "../types/market.type";

export interface FavoriteAsset {
  [key: string]: boolean;
}

class MarketStore {
  marketPricesLists: CryptoCurrency[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setMarketPriceLists(data: CryptoCurrency[]) {
    this.marketPricesLists = data;
  }
}

const marketStore = new MarketStore();
export default marketStore;
