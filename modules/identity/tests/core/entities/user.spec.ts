import { describe, it, expect } from 'vitest';

import { isFailure } from '@modules/shared/core/result';

import { User } from 'core/entities/user.entity';
import { Password } from 'core/value-objects/password.value-object';
import { Email } from 'core/value-objects/email.value-object';

describe('User Entity', () => {
  it('should create a valid user', () => {
    const emailOrError = Email.create('test@test.com');
    if (isFailure(emailOrError)) return;

    const passwordOrError = Password.create('password');
    if (isFailure(passwordOrError)) return;

    const user = User.create({
      id: '1',
      first_name: 'John',
      last_name: 'Doe',
      email: emailOrError.value,
      password: passwordOrError.value,
    });

    expect(user.id).toBe('1');
    expect(user.first_name).toBe('John');
    expect(user.last_name).toBe('Doe');
    expect(user.full_name).toBe('John Doe');
    expect(user.email.value).toBe('test@test.com');
    expect(user.password.value).toBe('password');
  })
})