import { Entity } from '@modules/shared/core/Entity';
import { UniqueEntityID } from '@modules/shared/core/UniqueEntityID';

import { Email } from 'core/value-objects/email.value-object';
import { Password } from 'core/value-objects/password.value-object';

export interface UserProps {
  id?: UniqueEntityID
  first_name: string
  last_name: string
  email: Email
  password: Password
}

export class User extends Entity<UserProps> {
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
    return new User(props, id);
  }
}
