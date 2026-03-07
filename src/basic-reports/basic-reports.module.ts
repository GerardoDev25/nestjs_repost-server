import { Module } from '@nestjs/common';
import { BasicReportsService } from './basic-reports.service';
import { BasicReportsController } from './basic-reports.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrinterModule } from 'src/printer/printer.module';

@Module({
  imports: [PrismaModule, PrinterModule],
  controllers: [BasicReportsController],
  providers: [BasicReportsService],
})
export class BasicReportsModule {}
