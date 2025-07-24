import { Result } from '@modules/shared/core/result';

import { User } from 'core/entities/user.entity';

import { UserNotFoundException } from 'core/exceptions/user-not-found.exception';
import { UserAlreadyExistsException } from 'core/exceptions/user-already-exists.exception';

export interface UserRepository {
  create(user: User): Promise<Result<User, UserAlreadyExistsException>>
  findById(id: string): Promise<Result<User, UserNotFoundException>>
  findByEmail(email: string): Promise<Result<User, UserNotFoundException>>
  update(user: User): Promise<Result<User, UserNotFoundException>>
  delete(id: string): Promise<Result<void, UserNotFoundException>>
}

export const UserRepositorySymbol = Symbol.for('UserRepository');