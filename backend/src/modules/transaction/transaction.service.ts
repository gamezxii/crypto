import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { TransactionModel } from 'src/models/Transaction.model';
import sequelize from 'sequelize';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(TransactionModel) private transModel: typeof TransactionModel,
  ) {}

  async createTransaction(
    transactionBody: any,
    transaction: sequelize.Transaction,
  ) {
    return await this.transModel.create(transactionBody, { transaction });
  }
}
