import { Injectable } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { getHelloWorldReport } from 'src/reports';

@Injectable()
export class StoreReportsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly printerService: PrinterService,
  ) {}

  getOrderByIdReport(orderId: string) {
    const documentDefinition = getHelloWorldReport({ name: orderId });
    const doc = this.printerService.createPdf(documentDefinition);
    return doc;
  }
}
