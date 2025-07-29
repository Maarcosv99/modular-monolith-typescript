import { DomainException } from '@modules/shared/core/exception/domain-exception';

export class InvalidSecretException extends DomainException {
  constructor(message: string) {
    super(message);
  }
} 