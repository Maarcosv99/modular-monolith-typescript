import { DomainException } from '@modules/shared/core/exception/domain-exception';

export class EmailAlreadyUsedException extends DomainException {
  constructor(email: string) {
    super(`Email ${email} already used`);
  }
}