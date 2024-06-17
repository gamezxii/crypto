import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModel } from './models/User.model';
import { PortfolioModel } from './models/Portfolio.model';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { TransactionModel } from './models/Transaction.model';
import { TransactionModule } from './modules/transaction/transaction.module';
import * as pg from 'pg';
import * as pgTypes from 'pg-types';

pg.defaults.parseInt8 = true;
pgTypes.setTypeParser(pgTypes.builtins.NUMERIC, (value: string) =>
  parseFloat(value),
);

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          dialect: 'postgres',
          host: configService.get('DATABASE_HOST'),
          port: +configService.get('DATABASE_PORT'),
          username: configService.get('DATABASE_USER'),
          password: configService.get('DATABASE_PASSWORD'),
          database: configService.get('DATABASE_DB'),
          timezone: '+07:00',
          logging: configService.get('DATABASE_LOG') == 'true' ? true : false,
          pool: {
            max: +configService.get('DATABASE_POOL_MAX'),
            min: +configService.get('DATABASE_POOL_MIN'),
            acquire: +configService.get('DATABASE_POOL_ACQUIRE'),
            idle: +configService.get('DATABASE_POOL_IDLE'),
          },
          dialectOptions:
            configService.get('SSL_REQUIRED') === 'true'
              ? {
                  ssl: {
                    require: true,
                    rejectUnauthorized: false,
                  },
                }
              : {},
          define: {
            underscored: true,
          },
          models: [UserModel, PortfolioModel, TransactionModel],
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    PortfolioModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
