import { DomainException } from '@modules/shared/core/exception/domain-exception';

export class SessionNotFoundException extends DomainException {
  constructor(token: string) {
    super(`Session with token ${token} not found`);
  }
}