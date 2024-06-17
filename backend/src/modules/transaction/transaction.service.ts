import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { TransactionModel } from "../../models/Transaction.model";
import sequelize from "sequelize";

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(TransactionModel) private transModel: typeof TransactionModel
  ) {}

  async createTransaction(
    transactionBody: TransactionModel,
    transaction: sequelize.Transaction
  ): Promise<void> {
    await this.transModel.create(transactionBody, { transaction });
  }

  async getTransactionByPortfolioId(
    user_id: string,
    port_id: string
  ): Promise<TransactionModel[]> {
    return await this.transModel.findAll({
      where: {
        user_id: user_id,
        portfolio_id: port_id,
      },
      attributes: {
        exclude: ["portfolio_id", "updated_at", "deleted_at"],
      },
      order: [["created_at", "desc"]],
    });
  }
}
