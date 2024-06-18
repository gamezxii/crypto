import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  UseGuards,
} from "@nestjs/common";
import { PortfolioService } from "./portfolio.service";

import { UserGuard } from "../../commons/guard/user.guard";
import { CustomerId } from "../../decorator/customer-id.decorator";

@UseGuards(UserGuard)
@Controller("portfolio")
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @HttpCode(204)
  @Post()
  create(@Body() createPortfolioDto, @CustomerId() customer_id: string) {
    return this.portfolioService.buyCoin(customer_id, createPortfolioDto);
  }

  @Get("asset-info")
  findOne(@CustomerId() customer_id: string) {
    return this.portfolioService.getPortfolioWithProfit(customer_id);
  }
}
