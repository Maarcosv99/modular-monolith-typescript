import { Result, Success, Failure } from 'modules/shared/src/core/result';
import { Database } from 'modules/shared/src/infrastructure/database/database.interface';

import { User } from 'core/entities/user.entity';

import { UserNotFoundException } from 'core/exceptions/user-not-found.exception';
import { UserAlreadyExistsException } from 'core/exceptions/user-already-exists.exception';

export class UserRepository {
  constructor(private readonly database: Database) {}

  async create(user: User): Promise<Result<User, UserAlreadyExistsException>> {
    const existingUser = await this.database.find<User>('users', { email: user.email.value });
    if (existingUser) {
      return Failure(new UserAlreadyExistsException(user.email.value));
    }

    const newUser = await this.database.insert<User>('users', user);
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
      return Failure(new UserNotFoundException(user.id));
    }

    const updatedUser = await this.database.update<User>('users', user);
    return Success(updatedUser);
  }

  async delete(id: string): Promise<Result<void, UserNotFoundException>> {
    await this.database.delete('users', { id });
    return Success(undefined);
  }
}