import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrinterService } from 'src/printer/printer.service';
import { getHelloWorldReport } from 'src/reports';

@Injectable()
export class BasicReportsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly printerService: PrinterService,
  ) {}

  hello() {
    const documentDefinition = getHelloWorldReport({ name: 'John Doe' });
    const doc = this.printerService.createPdf(documentDefinition);
    return doc;
  }
}
