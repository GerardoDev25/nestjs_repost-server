import { Module } from '@nestjs/common';
import { StoreReportsService } from './store-reports.service';
import { StoreReportsController } from './store-reports.controller';
import { PrinterModule } from 'src/printer/printer.module';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule, PrinterModule],
  controllers: [StoreReportsController],
  providers: [StoreReportsService],
})
export class StoreReportsModule {}
