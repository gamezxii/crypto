import { Injectable } from "@nestjs/common";
import { mock_cryptos } from "../../commons/utils";

@Injectable()
export class MarketService {
  findAll() {
    return mock_cryptos;
  }
}
