import { describe, it, expect } from 'vitest';

import { isFailure, isSuccess } from '@modules/shared/core/result';

import { Password } from 'core/value-objects/password.value-object';
import { PasswordMaxLengthException } from 'core/exceptions/password-max-length.exception';

describe('Password Value Object', () => {
  it('should create a valid password', () => {
    const password = Password.create('password');
    expect(isSuccess(password)).toBeTruthy();
    if (isFailure(password)) return;

    expect(password.value.value).toBe('password');
  })

  it('should fail on password max length', () => {
    const password = Password.create('a'.repeat(101));
    expect(isFailure(password)).toBeTruthy();
    if (isSuccess(password)) return;

    expect(password.error).toBeInstanceOf(PasswordMaxLengthException);
  })
})