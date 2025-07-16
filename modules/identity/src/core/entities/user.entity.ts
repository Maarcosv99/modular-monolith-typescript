import { Email } from 'core/value-objects/email.value-object';
import { Password } from 'core/value-objects/password.value-object';

export interface UserProps {
  id?: string
  first_name: string
  last_name: string
  email: Email
  password: Password
}

export class User {
  private constructor(
    public readonly id: string,
    public readonly first_name: string,
    public readonly last_name: string,
    public readonly email: Email,
    public readonly password: Password,
  ) {}

  get full_name(): string {
    return `${this.first_name} ${this.last_name}`;
  }

  static create(props: UserProps): User {
    return new User(
      props.id || crypto.randomUUID(),
      props.first_name,
      props.last_name,
      props.email,
      props.password,
    );
  }
}