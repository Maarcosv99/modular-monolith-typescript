import { injectable, inject } from 'tsyringe';

import type { TokenManagerService } from 'application/services/token-manager/token-manager.service';

import { CacheSymbol } from '@modules/shared/application/service/cache.interface';
import type { Cache } from '@modules/shared/application/service/cache.interface';
import { Result, Success } from '@modules/shared/core/result';

@injectable()
export class RedisTokenManagerService implements TokenManagerService {
  constructor(
    @inject(CacheSymbol)
    private cache: Cache
  ) {}

  private mountKey(key: string): string {
    return `refresh_token:${key}`;
  }

  async saveRefreshToken(userId: string, token: string): Promise<Result<void, Error>> {
    const sevenDaysInSeconds = 60 * 60 * 24 * 7;
    await this.cache.set(this.mountKey(token), userId, sevenDaysInSeconds);
    return Success(undefined);
  }

  async deleteRefreshToken(token: string): Promise<Result<void, Error>> {
    await this.cache.delete(this.mountKey(token));
    return Success(undefined);
  }

  async checkRefreshToken(token: string): Promise<Result<boolean, Error>> {
    const exists = await this.cache.exists(this.mountKey(token));
    return Success(exists);
  }
}