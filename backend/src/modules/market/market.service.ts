import { Injectable } from "@nestjs/common";
import axios from "axios";
import { IMarketCoinMarketCapResponse } from "src/interfaces/Market.interface";

@Injectable()
export class MarketService {
  private readonly apiUrl = process.env.END_POINT_MARKET;
  private readonly apiKey = process.env.CMC_PRO_API_KEY;

  async findAll(): Promise<IMarketCoinMarketCapResponse[]> {
    try {
      const response = await axios.get(this.apiUrl, {
        headers: {
          "X-CMC_PRO_API_KEY": this.apiKey,
        },
        params: {
          start: 1,
          limit: 100,
          convert: "THB",
        },
      });

      return response.data?.data || [];
    } catch (error) {
      throw new Error("Could not fetch data");
    }
  }
}
