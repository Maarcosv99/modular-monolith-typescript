import { DomainException } from '@modules/shared/core/exception/domain-exception';

export class UserNotFoundException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}