import { injectable, inject } from 'tsyringe';

import { Result, Success, Failure, isFailure } from '@modules/shared/core/result';
import type { Database } from '@modules/shared/application/service/database.interface';
import { DatabaseSymbol } from '@modules/shared/application/service/database.interface';

import { User } from 'core/entities/user.entity';
import { UserMapper } from 'application/mapper/user.mapper';

import { UserNotFoundException } from 'core/exceptions/user-not-found.exception';
import { UserAlreadyExistsException } from 'core/exceptions/user-already-exists.exception';
import { InvalidUserEntityException } from 'application/exceptions/invalid-user-entity.exception';
import { InvalidUserDataException } from 'application/exceptions/invalid-user-data.exception';

import { UserRepository } from 'core/repositories/user.repository';
import { DomainEvents } from '@modules/shared/core/events/domain-events';
import { UniqueEntityID } from '@modules/shared/core/unique-entity-id';

@injectable()
export class UserRepositoryDatabase implements UserRepository{
  constructor(
    @inject(DatabaseSymbol)
    private readonly database: Database
  ) {}

  async create(user: User): Promise<Result<User, UserAlreadyExistsException | InvalidUserEntityException>> {
    const mappedUserOrError = UserMapper.toPersistence(user);
    if (isFailure(mappedUserOrError)) {
      return Failure(new InvalidUserEntityException(mappedUserOrError.error.message));
    }

    await this.database.insert('users', mappedUserOrError.value);

    DomainEvents.dispatchEventsForAggregate(user.id);

    return Success(user);
  }

  async findById(id: string): Promise<Result<User, UserNotFoundException | InvalidUserDataException>> {
    const user = await this.database.find<User>('users', { id }) as any;
    if (!user) {
      return Failure(new UserNotFoundException(id));
    }

    const mappedUserOrError = UserMapper.toDomain(user);
    if (isFailure(mappedUserOrError)) {
      return Failure(new InvalidUserDataException(mappedUserOrError.error.message));
    }

    return Success(mappedUserOrError.value);
  }

  async findByEmail(email: string): Promise<Result<User, UserNotFoundException | InvalidUserDataException>> {
    const user = await this.database.find('users', { email: email }) as any;
    if (!user) {
      return Failure(new UserNotFoundException(email));
    }

    const mappedUserOrError = UserMapper.toDomain(user);
    if (isFailure(mappedUserOrError)) {
      return Failure(new InvalidUserDataException(mappedUserOrError.error.message));
    }

    return Success(mappedUserOrError.value);
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
