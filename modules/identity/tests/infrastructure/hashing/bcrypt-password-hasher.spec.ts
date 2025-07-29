import { describe, it, expect } from 'vitest';

import { isFailure, isSuccess } from '@modules/shared/core/result';

import { BcryptPasswordHasherService } from 'infrastructure/hashing/bcrypt-password-hasher.service';
import { PasswordNotMatchingException } from 'application/exceptions/password-not-matching.exception';

describe('BcryptPasswordHasher', () => {
  const hasher = new BcryptPasswordHasherService();

  it('should hash a password and compare successfully', async () => {
    const password = 'password';
    const hashedPassword = await hasher.hash(password);
    expect(isSuccess(hashedPassword)).toBeTruthy();
    if (isFailure(hashedPassword)) return;

    const compareResult = await hasher.compare(password, hashedPassword.value);
    expect(isSuccess(compareResult)).toBeTruthy();
    if (isSuccess(compareResult)) {
      expect(compareResult.value).toBeTruthy();
    }
  });

  it('should fail on compare with wrong password', async () => {
    const password = 'password';
    const hashResult = await hasher.hash(password);
    expect(isSuccess(hashResult)).toBeTruthy();
    if (isFailure(hashResult)) return;

    const wrongPassword = 'wrong-password';
    const compareResult = await hasher.compare(wrongPassword, hashResult.value);
    expect(isFailure(compareResult)).toBeTruthy();
    if (isFailure(compareResult)) {
      expect(compareResult.error).toBeInstanceOf(PasswordNotMatchingException);
    }
  })
});
