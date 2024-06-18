import { Controller, Get, UseGuards } from "@nestjs/common";
import { MarketService } from "./market.service";
import { UserGuard } from "../../commons/guard/user.guard";

@UseGuards(UserGuard)
@Controller("market")
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Get()
  findAll() {
    return this.marketService.findAll();
  }
}
