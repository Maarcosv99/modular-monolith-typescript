import { Entity } from '@modules/shared/core/entity';
import { UniqueEntityID } from '@modules/shared/core/unique-entity-id';
import { SecureRandomString } from '../value-objects/secure-random-string.value-object';
import { SecretHashed } from '../value-objects/secret-hashed.value-object';
import { isFailure } from '@modules/shared/core/result';

export interface SessionProps {
  userId: UniqueEntityID;
  secret: SecureRandomString;
  secretHash: SecretHashed;
  expiresAt: number;
}

export class Session extends Entity<SessionProps, SecureRandomString> {
  private constructor(props: SessionProps, id?: SecureRandomString) {
    super(props, id);
  }

  get id(): SecureRandomString {
    return this._id;
  }

  get userId(): UniqueEntityID {
    return this.props.userId;
  }

  get secret(): SecureRandomString {
    return this.props.secret;
  }

  get secretHash(): SecretHashed {
    return this.props.secretHash;
  }

  get expiresAt(): number {
    return this.props.expiresAt;
  }

  isExpired(): boolean {
    return Date.now() > this.props.expiresAt;
  }

  static create(props: SessionProps, id?: SecureRandomString): Session {
    if (!id) {
      const idOrError = SecureRandomString.create();
      if (isFailure(idOrError)) {
        throw new Error('Failed to create session ID');
      }
      id = idOrError.value;
    }
    return new Session(props, id);
  }
}