import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool, PoolConfig } from 'pg';

import { PrismaClient } from 'src/generated/prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(config: ConfigService) {
    // 1. Get the URL from ConfigService instead of process.env directly
    const connectionString = config.get<string>('DATABASE_URL') ?? '';

    // 2. Create the connection pool
    const poolConfig: PoolConfig = { connectionString };
    const pool = new Pool(poolConfig);

    // 3. Setup the adapter
    const adapter = new PrismaPg(pool);

    // 4. Pass the adapter to the base PrismaClient class
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
