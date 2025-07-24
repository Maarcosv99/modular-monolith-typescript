import { Entity } from '@modules/shared/core/entity';

import { Email } from 'core/value-objects/email.value-object';
import { Password } from 'core/value-objects/password.value-object';

export interface UserProps {
  id?: string
  first_name: string
  last_name: string
  email: Email
  password: Password
}

export class User extends Entity<UserProps> {
  private constructor(
    props: UserProps,
    id?: string,
  ) {
    super(props, id);
  }

  get id(): string {
    return this._id;
  }

  get first_name(): string {
    return this._props.first_name;
  }

  get last_name(): string {
    return this._props.last_name;
  }

  get full_name(): string {
    return `${this._props.first_name} ${this._props.last_name}`;
  }

  get email(): Email {
    return this._props.email;
  }

  get password(): Password {
    return this._props.password;
  }

  static create(props: UserProps, id?: string): User {
    return new User(props, id);
  }
}