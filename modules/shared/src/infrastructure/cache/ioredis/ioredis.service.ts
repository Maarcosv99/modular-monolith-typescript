import { inject, injectable } from 'tsyringe';

import type { Cache } from 'application/service/cache.interface';

import Redis from 'ioredis';

import { ConfigEnvSymbol } from '@/config/env';
import type { ConfigEnv } from '@/config/env';

@injectable()
export class IORedisCache implements Cache {
  private client: Redis;

  constructor(
    @inject(ConfigEnvSymbol)
    private env: ConfigEnv,
  ) {
    this.client = new Redis(this.env.redis.url)
  }

  async exists(key: string): Promise<boolean> {
    const exists = await this.client.exists(key);
    return exists === 1;
  }

  async get(key: string): Promise<string | null> {
    return this.client.get(key);
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    if (ttl) {
      await this.client.set(key, value, 'EX', ttl);
    } else {
      await this.client.set(key, value);
    }
  }

  async delete(key: string): Promise<void> {
    await this.client.del(key);
  }
}
