import { Result, Success, Failure, isFailure } from '@modules/shared/core/result';

import { User } from 'core/entities/user.entity';

import { Mapper } from '@modules/shared/application/mapper';

import { UniqueEntityID } from '@modules/shared/core/unique-entity-id';
import { Email } from 'core/value-objects/email.value-object';
import { Password } from 'core/value-objects/password.value-object';

type UserPersistence = {
  id: string
  first_name: string
  last_name: string
  email: string
  password: string
}

class UserMapper extends Mapper<User, UserPersistence, Error> {
  toDomain(raw: any): Result<User, Error> {
    const idOrError = UniqueEntityID.create(raw.id);
    if (isFailure(idOrError)) {
      return Failure(idOrError.error);
    }

    const emailOrError = Email.create(raw.email);
    if (isFailure(emailOrError)) {
      return Failure(emailOrError.error);
    }

    const passwordOrError = Password.create(raw.password);
    if (isFailure(passwordOrError)) {
      return Failure(passwordOrError.error);
    }

    const user = User.create({
      email: emailOrError.value,
      password: passwordOrError.value,
      first_name: raw.first_name,
      last_name: raw.last_name,
    }, idOrError.value);

    return Success(user);
  }

  toPersistence(domain: User): Result<UserPersistence, Error> {
    return Success({
      id: String(domain.id.toValue()),
      first_name: domain.first_name,
      last_name: domain.last_name,
      email: domain.email.value,
      password: domain.password.value,
    });
  }
}

const userMapper = new UserMapper();

export { userMapper as UserMapper };