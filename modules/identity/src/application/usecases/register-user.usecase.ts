import { injectable, inject } from 'tsyringe';

import { Result, Success, Failure, isFailure, isSuccess } from '@modules/shared/core/result';

import type { UserRepository } from 'core/repositories/user.repository';
import { UserRepositorySymbol } from 'core/repositories/user.repository';
import { Email } from 'core/value-objects/email.value-object';
import { User } from 'core/entities/user.entity';

import { EmailAlreadyUsedException } from 'core/exceptions/email-already-used.exception';
import type { PasswordHasherService } from 'application/services/hashing/password-hasher.service';

import { PasswordHasherServiceSymbol } from 'application/services/hashing/password-hasher.service';
import { Password } from 'core/value-objects/password.value-object';

import { InvalidEmailException } from 'core/exceptions/invalid-email.exception';
import { HashingException } from 'application/exceptions/hashing-error.exception';
import { PasswordMaxLengthException } from 'core/exceptions/password-max-length.exception';

interface RegisterUserInput {
  first_name: string
  last_name: string
  email: string
  password: string
}

export const RegisterUserUseCaseSymbol = Symbol.for('RegisterUserUseCase');

@injectable()
export class RegisterUserUseCase {
  constructor(
    @inject(UserRepositorySymbol)
    private userRepo: UserRepository,
    @inject(PasswordHasherServiceSymbol)
    private hasher: PasswordHasherService,
  ) {}
  
  async execute(
    input: RegisterUserInput
  ): Promise<Result<User, EmailAlreadyUsedException | PasswordMaxLengthException | InvalidEmailException | HashingException>> {
    const emailOrError = Email.create({ value: input.email });
    if (isFailure(emailOrError)) return Failure(emailOrError.error);

    const existingUser = await this.userRepo.findByEmail(emailOrError.value.value);
    if (isSuccess(existingUser)) {
      return Failure(new EmailAlreadyUsedException(emailOrError.value.value));
    }
    
    const hashedPassword = await this.hasher.hash(input.password);
    if (isFailure(hashedPassword)) return Failure(hashedPassword.error);

    const passwordOrError = Password.create(hashedPassword.value);
    if (isFailure(passwordOrError)) return Failure(passwordOrError.error);

    const user = User.create({
      first_name: input.first_name,
      last_name: input.last_name,
      email: emailOrError.value,
      password: passwordOrError.value,
    });

    const userOrError = await this.userRepo.create(user);
    if (isFailure(userOrError)) return Failure(userOrError.error);
    
    return Success(user);
  }
}