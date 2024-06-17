import { Test, TestingModule } from "@nestjs/testing";
import { PortfolioController } from "./portfolio.controller";
import { PortfolioService } from "./portfolio.service";
import { TransactionModule } from "../transaction/transaction.module";
import { UserModule } from "../user/user.module";
import { PortfolioModel } from "../../models/Portfolio.model";
import { SequelizeModule } from "@nestjs/sequelize";

describe("PortfolioController", () => {
  let controller: PortfolioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forFeature([PortfolioModel]),
        TransactionModule,
        UserModule,
      ],
      controllers: [PortfolioController],
      providers: [PortfolioService],
    }).compile();

    controller = module.get<PortfolioController>(PortfolioController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
