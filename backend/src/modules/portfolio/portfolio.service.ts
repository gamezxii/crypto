import { HttpStatus, Injectable } from '@nestjs/common';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';
import { InjectModel } from '@nestjs/sequelize';
import { PortfolioModel } from 'src/models/Portfolio.model';
import { TransactionService } from '../transaction/transaction.service';
import { UserService } from '../user/user.service';
import { mock_cryptos, throwBadRequest } from 'src/commons/utils';
import { ErrorCode } from 'src/enums/error-codes.enum';
import { TransactionModel } from 'src/models/Transaction.model';
import { Sequelize } from 'sequelize-typescript';
import { Transaction } from 'src/enums/transaction.enum';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectModel(PortfolioModel) private portModel: typeof PortfolioModel,
    private readonly userService: UserService,
    private readonly tranService: TransactionService,
    private sequelize: Sequelize,
  ) {}

  async mock_prices() {
    return mock_cryptos;
  }

  async getPortfolioWithProfit(userId: string): Promise<any> {
    const portfolio = await this.portModel.findAll({
      where: { user_id: userId },
    });

    const currentPrices = mock_cryptos.reduce((acc, crypto) => {
      acc[crypto.symbol] = crypto.quote.THB.price;
      return acc;
    }, {});

    let totalAssetValue = 0;

    const portfolioWithProfit = portfolio.map((item) => {
      const currentPrice = currentPrices[item.coin];
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
        'User not found',
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
            { transaction },
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
          transaction,
        );
      });
    } catch (err) {
      throwBadRequest(
        ErrorCode.BAD_REQUEST,
        HttpStatus.BAD_REQUEST,
        'Error something went wrong.',
      );
    }
  }
}

//https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png
