import { Injectable, NotFoundException } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  getBasicChatSvgReport,
  getStatisticsReport,
  orderByIdReport,
} from 'src/reports';

@Injectable()
export class StoreReportsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly printerService: PrinterService,
  ) {}

  async getOrderByIdReport(orderId: number) {
    const order = await this.prisma.orders.findUnique({
      where: {
        order_id: orderId,
      },
      include: {
        order_details: {
          include: {
            products: true,
          },
        },
        customers: true,
      },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    // Validate required fields are not null
    if (!order.customer_id || !order.customers || !order.order_date) {
      throw new NotFoundException(
        `Order with ID ${orderId} has missing required information`,
      );
    }

    // Transform data to match CompleteOrder interface
    const reportData = {
      title: `Order Report #${orderId}`,
      subTitle: 'Order Details',
      data: {
        order_id: order.order_id,
        customer_id: order.customer_id,
        order_date: order.order_date,
        order_details: order.order_details.map((detail) => {
          if (
            !detail.products ||
            detail.order_id === null ||
            detail.product_id === null ||
            detail.quantity === null
          ) {
            throw new NotFoundException(
              `Order detail with ID ${detail.order_detail_id} has missing required information`,
            );
          }
          return {
            order_detail_id: detail.order_detail_id,
            order_id: detail.order_id,
            product_id: detail.product_id,
            quantity: detail.quantity,
            products: {
              product_id: detail.products.product_id,
              product_name: detail.products.product_name || '',
              category_id: detail.products.category_id || 0,
              unit: detail.products.unit || '',
              price: detail.products.price?.toString() || '0',
            },
          };
        }),
        customers: {
          customer_id: order.customers.customer_id,
          customer_name: order.customers.customer_name || '',
          contact_name: order.customers.contact_name || '',
          address: order.customers.address || '',
          city: order.customers.city || '',
          postal_code: order.customers.postal_code || '',
          country: order.customers.country || '',
        },
      },
    };

    const documentDefinition = orderByIdReport(reportData);
    const doc = this.printerService.createPdf(documentDefinition);
    return doc;
  }

  async getSvgChart() {
    const documentDefinition = await getBasicChatSvgReport();
    const doc = this.printerService.createPdf(documentDefinition);
    return doc;
  }

  async getStatistics() {
    // const topCountries = await this.prisma.$queryRaw`
    //   SELECT
    //     c.country,
    //     COUNT(o.order_id) as order_count
    //   FROM orders o
    //   JOIN customers c ON o.customer_id = c.customer_id
    //   GROUP BY c.country
    //   ORDER BY order_count DESC
    //   LIMIT 10
    // `;
    const topCountries = await this.prisma.customers.groupBy({
      by: ['country'],
      _count: true,
      orderBy: {
        _count: {
          country: 'desc',
        },
      },
      take: 10,
    });

    const topCountryData = topCountries.map(({ country, _count }) => ({
      country: country || '',
      customers: _count,
    }));

    const documentDefinition = await getStatisticsReport({
      topCountries: topCountryData,
    });
    const doc = this.printerService.createPdf(documentDefinition);
    return doc;
  }
}
