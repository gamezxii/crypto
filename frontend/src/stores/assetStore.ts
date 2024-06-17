// src/stores/assetStore.ts
import { makeAutoObservable, autorun } from "mobx";
import Mocktest from "../components/mock_test";
import { Asset } from "../types/portfolio.type";

export interface FavoriteAsset {
  [key: string]: boolean;
}

export interface CryptoCurrency {
  id: number;
  name: string;
  symbol: string;
  slug: string;
  num_market_pairs: number;
  date_added: string;
  tags: string[];
  max_supply: number | null;
  circulating_supply: number;
  total_supply: number;
  infinite_supply: boolean;
  platform: any;
  cmc_rank: number;
  self_reported_circulating_supply: any;
  self_reported_market_cap: any;
  tvl_ratio: any;
  last_updated: string;
  quote: Quote;
}

export interface Quote {
  THB: Thb;
}

export interface Thb {
  price: number;
  volume_24h: number;
  volume_change_24h: number;
  percent_change_1h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_60d: number;
  percent_change_90d: number;
  market_cap: number;
  market_cap_dominance: number;
  fully_diluted_market_cap: number;
  tvl: any;
  last_updated: string;
}

class AssetStore {
  marketPricesFavorite: FavoriteAsset = {};
  marketPricesLists: CryptoCurrency[] = Mocktest;
  assetsInfo: Asset[] = [];
  totalAssetValue: number = 0;

  constructor() {
    makeAutoObservable(this);

    const savedFavorites = localStorage.getItem("marketPricesFavorite");
    if (savedFavorites) {
      this.marketPricesFavorite = JSON.parse(savedFavorites);
    }

    autorun(() => {
      localStorage.setItem(
        "marketPricesFavorite",
        JSON.stringify(this.marketPricesFavorite)
      );
    });
  }

  toggleFavorite(name: string) {
    if (this.marketPricesFavorite[name]) {
      delete this.marketPricesFavorite[name];
    } else {
      this.marketPricesFavorite[name] = true;
    }
  }

  setAssets(assets: Asset[], totalAssetValue: number) {
    this.assetsInfo = assets;
    this.totalAssetValue = totalAssetValue;
  }
}

const assetStore = new AssetStore();
export default assetStore;
