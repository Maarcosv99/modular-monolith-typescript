import { Result } from '@modules/shared/core/result';

export const TokenManagerServiceSymbol = Symbol.for('TokenManagerService');

export interface TokenManagerService {
  saveRefreshToken(userId: string, token: string): Promise<Result<void, Error>>;
  deleteRefreshToken(userId: string): Promise<Result<void, Error>>;
  checkRefreshToken(token: string): Promise<Result<boolean, Error>>;
}