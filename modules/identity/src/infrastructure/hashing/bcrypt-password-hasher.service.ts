import { injectable } from 'tsyringe';

import bcrypt from 'bcrypt';

import type { PasswordHasherService } from 'application/services/hashing/password-hasher.service';
import { Result, Success, Failure } from '@modules/shared/core/result';

import { HashingException } from 'application/exceptions/hashing-error.exception';
import { PasswordNotMatchingException } from 'application/exceptions/password-not-matching.exception';

@injectable()
export class BcryptPasswordHasherService implements PasswordHasherService {
  async hash(password: string): Promise<Result<string, HashingException>> {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);
      return Success(hashed);
    } catch (error) {
      return Failure(new HashingException('Failed to hash password'));
    }
  }

  async compare(password: string, hash: string): Promise<Result<true, PasswordNotMatchingException | HashingException>> {
    try {
      const res = await bcrypt.compare(password, hash);
      if (!res) {
        return Failure(new PasswordNotMatchingException('Password not matching'));
      }
      return Success(res);
    } catch (error) {
      return Failure(new HashingException('Failed to compare password'));
    }
  }
}