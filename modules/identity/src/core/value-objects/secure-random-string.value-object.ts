import type { Result } from '@modules/shared/core/result';
import { Success, Failure } from '@modules/shared/core/result';
import { ValueObject } from '@modules/shared/core/value-object';

import { InvalidSecureRandomStringException } from 'core/exceptions/invalid-secure-random-string.exception';

interface SecureRandomStringProp{
  value: string
}

export class SecureRandomString extends ValueObject<SecureRandomStringProp>{
  private constructor(public readonly props: SecureRandomStringProp) {
    super(props)
  }

  static validate(value: string): boolean {
    if (!value || value.length < 20) {
      return false;
    }

    const alphabet = "abcdefghijkmnpqrstuvwxyz23456789";
    return value.split('').every(char => alphabet.includes(char));
  }

  get value(): string {
    return this.props.value;
  }

  static create(value?: SecureRandomStringProp): Result<SecureRandomString, InvalidSecureRandomStringException> {
    if (value && !SecureRandomString.validate(value.value)) {
      return Failure(new InvalidSecureRandomStringException('Invalid secure random string'));
    }

	const alphabet = "abcdefghijkmnpqrstuvwxyz23456789";

    const bytes = new Uint8Array(24);
    crypto.getRandomValues(bytes);

    let id = "";
    for (let i = 0; i < bytes.length; i++) {
      id += alphabet[bytes[i] >> 3];
    }

    return Success(new SecureRandomString({ value: id }));
  }
}
