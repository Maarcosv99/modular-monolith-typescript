import { DomainException } from '@modules/shared/core/exception/domain-exception';

export class InvalidSecureRandomStringException extends DomainException {
  constructor(message: string) {
    super(message);
  }
} 