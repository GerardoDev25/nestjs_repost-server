import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

const fonts = {
  Roboto: {
    normal: 'fonts/Roboto-Regular.ttf',
    bold: 'fonts/Roboto-Medium.ttf',
    italics: 'fonts/Roboto-Italic.ttf',
    bolditalics: 'fonts/Roboto-MediumItalic.ttf',
  },
};
@Injectable()
export class BasicReportsService {
  constructor(private prisma: PrismaService) {}

  hello() {
    const printer = new PdfPrinter(fonts);
    const documentDefinition: TDocumentDefinitions = {
      content: ['hello world'],
    };
    const doc = printer.createPdfKitDocument(documentDefinition);
    return doc;
  }
}
