import { Module } from '@nestjs/common';
import { BasicReportsModule } from './basic-reports/basic-reports.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PrinterModule } from './printer/printer.module';
import { StoreReportsModule } from './store-reports/store-reports.module';
import { ExtraReportModule } from './extra-report/extra-report.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BasicReportsModule,
    PrismaModule,
    PrinterModule,
    StoreReportsModule,
    ExtraReportModule,
  ],
})
export class AppModule {}
