import { injectable, inject, registry } from 'tsyringe';

import { Result, Success, Failure } from '@modules/shared/core/result';
import type { Database } from '@modules/shared/application/service/database.interface';
import { DatabaseSymbol } from '@modules/shared/application/service/database.interface';

import { User } from 'core/entities/user.entity';

import { UserNotFoundException } from 'core/exceptions/user-not-found.exception';
import { UserAlreadyExistsException } from 'core/exceptions/user-already-exists.exception';

import { UserRepository, UserRepositorySymbol } from 'core/repositories/user.repository';
import { DomainEvents } from '@modules/shared/core/events/DomainEvents';
import { UniqueEntityID } from '@modules/shared/core/UniqueEntityID';

@injectable()
@registry([{
  token: UserRepositorySymbol,
  useClass: UserRepositoryDatabase,
}])
export class UserRepositoryDatabase implements UserRepository{
  constructor(
    @inject(DatabaseSymbol)
    private readonly database: Database
  ) {}

  async create(user: User): Promise<Result<User, UserAlreadyExistsException>> {
    const existingUser = await this.database.find<User>('users', { email: user.email.props.value });
    if (existingUser) {
      return Failure(new UserAlreadyExistsException(user.email.props.value));
    }

    const newUser = await this.database.insert<User>('users', user);
    DomainEvents.dispatchEventsForAggregate(user.id);
    return Success(newUser);
  }

  async findById(id: string): Promise<Result<User, UserNotFoundException>> {
    const user = await this.database.find<User>('users', { id });
    if (!user) {
      return Failure(new UserNotFoundException(id));
    }

    return Success(user);
  }

  async findByEmail(email: string): Promise<Result<User, UserNotFoundException>> {
    const user = await this.database.find<User>('users', { email: email });
    if (!user) {
      return Failure(new UserNotFoundException(email));
    }

    return Success(user);
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
