import { makeAutoObservable } from "mobx";

class PortfolioStore {
  portfolio: Array<{
    coin: string;
    amount: number;
    averagePurchasePrice: number;
    logo: string;
  }> = [];
  totalAssetValue: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  addCoin(
    coin: string,
    amount: number,
    averagePurchasePrice: number,
    logo: string
  ) {
    const existingCoin = this.portfolio.find((item) => item.coin === coin);

    if (existingCoin) {
      const totalAmount = existingCoin.amount + amount;
      existingCoin.averagePurchasePrice =
        (existingCoin.averagePurchasePrice * existingCoin.amount +
          averagePurchasePrice * amount) /
        totalAmount;
      existingCoin.amount = totalAmount;
    } else {
      this.portfolio.push({ coin, amount, averagePurchasePrice, logo });
    }

    this.calculateTotalAssetValue();
  }

  calculateTotalAssetValue() {
    this.totalAssetValue = this.portfolio.reduce(
      (total, item) => total + item.amount * item.averagePurchasePrice,
      0
    );
  }
}

const portfolioStore = new PortfolioStore();
export default portfolioStore;
