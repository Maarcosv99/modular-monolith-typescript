import { describe, it, expect } from 'vitest';

import { isFailure, isSuccess } from 'modules/shared/src/core/result';

import { Email } from 'core/value-objects/email.value-object';
import { InvalidEmailException } from 'core/exceptions/invalid-email.exception';

describe('Email Value Object', () => {
  it('should create a valid email', () => {
    const email = Email.create('test@test.com');
    expect(isSuccess(email)).toBeTruthy();
    if (isFailure(email)) return;

    expect(email.value.value).toBe('test@test.com');
  })

  it('should fail on invalid email', () => {
    const email = Email.create('invalid-email');
    expect(isFailure(email)).toBeTruthy();
    if (isSuccess(email)) return;

    expect(email.error).toBeInstanceOf(InvalidEmailException);
  })
})