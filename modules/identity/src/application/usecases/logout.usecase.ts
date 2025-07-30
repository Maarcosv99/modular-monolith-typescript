import { injectable, inject } from 'tsyringe';

import { Result, Success, Failure, isFailure } from '@modules/shared/core/result';

import type { TokenManagerService } from 'application/services/token-manager/token-manager.service';
import { TokenManagerServiceSymbol } from 'application/services/token-manager/token-manager.service';

import { JwtException } from 'application/exceptions/jwt-error.exception';

export const LogOutUseCaseSymbol = Symbol.for('LogOutUseCase');

@injectable()
export class LogOutUseCase {
  constructor(
    @inject(TokenManagerServiceSymbol)
    private tokenManagerService: TokenManagerService,
  ) {}

  async execute(refreshToken: string): Promise<Result<void, JwtException>> {
    const tokenIsValidOrError = await this.tokenManagerService.checkRefreshToken(refreshToken);
    if (isFailure(tokenIsValidOrError)) {
      return Failure(new JwtException('Invalid refresh token'));
    }

    if (!tokenIsValidOrError.value) {
      return Failure(new Error('Token is not valid'));
    }

    const revokeRefreshTokenOrError = await this.tokenManagerService.deleteRefreshToken(refreshToken);
    if (isFailure(revokeRefreshTokenOrError)) {
      return Failure(new Error('Failed to revoke refresh token'));
    }

    return Success(undefined);
  }
}