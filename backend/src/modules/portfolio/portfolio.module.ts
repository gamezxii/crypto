import { Module } from "@nestjs/common";
import { PortfolioService } from "./portfolio.service";
import { PortfolioController } from "./portfolio.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { PortfolioModel } from "../../models/Portfolio.model";
import { TransactionModule } from "../transaction/transaction.module";
import { UserModule } from "../user/user.module";

@Module({
  imports: [
    SequelizeModule.forFeature([PortfolioModel]),
    TransactionModule,
    UserModule,
  ],
  controllers: [PortfolioController],
  providers: [PortfolioService],
})
export class PortfolioModule {}
