import { makeAutoObservable, autorun } from "mobx";
import { Asset } from "../types/portfolio.type";

export interface FavoriteAsset {
  [key: string]: boolean;
}

class AssetStore {
  marketPricesFavorite: FavoriteAsset = {};
  assetsInfo: Asset[] = [];
  totalAssetValue: number = 0;
  selectedAsset: Asset | null = null;

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

  onSetSelectedAssetId(data: Asset) {
    this.selectedAsset = data;
  }
}

const assetStore = new AssetStore();
export default assetStore;
