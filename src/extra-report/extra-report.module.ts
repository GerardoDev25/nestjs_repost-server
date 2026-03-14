import { Module } from '@nestjs/common';
import { ExtraReportService } from './extra-report.service';
import { ExtraReportController } from './extra-report.controller';
import { PrinterModule } from 'src/printer/printer.module';

@Module({
  imports: [PrinterModule],
  controllers: [ExtraReportController],
  providers: [ExtraReportService],
})
export class ExtraReportModule {}
