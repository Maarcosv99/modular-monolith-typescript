import type { Result } from '@modules/shared/core/result';
import { Success, Failure } from '@modules/shared/core/result';

import { InvalidEmailException } from 'core/exceptions/invalid-email.exception';

export class Email {
  private constructor(public readonly value: string) {}

  static validate(value: string): boolean {
    if (!value.includes('@')) {
      return false;
    }

    return true;
  }

  static create(value: string): Result<Email, InvalidEmailException> {
    if (!Email.validate(value)) {
      return Failure(new InvalidEmailException('Invalid email'));
    }

    return Success(new Email(value));
  }
}