import { ValueObject } from '@modules/shared/core/value-object';

import type { Result } from '@modules/shared/core/result';
import { Success, Failure } from '@modules/shared/core/result';

import { InvalidSecretException } from 'core/exceptions/invalid-secret.exceptio';
import { SecureRandomString } from './secure-random-string.value-object';

interface SecretHashedProp{
  value: string
}

export class SecretHashed extends ValueObject<SecretHashedProp>{
  private constructor(public readonly props: SecretHashedProp) {
    super(props)
  }

  static validate(value: SecretHashedProp): boolean {
    if (!value.value) {
      return false;
    }

    return true;
  }

  static equals(a: Uint8Array, b: Uint8Array): boolean {
    if (a.byteLength !== b.byteLength) {
      return false;
    }
    let c = 0;
    for (let i = 0; i < a.byteLength; i++) {
      c |= a[i] ^ b[i];
    }
    return c === 0;
  }

  get value(): string {
    return this.props.value;
  }

  static async create(value: SecureRandomString): Promise<Result<SecretHashed, InvalidSecretException>> {
    if (!SecretHashed.validate(value)) {
      return Failure(new InvalidSecretException('Invalid secret'));
    }

    const secretBytes = new TextEncoder().encode(value.value);
    const secretHashBuffer = await crypto.subtle.digest("SHA-256", secretBytes);
    const secretHash = new Uint8Array(secretHashBuffer);

    return Success(new SecretHashed({ value: secretHash.toString() }));
  }
}