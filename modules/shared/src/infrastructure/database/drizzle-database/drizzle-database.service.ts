import { injectable, registry} from 'tsyringe';

import { drizzle } from 'drizzle-orm/node-postgres';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { eq } from 'drizzle-orm';

import { Pool } from 'pg';
import type { Database } from 'application/service/database.interface';
import { DatabaseSymbol } from 'application/service/database.interface';

@injectable()
@registry([{
  token: DatabaseSymbol,
  useClass: DrizzleDatabaseService,
}])
export class DrizzleDatabaseService implements Database {
  private database: NodePgDatabase;

  constructor() {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    this.database = drizzle(pool);
  }

  private mountWhere(where?: Record<string, any>): any[] {
    return where ? Object.entries(where).map(([key, value]) => eq(key as any, value)) : [];
  }

  async insert<T>(table: string, data: T): Promise<T> {
    const result = await this.database.insert(table as any).values(data as any).returning() as T[];
    return result[0];
  }

  async find<T>(table: string, where?: Record<string, any>): Promise<T> {
    const result = await this.database.select().from(table as any).where(this.mountWhere(where) as any);
    return result[0] as T;
  }

  async findAll<T>(table: string): Promise<T[]> {
    const result = await this.database.select().from(table as any);
    return result as T[];
  }

  async update<T>(table: string, data: T, where?: Record<string, any>): Promise<T> {
    const result = await this.database.update(table as any).set(data as any).where(this.mountWhere(where) as any).returning() as T[];
    return result[0];
  }

  async delete(table: string, where?: Record<string, any>): Promise<void> {
    await this.database.delete(table as any).where(this.mountWhere(where) as any);
  }
}

