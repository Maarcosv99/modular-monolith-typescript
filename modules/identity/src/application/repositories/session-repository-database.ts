import { injectable, inject } from 'tsyringe';

import type { Database } from '@modules/shared/application/service/database.interface';
import { DatabaseSymbol } from '@modules/shared/application/service/database.interface';

import { Result, Success, Failure } from '@modules/shared/core/result';

import type { SessionRepository } from 'core/repositories/session.repository';

import { Session } from 'core/entities/session.entity';

import { SessionAlreadyExistsException } from 'core/exceptions/session-already-exists.exception';

@injectable();
export class SessionRepositoryDatabase implements SessionRepository {
  constructor(
    @inject(DatabaseSymbol)
    // TODO: Create a cache service to store the sessions
    private readonly database: Database,
  ) {}

  async create(session: Session): Promise<Result<Session, SessionAlreadyExistsException>> {
    return Success(session);
  }
}