import { DomainException } from '@modules/shared/core/exception/domain-exception';

export class PasswordMaxLengthException extends DomainException {
  constructor(length: number) {
    super(`Password must be less than ${length} characters`);
  }
}