import { AggregateRoot } from '@modules/shared/core/aggregate-root';
import { UniqueEntityID } from '@modules/shared/core/unique-entity-id';

import { Email } from 'core/value-objects/email.value-object';
import { Password } from 'core/value-objects/password.value-object';
import { UserCreatedEvent } from '../events/user-created.event';

export interface UserProps {
  id?: UniqueEntityID
  first_name: string
  last_name: string
  email: Email
  password: Password
}

export class User extends AggregateRoot<UserProps> {
  private constructor(
    props: UserProps,
    id?: UniqueEntityID,
  ) {
    super(props, id);
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  get first_name(): string {
    return this.props.first_name;
  }

  get last_name(): string {
    return this.props.last_name;
  }

  get full_name(): string {
    return `${this.props.first_name} ${this.props.last_name}`;
  }

  get email(): Email {
    return this.props.email;
  }

  get password(): Password {
    return this.props.password;
  }

  static create(props: UserProps, id?: UniqueEntityID): User {
    const user = new User(props, id)
    const isNewUser = !!id === false;
    if (isNewUser){
      user.addDomainEvent(new UserCreatedEvent(user))
    }
    return user;
  }
}
