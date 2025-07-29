import { Result } from '@modules/shared/core/result';

import { HashingException } from 'application/exceptions/hashing-error.exception';
import { PasswordNotMatchingException } from 'application/exceptions/password-not-matching.exception';

export const PasswordHasherServiceSymbol = Symbol.for('PasswordHasherService');

export interface PasswordHasherService {
  hash(password: string): Promise<Result<string, HashingException>>;
  compare(password: string, hash: string): Promise<Result<true, PasswordNotMatchingException | HashingException>>;
}
