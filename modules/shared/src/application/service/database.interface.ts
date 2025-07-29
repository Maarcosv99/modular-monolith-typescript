export interface Database {
  insert<T>(table: string, data: T): Promise<T>;
  find<T>(table: string, where?: Record<string, any>): Promise<T | null>;
  findAll<T>(table: string): Promise<T[]>;
  update<T>(table: string, data: T, where?: Record<string, any>): Promise<T>;
  delete(table: string, where?: Record<string, any>): Promise<void>;
}

export const DatabaseSymbol = Symbol.for('Database');