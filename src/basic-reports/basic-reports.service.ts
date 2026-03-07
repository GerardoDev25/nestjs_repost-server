import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BasicReportsService {
  constructor(private prisma: PrismaService) {}

  async hello() {
    const employees = await this.prisma.employees.findMany();
    return employees;
  }
}
