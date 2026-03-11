import fs from 'node:fs';
import { TDocumentDefinitions } from 'pdfmake/interfaces';

const svgContent = fs.readFileSync('src/assets/ford.svg', 'utf-8');

export const getBasicChatSvgReport =
  async (): Promise<TDocumentDefinitions> => {
    return Promise.resolve({
      content: [
        {
          svg: svgContent,
          width: 150,
          fit: [100, 100],
        },
      ],
    });
  };
