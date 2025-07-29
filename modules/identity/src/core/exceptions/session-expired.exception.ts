import { DomainException } from '@modules/shared/core/exception/domain-exception';

export class SessionExpiredException extends DomainException {
  constructor(token: string) {
    super(`Session with token ${token} expired`);
  }
}