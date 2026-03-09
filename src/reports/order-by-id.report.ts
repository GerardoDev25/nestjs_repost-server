import {
  Content,
  StyleDictionary,
  TDocumentDefinitions,
} from 'pdfmake/interfaces';
import { CurrencyFormatter, DateFormatter } from 'src/helpers';
import { footerSection } from './section';

const logo: Content = {
  image: 'src/assets/tucan-banner.png',
  width: 100,
  height: 30,
  margin: [10, 30],
};

const styles: StyleDictionary = {
  header: {
    fontSize: 20,
    bold: true,
    margin: [0, 30, 0, 0],
  },
  subHeader: {
    fontSize: 16,
    bold: true,
    margin: [0, 20, 0, 0],
  },
};

export interface CompleteOrder {
  order_id: number;
  customer_id: number;
  order_date: Date;
  order_details: OrderDetail[];
  customers: Customers;
}

export interface Customers {
  customer_id: number;
  customer_name: string;
  contact_name: string;
  address: string;
  city: string;
  postal_code: string;
  country: string;
}

export interface OrderDetail {
  order_detail_id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  products: Products;
}

export interface Products {
  product_id: number;
  product_name: string;
  category_id: number;
  unit: string;
  price: string;
}

interface ReportValue {
  title?: string;
  subTitle?: string;
  data: CompleteOrder;
}

export const orderByIdReport = (
  reportValue: ReportValue,
): TDocumentDefinitions => {
  const { title, data } = reportValue;

  const { customers, order_details, order_date } = data;

  const subTotal = order_details.reduce(
    (acc, detail) => acc + detail.quantity * +detail.products.price,
    0,
  );

  const total = subTotal * 1.15;

  return {
    header: logo,
    styles,
    pageMargins: [40, 40, 40, 60],
    footer: footerSection,
    content: [
      // * HEADER

      {
        text: title ?? 'Tocan Code',
        style: 'header',
      },

      // * INFO

      {
        columns: [
          {
            text: '15 Montgomery Str, Suite 100, \nOttawa ON K2Y 9X1, CANADA\nBN: 12783671823\nhttps://devtalles.com',
          },
          {
            text: [
              {
                text: `Recibo No. ${order_details[0].order_id}\n`,
                bold: true,
              },
              `Fecha del recibo ${DateFormatter.getDDMMMMYYYY(new Date(order_date))}\nPagar antes de: ${DateFormatter.getDDMMMMYYYY(new Date())}\n`,
            ],
            alignment: 'right',
          },
        ],
      },

      // * QR CODE

      { qr: 'https://devtalles.com', fit: 75, alignment: 'right' },

      // * CUSTOMER ADDRESS

      {
        text: [
          {
            text: 'Cobrar a: \n',
            style: 'subHeader',
          },
          `Razón Social: ${customers.customer_name},
          Contacto: ${customers.contact_name}`,
        ],
      },

      // * ORDER DETAILS TABLE
      {
        layout: 'headerLineOnly',
        margin: [0, 20],
        table: {
          headerRows: 1,
          widths: [50, '*', 'auto', 'auto', 'auto'],
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          body: [
            ['ID', 'Descripción', 'Cantidad', 'Precio', 'Total'],

            ...order_details.map(
              (detail: {
                order_detail_id: { toString: () => any };
                products: { product_name: any; price: string | number };
                quantity: number;
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
              }) => [
                detail.order_detail_id.toString(),
                detail.products.product_name,
                detail.quantity.toString(),
                {
                  text: CurrencyFormatter.formatCurrency(
                    +detail.products.price,
                  ),
                  alignment: 'right',
                },
                {
                  text: CurrencyFormatter.formatCurrency(
                    +detail.products.price * detail.quantity,
                  ),
                  alignment: 'right',
                },
              ],
            ),
          ],
        },
      },

      // * LINE BREAK
      '\n',

      // * TOTALS
      {
        columns: [
          {
            width: '*',
            text: '',
          },
          {
            width: 'auto',
            layout: 'noBorders',
            table: {
              body: [
                [
                  'Subtotal',
                  {
                    text: CurrencyFormatter.formatCurrency(subTotal),
                    alignment: 'right',
                  },
                ],
                [
                  { text: 'Total', bold: true },
                  {
                    text: CurrencyFormatter.formatCurrency(total),
                    alignment: 'right',
                    bold: true,
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  };
};
