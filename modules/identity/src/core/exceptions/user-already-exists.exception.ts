import { DomainException } from 'modules/shared/src/core/exception/domain-exception';

export class UserAlreadyExistsException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}