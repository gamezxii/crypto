import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreatePortfolioDto } from './dto/create-portfolio.dto';
import { UpdatePortfolioDto } from './dto/update-portfolio.dto';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @HttpCode(204)
  @Post()
  create(@Body() createPortfolioDto) {
    return this.portfolioService.buyCoin(
      '7704e556-dcdf-4b29-b988-129351fbb2ec',
      createPortfolioDto,
    );
  }
  @Get('/lists')
  findAll() {
    return this.portfolioService.mock_prices();
  }

  @Get('asset-info')
  findOne() {
    return this.portfolioService.getPortfolioWithProfit(
      '7704e556-dcdf-4b29-b988-129351fbb2ec',
    );
  }

  // @Get()
  // findAll() {
  //   return this.portfolioService.findAll();
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updatePortfolioDto: UpdatePortfolioDto,
  // ) {
  //   return this.portfolioService.update(+id, updatePortfolioDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.portfolioService.remove(+id);
  // }
}
