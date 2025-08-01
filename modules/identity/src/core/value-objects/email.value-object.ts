import type { Result } from '@modules/shared/core/result';
import { Success, Failure } from '@modules/shared/core/result';
import { ValueObject } from '@modules/shared/core/value-object';

import { InvalidEmailException } from 'core/exceptions/invalid-email.exception';

interface EmailProp{
  value: string
}

export class Email extends ValueObject<EmailProp>{
  private constructor(public readonly props: EmailProp) {
    super(props)
  }

  static validate(props: EmailProp): boolean {
    if (!props.value.includes('@')) {
      return false;
    }

    return true;
  }

  get value(): string {
    return this.props.value;
  }

  static create(value: string): Result<Email, InvalidEmailException> {
    if (!Email.validate({ value })) {
      return Failure(new InvalidEmailException('Invalid email'));
    }

    return Success(new Email({ value }));
  }
}
