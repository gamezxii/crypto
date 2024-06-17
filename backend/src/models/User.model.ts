import {
  BeforeSave,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { generateHash } from "../commons/utils";

@Table({
  paranoid: true,
  tableName: "users",
  underscored: true,
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  deletedAt: "deleted_at",
})
export class UserModel extends Model<UserModel> {
  @Column({
    type: DataType.UUID,
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @Column({ type: DataType.STRING(100), allowNull: false, unique: true })
  username: string;

  @Column({ type: DataType.STRING(255), allowNull: false })
  password: string;

  @Column({ type: DataType.STRING(100), allowNull: true, unique: false })
  first_name: string;

  @Column({ type: DataType.STRING(100), allowNull: false, unique: true })
  last_name: string;

  @Column({ type: DataType.DATE, allowNull: false })
  created_at: Date;

  @Column({ type: DataType.DATE, allowNull: false })
  updated_at: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  deleted_at: Date;

  @BeforeSave
  static async hashPassword(user: UserModel) {
    if (user.changed("password") || user.isNewRecord) {
      user.password = generateHash(user.password);
    }
  }
}
