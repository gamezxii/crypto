import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { UserGuard } from "../../commons/guard/user.guard";
import { CustomerId } from "../../decorator/customer-id.decorator";

@UseGuards(UserGuard)
@Controller("transaction")
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get("/portfolio/:id")
  async getTransactionByPortId(
    @Param("id") id: string,
    @CustomerId() customer_id: string
  ) {
    return await this.transactionService.getTransactionByPortfolioId(
      customer_id,
      id
    );
  }
}
