import fs from 'node:fs';
import { Injectable } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { getHtmlContent } from 'src/helpers/html-to-pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { headerSection, footerSection } from 'src/reports';

@Injectable()
export class ExtraReportService {
  constructor(private readonly printerService: PrinterService) {}

  getHtmlReport() {
    const html = fs.readFileSync('src/reports/html/basic-03.html', 'utf8');

    const content = getHtmlContent(html, {
      client: 'Gerardo Miranda',
      title: 'Reporte Extra',
    });

    const docDefinition: TDocumentDefinitions = {
      pageMargins: [40, 110, 40, 60],
      header: headerSection({
        title: 'Reporte Extra',
        subTitle: 'Reporte Extra',
      }),
      footer: footerSection,
      content: content,
    };

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }
}
