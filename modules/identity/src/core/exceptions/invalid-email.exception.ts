import { DomainException } from '@modules/shared/core/exception/domain-exception';

export class InvalidEmailException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}