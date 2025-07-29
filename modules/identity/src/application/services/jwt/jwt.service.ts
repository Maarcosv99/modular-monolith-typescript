import { Result } from '@modules/shared/core/result';

export const JwtServiceSymbol = Symbol.for('JwtService');

export interface JwtService {
  sign(type: 'access' | 'refresh', payload: Record<string, unknown>): Promise<Result<string, Error>>;
  verify(type: 'access' | 'refresh', token: string): Promise<Result<Record<string, unknown>, Error>>;
}