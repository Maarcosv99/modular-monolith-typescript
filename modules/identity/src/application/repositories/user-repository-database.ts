import { injectable, inject } from 'tsyringe';

import { Result, Success, Failure, isFailure } from '@modules/shared/core/result';
import type { Database } from '@modules/shared/application/service/database.interface';
import { DatabaseSymbol } from '@modules/shared/application/service/database.interface';

import { User } from 'core/entities/user.entity';

import { UserNotFoundException } from 'core/exceptions/user-not-found.exception';
import { UserAlreadyExistsException } from 'core/exceptions/user-already-exists.exception';

import { UserRepository } from 'core/repositories/user.repository';
import { DomainEvents } from '@modules/shared/core/events/domain-events';
import { UniqueEntityID } from '@modules/shared/core/unique-entity-id';
import { Email } from 'core/value-objects/email.value-object';
import { Password } from 'core/value-objects/password.value-object';

@injectable()
export class UserRepositoryDatabase implements UserRepository{
  constructor(
    @inject(DatabaseSymbol)
    private readonly database: Database
  ) {}

  private toDomain(user: any): Result<User, UserNotFoundException> {
    const idOrError = UniqueEntityID.create(user.id);
    if (isFailure(idOrError)) {
      return Failure(new UserNotFoundException(user.id));
    }

    const emailOrError = Email.create(user.email);
    if (isFailure(emailOrError)) {
      return Failure(new UserNotFoundException(user.email));
    }

    const passwordOrError = Password.create(user.password);
    if (isFailure(passwordOrError)) {
      return Failure(new UserNotFoundException(user.password));
    }

    const foundUser = User.create({
      first_name: user.firstName,
      last_name: user.lastName,
      email: emailOrError.value,
      password: passwordOrError.value,
    }, idOrError.value);

    return Success(foundUser);
  }

  async create(user: User): Promise<Result<User, UserAlreadyExistsException>> {
    await this.database.insert('users', {
      id: user.id.toValue(),
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email.value,
      password: user.password.value,
    });

    DomainEvents.dispatchEventsForAggregate(user.id);

    return Success(user);
  }

  async findById(id: string): Promise<Result<User, UserNotFoundException>> {
    const user = await this.database.find<User>('users', { id }) as any;
    if (!user) {
      return Failure(new UserNotFoundException(id));
    }

    const userOrError = this.toDomain(user);
    if (isFailure(userOrError)) {
      return Failure(new UserNotFoundException(id));
    }

    return Success(userOrError.value);
  }

  async findByEmail(email: string): Promise<Result<User, UserNotFoundException>> {
    const user = await this.database.find('users', { email: email }) as any;
    if (!user) {
      return Failure(new UserNotFoundException(email));
    }

    const userOrError = this.toDomain(user);
    if (isFailure(userOrError)) {
      return Failure(new UserNotFoundException(email));
    }

    return Success(userOrError.value);
  }

  async update(user: User): Promise<Result<User, UserNotFoundException>> {
    const existingUser = await this.database.find<User>('users', { id: user.id });
    if (!existingUser) {
      return Failure(new UserNotFoundException(user.id.toString()));
    }

    const updatedUser = await this.database.update<User>('users', user);
    DomainEvents.dispatchEventsForAggregate(user.id);
    return Success(updatedUser);
  }

  async delete(id: string): Promise<Result<void, UserNotFoundException>> {
    await this.database.delete('users', { id });
    DomainEvents.dispatchEventsForAggregate(new UniqueEntityID(id));
    return Success(undefined);
  }
}
