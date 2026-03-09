import { Controller, Get, Param, Res } from '@nestjs/common';
import { StoreReportsService } from './store-reports.service';
import { Response } from 'express';

@Controller('store-reports')
export class StoreReportsController {
  constructor(private readonly storeReportsService: StoreReportsService) {}

  @Get('order/:orderId')
  getOrderReport(@Param('orderId') orderId: string, @Res() response: Response) {
    const pdfDoc = this.storeReportsService.getOrderByIdReport(orderId);
    response.setHeader('Content-Type', 'application/pdf');
    pdfDoc.info.Title = 'Order-Reports';
    pdfDoc.pipe(response);
    pdfDoc.end();
  }
}
