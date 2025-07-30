export interface Cache {
  exists(key: string): Promise<boolean>;
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ttl?: number): Promise<void>;
  delete(key: string): Promise<void>;
}

export const CacheSymbol = Symbol.for('Cache');