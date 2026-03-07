import { Content } from 'pdfmake/interfaces';
import { DateFormatter } from 'src/helpers';

const logo: Content = {
  image: 'src/assets/tucan-code-logo.png',
  width: 100,
  height: 100,
  alignment: 'center',
  margin: [0, 0, 0, 20],
};

interface HeaderOptions {
  title?: string;
  subTitle?: string;
  showLogo?: boolean;
  showDate?: boolean;
}

export const headerSection = (options: HeaderOptions): Content => {
  const { title, subTitle, showLogo = true, showDate = true } = options;

  const headerLogo: Content | null = showLogo ? logo : null;

  const headerDate: Content | null = showDate
    ? {
        text: DateFormatter.getDDMMMMYYYY(new Date()),
        alignment: 'right',
        margin: [20, 20],
      }
    : null;

  const headerTitle: Content | null = title
    ? {
        text: title,
        style: {
          bold: true,
        },
      }
    : null;

  const headerColumns: Content[] = [];

  if (headerLogo) headerColumns.push(headerLogo);
  if (headerTitle) headerColumns.push(headerTitle);
  if (headerDate) headerColumns.push(headerDate);

  return {
    columns: headerColumns,
  };
};
