import { Identifier } from './identifier'
;
import { Result, Success } from '@modules/shared/core/result';


export class UniqueEntityID extends Identifier<string | number>{
  constructor (id?: string | number) {
    super(id ? id : crypto.randomUUID())
  }

  static create(id?: string | number): Result<UniqueEntityID, Error> {
    return Success(new UniqueEntityID(id));
  }
}
