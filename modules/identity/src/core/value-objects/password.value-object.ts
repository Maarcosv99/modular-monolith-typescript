import type { Result } from '@modules/shared/core/result';
import { Success, Failure } from '@modules/shared/core/result';

import { PasswordMaxLengthException } from 'core/exceptions/password-max-length.exception';

export class Password {
  private constructor(public readonly value: string) {}

  static validate(value: string): boolean {
    if (value.length > 10) {
      return false;
    }

    return true;
  }

  static create(value: string): Result<Password, PasswordMaxLengthException> {
    if (!Password.validate(value)) {
      return Failure(new PasswordMaxLengthException(10));
    }

    return Success(new Password(value));
  }
}