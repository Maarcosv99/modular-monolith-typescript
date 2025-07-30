import { injectable, inject } from 'tsyringe';

import { ConfigEnvSymbol } from '@modules/shared/config/env';
import type { ConfigEnv } from '@modules/shared/config/env';

import { drizzle } from 'drizzle-orm/node-postgres';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';

import type { Database } from 'application/service/database.interface';
import * as schema from './schemas';

@injectable()
export class DrizzleDatabaseService implements Database {
  private database: NodePgDatabase;

  constructor(
    @inject(ConfigEnvSymbol)
    private env: ConfigEnv,
  ) {
    this.database = drizzle(this.env.postgres.url, {
      schema: schema as any, // To avoid type errors
    });
  }

  private getTable(table: string): any {
    if (Object.keys(this.database._.fullSchema).includes(table)) {
      return this.database._.fullSchema[table];
    }

    throw new Error(`Table ${table} not found`);
  }

  private mountWhere(table: string, where: Record<string, any> = {}): any[] {
    return Object.entries(where).map(([key, value]) => {
      const tableSchema = this.getTable(table);
      const column = tableSchema[key as any];
      return eq(column, value);
    });
  }

  async insert<T>(table: string, data: T): Promise<T> {
    const result = await this.database.insert(this.getTable(table)).values(data as any).returning();
    return result[0];
  }

  async find<T>(table: string, where?: Record<string, any>): Promise<T | null> {
    const result = await this.database.select().from(this.getTable(table)).where(this.mountWhere(table, where) as any);
    if (result.length === 0) {
      return null;
    }

    return result[0] as T;
  }

  async findAll<T>(table: string): Promise<T[]> {
    const result = await this.database.select().from(this.getTable(table));
    return result as T[];
  }

  async update<T>(table: string, data: T, where?: Record<string, any>): Promise<T> {
    const result = await this.database.update(this.getTable(table)).set(data as any).where(this.mountWhere(where) as any).returning() as T[];
    return result[0];
  }

  async delete(table: string, where?: Record<string, any>): Promise<void> {
    await this.database.delete(this.getTable(table)).where(this.mountWhere(where) as any);
  }
}

