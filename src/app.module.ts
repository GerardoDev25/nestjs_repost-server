import { Module } from '@nestjs/common';
import { BasicReportsModule } from './basic-reports/basic-reports.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PrinterModule } from './printer/printer.module';
import { StoreReportsModule } from './store-reports/store-reports.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BasicReportsModule,
    PrismaModule,
    PrinterModule,
    StoreReportsModule,
  ],
})
export class AppModule {}
