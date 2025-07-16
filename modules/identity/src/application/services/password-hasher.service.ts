import { Result } from 'modules/shared/src/core/result';

import { HashingException } from 'application/exceptions/hashing-error.exception';

export interface PasswordHasherService {
  hash(password: string): Promise<Result<string, HashingException>>;
  compare(password: string, hash: string): Promise<Result<boolean, HashingException>>;
}