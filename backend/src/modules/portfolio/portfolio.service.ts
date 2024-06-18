import { HttpStatus, Injectable } from "@nestjs/common";

import { InjectModel } from "@nestjs/sequelize";
import { PortfolioModel } from "../../models/Portfolio.model";
import { TransactionService } from "../transaction/transaction.service";
import { UserService } from "../user/user.service";
import { throwBadRequest } from "../../commons/utils";
import { ErrorCode } from "../../enums/error-codes.enum";
import { TransactionModel } from "../../models/Transaction.model";
import { Sequelize } from "sequelize-typescript";
import { Transaction } from "../../enums/transaction.enum";
import { MarketService } from "../market/market.service";

@Injectable()
export class PortfolioService {
  private readonly coinMarketendPoint =
    "https://s2.coinmarketcap.com/static/img/coins/64x64";
  constructor(
    @InjectModel(PortfolioModel) private portModel: typeof PortfolioModel,
    private readonly userService: UserService,
    private readonly tranService: TransactionService,
    private sequelize: Sequelize,
    private marketSerivce: MarketService
  ) {}

  async getPortfolioWithProfit(userId: string): Promise<any> {
    const portfolio = await this.portModel.findAll({
      where: { user_id: userId },
    });

    const getMarketPrices = await this.marketSerivce.findAll();

    const currentPrices = getMarketPrices.reduce((acc, crypto) => {
      acc[crypto.symbol] = {
        name: crypto.name,
        symbol: crypto.symbol,
        price: crypto.quote.THB.price,
        picture: `${this.coinMarketendPoint}/${crypto.id}.png`,
      };
      return acc;
    }, {});

    let totalAssetValue = 0;

    const portfolioWithProfit = portfolio.map((item) => {
      const coin = currentPrices[item.coin];
      const currentPrice = coin.price;
      const profitOrLoss =
        (currentPrice - item.average_purchase_price) * item.amount;
      const percentProfitOrLoss =
        ((currentPrice - item.average_purchase_price) /
          item.average_purchase_price) *
        100;
      const assetValue = currentPrice * item.amount;

      totalAssetValue += assetValue;

      return {
        ...item.dataValues,
        currentPrice,
        profitOrLoss,
        percentProfitOrLoss,
        assetValue,
        name: coin.name,
        picture: coin.picture,
      };
    });

    return {
      assets: portfolioWithProfit,
      totalAssetValue,
    };
  }

  async buyCoin(userId: string, buyCoinDto): Promise<void> {
    const user = await this.userService.getUserByUserId(userId);
    if (!user) {
      throwBadRequest(
        ErrorCode.NOT_FOUND,
        HttpStatus.NOT_FOUND,
        "User not found"
      );
    }

    try {
      return await this.sequelize.transaction(async (transaction) => {
        let portfolioItem = await this.portModel.findOne({
          where: { user_id: userId, coin: buyCoinDto.coin },
          lock: transaction.LOCK.UPDATE,
          transaction,
        });

        if (portfolioItem) {
          const totalAmount = +portfolioItem.amount + +buyCoinDto.amount;
          const newAveragePrice =
            (portfolioItem.amount * portfolioItem.average_purchase_price +
              buyCoinDto.amount * buyCoinDto.purchasePrice) /
            totalAmount;

          portfolioItem.amount = totalAmount;
          portfolioItem.average_purchase_price = newAveragePrice;

          await portfolioItem.save({ transaction });
        } else {
          portfolioItem = await this.portModel.create(
            {
              user_id: user.id,
              coin: buyCoinDto.coin,
              amount: buyCoinDto.amount,
              average_purchase_price: buyCoinDto.purchasePrice,
            },
            { transaction }
          );
        }

        const transactionBody = new TransactionModel({
          user_id: user.id,
          portfolio_id: portfolioItem.id,
          coin: buyCoinDto.coin,
          transaction_type: Transaction.BUY,
          amount: buyCoinDto.amount,
          price: buyCoinDto.purchasePrice,
        });

        await this.tranService.createTransaction(
          transactionBody.dataValues,
          transaction
        );
      });
    } catch (err) {
      throwBadRequest(
        ErrorCode.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
        "Error something went wrong."
      );
    }
  }
}
