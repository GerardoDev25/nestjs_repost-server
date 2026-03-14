import { Controller, Get, Res } from '@nestjs/common';
import { ExtraReportService } from './extra-report.service';
import { Response } from 'express';

@Controller('extra-report')
export class ExtraReportController {
  constructor(private readonly extraReportService: ExtraReportService) {}

  @Get('html-report')
  getHtmlReport(@Res() res: Response) {
    const pdfDoc = this.extraReportService.getHtmlReport();
    res.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Hello World';
    pdfDoc.pipe(res);
    pdfDoc.end();
  }

  @Get('community-report')
  getCommunityReport(@Res() response: Response) {
    const pdfDoc = this.extraReportService.getCommunity();

    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Community Report';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
