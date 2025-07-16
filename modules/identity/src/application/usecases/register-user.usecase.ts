import { Success, Failure, isFailure, isSuccess } from 'modules/shared/src/core/result';

import { UserRepository } from 'application/repositories/user.repository';
import { Email } from 'core/value-objects/email.value-object';
import { User } from 'core/entities/user.entity';

import { EmailAlreadyUsedException } from 'core/exceptions/email-already-used.exception';
import { PasswordHasherService } from 'application/services/hashing/password-hasher.service';
import { Password } from 'core/value-objects/password.value-object';

interface RegisterUserInput {
  first_name: string
  last_name: string
  email: string
  password: string
}

export class RegisterUserUseCase {
  constructor(
    private userRepo: UserRepository,
    private hasher: PasswordHasherService,
  ) {}
  
  async execute(
    input: RegisterUserInput
  ) {
    const emailOrError = Email.create(input.email);
    if (isFailure(emailOrError)) return Failure(emailOrError.error);
    
    const existingUser = await this.userRepo.findByEmail(emailOrError.value.value);
    if (isSuccess(existingUser)) {
      return Failure(new EmailAlreadyUsedException(emailOrError.value.value));
    }
    
    const hashedPassword = await this.hasher.hash(input.password);
    if (isFailure(hashedPassword)) return Failure(hashedPassword.error);

    const passwordOrError = Password.create(input.password);
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