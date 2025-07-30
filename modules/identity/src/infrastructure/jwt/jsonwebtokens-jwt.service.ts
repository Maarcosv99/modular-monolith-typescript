import { injectable, inject } from 'tsyringe';

import { Failure, Result, Success } from '@modules/shared/core/result';

import type { JwtService } from 'application/services/jwt/jwt.service';

import jwt from 'jsonwebtoken';

import { ConfigEnvSymbol } from '@modules/shared/config/env';
import type { ConfigEnv } from '@modules/shared/config/env';

@injectable()
export class JsonWebTokensJwtService implements JwtService {
  constructor(
    @inject(ConfigEnvSymbol)
    private env: ConfigEnv,
  ) {}

  private getSecret(type: 'access' | 'refresh'): string {
    switch (type) {
      case 'access':
        return this.env.jwt.accessTokenSecret;
      case 'refresh':
        return this.env.jwt.refreshTokenSecret;
      default:
        throw new Error('Invalid token type');
    }
  }

  private getExpiresIn(type: 'access' | 'refresh'): string {
    switch (type) {
      case 'access':
        return this.env.jwt.expiresIn;
      case 'refresh':
        return this.env.jwt.refreshTokenExpiresIn;
      default:
        throw new Error('Invalid token type');
    }
  }

  async sign(type: 'access' | 'refresh', payload: Record<string, unknown>): Promise<Result<string, Error>> {
    try {
      const secret = this.getSecret(type);
      const expiresIn = this.getExpiresIn(type);

      if (!secret) {
        return Failure(new Error('JWT_SECRET is not set'));
      }

      return Success(jwt.sign(payload, secret, { expiresIn: expiresIn as any }));
    } catch (error) {
      return Failure(error as Error);
    }
  }

  async verify(type: 'access' | 'refresh', token: string): Promise<Result<Record<string, unknown>, Error>> {
    try {
      const secret = this.getSecret(type);
      const decoded = jwt.verify(token, secret);

      if (typeof decoded === 'string') {
        return Failure(new Error('Invalid token'));
      }

      return Success(decoded);
    } catch (error) {
      return Failure(error as Error);
    }
  }

  async decode(type: 'access' | 'refresh', token: string): Promise<Result<Record<string, unknown>, Error>> {
    try {
      const decoded = jwt.decode(token);

      if (!decoded) {
        return Failure(new Error('Invalid token'));
      }

      return Success(decoded as Record<string, unknown>);
    } catch (error) {
      return Failure(error as Error);
    }
  }
}