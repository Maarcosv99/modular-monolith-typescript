import { injectable, inject } from 'tsyringe';

import { Result, Success, Failure, isFailure } from '@modules/shared/core/result';

import { UserRepositorySymbol } from 'core/repositories/user.repository';
import type { UserRepository } from 'core/repositories/user.repository';

import { PasswordHasherServiceSymbol } from 'application/services/hashing/password-hasher.service';
import type { PasswordHasherService } from 'application/services/hashing/password-hasher.service';

import { JwtServiceSymbol } from 'application/services/jwt/jwt.service';
import type { JwtService } from 'application/services/jwt/jwt.service';

import { TokenManagerServiceSymbol } from 'application/services/token-manager/token-manager.service';
import type { TokenManagerService } from 'application/services/token-manager/token-manager.service';

import { SessionAlreadyExistsException } from 'core/exceptions/session-already-exists.exception';
import { SessionNotFoundException } from 'core/exceptions/session-not-found.exception';
import { UserNotFoundException } from 'src/core/exceptions/user-not-found.exception';
import { PasswordNotMatchingException } from '../exceptions/password-not-matching.exception';
import { JwtException } from 'application/exceptions/jwt-error.exception';

export const SignInUseCaseSymbol = Symbol.for('SignInUseCase');

interface SignInInput {
  email: string;
  password: string;
}

@injectable()
export class SignInUseCase {
  constructor(
    @inject(UserRepositorySymbol)
    private userRepository: UserRepository,
    @inject(PasswordHasherServiceSymbol)
    private passwordHasherService: PasswordHasherService,
    @inject(JwtServiceSymbol)
    private jwtService: JwtService,
    @inject(TokenManagerServiceSymbol)
    private tokenManagerService: TokenManagerService,
  ) {}

  async execute(input: SignInInput): Promise<
    Result<
    { accessToken: string, refreshToken: string },
    UserNotFoundException | JwtException | PasswordNotMatchingException | SessionAlreadyExistsException | SessionNotFoundException>
  > {
    const foundUserOrError = await this.userRepository.findByEmail(input.email);
    if (isFailure(foundUserOrError)) {
      return Failure(new UserNotFoundException('User not found'));
    }

    const passwordCompareResult = await this.passwordHasherService.compare(
      input.password,
      foundUserOrError.value.password.value,
    );

    if (isFailure(passwordCompareResult)) {
      return Failure(new PasswordNotMatchingException('Password not matching'));
    }

    const jwtPayload = {
      userId: foundUserOrError.value.id.toValue(),
    }

    const jwtAccessTokenOrError = await this.jwtService.sign('access', jwtPayload);
    if (isFailure(jwtAccessTokenOrError)) {
      return Failure(new JwtException('Failed to sign JWT'));
    }

    const jwtRefreshTokenOrError = await this.jwtService.sign('refresh', jwtPayload);
    if (isFailure(jwtRefreshTokenOrError)) {
      return Failure(new JwtException('Failed to sign JWT'));
    }

    const saveRefreshTokenOrError = await this.tokenManagerService.saveRefreshToken(
      String(foundUserOrError.value.id.toValue()),
      jwtRefreshTokenOrError.value,
    );
    if (isFailure(saveRefreshTokenOrError)) {
      return Failure(new Error('Failed to save refresh token'));
    }

    return Success({
      accessToken: jwtAccessTokenOrError.value,
      refreshToken: jwtRefreshTokenOrError.value,
    });
  }
}