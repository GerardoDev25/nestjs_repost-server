import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrinterService } from 'src/printer/printer.service';
import {
  getEmploymentLetterReport,
  getHelloWorldReport,
  getEmploymentLetterByIdReport,
} from 'src/reports';
import { getCountryReport } from 'src/reports/countries.report';

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

  employmentLetter() {
    const documentDefinition = getEmploymentLetterReport();
    const doc = this.printerService.createPdf(documentDefinition);
    return doc;
  }

  async employmentLetterById(id: number) {
    const employee = await this.prisma.employees.findUnique({
      where: {
        id: id,
      },
    });

    if (!employee) {
      throw new NotFoundException(`Employee with id ${id} not found`);
    }

    const docDefinition = getEmploymentLetterByIdReport({
      employerName: 'Gerardo Miranda',
      employerPosition: 'Gerente de RRHH',
      employeeName: employee.name,
      employeePosition: employee.position,
      employeeStartDate: employee.start_date,
      employeeHours: employee.hours_per_day,
      employeeWorkSchedule: employee.work_schedule,
      employerCompany: 'Tucan Code Corp.',
    });

    const doc = this.printerService.createPdf(docDefinition);

    return doc;
  }

  async getCountries() {
    const countries = await this.prisma.countries.findMany({
      where: { local_name: { not: null } },
    });
    const documentDefinition = getCountryReport({
      title: 'Countries',
      subTitle: 'List of countries',
      countries: countries,
    });
    return this.printerService.createPdf(documentDefinition);
  }
}
