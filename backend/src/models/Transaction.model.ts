import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserModel } from './User.model';
import { PortfolioModel } from './Portfolio.model';
import { Transaction } from 'src/enums/transaction.enum';

@Table({
  paranoid: true,
  tableName: 'transactions',
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
})
export class TransactionModel extends Model<TransactionModel> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.UUID, allowNull: false })
  user_id: string;

  @ForeignKey(() => PortfolioModel)
  @Column({ type: DataType.UUID, allowNull: false })
  portfolio_id: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  coin: string;

  @Column({ type: DataType.ENUM(...Object.values(Transaction)) })
  transaction_type: string;

  @Column({ type: DataType.DECIMAL(18, 10), allowNull: false })
  amount: number;

  @Column({ type: DataType.DECIMAL(18, 10), allowNull: false })
  price: number;

  @Column({ type: DataType.DATE, allowNull: false })
  created_at: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  updated_at: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  deleted_at: Date;
}
