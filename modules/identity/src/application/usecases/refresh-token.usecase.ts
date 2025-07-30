import { injectable, inject } from 'tsyringe';

import { Result, Success, Failure, isFailure } from '@modules/shared/core/result';

import type { TokenManagerService } from 'application/services/token-manager/token-manager.service';
import { TokenManagerServiceSymbol } from 'application/services/token-manager/token-manager.service';

import type { JwtService } from 'application/services/jwt/jwt.service';
import { JwtServiceSymbol } from 'application/services/jwt/jwt.service';

import { JwtException } from 'application/exceptions/jwt-error.exception';

export const RefreshTokenUseCaseSymbol = Symbol.for('RefreshTokenUseCase');

@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject(TokenManagerServiceSymbol)
    private tokenManagerService: TokenManagerService,
    @inject(JwtServiceSymbol)
    private jwtService: JwtService,
  ) {}

  async execute(token: string): Promise<Result<{ accessToken: string }, JwtException>> {
    const tokenIsValidOrError = await this.tokenManagerService.checkRefreshToken(token);
    if (isFailure(tokenIsValidOrError)) {
      return Failure(new JwtException('Invalid refresh token'));
    }

    if (!tokenIsValidOrError.value) {
      return Failure(new Error('Token is not valid'));
    }

    const decodedToken = await this.jwtService.verify('refresh', token);
    if (isFailure(decodedToken)) {
      return Failure(new JwtException('Invalid refresh token'));
    }

    const userId = decodedToken.value.userId;
    const newAccessToken = await this.jwtService.sign('access', { userId });
    if (isFailure(newAccessToken)) {
      return Failure(new JwtException('Failed to sign JWT'));
    }

    return Success({ accessToken: newAccessToken.value });
  }
}