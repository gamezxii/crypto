import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { UserModel } from './User.model';

@Table({
  paranoid: true,
  tableName: 'portfolios',
  underscored: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
})
export class PortfolioModel extends Model<PortfolioModel> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @ForeignKey(() => UserModel)
  @Column({ type: DataType.UUID, allowNull: false })
  user_id: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  coin: string;

  @Column({
    type: DataType.DECIMAL(18, 10),
    allowNull: false,
  })
  amount: number;

  @Column({ type: DataType.DECIMAL(18, 10), allowNull: false })
  average_purchase_price: number;

  @Column({ type: DataType.DATE, allowNull: false })
  created_at: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  updated_at: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  deleted_at: Date;
}
