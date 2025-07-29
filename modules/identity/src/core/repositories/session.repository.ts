import { Result } from '@modules/shared/core/result';

import { Session } from 'core/entities/session.entity';

import { SessionAlreadyExistsException } from 'core/exceptions/session-already-exists.exception';
import { SessionNotFoundException } from 'core/exceptions/session-not-found.exception';

export interface SessionRepository {
  create(session: Session): Promise<Result<Session, SessionAlreadyExistsException>>;
  findByToken(token: string): Promise<Result<Session, SessionNotFoundException>>;
  delete(id: string): Promise<Result<void, SessionNotFoundException>>;
}

export const SessionRepositorySymbol = Symbol.for('SessionRepository');