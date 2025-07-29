import { DomainException } from '@modules/shared/core/exception/domain-exception';

export class SessionAlreadyExistsException extends DomainException {
  constructor(token: string) {
    super(`Session with token ${token} already exists`);
  }
}