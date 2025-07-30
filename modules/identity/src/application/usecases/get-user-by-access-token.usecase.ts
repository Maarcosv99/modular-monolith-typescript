import { injectable, inject } from 'tsyringe';

import { Result, Success, Failure, isFailure } from '@modules/shared/core/result';

import type { UserRepository } from 'core/repositories/user.repository';
import { UserRepositorySymbol } from 'core/repositories/user.repository';

import { JwtServiceSymbol } from '../services/jwt/jwt.service';
import type { JwtService } from '../services/jwt/jwt.service';

import { UserNotFoundException } from 'src/core/exceptions/user-not-found.exception';
import { JwtException } from '../exceptions/jwt-error.exception';

export const GetUserByAccessTokenUseCaseSymbol = Symbol.for('GetUserByAccessTokenUseCase');

@injectable()
export class GetUserByAccessTokenUseCase {
  constructor(
    @inject(UserRepositorySymbol)
    private userRepository: UserRepository,
    @inject(JwtServiceSymbol)
    private jwtService: JwtService,
  ) {}

  async execute(accessToken: string): Promise<Result<{ id: string, first_name: string, last_name: string, email: string }, JwtException | UserNotFoundException>> {
    const decodedToken = await this.jwtService.verify('access', accessToken);
    if (isFailure(decodedToken)) {
      return Failure(new JwtException(decodedToken.error.message));
    }

    const userId = decodedToken.value.userId as string;

    const user = await this.userRepository.findById(userId);
    if (isFailure(user)) {
      return Failure(new UserNotFoundException(userId));
    }

    return Success({
      id: user.value.id.toValue() as string,
      first_name: user.value.first_name,
      last_name: user.value.last_name,
      email: user.value.email.value,
    });
  }
}